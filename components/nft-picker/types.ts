import { ReactEventHandler } from "react";

export interface Props {
	openModal: ReactEventHandler;
	setImageSource: Function;
}

export interface SpinnerAreaProps {
	width: number;
	height: number;
}
