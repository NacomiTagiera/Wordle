import { useState } from "react";

import { Button, Stack, Typography } from "@mui/material";
import { Help, RestartAlt } from "@mui/icons-material";

import { useDispatchWordle } from "@/slices/wordleSlice";
import Instructions from "./Instructions";

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
    <Stack
      component="header"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid #d3d6da"
      width="100vw"
    >
      <Button aria-label="Help" onClick={handleToggleInstructions}>
        <Help sx={iconStyles} />
      </Button>
      <Typography
        component="h1"
        fontFamily="serif"
        fontSize="3.6rem"
        fontWeight="700"
        letterSpacing="1px"
        py={1}
        textAlign="center"
      >
        Wordle
      </Typography>
      <Button aria-label="Restart" onClick={handleResetGame}>
        <RestartAlt sx={iconStyles} />
      </Button>
      <Instructions
        open={instructionsOpen}
        onClose={handleToggleInstructions}
      />
    </Stack>
  );
}
