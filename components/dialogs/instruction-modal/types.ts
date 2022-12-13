import { ReactEventHandler } from "react";

export interface Props {
	closeModal: ReactEventHandler;
	imageSource?: string;
}

export enum TIERS {
	UNDEFINED,
	PUBLIC_STAGE,
	USER,
	TALENT_HOUSE,
	PARTNER,
	TOKEN_HOLDER,
	TALENT,
	INVESTOR_WINTER,
	INVESTOR_FALL,
	INVESTOR_SUMMER,
	CONTRIBUTOR,
	ACTIVE_CONTRIBUTOR,
	CORE_TEAM,
}
