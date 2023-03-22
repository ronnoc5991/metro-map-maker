import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

type Props = {
  headerContent: JSX.Element;
  bodyContent: JSX.Element;
  footerContent: JSX.Element;
};

const ControlPanelFrame: FunctionComponent<Props> = ({
  headerContent,
  bodyContent,
  footerContent,
}) => {
  return (
    <div className={styles["control-panel-frame"]}>
      <header className={styles.header}>{headerContent}</header>
      <div className={styles.body}>{bodyContent}</div>
      <footer className={styles.footer}>{footerContent}</footer>
    </div>
  );
};

export default ControlPanelFrame;
