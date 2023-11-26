import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AutRotas from "./aut.rotas";
import { Box, useTheme } from "native-base";

export default function Rotas() {
	const { colors: cores } = useTheme();

	const tema = DefaultTheme;
	tema.colors.background = cores.gray[700];

	return (
		<Box flex={1} bg="gray.700">
			<NavigationContainer theme={tema}>
				<AutRotas />
			</NavigationContainer>
		</Box>
	);
}