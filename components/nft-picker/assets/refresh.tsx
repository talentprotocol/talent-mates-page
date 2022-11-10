import { COLORS } from "shared-ui";

export const RefreshIcon = ({ isHovering = false }) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M3.5 9.49854V12.4985H0.5"
			stroke={isHovering ? COLORS.WHITE : COLORS.LIGHT_PURPLE}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12.5 6.49854V3.49854H15.5"
			stroke={isHovering ? COLORS.WHITE : COLORS.LIGHT_PURPLE}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12.6882 3.49658C13.7227 4.5743 14.3544 5.97538 14.4772 7.46417C14.6 8.95296 14.2064 10.4386 13.3625 11.6713C12.5186 12.9039 11.276 13.8084 9.84362 14.2325C8.41124 14.6566 6.87651 14.5744 5.49756 13.9999"
			stroke={isHovering ? COLORS.WHITE : COLORS.LIGHT_PURPLE}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M3.31155 12.5007C2.27934 11.4224 1.64956 10.0218 1.52796 8.5341C1.40637 7.04637 1.80037 5.56211 2.6438 4.33055C3.48722 3.09899 4.72872 2.19513 6.15981 1.77075C7.5909 1.34638 9.12442 1.42732 10.5029 2"
			stroke={isHovering ? COLORS.WHITE : COLORS.LIGHT_PURPLE}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
