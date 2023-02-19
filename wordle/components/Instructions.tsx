import { Button, Card, Dialog, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ArrowCircleRight, HighlightOff } from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Instructions({ open = true, onClose }: Props) {
  return (
    <Dialog open={open}>
      <Card variant="outlined" sx={{ color: grey[800], px: 3, py: 2 }}>
        <Button
          variant="text"
          onClick={onClose}
          sx={{
            position: "absolute",
            left: 10,
            top: 10,
            fontSize: 30,
          }}
        >
          <HighlightOff color="action" fontSize="large" />
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
          how to play
        </Typography>
        <Typography
          component="p"
          fontSize="2rem"
          pb={4}
          textAlign="justify"
          variant="body1"
        >
          The goal of the game is to guess the word within <b>six</b> tries.
          Each guess should be a <b>valid five-letter</b> word. Hit the enter
          button to submit your guess. After each guess the color of the tiles
          will change to indicate how close your guess was to the answer.
        </Typography>
      </Card>
    </Dialog>
  );
}
