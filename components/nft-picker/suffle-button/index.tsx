import { ReactEventHandler, useState } from "react";
import { Button } from "shared-ui";
import { RefreshIcon } from "../assets/refresh";
import { ButtonIcon } from "./styled";

export const ShuffleButton = ({ callback }: { callback: ReactEventHandler}) => {
	const [isHoveringShuffle, setIsHoveringShuffle] = useState(false);
    return (
        <Button
            text="Shuffle appearance"
            type="button"
            variant="octonary"
            fullWidth
            onClick={callback}
            onMouseEnter={() => setIsHoveringShuffle(true)}
            onMouseLeave={() => setIsHoveringShuffle(false)}
        >
            <ButtonIcon>
                <RefreshIcon isHovering={isHoveringShuffle}/>
            </ButtonIcon>
        </Button>
        );
    
}