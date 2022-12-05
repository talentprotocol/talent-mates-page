import { ReactEventHandler } from "react";

export interface Props {
	isOpen: boolean;
	onCloseModal: ReactEventHandler;
	modalState?: number;
	children?: JSX.Element | JSX.Element[];
	components?: JSX.Element[];
}
