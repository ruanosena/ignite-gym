import { FormControl, IInputProps, Input } from "native-base";

type EntradaProps = IInputProps & {
	erroMensagem?: string | null;
};

export default function Entrada({ erroMensagem = null, isInvalid, ...rest }: EntradaProps) {
	const invalido = !!erroMensagem || isInvalid;

	return (
		<FormControl isInvalid={invalido} mb={4}>
			<Input
				bg="gray.700"
				h={14}
				px={4}
				borderWidth={0}
				fontSize="md"
				fontFamily="body"
				color="white"
				placeholderTextColor="gray.300"
				isInvalid={invalido}
				_invalid={{ borderWidth: 1, borderColor: "red.500" }}
				_focus={{
					bg: "gray.700",
					borderWidth: 1,
					borderColor: "green.500",
				}}
				{...rest}
			/>
			<FormControl.ErrorMessage _text={{color: "red.500"}}>{erroMensagem}</FormControl.ErrorMessage>
		</FormControl>
	);
}
