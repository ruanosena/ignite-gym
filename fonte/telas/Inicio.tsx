import Carregamento from "@comp/Carregamento";
import ExercicioCartao from "@comp/ExercicioCartao";
import Grupo from "@comp/Grupo";
import InicioCabecalho from "@comp/InicioCabecalho";
import { ExercicioDTO } from "@dtos/exercicioDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavegadorRotasProps } from "@rotas/app.rotas";
import { API } from "@servicos/api";
import { AppErro } from "@util/AppErro";
import { Center, HStack, Text, VStack, FlatList, Heading, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";

export default function Inicio() {
	const [estaCarregando, defEstaCarregando] = useState(true);
	const [exercicios, defExercicios] = useState<ExercicioDTO[]>([]);
	const [grupos, defGrupos] = useState<string[]>([]);
	const [grupoSelecionado, defGrupoSelecionado] = useState("antebraço");

	const navegacao = useNavigation<AppNavegadorRotasProps>();
	const torrada = useToast();

	function lidarAbrirDetalhesExercicio(id: string) {
		navegacao.navigate("exercicio", { id });
	}

	async function buscarGrupos() {
		try {
			const resposta = await API.get("/groups");
			defGrupos(resposta.data);
		} catch (erro) {
			let mensagem =
				erro instanceof AppErro ? erro.message : "Não foi possível carregar os grupos musculares";

			torrada.show({ title: mensagem, placement: "top", bgColor: "red.500" });
		}
	}

	async function buscarExerciciosPorGrupo() {
		try {
			defEstaCarregando(true);
			const resposta = await API.get(`/exercises/bygroup/${grupoSelecionado}`);
			defExercicios(resposta.data);
		} catch (erro) {
			let mensagem = erro instanceof AppErro ? erro.message : "Não foi possível carregar os exercícios";

			torrada.show({ title: mensagem, placement: "top", bgColor: "red.500" });
		} finally {
			defEstaCarregando(false);
		}
	}

	useEffect(() => {
		buscarGrupos();
	}, []);

	useFocusEffect(
		useCallback(() => {
			buscarExerciciosPorGrupo();
		}, [grupoSelecionado])
	);

	return (
		<VStack flex={1}>
			<InicioCabecalho />

			<FlatList
				data={grupos}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<Grupo
						estaAtivo={grupoSelecionado.toLowerCase() == item.toLowerCase()}
						onPress={() => defGrupoSelecionado(item)}
					>
						{item}
					</Grupo>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				_contentContainerStyle={{ px: 8 }}
				my={10}
				maxH={10}
				minH={10}
			/>

			{estaCarregando ? (
				<Carregamento />
			) : (
				<VStack px={8} flex={1}>
					<HStack justifyContent="space-between" mb={5}>
						<Heading fontFamily="heading" color="gray.200" fontSize="md">
							Exercícios
						</Heading>

						<Text color="gray.200" fontSize="sm">
							{exercicios.length}
						</Text>
					</HStack>

					<FlatList
						data={exercicios}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<ExercicioCartao dados={item} onPress={() => lidarAbrirDetalhesExercicio(item.id)} />
						)}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{ pb: 20 }}
					/>
				</VStack>
			)}
		</VStack>
	);
}
