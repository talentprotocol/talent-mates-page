import { BookEntry, BookInterface } from "./types";

export const ContractBook: BookInterface = {
	set new(entry: BookEntry) {
		this[entry.name] = entry;
	},
};
