'use client';

import { LetterState } from '@/types';

import styles from './Key.module.scss';

interface Props {
  children: React.ReactNode;
  dataKey?: string;
  large?: boolean;
  letterState?: LetterState;
  onClick: () => void;
}

export default function Key({
  children,
  dataKey,
  large = false,
  letterState,
  onClick,
}: Props) {
  return (
    <button
      className={`${styles.key} ${large ? styles['key--large'] : ''}`}
      type='button'
      data-state={letterState}
      data-key={typeof children === 'string' ? children : dataKey}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
