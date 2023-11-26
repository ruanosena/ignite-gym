import { IInputProps, Input } from "native-base";

export default function Entrada({ ...rest }: IInputProps) {
	return (
		<Input
			bg="gray.700"
			h={14}
			px={4}
			borderWidth={0}
			mb={4}
			fontSize="md"
			fontFamily="body"
			color="white"
			placeholderTextColor="gray.300"
			_focus={{
				bg: "gray.700",
				borderWidth: 1,
        borderColor: "green.500"
			}}
			{...rest}
		/>
	);
}
