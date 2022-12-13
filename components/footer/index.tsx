import { Container, InnerContainer } from "./styled";

export const Footer = ({ fixed = false }) => (
	<Container positionFixed={fixed}>
		<InnerContainer>
			<a
				target="_blank"
				rel="noreferrer"
				href="https://www.talentprotocol.com/"
			>
				Talent Protocol MTU © 2022
			</a>
			<div />
			<a href="mailto:contact@talentprotocol.com">
				contact@talentprotocol.com
			</a>
			<section>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://talentprotocol.notion.site/Talent-Protocol-101-26a6c4b9f8284e5e8f55603a38629e76"
				>
					About
				</a>
				<div />
				<a
					target="_blank"
					rel="noreferrer"
					href="https://help.talentprotocol.com/"
				>
					FAQ
				</a>
				<div />
				<a
					target="_blank"
					rel="noreferrer"
					href="https://twitter.com/talentprotocol"
				>
					Twitter
				</a>
				<div />
				<a
					target="_blank"
					rel="noreferrer"
					href="https://discord.com/invite/talentprotocol"
				>
					Discord
				</a>
				<div />
				<a
					target="_blank"
					rel="noreferrer"
					href="https://talentprotocol.notion.site/Terms-Conditions-ec060cb6c06e49a98f17d235d0835773"
				>
					T&C
				</a>
				<div />
				<a
					target="_blank"
					rel="noreferrer"
					href="https://www.notion.so/talentprotocol/Talent-Mates-Terms-Conditions-a9a81a33fab5406ea496c4868fe2d830"
				>
					Mates - T&C
				</a>
			</section>
		</InnerContainer>
	</Container>
);
