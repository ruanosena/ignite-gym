import { UsuarioDTO } from "@dtos/usuarioDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USUARIO_ARM } from "./armConfig";

export async function armSalvarUsuario(usuario: UsuarioDTO) {
	await AsyncStorage.setItem(USUARIO_ARM, JSON.stringify(usuario));
}

export async function armObterUsuario() {
	let armazenamento = await AsyncStorage.getItem(USUARIO_ARM);

	const usuario: UsuarioDTO = armazenamento ? JSON.parse(armazenamento) : {};

	return usuario;
}

export async function armRemoverUsuario() {
	await AsyncStorage.removeItem(USUARIO_ARM);
}
