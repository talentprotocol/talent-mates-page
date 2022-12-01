import { useCallback, useState } from "react";

export const useModalState = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalState, setModalState] = useState(0);
	const open = useCallback(() => {
		setModalState(0);
		setIsOpen(true);
	}, []);
	const close = useCallback(() => {
		setIsOpen(false);
	}, []);
	const jumpToNextState = useCallback(() => {
		setModalState((state) => state + 1);
	}, [modalState]);
	return {
		isOpen,
		open,
		close,
		jumpToNextState,
		modalState,
	};
};
