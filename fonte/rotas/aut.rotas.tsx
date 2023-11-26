import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Cadastrar from "@tela/Cadastrar";
import Entrar from "@tela/Entrar";

type AutRotas = {
	entrar: undefined;
	cadastrar: undefined;
};

export type AutNavegadorRotasProps = NativeStackNavigationProp<AutRotas>;

const { Navigator: Navegador, Screen: Tela } = createNativeStackNavigator<AutRotas>();

export default function AutRotas() {
	return (
		<Navegador screenOptions={{ headerShown: false }}>
			<Tela name="entrar" component={Entrar} />
			<Tela name="cadastrar" component={Cadastrar} />
		</Navegador>
	);
}
