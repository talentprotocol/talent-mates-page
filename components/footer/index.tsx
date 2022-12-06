import { Container, InnerContainer } from "./styled";

export const Footer = ({ fixed = false }) => (
	<Container positionFixed={fixed}>
		<InnerContainer>
			Talent Protocol MTU © 2022
			<div />
			contact@talentprotocol.com
			<section>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://www.talentprotocol.com/"
				>
					Talent Protocol
				</a>
				<div />
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
					Terms & Conditions
				</a>
			</section>
		</InnerContainer>
	</Container>
);
