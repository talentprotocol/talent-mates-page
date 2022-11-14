export interface MaxElementsMap {
	male: number;
	female: number;
}

export interface Props {
	name: string;
	description: string;
	gender: "male" | "female";
	maxElements: MaxElementsMap;
}
