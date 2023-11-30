import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import LogotipoSvg from "@assets/logo.svg";
import FundoImg from "@assets/background.png";
import Entrada from "@comp/Entrada";
import Botao from "@comp/Botao";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormDadosProps = {
	nome: string;
	email: string;
	senha: string;
	senhaConfirmacao: string;
};

const cadastroEsquema = yup.object({
	nome: yup.string().required("Informe o nome"),
	email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
	senha: yup.string().required("Informe a senha").min(6, "A senha deve conter ao menos 6 caracteres"),
	senhaConfirmacao: yup
		.string()
		.required("Confirme a senha")
		.oneOf([yup.ref("senha"), ""], "A confirmação da senha não confere"),
});

export default function Cadastrar() {
	const navegacao = useNavigation();

	const {
		control: controle,
		handleSubmit: lidarEnvio,
		formState: { errors: erros },
	} = useForm<FormDadosProps>({ resolver: yupResolver(cadastroEsquema) });

	function lidarVoltar() {
		navegacao.goBack();
	}

	function lidarCadastro({ nome, email, senha, senhaConfirmacao }: FormDadosProps) {
		console.log({ nome, email, senha, senhaConfirmacao });
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
						Crie sua conta
					</Heading>

					<Controller
						control={controle}
						name="nome"
						render={({ field: { onChange, value } }) => (
							<Entrada
								placeholder="Nome"
								onChangeText={onChange}
								value={value}
								erroMensagem={erros.nome?.message}
							/>
						)}
					/>

					<Controller
						control={controle}
						name="email"
						render={({ field: { onChange, value } }) => (
							<Entrada
								placeholder="E-mail"
								onChangeText={onChange}
								value={value}
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
								placeholder="Senha"
								onChangeText={onChange}
								value={value}
								secureTextEntry
								erroMensagem={erros.senha?.message}
							/>
						)}
					/>
					<Controller
						control={controle}
						name="senhaConfirmacao"
						render={({ field: { onChange, value } }) => (
							<Entrada
								placeholder="Confirmar a senha"
								onChangeText={onChange}
								value={value}
								secureTextEntry
								onSubmitEditing={lidarEnvio(lidarCadastro)}
								returnKeyType="send"
								erroMensagem={erros.senhaConfirmacao?.message}
							/>
						)}
					/>
					<Botao onPress={lidarEnvio(lidarCadastro)}>Criar e acessar</Botao>
				</Center>

				<Botao variant="outline" mt={12} onPress={lidarVoltar}>
					Voltar para o login
				</Botao>
			</VStack>
		</ScrollView>
	);
}
