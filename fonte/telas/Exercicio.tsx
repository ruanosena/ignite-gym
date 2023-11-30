import { Box, HStack, Heading, Icon, Image, Text, VStack, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavegadorRotasProps } from "@rotas/app.rotas";

import CorpoSvg from "@assets/body.svg";
import SerieSvg from "@assets/series.svg";
import RepeticoesSvg from "@assets/repetitions.svg";
import Botao from "@comp/Botao";

export default function Exercicio() {
	const navegacao = useNavigation<AppNavegadorRotasProps>();

	function lidarVoltar() {
		navegacao.goBack();
	}

	return (
		<VStack flex={1}>
			<VStack px={8} bg="gray.600" pt={12}>
				<TouchableOpacity onPress={lidarVoltar}>
					<Icon as={Feather} name="arrow-left" color="green.500" size={6} />
				</TouchableOpacity>
				<HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
					<Heading fontFamily="heading" color="gray.100" fontSize="lg" flexShrink={1}>
						Puxada frontal
					</Heading>
					<HStack alignItems="center">
						<CorpoSvg />
						<Text color="gray.200" ml={1} textTransform="capitalize">
							Costas
						</Text>
					</HStack>
				</HStack>
			</VStack>

			<ScrollView>
				<VStack p={8}>
					<Image
						w="full"
						h={80}
						source={{ uri: "https://i.ytimg.com/vi/JE3XUqMyHXo/sddefault.jpg" }}
						alt="Nome do exercício aqui"
						mb={3}
						resizeMode="cover"
						rounded="lg"
					/>

					<Box bg="gray.600" rounded="md" pb={4} px={4}>
						<HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
							<HStack>
								<SerieSvg />
								<Text color="gray.200" ml={2}>
									3 séries
								</Text>
							</HStack>
							<HStack>
								<RepeticoesSvg />
								<Text color="gray.200" ml={2}>
									12 repetições
								</Text>
							</HStack>
						</HStack>

						<Botao>Marcar como realizado</Botao>
					</Box>
				</VStack>
			</ScrollView>
		</VStack>
	);
}
