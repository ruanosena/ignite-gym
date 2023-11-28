import { HStack, Heading, Text, VStack } from "native-base";

export default function HistoricoCartao() {
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
			<VStack mr={5}>
				<Heading color="white" fontSize="md" textTransform="capitalize">
					Costas
				</Heading>
				<Text color="gray.100" fontSize="lg" numberOfLines={1}>
					Puxada frontal
				</Text>
			</VStack>
			<Text color="gray.300" fontSize="md">08:56</Text>
		</HStack>
	);
}
