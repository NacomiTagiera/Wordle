import { ReactNode } from "react";

import { LetterState } from "@/types";
import styles from "./Key.module.scss";

interface Props {
  children: ReactNode;
  large?: boolean;
  letterState?: LetterState;
  onClick: () => void;
}

export default function Key({
  children,
  large = false,
  letterState,
  onClick,
}: Props) {
  return (
    <button
      className={styles.key}
      style={{ flex: large ? 1.5 : 1, fontSize: large ? "12px" : "1.25em" }}
      data-state={letterState}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
