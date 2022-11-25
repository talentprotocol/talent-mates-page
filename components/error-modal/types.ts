import { ReactEventHandler } from "react";

export interface Props {
	isOpen: boolean;
	onCloseModal: ReactEventHandler;
	errorText: string;
}
