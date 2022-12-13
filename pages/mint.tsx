import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { NFTPicker } from "components/nft-picker";
import { Body } from "components/body";
import { Footer } from "components/footer";
import Modal from "components/modal";
import { CongratulationsBuddyDialog } from "components/dialogs/congratulations-buddy";
import { useModalState } from "components/modal/use-modal-state";
import { useErrorModalState } from "components/error-modal/use-modal-state";
import {
	ButtonIcon,
	Header,
	InnerHeaderContainer,
	StyledHeaderButton,
	TitleArea,
} from "components/nft-picker/styled";
import { Typography } from "shared-ui";
import ErrorModal from "components/error-modal";
import { ApproveTransactionDialog } from "components/dialogs/approve-transaction";
import { CheckingElegibilityDialog } from "components/dialogs/checking-eligibility";
import { TransactionInProgressDialog } from "components/dialogs/transaction-in-progress";
import { InstructionModalDialog } from "components/dialogs/instruction-modal";

const Home: NextPage = () => {
	const [imageSource, setImageSource] = useState<string | undefined>(
		"https://upload.wikimedia.org/wikipedia/en/archive/b/b1/20210811082420%21Portrait_placeholder.png"
	);
	const modalState = useModalState();
	const instructionModalState = useModalState();
	const errorModalState = useErrorModalState();
	return (
		<>
			<Head>
				<title>Talent Mates</title>
				<meta
					name="description"
					content="Talent Mates is a new NFT avatar collection, exclusive for the Talent Protocol community. Mint your NFT to enter a world where both talent and opportunities are abundant."
				/>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
				></meta>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Modal
				isOpen={modalState.isOpen}
				onCloseModal={modalState.close}
				modalState={modalState.modalState}
				components={[
					<CheckingElegibilityDialog
						key="firstStage"
						closeModal={modalState.close}
					/>,
					<ApproveTransactionDialog
						key="secondStage"
						closeModal={modalState.close}
					/>,
					<TransactionInProgressDialog
						key="thirdStage"
						closeModal={modalState.close}
					/>,
					<CongratulationsBuddyDialog
						key="fourthStage"
						closeModal={modalState.close}
						imageSource={imageSource}
					/>,
				]}
			></Modal>
			<Modal
				isOpen={instructionModalState.isOpen}
				onCloseModal={instructionModalState.close}
			>
				<InstructionModalDialog closeModal={instructionModalState.close} />
			</Modal>
			<ErrorModal
				isOpen={errorModalState.isOpen}
				onCloseModal={errorModalState.close}
				errorText={errorModalState.errorMessage}
			></ErrorModal>
			<Header>
				<InnerHeaderContainer>
					<StyledHeaderButton
						text={"Back"}
						type="link"
						variant="secondary"
						href="/"
					>
						<ButtonIcon>--W</ButtonIcon>
					</StyledHeaderButton>
					<TitleArea>
						<Typography
							type="h3"
							text={"Personalize Your Unique Avatar NFT"}
							color="BLACK"
						/>
					</TitleArea>
				</InnerHeaderContainer>
			</Header>
			<Body>
				<NFTPicker
					jumpToNextMintState={modalState.jumpToNextState}
					skipNextMintState={modalState.skipNextState}
					openModal={modalState.open}
					closeModal={modalState.close}
					openInstructionModal={instructionModalState.open}
					closeInstructionModal={instructionModalState.close}
					// @ts-ignore
					openErrorModal={errorModalState.open}
					setImageSource={setImageSource}
				/>
			</Body>
			<Footer />
		</>
	);
};

export default Home;

/**
	<NFTAlreadyTakenDialog closeModal={modalState.close} imageSource={imageSource} />
 */
