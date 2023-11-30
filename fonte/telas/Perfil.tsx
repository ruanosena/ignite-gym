import Botao from "@comp/Botao";
import Entrada from "@comp/Entrada";
import TelaCabecalho from "@comp/TelaCabecalho";
import UsuarioFoto from "@comp/UsuarioFoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagemSelecionador from "expo-image-picker";
import * as ArquivoSistema from "expo-file-system";

const fotoTamanho = 33;

export default function Perfil() {
	const [fotoEstaCarregando, defFotoEstaCarregando] = useState(false);
	const [usuarioFoto, defUsuarioFoto] = useState("https://github.com/ruanosena.png");

	const torrada = useToast();

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

				defUsuarioFoto(fotoSelecionada.assets[0].uri);
			}
		} catch (erro) {
			console.log(erro);
		} finally {
			defFotoEstaCarregando(false);
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
						<UsuarioFoto source={{ uri: usuarioFoto }} alt="Foto do usuário" tamanho={fotoTamanho} />
					)}
					<TouchableOpacity onPress={lidarUsuarioSelecionarFoto}>
						<Text color="green.500" fontSize="md" fontWeight="bold" mt={2} mb={8}>
							Alterar foto
						</Text>
					</TouchableOpacity>

					<Entrada placeholder="Nome" bg="gray.600" />
					<Entrada placeholder="E-mail" isDisabled bg="gray.600" _disabled={{ bg: "gray.800" }} />

					<Heading fontFamily="heading" mt={12} mb={2} color="gray.200" fontSize="md" alignSelf="flex-start">
						Alterar senha
					</Heading>

					<Entrada bg="gray.600" placeholder="Senha antiga" secureTextEntry />
					<Entrada bg="gray.600" placeholder="Nova senha" secureTextEntry />
					<Entrada bg="gray.600" placeholder="Confirme a nova senha" secureTextEntry />

					<Botao mt={4}>Atualizar</Botao>
				</Center>
			</ScrollView>
		</VStack>
	);
}
