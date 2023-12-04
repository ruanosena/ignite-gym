import { AutContexto } from "@contextos/AutContexto";
import { useContext } from "react";

export default function useAut() {
	const ctx = useContext(AutContexto);

	return ctx;
}
