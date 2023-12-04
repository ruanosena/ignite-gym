import { HStack, Heading, VStack, Text, Icon } from "native-base";
import UsuarioFoto from "./UsuarioFoto";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import useAut from "@hooks/useAut";

import fotoPadraoUsuario from "@assets/userPhotoDefault.png";

export default function InicioCabecalho() {
	const { usuario, sair } = useAut();

	return (
		<HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
			<UsuarioFoto
				tamanho={16}
				source={usuario.avatar ? { uri: usuario.avatar } : fotoPadraoUsuario}
				alt="Imagem do usuário"
				mr={4}
			/>
			<VStack flex={1}>
				<Text color="gray.100" fontSize="md">
					Olá,
				</Text>
				<Heading color="gray.100" fontSize="md" fontFamily="heading">
					{usuario.name}
				</Heading>
			</VStack>

			<TouchableOpacity onPress={sair}>
				<Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
			</TouchableOpacity>
		</HStack>
	);
}
