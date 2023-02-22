import { Typography } from "@mui/material";

import Modal from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const listItemStyles = {
  display: "list-item",
  marginBottom: "0.5rem",
};

const spanStyles = {
  fontWeight: 700,
  letterSpacing: "1px",
};

export default function Instructions({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="how to play">
      <section>
        <Typography component="h2" variant="h4">
          Guess the <span style={spanStyles}>WORDLE </span>in 6 tries.
        </Typography>
        <ul>
          <li style={listItemStyles}>
            Each guess must be a valid 5-letter word. Hit the enter button to
            submit.
          </li>
          <li style={listItemStyles}>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </li>
        </ul>
      </section>
    </Modal>
  );
}
