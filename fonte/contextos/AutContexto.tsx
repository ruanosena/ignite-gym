import { ReactNode, createContext, useEffect, useState } from "react";
import { UsuarioDTO } from "@dtos/usuarioDTO";
import { API } from "@servicos/api";
import { armObterUsuario, armRemoverUsuario, armSalvarUsuario } from "@arm/armUsuario";
import { armObterAutToken, armRemoverAutToken, armSalvarAutToken } from "@arm/armAutToken";

export type AutContextoDadosProps = {
	usuario: UsuarioDTO;
	entrar: (email: string, senha: string) => Promise<void>;
	estaCarregandoDados: boolean;
	atualizar: (usuarioAtualizado: UsuarioDTO) => Promise<void>;
	sair: () => Promise<void>;
};

type AutContextoProviderProps = {
	children: ReactNode;
};

export const AutContexto = createContext<AutContextoDadosProps>({} as AutContextoDadosProps);

export default function AutContextoProvider({ children }: AutContextoProviderProps) {
	const [usuario, defUsuario] = useState<UsuarioDTO>({} as UsuarioDTO);
	const [estaCarregandoDados, defEstaCarregandoDados] = useState(true);

	async function atualizarUsuarioEToken(usuarioDados: UsuarioDTO, token: string) {
		API.defaults.headers.common.Authorization = `Bearer ${token}`;
		defUsuario(usuarioDados);
	}

	async function salvarUsuarioEToken(usuarioDados: UsuarioDTO, token: string) {
		try {
			defEstaCarregandoDados(true);
			await armSalvarUsuario(usuarioDados);
			await armSalvarAutToken(token);
		} catch (erro) {
			throw erro;
		} finally {
			defEstaCarregandoDados(false);
		}
	}

	async function entrar(email: string, senha: string) {
		try {
			const { data } = await API.post("/sessions", { email, password: senha });

			if (data.user && data.token) {
				await salvarUsuarioEToken(data.user, data.token);
				atualizarUsuarioEToken(data.user, data.token);
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
			await armRemoverAutToken();
		} catch (erro) {
			throw erro;
		} finally {
			defEstaCarregandoDados(false);
		}
	}

	async function atualizar(usuarioAtualizado: UsuarioDTO) {
		try {
			defUsuario(usuarioAtualizado);
			await armSalvarUsuario(usuarioAtualizado);
		} catch (erro) {
			throw erro;
		}
	}

	async function carregarDados() {
		try {
			defEstaCarregandoDados(true);
			const usuarioAut = await armObterUsuario();
			const token = await armObterAutToken();

			if (token && usuarioAut.id) {
				atualizarUsuarioEToken(usuarioAut, token);
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
				atualizar,
				sair,
			}}
		>
			{children}
		</AutContexto.Provider>
	);
}
