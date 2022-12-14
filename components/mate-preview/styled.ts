import { COLORS, fontNormal } from "shared-ui";
import styled from "styled-components";

export const Container = styled.section`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ErrorMessage = styled.h1`
    ${fontNormal}
`;

export const Preview = styled.div`
    border: 1px solid ${COLORS.DARK_BLUE};
    border-radius: 24px;
    overflow: hidden;
    width: 468px;
    height: 456px;
    
    * {
        width: 100%;
        height: 100%;
    }
`;