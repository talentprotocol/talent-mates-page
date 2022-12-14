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

export const TraitTitle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: row;
	justify-content: space-between;
	width: 100%;
`;

export const TraitTooltipWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 8px;
	position: relative;

	*:nth-child(2) {
		cursor: pointer;
	}

	*:nth-child(2):hover {
		cursor: pointer;
		*:nth-child(2) {
			display: flex;
		}
	}
`;

export const TraitTooltip = styled.div`
	display: none;
	${fontNormal}
	width: 210px;
	position: absolute;
	left: calc(100% + 8px);
	top: -30%;
	border-radius: 6px;
	padding: 12px;
	border: 1px solid ${COLORS.GREY};
	background: ${COLORS.WHITE};
	z-index: 20;
	transition-duration: 0.5s;
`;

export const CommunityLevel = styled.div`
	padding: 2px 8px;
	background-color: ${COLORS.LIGHT_PURPLE};
	border-radius: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
