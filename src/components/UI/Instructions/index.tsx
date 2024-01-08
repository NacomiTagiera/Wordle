import React from 'react';
import { Close, RestartAlt } from '@mui/icons-material';
import { Card, Dialog, Divider, IconButton, Slide, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type TransitionProps } from '@mui/material/transitions';

import { examples } from '@/utils/constants';

import { Tile } from '../../Game/Gameboard/Tile';

import styles from './Instructions.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

export const Instructions = ({ open, onClose }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      keepMounted
      fullScreen={fullScreen}
      open={open}
      scroll='body'
      onClose={onClose}
      TransitionComponent={Transition}
      transitionDuration={{ enter: 900, exit: 500 }}
      data-testid='instructions'
    >
      <Card variant='outlined' component='section' className={styles.container}>
        <IconButton
          aria-label='Close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 5,
            top: 5,
          }}
        >
          <Close sx={{ color: '#000', fontSize: '3rem' }} />
        </IconButton>
        <h1 className={styles.title}>how to play</h1>
        <Typography component='h2' variant='h4'>
          Guess the <strong>WORDLE</strong> in 6 tries.
        </Typography>
        <ul className={styles.instructions}>
          <li>Each guess must be a valid 5-letter word. Hit the enter button to submit.</li>
          <li>
            After each guess, the color of the tiles will change to show how close your guess was to
            the word.
          </li>
        </ul>
        <p>
          <strong>Examples</strong>
        </p>
        {examples.map((example, exampleIndex) => (
          <div key={exampleIndex} className={styles.example} aria-label={example.word}>
            {Array.from(example.word).map((letter, letterIndex) => (
              <div
                key={letterIndex}
                className={styles['tile-container']}
                aria-label={example.word + '-letters'}
              >
                <Tile
                  letter={letter}
                  letterState={exampleIndex === letterIndex ? example.letterState : undefined}
                  small
                />
              </div>
            ))}
            <p>
              <strong>{example.description.charAt(0)}</strong>
              {example.description.substring(1)}
            </p>
          </div>
        ))}
        <Divider variant='middle' />
        <p>
          Press the reset button (<RestartAlt fontSize='large' />) or reload the page for a new
          puzzle to.
        </p>
      </Card>
    </Dialog>
  );
};
