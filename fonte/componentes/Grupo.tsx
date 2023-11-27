import { IPressableProps, Pressable, Text } from "native-base";
import { ReactNode } from "react";

type GrupoProps = IPressableProps & {
	children: ReactNode;
	estaAtivo: boolean;
};

export default function Grupo({ children, estaAtivo, ...rest }: GrupoProps) {
	return (
		<Pressable
			mr={3}
			w={24}
			h={10}
			bg="gray.600"
			rounded="md"
			justifyContent="center"
			alignItems="center"
			overflow="hidden"
			isPressed={estaAtivo}
			_pressed={{
				borderColor: "green.500",
				borderWidth: 1,
			}}
			{...rest}
		>
			<Text
				color={estaAtivo ? "green.500" : "gray.200"}
				textTransform="uppercase"
				fontSize="xs"
				fontWeight="bold"
			>
				{children}
			</Text>
		</Pressable>
	);
}
