import {
  BodyContainer
} from "./styled";

interface Props {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export const Body = (props: Props) => (
  <BodyContainer>
    {props.children}
  </BodyContainer>
);
