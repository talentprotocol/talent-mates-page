import { useCallback, useState } from "react";

export const useErrorModalState = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const open = useCallback((message?: string) => {
		setIsOpen(true);
		console.log(message);
		if (typeof message === "string")
			setErrorMessage(message);
	}, []);
	const close = useCallback(() => {
		setIsOpen(false);
	}, []);
	return {
		isOpen,
		open,
		close,
		errorMessage
	};
};