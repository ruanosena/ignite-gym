import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import LogotipoSvg from "@assets/logo.svg";
import FundoImg from "@assets/background.png";
import Entrada from "@comp/Entrada";
import Botao from "@comp/Botao";
import { useNavigation } from "@react-navigation/native";
import { AutNavegadorRotasProps } from "@rotas/aut.rotas";

export default function Entrar() {
	const navegacao = useNavigation<AutNavegadorRotasProps>();

	function lidarNovaConta() {
		navegacao.navigate("cadastrar");
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

					<Entrada placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
					<Entrada placeholder="Senha" secureTextEntry />

					<Botao>Acessar</Botao>
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
