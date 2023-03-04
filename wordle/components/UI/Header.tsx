import { useState } from "react";

import { Button } from "@mui/material";
import { Help, RestartAlt } from "@mui/icons-material";

import { useDispatchWordle } from "@/slices/wordleSlice";
import Instructions from "./Instructions";

import styles from "./Header.module.scss";

const iconStyles = {
  color: "#000",
  fontSize: "3.5rem",
};

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
        <Help sx={iconStyles} />
      </Button>
      <h1 className={styles.title}>Wordle</h1>
      <Button aria-label="Restart" onClick={handleResetGame}>
        <RestartAlt sx={iconStyles} />
      </Button>
      <Instructions
        open={instructionsOpen}
        onClose={handleToggleInstructions}
      />
    </header>
  );
}
