import styled from "styled-components";
import { COLORS } from "shared-ui/colors";

export const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${COLORS.WHITE};
	z-index: 10;
`;
