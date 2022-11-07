import { COLORS, fontNormal } from "shared-ui";
import styled from "styled-components";

export const Header = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	flex-direction: row;
	margin-top: 40px;
	margin-left: 40px;
	margin-right: 40px;
`;

export const ButtonIcon = styled.span`
	${fontNormal}
	margin-right: 16px;
	font-weight: 700;
	font-size: 16px;
	line-height: 24px;
`;

export const TitleArea = styled.div`
	margin-left: 32px;
`;

export const PickerArea = styled.div`
	margin-left: 40px;
	margin-right: 40px;
	margin-top: 64px;
	margin-bottom: 64px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const TraitPickerArea = styled.div`
	display: flex;
	flex-direction: column;
`;

export const TraitArea = styled.div`
	border: 1px solid ${COLORS.GREY};
	border-radius: 24px;
	padding: 24px;
	margin-bottom: 24px;
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

export const DisplayArea = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 24px;
	padding-right: 24px;
	height: 100%;

	img {
		width: 100%;
		height: 100%;
	}
`;

export const GenderPicker = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-bottom: 24px;
	padding: 4px;
	border: 1px solid ${COLORS.GREY};
	border-radius: 24px;
`;

export const ImageHolder = styled.div`
	border: 1px solid ${COLORS.DARK_BLUE};
	border-radius: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
