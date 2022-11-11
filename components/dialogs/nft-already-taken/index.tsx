import { useState } from "react";
import { Typography } from "shared-ui";
import { CrossSVG } from "../invalid-account/assets/cross-svg";
import { ActionArea, Container, StyledButton, XArea } from "./styled";
import { Props } from "./types";

export const NFTAlreadyTakenDialog = ({ closeModal, imageSource }: Props) => {
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
			{imageSource && (
				<img width="170" height="170" src={imageSource} alt="buddy" />
			)}
			<Typography type="h3" text="Sorry, NFT already taken." />
			<Typography
				type="body1"
				text="Don’t worry thought, you can still mint your MATE! Select at least one diferent trait and try again."
				color="LIGHT_GREY"
			/>
			<ActionArea>
				<StyledButton
					text="I understand"
					type="button"
					variant="quaternary"
					onClick={closeModal}
					target="_blank"
				/>
			</ActionArea>
		</Container>
	);
};
