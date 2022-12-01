import { ReactEventHandler } from "react";

export interface Props {
	openModal: ReactEventHandler;
	closeModal: Function;
	setImageSource: Function;
	openErrorModal: ReactEventHandler;
	jumpToNextMintState: Function;
}

export interface SpinnerAreaProps {
	width: number;
	height: number;
}
