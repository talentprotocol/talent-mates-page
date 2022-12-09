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
						<img
							width="170"
							height="170"
							src="https://d6cu1tnva62p2.cloudfront.net/body/male/09.png"
							alt="buddy"
						/>
						{tierLevel > TIERS.TALENT_HOUSE && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/male/17.png"
								alt="buddy"
							/>
						)}
						{tierLevel > TIERS.PARTNER && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/male/06.png"
								alt="buddy"
							/>
						)}
						{tierLevel > TIERS.TOKEN_HOLDER && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/male/07.png"
								alt="buddy"
							/>
						)}
					</ImageList>
					<ImageList>
						{tierLevel > TIERS.TALENT && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/male/10.png"
								alt="buddy"
							/>
						)}
						{tierLevel > TIERS.INVESTOR && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/male/13.png"
								alt="buddy"
							/>
						)}
						{tierLevel > TIERS.CONTRIBUTOR && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/male/14.png"
								alt="buddy"
							/>
						)}
						{tierLevel > TIERS.ACTIVE_CONTRIBUTOR && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/male/16.png"
								alt="buddy"
							/>
						)}
					</ImageList>
					<ImageList>
						<img
							width="170"
							height="170"
							src="https://d6cu1tnva62p2.cloudfront.net/body/female/09.png"
							alt="buddy"
						/>
						{tierLevel > TIERS.TALENT_HOUSE && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/female/17.png"
								alt="buddy"
							/>
						)}
						{tierLevel > TIERS.PARTNER && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/female/06.png"
								alt="buddy"
							/>
						)}
						{tierLevel > TIERS.TOKEN_HOLDER && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/female/07.png"
								alt="buddy"
							/>
						)}
					</ImageList>
					<ImageList>
						{tierLevel > TIERS.TALENT && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/female/10.png"
								alt="buddy"
							/>
						)}
						{tierLevel > TIERS.INVESTOR && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/female/13.png"
								alt="buddy"
							/>
						)}
						{tierLevel > TIERS.CONTRIBUTOR && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/female/14.png"
								alt="buddy"
							/>
						)}
						{tierLevel > TIERS.ACTIVE_CONTRIBUTOR && (
							<img
								width="170"
								height="170"
								src="https://d6cu1tnva62p2.cloudfront.net/body/female/16.png"
								alt="buddy"
							/>
						)}
					</ImageList>
				</>
			) : (
				<img
					width="170"
					height="170"
					src="https://d6cu1tnva62p2.cloudfront.net/body/male/01.png"
					alt="buddy"
				/>
			)}
			<Typography
				type="h3"
				text={isRare ? "You look rare, mate!" : "Welcome, mate!"}
			/>
			<Typography
				type="body1"
				text={
					isRare
						? "Congratulations! You unlocked these special skins, only available to [Contributors/Investors/…]. Use the arrows to browse various items and traits to customize your avatar. There are billions of possible combination, but each Talent Mate is unique."
						: "As a verified Talent Protocol user, you can choose between 5 basic skins for your NFT. Use the arrows to browse various items and traits to customize your avatar. There are billions of possible combination, but each Talent Mate is unique."
				}
				color="LIGHT_GREY"
			/>
		</Container>
	);
};
