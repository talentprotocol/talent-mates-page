import { BodyContainer, FullHeightBody } from "./styled";

interface Props {
	children: JSX.Element | JSX.Element[];
	className?: string;
	fullHeight?: boolean;
}

export const Body = (props: Props) => props.fullHeight ?
	(<FullHeightBody>{props.children}</FullHeightBody>) : 
	(<BodyContainer>{props.children}</BodyContainer>);
