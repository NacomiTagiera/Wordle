import { fireEvent, screen, waitFor } from '@testing-library/react';

import { initialState } from '@/redux/slices/wordleSlice';
import { type GameState } from '@/types';
import { renderWithProviders } from '@/utils/test-utils';

import { Header } from '.';

describe('Header', () => {
  it('matches the snapshot', () => {
    const { asFragment } = renderWithProviders(<Header />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with text and icons', () => {
    renderWithProviders(<Header />);

    screen.getByLabelText('Help');
    screen.getByLabelText('Restart');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wordle');
  });

  it('opens the instructions when the help button is clicked', async () => {
    renderWithProviders(<Header />);

    fireEvent.click(screen.getByLabelText('Help'));
    await waitFor(() => expect(screen.getByTestId('instructions-container')).toBeVisible());
  });

  it('resets the game when the restart button is clicked', () => {
    const gameState: GameState = {
      ...initialState,
      message: {
        message: 'You win!',
        duration: 500,
      },
      status: 'win',
      currentRowIndex: 5,
    };

    const { store } = renderWithProviders(<Header />, {
      preloadedState: {
        wordle: {
          ...gameState,
        },
      },
    });

    expect(store.getState().wordle).toEqual(gameState);
    fireEvent.click(screen.getByLabelText('Restart'));
    expect(store.getState().wordle).toEqual({
      ...initialState,
      solution: store.getState().wordle.solution,
    });
  });
});
