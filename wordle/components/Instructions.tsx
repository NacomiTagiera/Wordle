import { Divider, Typography } from "@mui/material";
import { RestartAlt } from "@mui/icons-material";
import Modal from "./Modal";
import Row, { RowProps } from "./Gameboard/Row";

interface Props {
  open: boolean;
  onClose: () => void;
}

const listItemStyles = {
  display: "list-item",
  marginBottom: "0.5rem",
};

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

export default function Instructions({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="how to play">
      <section>
        <Typography component="h2" variant="h4">
          Guess the <strong>WORDLE</strong> in 6 tries.
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
        <p>
          Press the reset button (<RestartAlt fontSize="large" />) or reload the
          page for a new puzzle to solve.
        </p>
      </section>
    </Modal>
  );
}
