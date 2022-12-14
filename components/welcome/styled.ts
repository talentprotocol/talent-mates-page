import styled from "styled-components";
import { Button } from "shared-ui";

export const Container = styled.section`
	display: flex;
	flex-direction: column;
`;

export const CalloutArea = styled.div`
	display: flex;
	gap: 72px;
	align-items: center;

	@media (max-width: 768px) {
		max-width: 100%;
		flex-direction: column-reverse;
		justify-content: center;
		padding: 24px 0;
		gap: 8px;
	}
`;

export const ContentArea = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 568px;
	min-width: 532px;
	padding: 0px 24px;
	gap: 32px;

	@media (max-width: 768px) {
		min-width: 0;
		flex-basis: 100%;
		padding: 24px;
		gap: 24px;
	}
`;

export const ActionArea = styled.div`
	display: flex;
	gap: 22px;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const ImageArea = styled.div`
	display: flex;
	gap: 48px;

	@media (max-width: 768px) {
		flex-direction: column;

		> * {
			:nth-child(2) {
				display: none;
			}
		}
	}
`;

export const SocialArea = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	gap: 40px;
	padding: 0px 24px;

	@media (max-width: 768px) {
		display: flex;
		justify-content: center;
		gap: 0px !important;
		margin-bottom: 24px;
		padding: 0px;
	}
`;

export const StyledButton = styled(Button)`
	padding: 8px 8px;
`;