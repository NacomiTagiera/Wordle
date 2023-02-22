import { Stack } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Key from "./Key";

interface Props {
  onBackspaceClick: () => void;
  onEnterClick: () => void;
  onLetterClick: (letter: string) => void;
}

const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

export default function Keyboard({
  onBackspaceClick,
  onEnterClick,
  onLetterClick,
}: Props) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing="1rem">
      {keyboardRows.map((row, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent="center"
          spacing="0.5rem"
        >
          {Array.from(row).map((letter, letterIndex) => {
            if (letter === "enter") {
              return (
                <Key key={letterIndex} onClick={onEnterClick} large>
                  enter
                </Key>
              );
            } else if (letter === "backspace") {
              return (
                <Key key={letterIndex} onClick={onBackspaceClick} large>
                  <BackspaceIcon sx={{ fontSize: "2.2rem" }} />
                </Key>
              );
            } else if (letter === "") {
              return <div key={letterIndex} style={{ width: "0.8rem" }}></div>;
            } else {
              return (
                <Key
                  key={letterIndex}
                  // letterState={} need to add here sth
                  onClick={onLetterClick.bind(null, letter)}
                >
                  {letter}
                </Key>
              );
            }
          })}
        </Stack>
      ))}
    </Stack>
  );
}
