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
	onMouseEnter = () => null,
	onMouseLeave = () => null,
	fullWidth = false,
	className,
	target,
}: Props) => {
	switch (type) {
		case ButtonTypeEnum.BUTTON:
			return (
				<ButtonContainer
					variant={variant}
					fullWidth={fullWidth}
					onClick={onClick}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					className={className}
				>
					{children}
					{text}
				</ButtonContainer>
			);
		case ButtonTypeEnum.LINK:
			return (
				<Link href={href} passHref >
					<ButtonLinkContainer
						variant={variant}
						fullWidth={fullWidth}
						className={className}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						target={target}
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
