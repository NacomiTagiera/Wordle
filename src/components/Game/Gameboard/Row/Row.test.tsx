import { render, screen } from '@testing-library/react';

import { NUMBER_OF_LETTERS } from '@/utils/constants';

import { Row } from '.';

describe('Row', () => {
  it('assigns aria-label attribute', () => {
    render(<Row ariaLabel='Row 1' letters='abcde' />);
    expect(screen.getByTestId('gameboard-row')).toHaveAttribute('aria-label', 'Row 1');
  });

  it('gives each tile proper letter', () => {
    render(<Row ariaLabel='Row 1' letters='abcde' />);
    const tiles = screen.getAllByTestId('tile');

    expect(tiles[0]).toHaveTextContent('a');
    expect(tiles[1]).toHaveTextContent('b');
    expect(tiles[2]).toHaveTextContent('c');
    expect(tiles[3]).toHaveTextContent('d');
    expect(tiles[4]).toHaveTextContent('e');
  });

  it('fills empty tiles with empty string', () => {
    render(<Row ariaLabel='Row 1' letters='abc' />);
    const tiles = screen.getAllByTestId('tile');

    expect(tiles.length).toBe(NUMBER_OF_LETTERS);
    expect(tiles[NUMBER_OF_LETTERS - 2]).toHaveTextContent('');
    expect(tiles[NUMBER_OF_LETTERS - 1]).toHaveTextContent('');
  });

  it('renders correct number of tiles except too long letters string', () => {
    render(<Row ariaLabel='Row 1' letters='abcdef' />);
    const tiles = screen.getAllByTestId('tile');

    expect(tiles).toHaveLength(NUMBER_OF_LETTERS);
    expect(screen.queryByText('f')).toBeNull();
  });

  it('gives each tile proper letter state', () => {
    render(
      <Row
        ariaLabel='Row 1'
        letters='abcde'
        lettersState={['correct', 'present', 'absent', 'present', 'absent']}
      />
    );
    const tiles = screen.getAllByTestId('tile');

    expect(tiles[0]).toHaveAttribute('data-state', 'correct');
    expect(tiles[1]).toHaveAttribute('data-state', 'present');
    expect(tiles[2]).toHaveAttribute('data-state', 'absent');
    expect(tiles[3]).toHaveAttribute('data-state', 'present');
    expect(tiles[4]).toHaveAttribute('data-state', 'absent');
  });
});
