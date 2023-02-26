import { Alert, Collapse } from "@mui/material";
import { useGetMessage } from "@/slices/wordleSlice";

export default function Message() {
  const { message, duration } = useGetMessage();

  return (
    <Collapse in={!!message}>
      <Alert
        severity="error"
        sx={{ position: "absolute", left: "50%", top: "20vh" }}
      >
        {message}
      </Alert>
    </Collapse>
  );
}
