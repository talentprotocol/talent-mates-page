import { useCallback, useMemo, useState } from "react";
import { Props } from "./types";

const BASE_URL = "";
const MANDATORY_PROPERTIES_LIST = {
	gender: true,
	body: true,
	background: true,
	mouth: true,
};

export const useTrait = ({ name, gender, maxElements, description }: Props) => {
	const [currentSelection, setCurrentSelection] = useState(1);
	const [fileName, setFileName] = useState("01.png");
	const updateCurrentSelection = useCallback(
		(amount: number, fixedValue?: { amount: number }) => {
			if (!!fixedValue) {
				if (!fixedValue.amount) {
					setFileName("none");
					// @ts-ignore
					setCurrentSelection(MANDATORY_PROPERTIES_LIST[name] ? 1 : -1);
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
					// @ts-ignore
					setFileName(MANDATORY_PROPERTIES_LIST[name] ? "01.png" : "none");
					// @ts-ignore
					setCurrentSelection(MANDATORY_PROPERTIES_LIST[name] ? 1 : -1);
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
						maxElements[gender] < 10
							? `0${Math.abs(maxElements[gender])}.png`
							: `${Math.abs(maxElements[gender])}.png`
					);
					setCurrentSelection(maxElements[gender]);
				} else {
					setFileName(
						// @ts-ignore
						MANDATORY_PROPERTIES_LIST[name]
							? maxElements[gender] < 10
								? `0${Math.abs(maxElements[gender])}.png`
								: `${Math.abs(maxElements[gender])}.png`
							: "none"
					);
					setCurrentSelection(
						// @ts-ignore
						MANDATORY_PROPERTIES_LIST[name] ? maxElements[gender] : -1
					);
				}
			}
		},
		[currentSelection, maxElements, gender]
	);

	const shuffle = useCallback(() => {
		const newSelection = Math.floor(
			Math.random() * maxElements[gender] +
				// @ts-ignore(
				(MANDATORY_PROPERTIES_LIST[name] ? 1 : 0)
		);
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
