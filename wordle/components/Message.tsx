import { useEffect } from "react";
import { Card, Dialog } from "@mui/material";
import { useDispatchWordle, useGetMessage } from "@/slices/wordleSlice";

export default function Message() {
  const { resetMessage } = useDispatchWordle();
  const { message, duration } = useGetMessage();

  const handleCloseDialog = () => {
    resetMessage();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (message && duration) {
      setTimeout(() => {
        resetMessage();
      }, duration);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [message, duration]);

  return (
    <Dialog
      keepMounted
      open={!!message}
      onClose={handleCloseDialog}
      slotProps={{
        backdrop: { style: { backgroundColor: "transparent" } },
      }}
    >
      <Card
        sx={{
          backgroundColor: "#303030",
          color: "#fff",
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, 10%)",
        }}
      >
        <p>{message}</p>
      </Card>
    </Dialog>
  );
}
