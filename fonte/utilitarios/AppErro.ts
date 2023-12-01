export class AppErro extends Error {
	constructor(mensagem?: string) {
		super(mensagem);
	}
}
