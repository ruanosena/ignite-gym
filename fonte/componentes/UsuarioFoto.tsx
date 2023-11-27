import { IImageProps, Image } from "native-base";

type UsuarioFotoProps = IImageProps & {
	tamanho: number;
};

export default function UsuarioFoto({ tamanho, ...rest }: UsuarioFotoProps) {
	return <Image w={tamanho} h={tamanho} rounded="full" borderWidth={2} borderColor="gray.400" {...rest} />;
}
