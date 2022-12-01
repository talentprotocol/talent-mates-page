import { useEffect } from "react";
import { Container } from "./styled";
import { Props } from "./types";

const Modal = ({ isOpen, onCloseModal, children, modalState, components }: Props) => {
	useEffect(() => {
		if (typeof window !== "undefined" && isOpen)
			document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);
	return isOpen ? (
		<Container
			onClick={onCloseModal}
			className="animate__animated animate__fadeIn"
		>
			{typeof modalState !== "undefined" && components?.length
				? components[modalState]
				: children}
		</Container>
	) : (
		<></>
	);
};

export default Modal;
