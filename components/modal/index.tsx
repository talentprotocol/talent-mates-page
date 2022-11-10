import { Container } from "./styled";
import { Props } from "./types";

const Modal = ({ isOpen, onCloseModal, children }: Props) => {
	return isOpen ? (
		<Container
			onClick={onCloseModal}
			className="animate__animated animate__fadeIn"
		>
			{children}
		</Container>
	) : (
		<></>
	);
};

export default Modal;
