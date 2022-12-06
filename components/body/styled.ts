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
		overflow-x: hidden;
	}
`;

export const FullHeightBody = styled.main`
	min-height: 100vh;
	max-width: 1160px;
	margin-right: auto;
	margin-left: auto;
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		overflow-x: hidden;
	}
`;
