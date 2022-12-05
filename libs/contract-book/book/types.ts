export interface BookEntry {
	name: string;
	address: string;
	abi: any;
	network: string;
	chainId?: number | string;
	description?: string;
	details?: string[];
	ownerAddress?: string;
	ownerName?: string;
}

export interface BookInterface {
	[key: string]: BookEntry;
}
