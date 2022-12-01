import styled from "styled-components";
import { COLORS, fontNormal } from "shared-ui";

export const Container = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	background: ${COLORS.LIGHTER_BLACK}80;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	--animate-duration: 400ms;
`;

export const InnerContainer = styled.section`
	position: relative;
	min-width: 500px;
	max-width: 760px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 44px 40px 40px;
	gap: 32px;
	background: ${COLORS.WHITE};
	box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);
	border-radius: 24px;
	text-align: center;
`;

export const XArea = styled.div`
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
`;

export const Footer = styled.p`
	${fontNormal}
	color: ${COLORS.DARK_BLUE};
	font-weight: 300;

	a {
		font-weight: 500;
		color: ${COLORS.LIGHTER_PURPLE};
		text-decoration: none;
	}
`;
