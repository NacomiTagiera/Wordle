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
import { grey } from "@mui/material/colors";
import { TransitionProps } from "@mui/material/transitions";

import Row, { RowProps } from "./Gameboard/Row";

interface Props {
  open: boolean;
  onClose: () => void;
}

const examples: RowProps[] = [
  {
    ariaLabel: "windy",
    letters: "windy",
    lettersState: ["correct"],
  },
  {
    ariaLabel: "weird",
    letters: "weird",
    lettersState: ["correct", "present"],
  },
  {
    ariaLabel: "weary",
    letters: "weary",
    lettersState: ["correct", "present", "absent"],
  },
];

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
      <Card variant="outlined" sx={{ color: grey[800], px: 3, py: 2 }}>
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
          <ul>
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
            <div key={index} style={{ marginBlock: "2.5rem" }}>
              <Row
                ariaLabel={example.ariaLabel}
                letters={example.letters}
                lettersState={example.lettersState}
              />
              {example.lettersState?.at(-1) === "correct" && (
                <p>
                  <strong style={{ textTransform: "uppercase" }}>
                    {example.letters[example.lettersState.length - 1]}
                  </strong>{" "}
                  is in the word and in the correct spot.
                </p>
              )}
              {example.lettersState?.at(-1) === "present" && (
                <p>
                  <strong style={{ textTransform: "uppercase" }}>
                    {example.letters[example.lettersState.length - 1]}
                  </strong>{" "}
                  is in the word and but in the wrong spot.
                </p>
              )}
              {example.lettersState?.at(-1) === "absent" && (
                <p>
                  <strong style={{ textTransform: "uppercase" }}>
                    {example.letters[example.lettersState.length - 1]}
                  </strong>{" "}
                  is not in the word in any spot.
                </p>
              )}
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
