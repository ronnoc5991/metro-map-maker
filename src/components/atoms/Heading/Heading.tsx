import clsx from "clsx";
import { FunctionComponent, PropsWithChildren } from "react";
import { BaseComponentProps } from "../../../types/BaseComponentProps";
import { HeadingAs } from "./types";

type Props = BaseComponentProps & {
  as: HeadingAs;
};

const Heading: FunctionComponent<PropsWithChildren<Props>> = ({
  as,
  className,
  children,
}) => {
  const Tag = as;
  return <Tag className={clsx(className)}>{children}</Tag>;
};

export default Heading;
