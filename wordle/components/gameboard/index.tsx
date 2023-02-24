import { useGetBoardRows } from "@/slices/wordleSlice";
import Row from "./Row";

export default function Board() {
  const rows = useGetBoardRows();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
      }}
    >
      {rows.map(({ letters, lettersState }, index) => (
        <Row
          key={index}
          ariaLabel={"Row" + (index + 1)}
          letters={letters}
          lettersState={lettersState}
        />
      ))}
    </div>
  );
}
