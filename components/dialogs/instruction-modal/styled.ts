import styled from "styled-components";
import { Button, COLORS } from "shared-ui";

export const Container = styled.section`
	position: relative;
	min-width: 500px;
	max-width: 800px;
	max-height: 80%;
	display: flex;
	flex-direction: column;
	padding: 44px 40px 40px;
	gap: 32px;
	background: ${COLORS.WHITE};
	box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);
	border-radius: 24px;
	text-align: center;
	overflow-y: scroll;

	img {
		object-fit: cover;
		border-radius: 16px;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 18px;
		overflow: scroll;
	}

	@media (max-width: 768px) {
		min-width: 100%;
		max-width: 100%;
		max-height: 84%;
		padding: 24px;

		span {
			font-size: 16px;
		}
	}
`;

export const XArea = styled.div`
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
`;

export const ImageList = styled.span`
	width: 100%;
	max-width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
`;