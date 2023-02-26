interface Props {
  letter: string;
  letterState?: string;
}

export default function Tile({ letter, letterState }: Props) {
  let ariaLabel = "empty";
  let bgColor = "transparent";
  let border = "2px solid #d3d6da";

  switch (letterState) {
    case "absent":
      ariaLabel = `${letter} absent`;
      bgColor = "#787c7e";
      border = "none";
      break;
    case "correct":
      ariaLabel = `${letter} correct`;
      bgColor = "#538d4e";
      border = "none";
      break;
    case "present":
      ariaLabel = `${letter.toUpperCase()} present`;
      bgColor = "#b59f3b";
      border = "none";
      break;
  }

  return (
    <div
      role="img"
      aria-roledescription="tile"
      aria-label={ariaLabel}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        border: letter && !letterState ? "2px solid #000" : border,
        color: letterState ? "#fff" : "#000",
        fontSize: "3rem",
        fontWeight: 700,
        height: "6rem",
        lineHeight: 1,
        textTransform: "uppercase",
        userSelect: "none",
        width: "6rem",
      }}
    >
      {letter}
    </div>
  );
}
