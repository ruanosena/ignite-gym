import { StatusBar } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";
import Carregamento from "@comp/Carregamento";
import { TEMA } from "./fonte/tema";
import Rotas from "@rotas/index";
import AutContextoProvider, { AutContexto } from "@contextos/AutContexto";

export default function App() {
	const [fonteJaCarregada] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	return (
		<NativeBaseProvider theme={TEMA}>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
			<AutContextoProvider>{fonteJaCarregada ? <Rotas /> : <Carregamento />}</AutContextoProvider>
		</NativeBaseProvider>
	);
}
