import { useCallback, useMemo, useState } from "react";
import { Props } from "./types";

const BASE_URL = "https://d6cu1tnva62p2.cloudfront.net";

export const useTrait = ({ name, gender, maxElements, description }: Props) => {
	const [currentSelection, setCurrentSelection] = useState(1);
	const [fileName, setFileName] = useState("01.png");
	const updateCurrentSelection = useCallback(
		(amount: number, fixedValue?: { amount: number }) => {
			if (!!fixedValue) {
				if (!fixedValue.amount) {
					setFileName("none");
					setCurrentSelection(-1);
				} else {
					setFileName(
						fixedValue.amount < 10
							? `0${fixedValue.amount}.png`
							: `${fixedValue.amount}.png`
					);
					if (fixedValue.amount > maxElements[gender]) {
						setCurrentSelection(maxElements[gender]);
					} else {
						setCurrentSelection(fixedValue.amount);
					}
				}
				return;
			}
			let computedAmount = currentSelection + amount;
			if (computedAmount === 0 && currentSelection === -1) {
				computedAmount += 1;
			}
			if (computedAmount > 0) {
				if (computedAmount > maxElements[gender]) {
					setFileName("none");
					setCurrentSelection(-1);
				} else {
					setFileName(
						computedAmount < 10
							? `0${computedAmount}.png`
							: `${computedAmount}.png`
					);
					setCurrentSelection(computedAmount);
				}
			} else {
				if (computedAmount === -2) {
					setFileName(
						computedAmount < 10
							? `0${Math.abs(computedAmount)}.png`
							: `${Math.abs(computedAmount)}.png`
					);
					setCurrentSelection(maxElements[gender]);
				} else {
					setFileName("none");
					setCurrentSelection(-1);
				}
			}
		},
		[currentSelection, maxElements, gender]
	);

	const shuffle = useCallback(() => {
		const newSelection = Math.floor(Math.random() * (maxElements[gender] + 1));
		setCurrentSelection(newSelection);
		updateCurrentSelection(10000, { amount: newSelection });
	}, [gender, maxElements]);

	const memoedTrait = useMemo(
		() => ({
			image: `${BASE_URL}/${name}/${gender}/${fileName}`,
			updateCurrentSelection,
			name,
			gender,
			description,
			maxElements,
			currentSelection,
			shuffle,
		}),
		[fileName, gender, currentSelection, maxElements[gender]]
	);

	return memoedTrait;
};
