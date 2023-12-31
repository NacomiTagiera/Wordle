import { fireEvent, screen } from '@testing-library/react';

import { initialState } from '@/redux/slices/wordleSlice';
import { type LetterState } from '@/types';
import { renderWithProviders } from '@/utils/test-utils';

import { Keyboard } from '.';

describe('Keyboard', () => {
  it('renders all keys', () => {
    renderWithProviders(
      <Keyboard
        onBackspaceClick={() => {}}
        onEnterClick={() => {}}
        onLetterClick={(_letter) => {}}
      />
    );

    const keys = screen.getAllByTestId('key');
    expect(keys).toHaveLength(28); // 26 letters + enter + backspace
  });

  it('assigns to keys proper letterState', () => {
    const keyboardLetterState: Record<string, LetterState> = {
      a: 'correct',
      b: 'present',
      c: 'absent',
    };

    renderWithProviders(
      <Keyboard
        onBackspaceClick={() => {}}
        onEnterClick={() => {}}
        onLetterClick={(_letter) => {}}
      />,
      { preloadedState: { wordle: { ...initialState, keyboardLetterState } } }
    );

    const keys = screen.getAllByTestId('key');
    const keysWithLetterState = keys.filter((key) => keyboardLetterState[key.textContent!]);

    keysWithLetterState.forEach((key) => {
      const letter = key.textContent!;
      const expectedState = keyboardLetterState[letter];
      expect(key).toHaveAttribute('data-state', expectedState);
    });
  });

  it('invokes all onClick handlers', () => {
    const onBackspaceClick = jest.fn();
    const onEnterClick = jest.fn();
    const onLetterClick = jest.fn();

    renderWithProviders(
      <Keyboard
        onBackspaceClick={onBackspaceClick}
        onEnterClick={onEnterClick}
        onLetterClick={onLetterClick}
      />
    );

    fireEvent.click(screen.getByLabelText(/backspace/i));
    fireEvent.click(screen.getByText(/enter/));
    fireEvent.click(screen.getByText(/a/));

    expect(onBackspaceClick).toHaveBeenCalledTimes(1);
    expect(onEnterClick).toHaveBeenCalledTimes(1);
    expect(onLetterClick).toHaveBeenCalledWith('a');
  });

  it('does not invoke any onClick handlers when game status is not "playing"', () => {
    const onBackspaceClick = jest.fn();
    const onEnterClick = jest.fn();
    const onLetterClick = jest.fn();

    renderWithProviders(
      <Keyboard
        onBackspaceClick={onBackspaceClick}
        onEnterClick={onEnterClick}
        onLetterClick={onLetterClick}
      />,
      { preloadedState: { wordle: { ...initialState, status: 'win' } } }
    );

    fireEvent.keyUp(window, { key: 'Backspace' });
    fireEvent.keyUp(window, { key: 'Enter' });
    fireEvent.keyUp(window, { key: 'a' });

    expect(onBackspaceClick).not.toHaveBeenCalled();
    expect(onEnterClick).not.toHaveBeenCalled();
    expect(onLetterClick).not.toHaveBeenCalled();
  });
});
