import ExercicioCartao from "@comp/ExercicioCartao";
import Grupo from "@comp/Grupo";
import InicioCabecalho from "@comp/InicioCabecalho";
import { useNavigation } from "@react-navigation/native";
import { AppNavegadorRotasProps } from "@rotas/app.rotas";
import { Center, HStack, Text, VStack, FlatList, Heading } from "native-base";
import { useState } from "react";

export default function Inicio() {
	const [exercicios, defExercicios] = useState([
		"Puxada frontal",
		"Remada curvada",
		"Remada unilateral",
		"Levantamento terras",
	]);
	const [grupos, defGrupos] = useState(["Costas", "Biceps", "Triceps", "Ombro"]);
	const [grupoSelecionado, defGrupoSelecionado] = useState("Costas");

	const navegacao = useNavigation<AppNavegadorRotasProps>();

	function lidarAbrirDetalhesExercicio() {
		navegacao.navigate("exercicio");
	}

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

			<VStack px={8} flex={1}>
				<HStack justifyContent="space-between" mb={5}>
					<Heading color="gray.200" fontSize="md">
						Exercícios
					</Heading>

					<Text color="gray.200" fontSize="sm">
						{exercicios.length}
					</Text>
				</HStack>

				<FlatList
					data={exercicios}
					keyExtractor={(item) => item}
					renderItem={({ item }) => <ExercicioCartao onPress={lidarAbrirDetalhesExercicio} />}
					showsVerticalScrollIndicator={false}
					_contentContainerStyle={{ pb: 20 }}
				/>
			</VStack>
		</VStack>
	);
}
