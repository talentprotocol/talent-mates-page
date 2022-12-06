import styled from "styled-components";
import { COLORS, fontNormal } from "shared-ui";

export const Container = styled.footer<{ positionFixed: boolean }>`
	padding: 24px 0;
	width: 100%;
	bottom: 0;
	border-top: 1px solid ${COLORS.GREY};
	${({ positionFixed }) => `position: ${positionFixed ? "fixed" : "relative"}`};

	@media (max-width: 768px) {
		position: relative;
	}
`;

export const InnerContainer = styled.div`
	max-width: 1160px;
	margin: auto;
	display: flex;
	gap: 24px;
	color: ${COLORS.NOT_SO_LIGHT_GREY};
	${fontNormal}
	font-weight: 400;
	font-size: 14px;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 4px;
		padding: 0 12px;
		font-size: 16px;
	}

	> section {
		flex-grow: 1;
		display: flex;
		justify-content: flex-end;
		gap: 24px;

		@media (max-width: 768px) {
			flex-direction: column;
			gap: 14px;
			padding-top: 16px;
			align-items: flex-start;

			@media (max-width: 768px) {
				color: ${COLORS.DARK_BLUE};
			}
		}

		> a {
			text-decoration: none;
			outline: none;
			color: ${COLORS.NOT_SO_LIGHT_GREY};
			font-size: 14px;

			@media (max-width: 768px) {
				color: ${COLORS.LIGHT_GREY};
			}

			:hover {
				color: ${COLORS.BLACK};
			}
		}

		> div {
			width: 1px;
			height: 16px;
			background: ${COLORS.LIGHTER_GREY};

			@media (max-width: 768px) {
				display: none;
			}
		}
	}

	> div {
		width: 1px;
		height: 16px;
		background: ${COLORS.LIGHTER_GREY};

		@media (max-width: 768px) {
			height: 0;
		}
	}
`;
