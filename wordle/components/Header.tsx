import { useState } from "react";

import { Button, Stack, Typography } from "@mui/material";
import { Help, RestartAlt } from "@mui/icons-material";

import { useDispatchWordle } from "@/slices/wordleSlice";
import Instructions from "./Instructions";

const iconStyles = {
  color: "#000",
  fontSize: "5rem",
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
    <Stack
      component="header"
      direction="row"
      borderBottom="5px solid #000"
      marginX="auto"
      maxWidth="max-content"
      spacing={5}
    >
      <Button onClick={handleToggleInstructions}>
        <Help sx={iconStyles} />
      </Button>
      <Typography
        component="h1"
        fontSize="6rem"
        fontWeight="800"
        textAlign="center"
      >
        Wordle
      </Typography>
      <Button onClick={handleResetGame}>
        <RestartAlt sx={iconStyles} />
      </Button>
      <Instructions
        open={instructionsOpen}
        onClose={handleToggleInstructions}
      />
    </Stack>
  );
}
