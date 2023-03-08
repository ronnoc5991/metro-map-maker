import clsx from "clsx";
import { FunctionComponent, PropsWithChildren } from "react";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import { TextAs } from "./types";

type Props = BaseComponentProps & {
  as: TextAs;
};

const Text: FunctionComponent<PropsWithChildren<Props>> = ({
  as,
  className,
  children,
}) => {
  const Tag = as;
  return <Tag className={clsx(className)}>{children}</Tag>;
};

export default Text;
