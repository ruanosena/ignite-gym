import { Box, HStack, Heading, Icon, Image, Text, VStack, ScrollView, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavegadorRotasProps } from "@rotas/app.rotas";

import CorpoSvg from "@assets/body.svg";
import SerieSvg from "@assets/series.svg";
import RepeticoesSvg from "@assets/repetitions.svg";
import Botao from "@comp/Botao";
import { AppErro } from "@util/AppErro";
import { API } from "@servicos/api";
import { useEffect, useState } from "react";
import { ExercicioDTO } from "@dtos/exercicioDTO";
import Carregamento from "@comp/Carregamento";

type RotaParamsProps = {
	id: string;
};

export default function Exercicio() {
	const [estaCarregando, defEstaCarregando] = useState(true);
	const [exercicio, defExercicio] = useState<ExercicioDTO>({} as ExercicioDTO);
	const navegacao = useNavigation<AppNavegadorRotasProps>();
	const rota = useRoute();
	const torrada = useToast();

	const { id } = rota.params as RotaParamsProps;

	function lidarVoltar() {
		navegacao.goBack();
	}

	async function buscarDetalhesExercicio() {
		try {
			defEstaCarregando(true);
			const resposta = await API.get(`/exercises/${id}`);
			defExercicio(resposta.data);
		} catch (erro) {
			let mensagem =
				erro instanceof AppErro ? erro.message : "Não foi possível carregar os detalhes do exercício";

			torrada.show({ title: mensagem, placement: "top", bgColor: "red.500" });
		} finally {
			defEstaCarregando(false);
		}
	}

	useEffect(() => {
		buscarDetalhesExercicio();
	}, [id]);

	return (
		<VStack flex={1}>
			<VStack px={8} bg="gray.600" pt={12}>
				<TouchableOpacity onPress={lidarVoltar}>
					<Icon as={Feather} name="arrow-left" color="green.500" size={6} />
				</TouchableOpacity>
				<HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
					<Heading fontFamily="heading" color="gray.100" fontSize="lg" flexShrink={1}>
						{exercicio.name}
					</Heading>
					<HStack alignItems="center">
						<CorpoSvg />
						<Text color="gray.200" ml={1} textTransform="capitalize">
							{exercicio.group}
						</Text>
					</HStack>
				</HStack>
			</VStack>

			{estaCarregando ? (
				<Carregamento />
			) : (
				<ScrollView>
					<VStack p={8}>
						<Box rounded="lg" mb={3} overflow="hidden">
							<Image
								w="full"
								h={80}
								source={{ uri: `${API.defaults.baseURL}/exercise/demo/${exercicio.demo}` }}
								alt="Nome do exercício aqui"
								resizeMode="cover"
							/>
						</Box>

						<Box bg="gray.600" rounded="md" pb={4} px={4}>
							<HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
								<HStack>
									<SerieSvg />
									<Text color="gray.200" ml={2}>
										{exercicio.series} séries
									</Text>
								</HStack>
								<HStack>
									<RepeticoesSvg />
									<Text color="gray.200" ml={2}>
										{exercicio.repetitions} repetições
									</Text>
								</HStack>
							</HStack>

							<Botao>Marcar como realizado</Botao>
						</Box>
					</VStack>
				</ScrollView>
			)}
		</VStack>
	);
}
