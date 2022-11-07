import Link from "next/link";
import { ButtonLinkContainer, ButtonContainer } from "./styled";
import { Props, ButtonTypeEnum } from "./types";

export const Button = ({
	text,
	type,
	variant,
	children,
	href = "/",
	onClick = () => null,
	fullWidth = false,
}: Props) => {
	switch (type) {
		case ButtonTypeEnum.BUTTON:
			return (
				<ButtonContainer
					variant={variant}
					fullWidth={fullWidth}
					onClick={onClick}
				>
					{children}
					{text}
				</ButtonContainer>
			);
		case ButtonTypeEnum.LINK:
			return (
				<Link href={href} passHref>
					<ButtonLinkContainer
						variant={variant}
						fullWidth={fullWidth}
						target="_blank"
					>
						{children}
						{text}
					</ButtonLinkContainer>
				</Link>
			);
		case ButtonTypeEnum.DEFAULT:
		default:
			return <div>TBD</div>;
	}
};
