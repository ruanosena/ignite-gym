import { ReactNode, createContext, useEffect, useState } from "react";
import { UsuarioDTO } from "@dtos/usuarioDTO";
import { API } from "@servicos/api";
import { armObterUsuario, armRemoverUsuario, armSalvarUsuario } from "@arm/armUsuario";

export type AutContextoDadosProps = {
	usuario: UsuarioDTO;
	entrar: (email: string, senha: string) => Promise<void>;
	estaCarregandoDados: boolean;
	sair: () => Promise<void>;
};

type AutContextoProviderProps = {
	children: ReactNode;
};

export const AutContexto = createContext<AutContextoDadosProps>({} as AutContextoDadosProps);

export default function AutContextoProvider({ children }: AutContextoProviderProps) {
	const [usuario, defUsuario] = useState<UsuarioDTO>({} as UsuarioDTO);
	const [estaCarregandoDados, defEstaCarregandoDados] = useState(true);

	async function entrar(email: string, senha: string) {
		try {
			const { data } = await API.post("/sessions", { email, password: senha });
			if (data.user) {
				defUsuario(data.user);
				armSalvarUsuario(data.user);
			}
		} catch (erro) {
			throw erro;
		}
	}

	async function sair() {
		try {
			defEstaCarregandoDados(true);
			defUsuario({} as UsuarioDTO);

			await armRemoverUsuario();
		} catch (erro) {
			throw erro;
		} finally {
			defEstaCarregandoDados(false);
		}
	}

	async function carregarDados() {
		try {
			const usuarioAut = await armObterUsuario();

			if (usuarioAut.id) {
				defUsuario(usuarioAut);
			}
		} catch (erro) {
			throw erro;
		} finally {
			defEstaCarregandoDados(false);
		}
	}

	useEffect(() => {
		carregarDados();
	}, []);

	return (
		<AutContexto.Provider
			value={{
				usuario,
				entrar,
				estaCarregandoDados,
				sair
			}}
		>
			{children}
		</AutContexto.Provider>
	);
}
