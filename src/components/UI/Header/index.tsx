'use client';

import { useState } from 'react';
import { Help, RestartAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useDispatchWordle } from '@/redux/slices/wordleSlice';

import Instructions from '../Instructions';

import styles from './Header.module.scss';

export default function Header() {
  const { resetGame } = useDispatchWordle();

  const [instructionsOpen, setInstructionsOpen] = useState<boolean>(false);

  const handleResetGame = () => {
    resetGame();
  };

  const handleToggleInstructions = () => {
    setInstructionsOpen((prevState) => !prevState);
  };

  return (
    <header className={styles.header}>
      <IconButton aria-label='Help' onClick={handleToggleInstructions}>
        <Help className={styles.icon} />
      </IconButton>
      <h1 className={styles.title}>Wordle</h1>
      <IconButton aria-label='Restart' onClick={handleResetGame}>
        <RestartAlt className={styles.icon} />
      </IconButton>
      <Instructions
        open={instructionsOpen}
        onClose={handleToggleInstructions}
      />
    </header>
  );
}
