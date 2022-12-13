import { Typography } from "shared-ui";
import { CrossSVG } from "../assets/cross-svg";
import {
	Container,
	ImageList,
	XArea,
} from "./styled";
import { Props, TIERS } from "./types";

export const InstructionModalDialog = ({ closeModal }: Props) => {
	const isRare = !!(
		// @ts-ignore
		typeof window !== "undefined" && window.accountTier > TIERS.USER
	);
	// @ts-ignore
	const tierLevel = typeof window !== "undefined" && window.accountTier;

	const tierLevelName = () => {
		if (tierLevel > TIERS.ACTIVE_CONTRIBUTOR) {
			return "the core team";
		}
		if (tierLevel > TIERS.CONTRIBUTOR) {
			return "active contributors";
		}
		if (tierLevel > TIERS.INVESTOR_SUMMER) {
			return "contributors";
		}
		if (tierLevel > TIERS.INVESTOR_FALL) {
			return "investors";
		}
		if (tierLevel > TIERS.INVESTOR_WINTER) {
			return "investors";
		}
		if (tierLevel > TIERS.TALENT) {
			return "investors";
		}
		if (tierLevel > TIERS.TOKEN_HOLDER) {
			return "talent";
		}
		if (tierLevel > TIERS.TALENT_HOUSE) {
			return "token holders";
		}
		if (tierLevel > TIERS.USER) {
			return "Talent House";
		}
		return "users";
	};

	const tierImage = (gender: String) => {
		if (tierLevel == TIERS.CORE_TEAM) {
			return <img
				width="170"
				height="170"
				src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/15.png`}
				alt="buddy"
			/>;
		}
		if (tierLevel == TIERS.ACTIVE_CONTRIBUTOR) {
			return <img
				width="170"
				height="170"
				src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/14.png`}
				alt="buddy"
			/>;
		}
		if (tierLevel == TIERS.CONTRIBUTOR) {
			return <img
				width="170"
				height="170"
				src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/13.png`}
				alt="buddy"
			/>;
		}
		if (tierLevel == TIERS.INVESTOR_SUMMER) {
			return <img
				width="170"
				height="170"
				src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/12.png`}
				alt="buddy"
			/>;
		}
		if (tierLevel == TIERS.INVESTOR_FALL) {
			return <img
				width="170"
				height="170"
				src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/11.png`}
				alt="buddy"
			/>;
		}
		if (tierLevel == TIERS.INVESTOR_WINTER) {
			return <img
				width="170"
				height="170"
				src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/10.png`}
				alt="buddy"
			/>;
		}
		if (tierLevel == TIERS.TALENT) {
			return <img
				width="170"
				height="170"
				src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/09.png`}
				alt="buddy"
			/>;
		}
		if (tierLevel == TIERS.TOKEN_HOLDER) {
			return <img
				width="170"
				height="170"
				src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/08.png`}
				alt="buddy"
			/>;
		}
		if (tierLevel == TIERS.TALENT_HOUSE) {
			return <img
				width="170"
				height="170"
				src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/07.png`}
				alt="buddy"
			/>;
		}
		if (tierLevel == TIERS.USER) {
			return <img
				width="170"
				height="170"
				src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/06.png`}
				alt="buddy"
			/>;
		}
		return <img
			width="170"
			height="170"
			src={`https://d6cu1tnva62p2.cloudfront.net/body/${gender}/05.png`}
			alt="buddy"
		/>;
	};

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
			{isRare ? (
				<>
					<ImageList>
						{tierImage("male")}
						{tierImage("female")}
					</ImageList>
				</>
			) : (
				<ImageList>
					<img
						width="170"
						height="170"
						src="https://d6cu1tnva62p2.cloudfront.net/body/male/01.png"
						alt="buddy"
					/>
					<img
						width="170"
						height="170"
						src="https://d6cu1tnva62p2.cloudfront.net/body/female/01.png"
						alt="buddy"
					/>
				</ImageList>
			)}
			<Typography
				type="h3"
				text={isRare ? "You look rare, mate!" : "Welcome, mate!"}
			/>
			<Typography
				type="body1"
				text={
					isRare
						? `Congratulations! You unlocked this special skin, only available to ${tierLevelName()}! The higher the community level, the more skins you have access to. Use the arrows to browse various items and traits to customize your avatar. There are billions of possible combination, but each Talent Mate is unique.`
						: "All Talent Protocol users, will be able to choose between 5 basic skins for your NFT. If you have a higher community level, you'll have more skins available! Use the arrows to browse various items and traits to customize your avatar. There are billions of possible combination, but each Talent Mate is unique."
				}
				color="LIGHT_GREY"
			/>
		</Container>
	);
};
