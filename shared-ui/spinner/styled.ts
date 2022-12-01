import styled, { css } from "styled-components";
import { COLORS } from "shared-ui/colors";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
	${({ noBox }) => !noBox && css`
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: ${COLORS.WHITE};
		z-index: 10;
	`}
`;
