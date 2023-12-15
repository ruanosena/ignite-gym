import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { OSNotification } from "react-native-onesignal";
import * as Linking from "expo-linking";

type Props = {
	dados: OSNotification;
	aoFechar: () => void;
};

export function Notificacao({ dados, aoFechar }: Props) {
	function lidarPressionar() {
		if (dados.launchURL) {
			Linking.openURL(dados.launchURL);
		}
		aoFechar();
	}

	return (
		<Pressable
			w="full"
			p={4}
			pt={12}
			bgColor="gray.400"
			position="absolute"
			top={0}
			onPress={lidarPressionar}
		>
			<HStack justifyContent="space-between" alignItems="center">
				<Icon as={Ionicons} name="notifications-outline" size={6} color="black" mr={2} />

				<Text fontSize="md" color="white" flex={1}>
					{dados.title}
				</Text>

				<IconButton
					variant="unstyled"
					_focus={{ borderWidth: 0 }}
					icon={<CloseIcon size="3" />}
					_icon={{ color: "coolGray.600" }}
					color="white"
					onPress={aoFechar}
				/>
			</HStack>
		</Pressable>
	);
}
