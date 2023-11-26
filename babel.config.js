module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["./fonte"],
					alias: {
						"@dtos": "./fonte/dtos",
						"@assets": "./fonte/assets",
						"@comp": "./fonte/componentes",
						"@tela": "./fonte/telas",
						"@arm": "./fonte/armazenamento",
						"@util": "./fonte/utilitarios",
						"@servicos": "./fonte/servicos",
						"@hooks": "./fonte/hooks",
						"@contextos": "./fonte/contextos",
						"@rotas": "./fonte/rotas",
					},
				},
			],
		],
	};
};
