import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import LogotipoSvg from "@assets/logo.svg";
import FundoImg from "@assets/background.png";
import Entrada from "@comp/Entrada";
import Botao from "@comp/Botao";

export default function Cadastrar() {
	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
			<VStack flex={1} bg="gray.700" px={10} pb={16}>
				<Image source={FundoImg} alt="Pessoas treinando" resizeMode="contain" position="absolute" />

				<Center my={24}>
					<LogotipoSvg />
					<Text color="gray.100" fontSize="sm">
						Treine sua mente e o seu corpo
					</Text>
				</Center>

				<Center>
					<Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
						Crie sua conta
					</Heading>

					<Entrada placeholder="Nome" />
					<Entrada placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
					<Entrada placeholder="Senha" secureTextEntry />

					<Botao>Criar e acessar</Botao>
				</Center>

				<Botao variant="outline" mt={24}>
					Voltar para o login
				</Botao>
			</VStack>
		</ScrollView>
	);
}
