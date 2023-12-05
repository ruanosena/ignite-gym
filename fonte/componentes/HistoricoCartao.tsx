import { HistoricoDTO } from "@dtos/historicoDTO";
import { HStack, Heading, Text, VStack } from "native-base";

type Props = {
	dados: HistoricoDTO;
};

export default function HistoricoCartao({ dados }: Props) {
	return (
		<HStack
			w="full"
			alignItems="center"
			justifyContent="space-between"
			px={5}
			py={4}
			mb={3}
			bg="gray.600"
			rounded="md"
		>
			<VStack mr={5} flex={1}>
				<Heading
					color="white"
					fontSize="md"
					fontFamily="heading"
					textTransform="capitalize"
					numberOfLines={1}
				>
					{dados.group}
				</Heading>
				<Text color="gray.100" fontSize="lg" numberOfLines={1}>
					{dados.name}
				</Text>
			</VStack>
			<Text color="gray.300" fontSize="md">
				{dados.hour}
			</Text>
		</HStack>
	);
}
