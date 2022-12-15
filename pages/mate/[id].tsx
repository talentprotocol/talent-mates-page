import { useRouter } from "next/router";
import { MatePreview } from "components/mate-preview";
import { Body } from "components/body";

const Mate = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<Body fullHeight>
			<MatePreview id={id as string} />
		</Body>
	);
};

export default Mate;
