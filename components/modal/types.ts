import { ReactEventHandler } from "react";

export interface Props {
	isOpen: boolean;
	onCloseModal: ReactEventHandler;
	children: JSX.Element | JSX.Element[];
}
