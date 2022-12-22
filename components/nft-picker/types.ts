import { ReactEventHandler } from "react";

export interface Props {
	openModal: ReactEventHandler;
	openInstructionModal: Function;
	closeModal: Function;
	closeInstructionModal: Function;
	setImageSource: Function;
	openErrorModal: ReactEventHandler;
	openErrorContactsModal: ReactEventHandler;
	jumpToNextMintState: Function;
	skipNextMintState: Function;
}

export interface SpinnerAreaProps {
	width: number;
	height: number;
}
