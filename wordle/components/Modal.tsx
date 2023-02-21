import React, { ReactElement } from "react";

import { Button, Card, Dialog, Grow, Slide, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { TransitionProps } from "@mui/material/transitions";
import { HighlightOff } from "@mui/icons-material";

interface Props {
  children: ReactElement;
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
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
    >
      <Card variant="outlined" sx={{ color: grey[800], px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 5,
            top: 5,
          }}
        >
          <HighlightOff color="action" sx={{ fontSize: "3rem" }} />
        </Button>
        <Typography
          component="h2"
          color="#000"
          fontSize="3rem"
          fontWeight={700}
          pb={3}
          textAlign="center"
          textTransform="uppercase"
        >
          {title}
        </Typography>
        <Grow
          in={open}
          style={{ transformOrigin: "center" }}
          {...(open ? { timeout: 1000 } : {})}
        >
          {children}
        </Grow>
      </Card>
    </Dialog>
  );
}
