import Carregamento from "@comp/Carregamento";
import HistoricoCartao from "@comp/HistoricoCartao";
import TelaCabecalho from "@comp/TelaCabecalho";
import { HistoricoPorDiaDTO } from "@dtos/historicoPorDia";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "@servicos/api";
import { AppErro } from "@util/AppErro";
import { Center, Heading, SectionList, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";

export default function Historico() {
	const [estaCarregando, defEstaCarregando] = useState(true);
	const [exercicios, defExercicios] = useState<HistoricoPorDiaDTO[]>([]);
	const torrada = useToast();

	async function buscarHistorico() {
		try {
			defEstaCarregando(true);
			const resposta = await API.get("/history");

			defExercicios(resposta.data);
		} catch (erro) {
			let mensagem = erro instanceof AppErro ? erro.message : "Não foi possível carregar o histórico";

			torrada.show({ title: mensagem, placement: "top", bgColor: "red.500" });
		} finally {
			defEstaCarregando(false);
		}
	}

	useFocusEffect(
		useCallback(() => {
			buscarHistorico();
		}, [])
	);

	return (
		<VStack flex={1}>
			<TelaCabecalho>Histórico de exercícios</TelaCabecalho>

			{estaCarregando ? (
				<Carregamento />
			) : (
				<SectionList
					sections={exercicios}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <HistoricoCartao dados={item} />}
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
			)}
		</VStack>
	);
}
