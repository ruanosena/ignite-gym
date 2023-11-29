import Botao from "@comp/Botao";
import Entrada from "@comp/Entrada";
import TelaCabecalho from "@comp/TelaCabecalho";
import UsuarioFoto from "@comp/UsuarioFoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const fotoTamanho = 33;

export default function Perfil() {
	const [fotoEstaCarregando, defFotoEstaCarregando] = useState(false);
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
							source={{ uri: "https://github.com/ruanosena.png" }}
							alt="Foto do usuário"
							tamanho={fotoTamanho}
						/>
					)}
					<TouchableOpacity>
						<Text color="green.500" fontSize="md" fontWeight="bold" mt={2} mb={8}>
							Alterar foto
						</Text>
					</TouchableOpacity>

					<Entrada placeholder="Nome" bg="gray.600" />
					<Entrada placeholder="E-mail" isDisabled bg="gray.600" _disabled={{ bg: "gray.800" }} />

					<Heading mt={12} mb={2} color="gray.200" fontSize="md" alignSelf="flex-start">
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
