import { Container, InnerContainer } from "./styled";

export const Footer = ({ fixed = false }) => (
	<Container style={{ position: fixed ? "fixed" : "relative" }}>
		<InnerContainer>
			Talent Protocol MTU © 2022
			<div />
			contact@talentprotocol.com
		</InnerContainer>
	</Container>
);
