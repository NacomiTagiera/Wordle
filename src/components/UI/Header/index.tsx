'use client';

import { useState } from 'react';
import { Help, RestartAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useDispatchWordle } from '@/redux/slices/wordleSlice';

import { Instructions } from '../Instructions';

import styles from './Header.module.scss';

export const Header = () => {
  const { resetGame } = useDispatchWordle();
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  const handleToggleInstructions = () => setInstructionsOpen((prevState) => !prevState);

  return (
    <header className={styles.header}>
      <IconButton aria-label='Help' onClick={handleToggleInstructions}>
        <Help className={styles.header__icon} />
      </IconButton>
      <h1 className={styles.header__title}>Wordle</h1>
      <IconButton aria-label='Restart' onClick={() => resetGame()}>
        <RestartAlt className={styles.header__icon} />
      </IconButton>
      <Instructions open={instructionsOpen} onClose={handleToggleInstructions} />
    </header>
  );
};
