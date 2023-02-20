import { useState } from "react";

import { Button, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

import Instructions from "./Instructions";

export default function Header() {
  const [instructionsOpen, setInstructionsOpen] = useState<boolean>(false);

  const handleToggleInstructions = () => {
    setInstructionsOpen((prevState) => !prevState);
  };

  return (
    <header>
      <Button
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={handleToggleInstructions}
      >
        <HelpIcon sx={{ color: "#000", fontSize: "4rem" }} />
      </Button>
      <Typography
        component="h1"
        fontSize="5rem"
        fontWeight="800"
        textAlign="center"
      >
        Wordle
      </Typography>
      <Instructions
        open={instructionsOpen}
        onClose={handleToggleInstructions}
      />
    </header>
  );
}
