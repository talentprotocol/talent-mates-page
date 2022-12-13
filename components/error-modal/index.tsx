import { useEffect } from "react";
import { Typography } from "shared-ui";
import { CrossSVG } from "./assets/cross-svg";
import { Container, InnerContainer, Footer, XArea } from "./styled";
import { Props } from "./types";

const ErrorModal = ({
	isOpen,
	onCloseModal,
	errorText = "Standard error",
}: Props) => {
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
			<InnerContainer onClick={(e) => e.stopPropagation()}>
				<XArea onClick={onCloseModal}>
					<CrossSVG />
				</XArea>
				<Typography type="h3" text="Something went wrong" />
				<Typography type="body2">
					<>{errorText}</>
				</Typography>
				<Footer>
					Reach us on{" "}
					<a
						target="_blank"
						href="https://discord.gg/talentprotocol"
						rel="noreferrer"
					>
						Discord
					</a>{" "}
					or via email to{" "}
					<a href="mailto:contact@talentprotocol.com">
						contact@talentprotocol.com
					</a>
					.
				</Footer>
			</InnerContainer>
		</Container>
	) : (
		<></>
	);
};

export default ErrorModal;
