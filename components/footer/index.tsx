import { Container, InnerContainer } from "./styled";

export const Footer = ({ fixed = false }) => (
	<Container positionFixed={fixed}>
		<InnerContainer>
			<a
				target="_blank"
				rel="noreferrer"
				href="https://www.talentprotocol.com/"
			>
				Talent Protocol MTU © {new Date().getFullYear()}
			</a>
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
			</section>
		</InnerContainer>
	</Container>
);
