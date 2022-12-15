import styled, { css } from "styled-components";
import { COLORS } from "shared-ui";
import { fontNormal } from "./fonts";
import { StyledTypographyProps } from "./types";

export const H1 = styled.h1<StyledTypographyProps>`
	${fontNormal}
	font-weight: 700;
	font-size: 48px;
	line-height: 120%;

	${({ color }) =>
		css`
			color: ${COLORS[color || "BLACK"]};
		`}

	@media (min-width: 768px) {
		font-weight: 700;
		font-size: 60px;
		line-height: 120%;
	}
`;

export const H2 = styled.h2<StyledTypographyProps>`
	${fontNormal}
	font-weight: 500;
	font-size: 48px;
	line-height: 120%;
	${({ color }) =>
		css`
			color: ${COLORS[color || "BLACK"]};
		`}
`;

export const H3 = styled.h3<StyledTypographyProps>`
	${fontNormal}
	font-weight: 500;
	font-size: 25px;
	line-height: 120%;
	${({ color }) =>
		css`
			color: ${COLORS[color || "BLACK"]};
		`}
`;

export const BODY1 = styled.p<StyledTypographyProps>`
	${fontNormal}
	font-weight: 500;
	font-size: 16px;
	line-height: 165%;
	${({ color }) =>
		css`
			color: ${COLORS[color || "BLACK"]};
		`}
`;

export const BODY2 = styled.p<StyledTypographyProps>`
	${fontNormal}
	font-weight: 700;
	font-size: 12px;
	${({ color }) =>
		css`
			color: ${COLORS[color || "BLACK"]};
		`}
`;

export const BODY3 = styled.p<StyledTypographyProps>`
	${fontNormal}
	font-size: 14px;
	line-height: 140%;
	${({ color }) =>
		css`
			color: ${COLORS[color || "BLACK"]};
		`}
`;

export const GENERAL = styled.span<StyledTypographyProps>`
	${fontNormal}
	font-weight: 400;
	font-size: 19px;
	line-height: 140%;
	${({ color }) =>
		css`
			color: ${COLORS[color || "BLACK"]};
		`}
`;
