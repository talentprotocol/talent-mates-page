import { COLORS, fontNormal, Button } from "shared-ui";
import styled from "styled-components";

export const Container = styled.section`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const ErrorMessage = styled.h1`
	${fontNormal}
`;

export const ErrorContainer = styled.div`
	@media (max-width: 768px) {
		margin-bottom: 64px;
		display: flex;
		justify-content: center;
	}
`;

export const Preview = styled.div`
	border: 1px solid ${COLORS.DARK_BLUE};
	border-radius: 24px;
	overflow: hidden;
	width: 468px;
	height: auto;
	display: flex;

	@media (max-width: 768px) {
		width: 300px;
		height: auto;
		margin-top: 24px;
	}

	* {
		width: 100%;
		height: 100%;
		display: flex;
	}
`;

export const TextArea = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	margin-left: 124px;
	margin-right: 24px;

	@media (max-width: 768px) {
		margin-left: 24px;
		margin-top: 40px;
	}
`;

export const DescriptionArea = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 24px;
	margin-top: 40px;

	@media (max-width: 768px) {
		margin-top: 24px;
		margin-bottom: 24px;
	}
`;

export const ButtonArea = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 24px;
	margin-top: 40px;

	@media (max-width: 768px) {
		flex-direction: column;
		justify-content: center;
		margin-bottom: 40px;
	}
`;

export const Description = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const StyledButton = styled(Button)`
	padding: 8px 32px;

	@media (max-width: 768px) {
		padding: 10px 48px;
	}
`;

export const LimitedText = styled.div`
	max-width: 568px;
	margin-top: 16px;
`;

export const TraitArea = styled.section`
	max-width: 568px;
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	margin-top: 12px;

`;

export const TraitBox = styled.div`
	${fontNormal}
	flex-basis: 40%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	gap: 4px;
    background-color: ${COLORS.WHITE};
    border-radius: 6px;
    border: 1px solid ${COLORS.LIGHT_PURPLE};
    padding: 10px;
    text-align: center;

	@media (max-width: 768px) {
		width: 100%;
	}

	span:nth-child(1) {
		white-space: nowrap;
		color: ${COLORS.LIGHT_PURPLE};
		font-size: 12px;
		font-weight: 500;
		text-transform: uppercase;
	}

	span:nth-child(2) {
		color: rgb(53, 56, 64);
		font-size: 15px;
		font-weight: 500;
		line-height: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

`;