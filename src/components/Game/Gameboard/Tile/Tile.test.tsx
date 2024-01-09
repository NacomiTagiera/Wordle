import { render, screen } from '@testing-library/react';

import { Tile } from '.';

describe('Tile', () => {
  it('displays provided letter', () => {
    render(<Tile letter='a' />);
    expect(screen.getByTestId('tile')).toHaveTextContent('a');
  });

  it('assigns aria-label and data-state attributes by letterState', () => {
    const { rerender } = render(<Tile letter='' />);
    expect(screen.getByTestId('tile')).toHaveAttribute('data-state', 'empty');
    expect(screen.getByTestId('tile')).toHaveAttribute('aria-label', 'empty');

    rerender(<Tile letter='a' />);
    expect(screen.getByTestId('tile')).toHaveAttribute('data-state', 'tbd');

    rerender(<Tile letter='a' letterState='absent' />);
    expect(screen.getByTestId('tile')).toHaveAttribute('data-state', 'absent');
    expect(screen.getByTestId('tile')).toHaveAttribute('aria-label', 'a absent');

    rerender(<Tile letter='a' letterState='correct' />);
    expect(screen.getByTestId('tile')).toHaveAttribute('data-state', 'correct');
    expect(screen.getByTestId('tile')).toHaveAttribute('aria-label', 'a correct');

    rerender(<Tile letter='a' letterState='present' />);
    expect(screen.getByTestId('tile')).toHaveAttribute('data-state', 'present');
    expect(screen.getByTestId('tile')).toHaveAttribute('aria-label', 'a present');
  });

  it('injects proper class name when small prop is true', () => {
    render(<Tile letter='a' small />);
    expect(screen.getByTestId('tile')).toHaveClass('tile_small');
  });
});
