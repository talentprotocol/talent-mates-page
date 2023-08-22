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
				<Typography type="body1">
					<>{errorText}</>
				</Typography>
				<Footer>
					<span>
						Please pay attention to the eligibility{" "}
						<a
							target="_blank"
							href="https://bit.ly/talentmates"
							rel="noreferrer"
						>
							criteria
						</a>{" "}
						to mint. You need to be a verified Talent Protocol member to mint.
					</span>
					<span>
						We also a video clarifying the{" "}
						<a
							href="https://tella.video/talent-mates-mint-tutorial-and-faq-1-2iwa"
							target="_blank"
							rel="noreferrer"
						>
							minting conditions
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

export default ErrorModal;
