import { useState } from "react";

import { Button } from "@mui/material";
import { Help, RestartAlt } from "@mui/icons-material";

import Instructions from "./Instructions";
import { useDispatchWordle } from "@/slices/wordleSlice";

import styles from "./Header.module.scss";

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
      <Button aria-label="Help" onClick={handleToggleInstructions}>
        <Help className={styles.icon} />
      </Button>
      <h1 className={styles.title}>Wordle</h1>
      <Button aria-label="Restart" onClick={handleResetGame}>
        <RestartAlt className={styles.icon} />
      </Button>
      <Instructions
        open={instructionsOpen}
        onClose={handleToggleInstructions}
      />
    </header>
  );
}
