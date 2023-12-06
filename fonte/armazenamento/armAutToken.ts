import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUT_TOKEN_ARM } from "./armConfig";

type ArmazenamentoTokenProps = {
	token: string;
	token_atualizacao: string;
};

export async function armSalvarAutToken({ token, token_atualizacao }: ArmazenamentoTokenProps) {
	await AsyncStorage.setItem(AUT_TOKEN_ARM, JSON.stringify({ token, token_atualizacao }));
}
export async function armObterAutToken() {
	let resposta = await AsyncStorage.getItem(AUT_TOKEN_ARM);

	const { token, token_atualizacao }: ArmazenamentoTokenProps = resposta ? JSON.parse(resposta) : {};

	return { token, token_atualizacao };
}

export async function armRemoverAutToken() {
	await AsyncStorage.removeItem(AUT_TOKEN_ARM);
}
