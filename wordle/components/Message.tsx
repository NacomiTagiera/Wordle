import { useEffect } from "react";
import { Snackbar } from "@mui/material";
import { useDispatchWordle, useGetMessage } from "@/slices/wordleSlice";

export default function Message() {
  const { resetMessage } = useDispatchWordle();
  const { message, duration } = useGetMessage();

  const handleCloseSnackbar = () => {
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
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!message}
      onClose={handleCloseSnackbar}
    >
      <p
        style={{
          backgroundColor: "#121213",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "16px",
          borderRadius: "4px",
          padding: message ? "13px" : 0,
        }}
      >
        {message}
      </p>
    </Snackbar>
  );
}
