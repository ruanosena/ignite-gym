import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";
import LogotipoSvg from "@assets/logo.svg";
import FundoImg from "@assets/background.png";
import Entrada from "@comp/Entrada";
import Botao from "@comp/Botao";
import { useNavigation } from "@react-navigation/native";
import { AutNavegadorRotasProps } from "@rotas/aut.rotas";
import { Controller, useForm } from "react-hook-form";
import useAut from "@hooks/useAut";
import { AppErro } from "@util/AppErro";
import { useState } from "react";

type FormDadosProps = {
	email: string;
	senha: string;
};

export default function Entrar() {
	const [estaCarregando, defEstaCarregando] = useState(false);
	const navegacao = useNavigation<AutNavegadorRotasProps>();
	const { entrar } = useAut();
	const torrada = useToast();

	const {
		control: controle,
		handleSubmit: lidarEnviar,
		formState: { errors: erros },
	} = useForm<FormDadosProps>();

	function lidarNovaConta() {
		navegacao.navigate("cadastrar");
	}

	async function lidarEntrar({ email, senha }: FormDadosProps) {
		try {
			defEstaCarregando(true);
			await entrar(email, senha);
		} catch (erro) {
			let mensagem =
				erro instanceof AppErro ? erro.message : "Não foi possível entrar. Tente novamente mais tarde";

			defEstaCarregando(false);

			torrada.show({
				title: mensagem,
				placement: "top",
				bgColor: "red.500",
			});
		}
	}

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
			<VStack flex={1} px={10} pb={16}>
				<Image
					source={FundoImg}
					defaultSource={FundoImg}
					alt="Pessoas treinando"
					resizeMode="contain"
					position="absolute"
				/>

				<Center my={24}>
					<LogotipoSvg />
					<Text color="gray.100" fontSize="sm">
						Treine sua mente e o seu corpo
					</Text>
				</Center>

				<Center>
					<Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
						Acesse sua conta
					</Heading>

					<Controller
						control={controle}
						name="email"
						rules={{ required: "Informe o e-mail" }}
						render={({ field: { onChange, value } }) => (
							<Entrada
								onChangeText={onChange}
								value={value}
								placeholder="E-mail"
								keyboardType="email-address"
								autoCapitalize="none"
								erroMensagem={erros.email?.message}
							/>
						)}
					/>
					<Controller
						control={controle}
						name="senha"
						rules={{ required: "Informe a senha" }}
						render={({ field: { onChange, value } }) => (
							<Entrada
								onChangeText={onChange}
								value={value}
								placeholder="Senha"
								secureTextEntry
								erroMensagem={erros.senha?.message}
								onSubmitEditing={lidarEnviar(lidarEntrar)}
								returnKeyType="send"
							/>
						)}
					/>

					<Botao isLoading={estaCarregando} onPress={lidarEnviar(lidarEntrar)}>
						Acessar
					</Botao>
				</Center>

				<Center mt={24}>
					<Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
						Ainda não tem acesso?
					</Text>
					<Botao variant="outline" onPress={lidarNovaConta}>
						Criar conta
					</Botao>
				</Center>
			</VStack>
		</ScrollView>
	);
}
