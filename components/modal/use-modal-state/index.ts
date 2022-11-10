import { useCallback, useState } from "react";

export const useModalState = () => {
	const [isOpen, setIsOpen] = useState(true);
	const open = useCallback(() => {
		setIsOpen(true);
	}, []);
	const close = useCallback(() => {
		setIsOpen(false);
	}, []);
	return {
		isOpen,
		open,
		close,
	};
};
