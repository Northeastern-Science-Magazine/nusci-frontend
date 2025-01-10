import { ButtonProps, bv } from "./variants";

export const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} className={bv(props)}>
      {props.children}
    </button>
  );
};
