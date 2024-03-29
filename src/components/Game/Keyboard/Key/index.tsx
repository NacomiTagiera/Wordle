import { type LetterState } from '@/types';

import styles from './Key.module.scss';

type Props = {
  children: React.ReactNode;
  ariaLabel?: string;
  dataKey?: string;
  large?: boolean;
  letterState?: LetterState;
  onClick: () => void;
};

export const Key = ({ children, ariaLabel, dataKey, large, letterState, onClick }: Props) => {
  return (
    <button
      className={`${styles.key} ${large ? styles.key_large : ''}`}
      type='button'
      aria-label={ariaLabel}
      data-state={letterState}
      data-key={typeof children === 'string' ? children : dataKey}
      onClick={onClick}
      data-testid='key'
    >
      {children}
    </button>
  );
};
