import styled from "styled-components";
import { COLORS, fontNormal } from "shared-ui";

export const Container = styled.footer`
	padding: 24px 0;
	width: 100%;
	bottom: 0;
	border-top: 1px solid ${COLORS.GREY};
`;

export const InnerContainer = styled.div`
	max-width: 1160px;
	margin: auto;
	display: flex;
	gap: 24px;
	color: ${COLORS.NOT_SO_LIGHT_GREY};
	${fontNormal}
	font-weight: 400;
	font-size: 14px;

	> div {
		width: 1px;
		height: 16px;
		background: ${COLORS.LIGHTER_GREY};
	}
`;
