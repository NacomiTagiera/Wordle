import { ReactNode } from "react";
import { Button } from "@mui/material";
import { LetterState } from "@/types";

interface Props {
  children: ReactNode;
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
  let bgColor = "rgb(211, 214, 218)";

  switch (letterState) {
    case "absent":
      bgColor = "#787c7e";
      break;
    case "correct":
      bgColor = "#538d4e";
      break;
    case "present":
      bgColor = "#b59f3b";
      break;
  }

  return (
    <Button
      onClick={onClick}
      sx={{
        bgcolor: bgColor,
        borderRadius: "0.25rem",
        color: letterState ? "#fff" : "#000",
        fontSize: large ? "1.3rem" : "1.6rem",
        fontWeight: 700,
        maxHeight: "5rem",
        maxWidth: large ? "6.6rem" : "4.4rem",
        minHeight: "5rem",
        minWidth: large ? "6.6rem" : "4.4rem",
        padding: 0,
        textTransform: "uppercase",
        userSelect: "none",
        "&:hover": {
          bgcolor: bgColor,
          color: letterState ? "#fff" : "#000",
        },
      }}
    >
      {children}
    </Button>
  );
}
