import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUT_TOKEN_ARM } from "./armConfig";

export async function armSalvarAutToken(token: string) {
	await AsyncStorage.setItem(AUT_TOKEN_ARM, token);
}
export async function armObterAutToken() {
	let token = await AsyncStorage.getItem(AUT_TOKEN_ARM);

	return token;
}

export async function armRemoverAutToken() {
	await AsyncStorage.removeItem(AUT_TOKEN_ARM);
}
