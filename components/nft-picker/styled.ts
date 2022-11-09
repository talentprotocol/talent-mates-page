import { Button, COLORS, fontNormal } from "shared-ui";
import styled from "styled-components";

export const Header = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	flex-direction: row;
	margin-top: 40px;
`;

export const StyledButton = styled(Button)`
	padding: 8px 32px !important;
`;

export const ButtonIcon = styled.span`
	${fontNormal}
	display: flex;
	align-items: center;
	margin-right: 16px;
	font-weight: 700;
	font-size: 16px;
	line-height: 24px;
`;

export const TitleArea = styled.div`
	margin-left: 32px;
`;

export const PickerArea = styled.div`
	margin-top: 64px;
	margin-bottom: 64px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const TraitPickerArea = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
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

export const ActionArea = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
`;
