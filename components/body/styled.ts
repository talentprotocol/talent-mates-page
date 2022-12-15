import styled from "styled-components";

export const BodyContainer = styled.main`
	margin-top: 64px;
	margin-bottom: 64px;
	max-width: 1160px;
	margin-right: auto;
	margin-left: auto;
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		margin-top: 32px;
		margin-bottom: 32px;
		overflow-x: hidden;
	}
`;

export const FullHeightBody = styled.main`
	min-height: 100vh;
	overflow-x: hidden;
	padding-left: 24px;
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		padding-left: 0px;
	}
`;
