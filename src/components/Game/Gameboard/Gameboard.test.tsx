import { screen } from '@testing-library/react';

import { initialState } from '@/redux/slices/wordleSlice';
import { NUMBER_OF_LETTERS, NUMBER_OF_ROWS } from '@/utils/constants';
import { renderWithProviders } from '@/utils/test-utils';

import { Gameboard } from './';

describe('Gameboard', () => {
  it('renders all the rows and tiles', () => {
    renderWithProviders(<Gameboard />);

    expect(screen.getAllByTestId('gameboard-row')).toHaveLength(NUMBER_OF_ROWS);
    expect(screen.getAllByTestId('tile')).toHaveLength(NUMBER_OF_ROWS * NUMBER_OF_LETTERS);
  });

  it('renders rows with the correct letters and letter states', () => {
    renderWithProviders(<Gameboard />, {
      preloadedState: {
        wordle: {
          ...initialState,
          boardState: ['space', '', '', '', '', ''],
          boardRowState: [['absent', 'present', 'correct', 'correct', 'correct']],
        },
      },
    });

    const tiles = screen.getAllByTestId('tile').slice(0, NUMBER_OF_LETTERS);
    const expectedData = [
      { letter: 's', state: 'absent' },
      { letter: 'p', state: 'present' },
      { letter: 'a', state: 'correct' },
      { letter: 'c', state: 'correct' },
      { letter: 'e', state: 'correct' },
    ];

    tiles.forEach((tile, index) => {
      expect(tile).toHaveTextContent(expectedData[index].letter);
      expect(tile).toHaveAttribute('data-state', expectedData[index].state);
    });
  });
});
