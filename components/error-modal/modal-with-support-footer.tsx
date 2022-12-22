import { useEffect } from "react";
import { Typography } from "shared-ui";
import { CrossSVG } from "./assets/cross-svg";
import { Container, InnerContainer, Footer, XArea } from "./styled";
import { Props } from "./types";

const ErrorModalWithContacts = ({
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
				<Typography type="body1">
					<>{errorText}</>
				</Typography>
				<Footer>
					<span>
						Reach us on{" "}
						<a
							target="_blank"
							href="https://discord.gg/talentprotocol"
							rel="noreferrer"
						>
							Discord
						</a>{" "}
						or via email to{" "}
						<a
							href="mailto:support@talentprotocol.com"
							target="_blank"
							rel="noreferrer"
						>
							support@talentprotocol.com
						</a>
						.
					</span>
				</Footer>
			</InnerContainer>
		</Container>
	) : (
		<></>
	);
};

export default ErrorModalWithContacts;
