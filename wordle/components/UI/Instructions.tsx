import React from "react";

import { Close, RestartAlt } from "@mui/icons-material";
import {
  Button,
  Card,
  Dialog,
  Divider,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import Tile from "../Game/Gameboard/Tile";

import styles from "./Instructions.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
}

const examples = ["weary", "pills", "vague"];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Instructions({ open, onClose }: Props) {
  return (
    <Dialog
      keepMounted
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
      transitionDuration={{ enter: 900, exit: 500 }}
    >
      <Card
        variant="outlined"
        className={styles.container}
        sx={{ px: 3, py: 2 }}
      >
        <section>
          <Button
            aria-label="Close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 5,
              top: 5,
            }}
          >
            <Close sx={{ color: "#000", fontSize: "3rem" }} />
          </Button>
          <Typography
            component="h1"
            color="#000"
            fontSize="3rem"
            fontWeight={700}
            pb={3}
            textAlign="center"
            textTransform="uppercase"
          >
            how to play
          </Typography>
          <Typography component="h2" variant="h4">
            Guess the <strong>WORDLE</strong> in 6 tries.
          </Typography>
          <ul className={styles.instructions}>
            <li>
              Each guess must be a valid 5-letter word. Hit the enter button to
              submit.
            </li>
            <li>
              After each guess, the color of the tiles will change to show how
              close your guess was to the word.
            </li>
          </ul>
          <p>
            <strong>Examples</strong>
          </p>
          {examples.map((example, index) => (
            <div key={index} className={styles.example} aria-label={example}>
              {Array.from(example).map((letter, letterIndex) => (
                <div
                  key={letterIndex}
                  className={styles["tile-container"]}
                  aria-label={example + "-letters"}
                >
                  <Tile letter={letter} small />
                </div>
              ))}
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, ab.
              </p>
            </div>
          ))}
          <Divider variant="middle" />
          <Typography
            component="p"
            variant="body1"
            fontSize="1.6rem"
            paddingY={1}
            textAlign="center"
          >
            Press the reset button (<RestartAlt fontSize="large" />) or reload
            the page for a new puzzle to solve.
          </Typography>
        </section>
      </Card>
    </Dialog>
  );
}
