import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { Key } from '.';

describe('Key', () => {
  it('renders with default props', () => {
    const { asFragment } = render(<Key onClick={() => {}}>A</Key>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays provided letter', () => {
    render(<Key onClick={() => {}}>A</Key>);

    screen.getByText('A');
    expect(screen.getByTestId('key')).toHaveTextContent('A');
  });

  it('injects optional props when they are specified', () => {
    render(
      <Key onClick={() => {}} ariaLabel='A' dataKey='A' letterState='present'>
        A
      </Key>
    );

    expect(screen.getByTestId('key')).toHaveAttribute('aria-label', 'A');
    expect(screen.getByTestId('key')).toHaveAttribute('data-key', 'A');
    expect(screen.getByTestId('key')).toHaveAttribute('data-state', 'present');
  });

  it('assigns proper class name when large prop is true', () => {
    render(
      <Key onClick={() => {}} large>
        A
      </Key>
    );
    expect(screen.getByTestId('key')).toHaveClass('key--large');
  });

  it('invokes onClick function when clicked', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Key onClick={onClick}>A</Key>);

    await user.click(screen.getByTestId('key'));
    expect(onClick).toHaveBeenCalled();
  });
});
