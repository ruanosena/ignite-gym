import HistoricoCartao from "@comp/HistoricoCartao";
import TelaCabecalho from "@comp/TelaCabecalho";
import { Center, Heading, SectionList, Text, VStack } from "native-base";
import { useState } from "react";

export default function Historico() {
	const [exercicios, defExercicios] = useState([
		{
			title: "26.08.2022",
			data: ["Puxada frontal", "Remada unilateral"],
		},
		{
			title: "27.08.2022",
			data: ["Puxada frontal"],
		},
	]);

	return (
		<VStack flex={1}>
			<TelaCabecalho>Histórico de exercícios</TelaCabecalho>

			<SectionList
				sections={exercicios}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <HistoricoCartao />}
				renderSectionHeader={({ section }) => (
					<Heading fontFamily="heading" color="gray.100" fontSize="md" mt={10} mb={3}>
						{section.title}
					</Heading>
				)}
				px={8}
				contentContainerStyle={!exercicios.length && { flex: 1, justifyContent: "center" }}
				ListEmptyComponent={() => (
					<Text color="gray.100" textAlign="center">
						Não há exercícios registrados ainda.{"\n"}
						Pratique um exercício hoje mesmo!
					</Text>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</VStack>
	);
}
