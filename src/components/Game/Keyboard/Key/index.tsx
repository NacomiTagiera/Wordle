import { LetterState } from '@/types';

import styles from './Key.module.scss';

interface Props {
  children: React.ReactNode;
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
      className={large ? styles['key--large'] : styles.key}
      data-state={letterState}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
