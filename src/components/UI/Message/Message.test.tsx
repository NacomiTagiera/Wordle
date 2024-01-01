import { screen, waitFor } from '@testing-library/react';

import { initialState } from '@/redux/slices/wordleSlice';
import { renderWithProviders } from '@/utils/test-utils';

import { Message } from '.';

describe('Message', () => {
  it('matches the snapshot', () => {
    const { asFragment } = renderWithProviders(<Message />, {
      preloadedState: {
        wordle: {
          ...initialState,
          message: {
            message: 'Test',
            duration: 500,
          },
        },
      },
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays provided message', () => {
    renderWithProviders(<Message />, {
      preloadedState: {
        wordle: {
          ...initialState,
          message: {
            message: 'Test',
            duration: 500,
          },
        },
      },
    });

    const message = screen.getByTestId('message');
    expect(message).toBeVisible();
    expect(message).toHaveTextContent('Test');
  });

  it('closes automatically after some time', async () => {
    const { store } = renderWithProviders(<Message />, {
      preloadedState: {
        wordle: {
          ...initialState,
          message: {
            message: 'Test',
            duration: 1,
          },
        },
      },
    });

    screen.getByText('Test');
    await waitFor(() => expect(store.getState().wordle.message.message).toEqual(''), {
      timeout: 1,
    });
    await waitFor(() => expect(screen.queryByText('Test')).toBeNull());
  });

  it('does not render when there is no message', () => {
    renderWithProviders(<Message />);

    expect(screen.queryByTestId('message')).not.toBeInTheDocument();
  });
});
