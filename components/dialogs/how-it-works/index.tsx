import { Typography } from "shared-ui";
import { CrossSVG } from "../assets/cross-svg";
import { ActionArea, Container, StyledButton, XArea, TextArea } from "./styled";
import { Props } from "./types";

export const HowItWorksDialog = ({ closeModal }: Props) => {
	return (
		<Container
			onClick={(e) => {
				e.stopPropagation();
			}}
			className="animate__animated animate__fadeInUp"
		>
			<XArea onClick={closeModal}>
				<CrossSVG />
			</XArea>
			<Typography type="h3" text="How it works" />
			<TextArea>
				<Typography
					type="general"
					text="Talent Mates is a customizable NFT collection, exclusive for the Talent Protocol community."
					color="LIGHT_GREY"
				/>
				<Typography
					type="general"
					text="Holding one Talent Mate will give you an all-access pass to new features, exclusive swag and scholarships."
					color="LIGHT_GREY"
				/>
				<Typography
					type="general"
					text="Minting is free on Polygon (except for gas) for all verified Talent Protocol users. All traits, except for the skin, can be manually selected by the user during the minting process."
					color="LIGHT_GREY"
				/>
				<Typography type="general" color="LIGHT_GREY">
					<>
						To claim your Talent Mate, first create a Talent Protocol account
						and get verified!
					</>
				</Typography>
			</TextArea>
			<ActionArea>
				<StyledButton
					text="More info"
					type="link"
					variant="quaternary"
					href="https://talentprotocol.notion.site/Talent-Mates-Community-Avatars-c7bb915038d64e788ad35f3ce415597a"
					target="_blank"
				/>
			</ActionArea>
		</Container>
	);
};
