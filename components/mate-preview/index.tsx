import { useEffect, useMemo, useState } from "react";
import { Spinner } from "shared-ui";
import { PREVIEW_STATE, Props } from "./types";
import { Container, ErrorMessage, Preview } from "./styled";

export const MatePreview = ({ id }: Props) => {
	const [state, setState] = useState(PREVIEW_STATE.FIRST_LOAD);
	useEffect(() => {
		if (state === PREVIEW_STATE.FIRST_LOAD) {
			setState(PREVIEW_STATE.LOADING);
		};
		if (!id) {
			setState(PREVIEW_STATE.ERROR);
		} else {
			setState(PREVIEW_STATE.FOUND);
		}
	}, [id, state]);
	const content = useMemo(() => {
		switch (state) {
			case PREVIEW_STATE.FIRST_LOAD:
			case PREVIEW_STATE.LOADING:
				return <Spinner isShown noBox/>;
			case PREVIEW_STATE.ERROR:
				return <ErrorMessage>Mate not found</ErrorMessage>
			case PREVIEW_STATE.FOUND:
			default:
				return (
					<>
						<Preview>
							<img src="https://picsum.photos/536/354"/>
						</Preview>
					</>
				)
		}
	}, [state]);
	return (
		<Container>
			{content}
		</Container>
	);
};
