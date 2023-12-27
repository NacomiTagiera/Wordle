import { fireEvent, render, screen } from '@testing-library/react';

import { Instructions } from '.';

describe('Instructions', () => {
  it('displays the instructions', () => {
    render(<Instructions open onClose={() => {}} />);

    expect(screen.getByTestId('instructions')).toBeVisible();
    expect(screen.getByText(/how to play/i)).toBeVisible();
    expect(screen.getByText(/examples/i)).toBeVisible();
  });

  it('calls the onClose function when close button is clicked', () => {
    const onClose = jest.fn();

    render(<Instructions open onClose={onClose} />);

    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('is not being displayed when open prop is set to false', () => {
    render(<Instructions open={false} onClose={() => {}} />);

    expect(screen.queryByTestId('instructions')).not.toBeVisible();
  });
});
