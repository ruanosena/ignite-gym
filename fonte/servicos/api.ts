import { armObterAutToken, armSalvarAutToken } from "@arm/armAutToken";
import { AppErro } from "@util/AppErro";
import axios, { AxiosError, AxiosInstance } from "axios";

type Sair = () => void;

type PromiseTipo = {
	aoSucesso: (token: string) => void;
	aoFalhar: (erro: AxiosError) => void;
};

type APIInstanciaProps = AxiosInstance & {
	registrarInterceptadorToken: (sair: Sair) => () => void;
};
const API = axios.create({
	baseURL: "http://192.168.122.1:3333",
}) as APIInstanciaProps;

let filaComFalha: PromiseTipo[] = [];
let estaAtualizando = false;

API.registrarInterceptadorToken = (sair) => {
	const interceptadorToken = API.interceptors.response.use(
		(res) => res,
		async (requisicaoErro) => {
			if (requisicaoErro?.response?.status == 401) {
				if (
					requisicaoErro.response.data?.message == "token.expired" ||
					requisicaoErro.response.data?.message == "token.invalid"
				) {
					const { token_atualizacao } = await armObterAutToken();

					if (!token_atualizacao) {
						sair();
						return Promise.reject(requisicaoErro);
					}

					const configRequisicaoOriginal = requisicaoErro.config;

					if (estaAtualizando) {
						return new Promise((res, rej) => {
							filaComFalha.push({
								aoSucesso(token) {
									configRequisicaoOriginal.headers = { Authorization: `Bearer ${token}` };
									res(API(configRequisicaoOriginal));
								},
								aoFalhar(erro) {
									rej(erro);
								},
							});
						});
					}

					estaAtualizando = true;

					return new Promise(async (res, rej) => {
						try {
							const { data } = await API.post("/sessions/refresh-token", {
								refresh_token: token_atualizacao,
							});
							await armSalvarAutToken({ token: data.token, token_atualizacao: data.refresh_token });

							if (configRequisicaoOriginal.data) {
								configRequisicaoOriginal.data = JSON.parse(configRequisicaoOriginal.data);
							}

							configRequisicaoOriginal.headers = { Authorization: `Bearer ${data.token}` };
							API.defaults.headers.common.Authorization = `Bearer ${data.token}`;

							filaComFalha.forEach((requisicao) => {
								requisicao.aoSucesso(data.token);
							});

							console.log("Token ATUALIZADO");

							res(API(configRequisicaoOriginal));
						} catch (erro: any) {
							filaComFalha.forEach((requisicao) => {
								requisicao.aoFalhar(erro);
							});

							sair();
							rej(erro);
						} finally {
							estaAtualizando = false;
							filaComFalha = [];
						}
					});
				}

				sair();
			}

			if (requisicaoErro.response && requisicaoErro.response.data) {
				return Promise.reject(new AppErro(requisicaoErro.response.data.message));
			} else {
				return Promise.reject(requisicaoErro);
			}
		}
	);

	return () => {
		API.interceptors.response.eject(interceptadorToken);
	};
};

export { API };
