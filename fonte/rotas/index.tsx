import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import AutRotas from "./aut.rotas";
import AppRotas from "./app.rotas";
import useAut from "@hooks/useAut";
import Carregamento from "@comp/Carregamento";

export default function Rotas() {
	const { usuario, estaCarregandoDados } = useAut();
	const { colors: cores } = useTheme();

	const tema = DefaultTheme;
	tema.colors.background = cores.gray[700];

	if (estaCarregandoDados) return <Carregamento />;

	return (
		<Box flex={1} bg="gray.700">
			<NavigationContainer theme={tema}>{usuario.id ? <AppRotas /> : <AutRotas />}</NavigationContainer>
		</Box>
	);
}
