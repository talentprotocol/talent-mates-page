import { Button, COLORS, fontNormal } from "shared-ui";
import styled from "styled-components";

export const Header = styled.div`
	width: 100%;
	display: flex;
	justify-content: start;
	align-items: center;
	flex-direction: row;
	padding-top: 40px;
`;

export const InnerHeaderContainer = styled.div`
	margin: auto;
	width: 1160px;
	display: flex;

	@media (max-width: 768px) {
		padding: 0 12px;
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const StyledHeaderButton = styled(Button)`
	padding: 8px 32px;
`;

export const SectionContainer = styled.section`
	max-width: 100%;
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

	@media (max-width: 768px) {
		margin: 18px 0;
	}
`;

export const PickerArea = styled.div`
	margin-bottom: 64px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 768px) {
		margin-bottom: 16px;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
`;

export const TraitPickerArea = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;

	@media (max-width: 768px) {
		display: none;
	}
`;

export const TraitPickerAreaMobile = styled.div`
	@media (min-width: 768px) {
		display: none;
	}
	
	@media (max-width: 768px) {
		margin-top: 24px;
		padding: 0 12px 12px;
		width: 100%;
		display: flex;
		gap: 24px;
		overflow: scroll;
	}
`;

export const DisplayArea = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 24px;
	padding-right: 24px;
	height: 100%;
	
	@media (max-width: 768px) {
		padding: 0;
		max-width: 100%;
	}

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
	gap: 16px;
`;

export const ImageHolder = styled.div`
	border: 1px solid ${COLORS.DARK_BLUE};
	border-radius: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: auto;
	position: relative;

	@media (max-width: 768px) {
		max-width: calc(100% - 24px);
		margin: auto;
	}
`;

export const ActionArea = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	
	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0 12px;
	}
`;
