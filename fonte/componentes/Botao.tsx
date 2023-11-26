import { Button, IButtonProps, Text } from "native-base";
import { ReactNode } from "react";

type BotaoProps = IButtonProps & {
	children: ReactNode;
	variant?: "solid" | "outline";
};

export default function Botao({ children, variant = "solid", ...rest }: BotaoProps) {
	return (
		<Button
			w="full"
			h={14}
			bg={variant == "outline" ? "transparent" : "green.700"}
			borderWidth={variant == "outline" ? 1 : 0}
			borderColor="green.500"
			rounded="sm"
			_pressed={{
				bg: variant == "outline" ? "gray.500" : "green.500",
			}}
			{...rest}
		>
			<Text color={variant == "outline" ? "green.500" : "white"} fontFamily="heading" fontSize="sm">
				{children}
			</Text>
		</Button>
	);
}
