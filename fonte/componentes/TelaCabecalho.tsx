import { Center, Heading } from "native-base";
import { ReactNode } from "react";

type TelaCabecalhoProps = {
	children: ReactNode;
};

export default function TelaCabecalho({ children }: TelaCabecalhoProps) {
	return (
		<Center bg="gray.600" pb={6} pt={16}>
			<Heading color="gray.100" fontSize="xl" fontFamily="heading">{children}</Heading>
		</Center>
	);
}
