import styled from "styled-components";
import { Button, COLORS } from "shared-ui";

export const Container = styled.section`
	position: relative;
	min-width: 500px;
	max-width: 720px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 44px 40px 40px;
	gap: 18px;
	background: ${COLORS.WHITE};
	box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04);
	border-radius: 24px;
	text-align: center;
`;

export const XArea = styled.div`
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
`;

export const ActionArea = styled.div`
	display: flex;
`;

export const StyledButton = styled(Button)`
	padding: 8px 32px;
`;
