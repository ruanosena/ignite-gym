import { AppErro } from "@util/AppErro";
import axios from "axios";

const API = axios.create({
	baseURL: "http://192.168.122.1:3333",
});

API.interceptors.response.use(
	(res) => res,
	(erro) => {
		if (erro.response && erro.response.data) {
			return Promise.reject(new AppErro(erro.response.data.message));
		} else {
			return Promise.reject(erro);
		}
	}
);

export { API };
