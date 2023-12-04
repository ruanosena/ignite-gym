import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ExercicioDTO } from "@dtos/exercicioDTO";
import { API } from "@servicos/api";

type ExercicioCartaoProps = TouchableOpacityProps & {
	dados: ExercicioDTO;
};

export default function ExercicioCartao({ dados, ...rest }: ExercicioCartaoProps) {
	return (
		<TouchableOpacity {...rest}>
			<HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
				<Image
					source={{ uri: `${API.defaults.baseURL}/exercise/thumb/${dados.thumb}` }}
					alt="Imagem do exercício"
					w={16}
					h={16}
					rounded="md"
					mr={4}
					resizeMode="cover"
				/>
				<VStack flex={1}>
					<Heading fontSize="lg" color="white" fontFamily="heading">
						{dados.name}
					</Heading>
					<Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
						{dados.series} séries x {dados.repetitions} repetições
					</Text>
				</VStack>

				<Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
			</HStack>
		</TouchableOpacity>
	);
}
