import Botao from "@comp/Botao";
import Entrada from "@comp/Entrada";
import TelaCabecalho from "@comp/TelaCabecalho";
import UsuarioFoto from "@comp/UsuarioFoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagemSelecionador from "expo-image-picker";
import * as ArquivoSistema from "expo-file-system";
import { Controller, useForm } from "react-hook-form";
import useAut from "@hooks/useAut";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "@servicos/api";
import { AppErro } from "@util/AppErro";
import fotoPadraoUsuario from "@assets/userPhotoDefault.png";

const fotoTamanho = 33;

type FormDadosProps = {
	nome: string;
	email?: string;
	senhaAntiga?: string;
	novaSenha?: string | null;
	senhaConfirmacao?: string | null;
};

const PerfilEsquema = yup.object({
	nome: yup.string().required("Informe o nome"),
	email: yup.string(),
	senhaAntiga: yup.string(),
	novaSenha: yup
		.string()
		.min(6, "A senha deve ter no mínimo 6 caracteres")
		.nullable()
		.transform((valor) => (!!valor ? valor : null)),
	senhaConfirmacao: yup
		.string()
		.nullable()
		.transform((valor) => (!!valor ? valor : null))
		.oneOf([yup.ref("novaSenha"), ""], "A confirmação de senha não confere")
		.when("novaSenha", {
			is: (Field: any) => Field,
			then: (schema) =>
				schema
					.nullable()
					.required("Informe a confirmação da senha")
					.transform((valor) => (!!valor ? valor : null)),
		}),
});

export default function Perfil() {
	const [estaAtualizando, defEstaAtualizando] = useState(false);
	const [fotoEstaCarregando, defFotoEstaCarregando] = useState(false);

	const { usuario, atualizar } = useAut();
	const torrada = useToast();
	const {
		control,
		handleSubmit: lidarEnviar,
		formState: { errors: erros },
	} = useForm<FormDadosProps>({
		defaultValues: {
			nome: usuario.name,
			email: usuario.email,
		},
		resolver: yupResolver(PerfilEsquema),
	});

	async function lidarUsuarioSelecionarFoto() {
		defFotoEstaCarregando(true);
		try {
			const fotoSelecionada = await ImagemSelecionador.launchImageLibraryAsync({
				mediaTypes: ImagemSelecionador.MediaTypeOptions.Images,
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true,
				selectionLimit: 1,
			});

			if (fotoSelecionada.canceled) return;

			if (fotoSelecionada.assets[0]) {
				const fotoInfo = await ArquivoSistema.getInfoAsync(fotoSelecionada.assets[0].uri);

				if (fotoInfo.exists && fotoInfo.size / 1024 / 1024 > 5) {
					return torrada.show({
						title: "Essa imagem é muito grande, escolha uma de até 5MB.",
						placement: "top",
						bgColor: "red.500",
					});
				}

				const arquivoExtensao = fotoSelecionada.assets[0].uri.split(".").pop();

				const fotoArquivo = {
					name: `${usuario.name.split(" ").join("")}.${arquivoExtensao}`.toLowerCase(),
					uri: fotoSelecionada.assets[0].uri,
					type: `${fotoSelecionada.assets[0].type}/${arquivoExtensao}`,
				} as any;

				const usuarioFotoForm = new FormData();
				usuarioFotoForm.append("avatar", fotoArquivo);

				const resposta = await API.patch("/users/avatar", usuarioFotoForm, {
					headers: { "Content-Type": "multipart/form-data" },
				});

				const usuarioAtualizado = usuario;
				usuarioAtualizado.avatar = resposta.data.avatar;
				atualizar(usuarioAtualizado);

				torrada.show({ title: "Foto atualizada!", placement: "top", bgColor: "green.500" });
			}
		} catch (erro) {
			console.log(erro);
		} finally {
			defFotoEstaCarregando(false);
		}
	}

	async function lidarAtualizarPerfil(dados: FormDadosProps) {
		try {
			defEstaAtualizando(true);

			const usuarioAtualizado = usuario;
			usuarioAtualizado.name = dados.nome;

			await API.put("/users", {
				name: dados.nome,
				password: dados.novaSenha,
				old_password: dados.senhaAntiga,
			});

			await atualizar(usuarioAtualizado);

			torrada.show({ title: "Perfil atualizado com sucesso!", placement: "top", bgColor: "green.500" });
		} catch (erro) {
			let mensagem =
				erro instanceof AppErro
					? erro.message
					: "Não foi possível atualizar os dados. Tente novamente mais tarde";

			torrada.show({ title: mensagem, placement: "top", bgColor: "red.500" });
		} finally {
			defEstaAtualizando(false);
		}
	}

	return (
		<VStack flex={1}>
			<TelaCabecalho>Perfil</TelaCabecalho>
			<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
				<Center mt={6} px={10}>
					{fotoEstaCarregando ? (
						<Skeleton
							w={fotoTamanho}
							h={fotoTamanho}
							rounded="full"
							startColor="gray.500"
							endColor="gray.300"
						/>
					) : (
						<UsuarioFoto
							source={
								usuario.avatar
									? { uri: `${API.defaults.baseURL}/avatar/${usuario.avatar}` }
									: fotoPadraoUsuario
							}
							alt="Foto do usuário"
							tamanho={fotoTamanho}
						/>
					)}
					<TouchableOpacity onPress={lidarUsuarioSelecionarFoto}>
						<Text color="green.500" fontSize="md" fontWeight="bold" mt={2} mb={8}>
							Alterar foto
						</Text>
					</TouchableOpacity>

					<Controller
						control={control}
						name="nome"
						render={({ field: { value, onChange } }) => (
							<Entrada
								placeholder="Nome"
								bg="gray.600"
								onChangeText={onChange}
								value={value}
								erroMensagem={erros.nome?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="email"
						render={({ field: { value, onChange } }) => (
							<Entrada
								placeholder="E-mail"
								isDisabled
								bg="gray.600"
								onChangeText={onChange}
								value={value}
								_disabled={{ bg: "gray.800" }}
							/>
						)}
					/>

					<Heading fontFamily="heading" mt={12} mb={2} color="gray.200" fontSize="md" alignSelf="flex-start">
						Alterar senha
					</Heading>

					<Controller
						control={control}
						name="senhaAntiga"
						render={({ field: { onChange } }) => (
							<Entrada bg="gray.600" placeholder="Senha antiga" secureTextEntry onChangeText={onChange} />
						)}
					/>
					<Controller
						control={control}
						name="novaSenha"
						render={({ field: { onChange } }) => (
							<Entrada
								bg="gray.600"
								placeholder="Nova senha"
								secureTextEntry
								onChangeText={onChange}
								erroMensagem={erros.novaSenha?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="senhaConfirmacao"
						render={({ field: { onChange } }) => (
							<Entrada
								bg="gray.600"
								placeholder="Confirme a nova senha"
								secureTextEntry
								onChangeText={onChange}
								erroMensagem={erros.senhaConfirmacao?.message}
							/>
						)}
					/>

					<Botao mt={4} onPress={lidarEnviar(lidarAtualizarPerfil)} isLoading={estaAtualizando}>
						Atualizar
					</Botao>
				</Center>
			</ScrollView>
		</VStack>
	);
}
