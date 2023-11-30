import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import LogotipoSvg from "@assets/logo.svg";
import FundoImg from "@assets/background.png";
import Entrada from "@comp/Entrada";
import Botao from "@comp/Botao";
import { useNavigation } from "@react-navigation/native";
import { AutNavegadorRotasProps } from "@rotas/aut.rotas";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormDadosProps = {
	email: string;
	senha: string;
};

const entrarEsquema = yup.object({
	email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
	senha: yup.string().required("Informe a senha").min(6, "Senha inválida"),
});

export default function Entrar() {
	const navegacao = useNavigation<AutNavegadorRotasProps>();

	const {
		control: controle,
		handleSubmit: lidarEnviar,
		formState: { errors: erros },
	} = useForm<FormDadosProps>({ resolver: yupResolver(entrarEsquema) });

	function lidarNovaConta() {
		navegacao.navigate("cadastrar");
	}

	function lidarEntrar({ email, senha }: FormDadosProps) {
		console.log({ email, senha });
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

					<Botao onPress={lidarEnviar(lidarEntrar)}>Acessar</Botao>
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
