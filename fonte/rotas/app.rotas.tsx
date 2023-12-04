import { Platform } from "react-native";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import Exercicio from "@tela/Exercicio";
import Historico from "@tela/Historico";
import Inicio from "@tela/Inicio";
import Perfil from "@tela/Perfil";

import InicioSvg from "@assets/home.svg";
import HistoricoSvg from "@assets/history.svg";
import PerfilSvg from "@assets/profile.svg";
import { useTheme } from "native-base";

type AppRotas = {
	inicio: undefined;
	historico: undefined;
	perfil: undefined;
	exercicio: { id: string };
};

export type AppNavegadorRotasProps = BottomTabNavigationProp<AppRotas>;

const { Navigator: Navegador, Screen: Tela } = createBottomTabNavigator<AppRotas>();

export default function AppRotas() {
	const { sizes, colors } = useTheme();
	const tamanhoIcone = sizes[6];

	return (
		<Navegador
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.green[500],
				tabBarInactiveTintColor: colors.gray[200],
				tabBarStyle: {
					backgroundColor: colors.gray[600],
					borderTopWidth: 0,
					height: Platform.OS == "android" ? "auto" : 96,
					paddingBottom: sizes[10],
					paddingTop: sizes[6],
				},
			}}
		>
			<Tela
				name="inicio"
				component={Inicio}
				options={{
					tabBarIcon: ({ color }) => <InicioSvg fill={color} width={tamanhoIcone} height={tamanhoIcone} />,
				}}
			/>
			<Tela
				name="historico"
				component={Historico}
				options={{
					tabBarIcon: ({ color }) => <HistoricoSvg fill={color} width={tamanhoIcone} height={tamanhoIcone} />,
				}}
			/>
			<Tela
				name="perfil"
				component={Perfil}
				options={{
					tabBarIcon: ({ color }) => <PerfilSvg fill={color} width={tamanhoIcone} height={tamanhoIcone} />,
				}}
			/>
			<Tela name="exercicio" component={Exercicio} options={{ tabBarButton: () => null }} />
		</Navegador>
	);
}
