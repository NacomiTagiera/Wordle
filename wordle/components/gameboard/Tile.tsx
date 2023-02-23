interface Props {
  letter: string;
  letterState?: string;
}

export default function Tile({ letter, letterState }: Props) {
  let ariaLabel = "empty";
  let bgColor = "transparent";

  switch (letterState) {
    case "absent":
      ariaLabel = `${letter} absent`;
      bgColor = "#3a3a3c";
      break;
    case "correct":
      ariaLabel = `${letter} correct`;
      bgColor = "#538d4e";
      break;
    case "present":
      ariaLabel = `${letter} present`;
      bgColor = "#b59f3b";
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
        border: letterState ? "none" : "2px solid #d3d6da",
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
