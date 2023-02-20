import { Typography } from "@mui/material";

import Modal from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Instructions({ open = true, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="how to play">
      <Typography
        component="p"
        fontSize="2rem"
        pb={4}
        textAlign="justify"
        variant="body1"
      >
        The goal of the game is to guess the word within <b>six</b> tries. Each
        guess should be a <b>valid five-letter</b> word. Hit the enter button to
        submit your guess. After each guess the color of the tiles will change
        to indicate how close your guess was to the answer.
      </Typography>
    </Modal>
  );
}
