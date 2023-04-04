import { useEffect } from "react";
import { Snackbar } from "@mui/material";

import { useDispatchWordle, useGetMessage } from "@/app/slices/wordleSlice";

import styles from "@/styles/components/Message.module.scss";

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
      sx={{ mt: { xs: 7, md: 5 } }}
      open={!!message}
      onClose={handleCloseSnackbar}
    >
      <p
        className={styles.message}
        style={{
          padding: message ? "13px" : 0,
        }}
      >
        {message}
      </p>
    </Snackbar>
  );
}
