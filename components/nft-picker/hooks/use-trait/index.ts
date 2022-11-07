import { useCallback, useState } from "react"
import { Props } from "./types"

const BASE_URL = "https://d6cu1tnva62p2.cloudfront.net";

export const useTrait = ({ name, gender, maxElements, description }: Props) => {
    const [currentSelection, setCurrentSelection] = useState(1);
    const [fileName, setFileName] = useState("01.png");
    const updateCurrentSelection = useCallback((amount: number) => {
        const computedAmount = currentSelection + amount;
        if (computedAmount) {
            if (computedAmount > maxElements[gender]) {
                setFileName("01.png");
                setCurrentSelection(1);
            } else {
                setFileName(maxElements[gender] < 10 ? `0${computedAmount}.png` : `${computedAmount}.png`);
                setCurrentSelection(computedAmount);
            }
        } else {
            setFileName(maxElements[gender] < 10 ? `0${computedAmount}.png` : `${computedAmount}.png`);
            setCurrentSelection(maxElements[gender]);
        }
    }, [currentSelection]);
    return {
        image: `${BASE_URL}/${name}/${gender}/${fileName}`,
        updateCurrentSelection,
        name,
        gender,
        description,
        maxElements,
        currentSelection
    }
}



