import { ButtonProps, bv } from "./variants";

export const Button = (props: ButtonProps) => {
  return <button className={bv(props)}>{props.children}</button>;
};
