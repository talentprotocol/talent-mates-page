import { COLORS, fontNormal } from "shared-ui";
import styled from "styled-components";

export const TraitArea = styled.div`
	border: 1px solid ${COLORS.GREY};
	border-radius: 24px;
	padding: 24px;
`;

export const TraitSwitchArea = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	margin-top: 24px;
	gap: 8px;
`;

export const TraitSwitchButton = styled.span`
	${fontNormal}
	font-weight: 400;
	font-size: 20px;
	line-height: 20px;
`;

export const TraitSwitchInfo = styled.span`
	width: 128px;
	padding-top: 8px;
	padding-bottom: 8px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-radius: 32px;
	background-color: ${COLORS.LIGHTER_GREY};
`;
