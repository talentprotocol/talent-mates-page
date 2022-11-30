import { ReactEventHandler } from "react";

export interface Props {
	openModal: ReactEventHandler;
	setImageSource: Function;
	openErrorModal: ReactEventHandler;
}

export interface SpinnerAreaProps {
	width: number;
	height: number;
}
