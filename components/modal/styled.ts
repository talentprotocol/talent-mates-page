import styled from "styled-components";
import { COLORS } from "shared-ui";

export const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background: ${COLORS.LIGHTER_BLACK}80;
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	--animate-duration: 400ms;
`;
