'use client';

import { useEffect } from 'react';
import { Snackbar } from '@mui/material';

import { useAppSelector } from '@/redux/hooks';
import { selectMessage, useDispatchWordle } from '@/redux/slices/wordleSlice';

import styles from './Message.module.scss';

export const Message = () => {
  const { resetMessage } = useDispatchWordle();
  const { message, duration } = useAppSelector(selectMessage);

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
  }, [message, duration, resetMessage]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ mt: { xs: 7, md: 5 } }}
      open={!!message}
      onClose={() => resetMessage()}
      data-testid='message'
    >
      <p
        className={styles.message}
        style={{
          padding: message ? '13px' : 0,
        }}
      >
        {message}
      </p>
    </Snackbar>
  );
};
