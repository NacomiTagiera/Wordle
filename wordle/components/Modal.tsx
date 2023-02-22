import React, { ReactNode } from "react";

import { Button, Card, Dialog, Slide, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  title: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal({ children, onClose, open, title }: Props) {
  return (
    <Dialog
      keepMounted
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
      transitionDuration={{ enter: 900, exit: 500 }}
    >
      <Card variant="outlined" sx={{ color: grey[800], px: 3, py: 2 }}>
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
          {title}
        </Typography>
        {children}
      </Card>
    </Dialog>
  );
}
