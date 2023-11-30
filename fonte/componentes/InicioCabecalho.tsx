import { HStack, Heading, VStack, Text, Icon } from "native-base";
import UsuarioFoto from "./UsuarioFoto";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function InicioCabecalho() {
	return (
		<HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
			<UsuarioFoto
				tamanho={16}
				source={{ uri: "https://github.com/ruanosena.png" }}
				alt="Imagem do usuário"
				mr={4}
			/>
			<VStack flex={1}>
				<Text color="gray.100" fontSize="md">
					Olá,
				</Text>
				<Heading color="gray.100" fontSize="md" fontFamily="heading">
					Ruan
				</Heading>
			</VStack>

			<TouchableOpacity>
				<Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
			</TouchableOpacity>
		</HStack>
	);
}
