import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import AutRotas from "./aut.rotas";
import AppRotas from "./app.rotas";
import useAut from "@hooks/useAut";
import Carregamento from "@comp/Carregamento";
import { useEffect, useState } from "react";
import { OSNotification, OneSignal } from "react-native-onesignal";
import { Notificacao } from "@comp/Notificacao";

const linking = {
	prefixes: ["io.github.ruanosena://", "ignite-gym://", "exp+ignite-gym://"],
	config: {
		screens: {
			exercicio: {
				path: "exercicio/:id",
				parse: {
					id: (id: string) => id,
				},
			},
		},
	},
};

export default function Rotas() {
	const [notificacao, defNotificacao] = useState<OSNotification>();
	const { usuario, estaCarregandoDados } = useAut();
	const { colors: cores } = useTheme();

	const tema = DefaultTheme;
	tema.colors.background = cores.gray[700];

	useEffect(() => {
		const desinscrever = OneSignal.Notifications.addEventListener(
			"foregroundWillDisplay",
			(evento) => {
				evento.preventDefault();
				const resposta = evento.getNotification();
				defNotificacao(resposta);
			}
		);

		return () => desinscrever;
	}, []);

	if (estaCarregandoDados) return <Carregamento />;

	return (
		<Box flex={1} bg="gray.700">
			<NavigationContainer theme={tema} linking={linking}>
				{usuario.id ? <AppRotas /> : <AutRotas />}
				{notificacao?.title && (
					<Notificacao dados={notificacao} aoFechar={() => defNotificacao(undefined)} />
				)}
			</NavigationContainer>
		</Box>
	);
}
