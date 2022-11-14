import { ReactEventHandler } from "react";

export enum ButtonTypeEnum {
	DEFAULT = "default",
	LINK = "link",
	BUTTON = "button",
}

export type ButtonType = "default" | "link" | "button";

export enum VariantTypeEnum {
	PRIMARY = "primary",
	SECONDARY = "secondary",
	TERTIARY = "tertiary",
	QUATERNARY = "quaternary",
	PENTANARY = "pentanary",
	HEXANARY = "hexanary",
	SEPTENARY = "septenary",
	OCTONARY = "octonary",
}

export type VariantType =
	| "primary"
	| "secondary"
	| "tertiary"
	| "quaternary"
	| "pentanary"
	| "hexanary"
	| "septenary"
	| "octonary";

export interface Props {
	text?: string;
	type: ButtonType;
	variant: VariantType;
	href?: string;
	children?: JSX.Element;
	onClick?: ReactEventHandler;
	onMouseEnter?: ReactEventHandler;
	onMouseLeave?: ReactEventHandler;
	fullWidth?: boolean;
	className?: string;
	target?: string;
}

export interface StyledButtonProps {
	variant: VariantType;
	fullWidth?: boolean;
}
