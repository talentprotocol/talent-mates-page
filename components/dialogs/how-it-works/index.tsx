import { Typography } from "shared-ui";
import { CrossSVG } from "../assets/cross-svg";
import { ActionArea, Container, StyledButton, XArea } from "./styled";
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
			<div>
				<Typography
					type="general"
					text="Talent Mates is a customizable NFT collection, exclusive for the Talent Protocol community. "
					color="LIGHT_GREY"
				/>
				<Typography
					type="general"
					text="Holding one Talent Mate will give you an all-access pass to new features, exclusive swag and scholarships. Minting is free on Polygon (except for gas) for all verified Talent Protocol users."
					color="LIGHT_GREY"
				/>
				<Typography
					type="general"
					text="Unlike other collections, this is not a randomly generated and static jpeg. The Talent Mate NFT evolves over time according to your community level: contributors, token holders, Talent House alumni and active users will have access to special skins. All other traits can be manually selected by the user during the minting process. There are billions of possible combination, but each Talent Mate avatar is unique."
					color="LIGHT_GREY"
				/>
				<Typography
					type="general"
					color="LIGHT_GREY"
				>
					<>Talent Protocol{"’"}s mission is to make talented builders more visible and this NFT collection is about giving our users a new way to express themselves on-chain. To claim your Talent Mate, first create a Talent Protocol account <a href="https://beta.talentprotocol.com/join" target="_blank">here</a> and then go to <a href="https://avatar.talentprotocol.com" target="_blank">avatar.talentprotocol.com</a> to collect your avatar.</>
				</Typography>
			</div>
			<ActionArea>
				<StyledButton
					text="Create account"
					type="link"
					variant="quaternary"
					href="https://beta.talentprotocol.com/join"
					target="_blank"
				/>
			</ActionArea>
		</Container>
	);
};
