import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { initialState } from '@/redux/slices/wordleSlice';
import type { GameState } from '@/types';
import { NUMBER_OF_LETTERS, NUMBER_OF_ROWS } from '@/utils/constants';
import { renderWithProviders } from '@/utils/test-utils';

import { Game } from '.';

describe('Game', () => {
  const extractKeysDataState = () =>
    screen.getAllByTestId('key').reduce((acc, key) => {
      if (key.hasAttribute('data-state') && typeof key.textContent === 'string') {
        const letter = key.textContent;
        const state = key.getAttribute('data-state');
        return { ...acc, [letter]: state };
      }
      return acc;
    }, {});

  const testInvalidSubmission = (
    gameState: GameState,
    expectedTileData: { letter: string; state: string }[]
  ) => {
    const tiles = screen.getAllByTestId('tile').slice(0, NUMBER_OF_LETTERS);
    const keys = screen.getAllByTestId('key');

    expect(gameState.currentRowIndex).toEqual(0);
    expect(gameState.keyboardLetterState).toEqual({});
    expect(gameState.boardRowState).toEqual([]);

    tiles.forEach((tile, index) => {
      expect(tile).toHaveTextContent(expectedTileData[index].letter);
      expect(tile).toHaveAttribute('data-state', expectedTileData[index].state);
    });

    keys.forEach((key) => {
      expect(key).not.toHaveAttribute('data-state');
    });
  };

  it('does not accept non-alphabetical characters', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Game />);

    await user.keyboard('1');
    expect(screen.getAllByTestId('tile')[0]).toHaveTextContent('');

    await user.keyboard('!');
    expect(screen.getAllByTestId('tile')[0]).toHaveTextContent('');
  });

  it('adds letters to the current guess', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Game />);

    await user.click(screen.getByText('a'));
    expect(store.getState().wordle.boardState[0]).toEqual('a');
    expect(screen.getAllByTestId('tile')[0]).toHaveTextContent('a');

    await user.click(screen.getByText('b'));
    expect(store.getState().wordle.boardState[0]).toEqual('ab');
    expect(screen.getAllByTestId('tile')[1]).toHaveTextContent('b');
  });

  it('does not add letters to the current guess if the current row is full', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Game />, {
      preloadedState: { wordle: { ...initialState, boardState: ['abcde', '', '', '', '', ''] } },
    });

    await user.keyboard('f');
    expect(store.getState().wordle.boardState).toEqual(['abcde', '', '', '', '', '']);
    expect(screen.getAllByTestId('tile')[5]).toHaveTextContent('');
    expect(screen.getAllByText('f')).toHaveLength(1); // only on the keyboard
  });

  it('removes letters from the current guess', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Game />, {
      preloadedState: { wordle: { ...initialState, boardState: ['abc', '', '', '', '', ''] } },
    });

    await user.keyboard('{Backspace}');
    expect(store.getState().wordle.boardState[0]).toEqual('ab');
    expect(screen.getAllByTestId('tile')[2]).toHaveTextContent('');

    await user.click(screen.getByLabelText('backspace'));
    expect(store.getState().wordle.boardState[0]).toEqual('a');
    expect(screen.getAllByTestId('tile')[1]).toHaveTextContent('');
  });

  it('does not try to remove letters from the current guess when it is empty', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Game />, {
      preloadedState: {
        wordle: { ...initialState, boardState: ['coder', '', '', '', '', ''], currentRowIndex: 1 },
      },
    });

    await user.keyboard('{Backspace}');
    expect(store.getState().wordle.boardState).toEqual(['coder', '', '', '', '', '']);
    expect(store.getState().wordle.currentRowIndex).toEqual(1);
    expect(screen.getAllByTestId('tile')[4]).toHaveTextContent('r');
    expect(screen.getAllByTestId('tile')[5]).toHaveTextContent('');
  });

  it('submits and evaluates the current guess', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Game />, {
      preloadedState: {
        wordle: { ...initialState, boardState: ['coder', '', '', '', '', ''], solution: 'cobra' },
      },
    });

    await user.keyboard('{Enter}');
    const gameState = store.getState().wordle;
    const tiles = screen.getAllByTestId('tile').slice(0, NUMBER_OF_LETTERS);
    const keysDataState = extractKeysDataState();

    tiles.forEach((tile, index) => {
      expect(tile).toHaveAttribute('data-state', gameState.boardRowState[0][index]);
    });
    expect(keysDataState).toEqual({
      c: 'correct',
      o: 'correct',
      d: 'absent',
      e: 'absent',
      r: 'present',
    });

    expect(gameState.keyboardLetterState).toEqual({
      c: 'correct',
      o: 'correct',
      d: 'absent',
      e: 'absent',
      r: 'present',
    });
    expect(gameState.boardRowState).toEqual([
      ['correct', 'correct', 'absent', 'absent', 'present'],
    ]);
    expect(gameState.status).toEqual('playing');
    expect(gameState.currentRowIndex).toEqual(1);
  });

  it('does not submit incomplete guess', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Game />, {
      preloadedState: { wordle: { ...initialState, boardState: ['code', '', '', '', '', ''] } },
    });

    await user.click(screen.getByText('enter'));
    const gameState = store.getState().wordle;
    const expectedTileData = [
      { letter: 'c', state: 'tbd' },
      { letter: 'o', state: 'tbd' },
      { letter: 'd', state: 'tbd' },
      { letter: 'e', state: 'tbd' },
      { letter: '', state: 'empty' },
    ];

    expect(gameState.boardState).toEqual(['code', '', '', '', '', '']);
    testInvalidSubmission(gameState, expectedTileData);
  });

  it('does not submit invalid word', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Game />, {
      preloadedState: {
        wordle: { ...initialState, boardState: ['codek', '', '', '', '', ''] },
      },
    });

    await user.click(screen.getByText('enter'));
    const gameState = store.getState().wordle;
    const expectedTileData = [
      { letter: 'c', state: 'tbd' },
      { letter: 'o', state: 'tbd' },
      { letter: 'd', state: 'tbd' },
      { letter: 'e', state: 'tbd' },
      { letter: 'k', state: 'tbd' },
    ];

    expect(gameState.boardState).toEqual(['codek', '', '', '', '', '']);
    testInvalidSubmission(gameState, expectedTileData);
  });

  it('ends the game after correctly guessing the solution', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Game />, {
      preloadedState: {
        wordle: { ...initialState, boardState: ['cobra', '', '', '', '', ''], solution: 'cobra' },
      },
    });

    await user.keyboard('{Enter}');
    const gameState = store.getState().wordle;
    const tiles = screen.getAllByTestId('tile').slice(0, NUMBER_OF_LETTERS);
    const keysDataState = extractKeysDataState();

    tiles.forEach((tile) => {
      expect(tile).toHaveAttribute('data-state', 'correct');
    });
    expect(keysDataState).toEqual({
      c: 'correct',
      o: 'correct',
      b: 'correct',
      r: 'correct',
      a: 'correct',
    });

    expect(gameState.status).toEqual('win');
    expect(gameState.boardRowState).toEqual([
      ['correct', 'correct', 'correct', 'correct', 'correct'],
    ]);
    expect(gameState.keyboardLetterState).toEqual({
      c: 'correct',
      o: 'correct',
      b: 'correct',
      r: 'correct',
      a: 'correct',
    });

    await user.keyboard('x');
    expect(screen.getAllByTestId('tile')[5]).toHaveTextContent('');
    expect(screen.getAllByText('x')).toHaveLength(1);
  });

  it('ends the game after too many incorrect guesses', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Game />, {
      preloadedState: {
        wordle: {
          ...initialState,
          solution: 'power',
        },
      },
    });

    await user.keyboard('blush{Enter}aging{Enter}mummy{Enter}admit{Enter}flint{Enter}bluff{Enter}');
    const gameState = store.getState().wordle;
    const tiles = screen.getAllByTestId('tile');
    const keysDataState = extractKeysDataState();

    tiles.forEach((tile) => {
      expect(tile).toHaveAttribute('data-state', 'absent');
    });
    expect(keysDataState).toEqual({
      a: 'absent',
      b: 'absent',
      d: 'absent',
      f: 'absent',
      g: 'absent',
      h: 'absent',
      i: 'absent',
      l: 'absent',
      m: 'absent',
      n: 'absent',
      s: 'absent',
      t: 'absent',
      u: 'absent',
      y: 'absent',
    });
    expect(gameState.status).toEqual('fail');

    // check if user can do anything after the game is over
    await user.keyboard('x');
    expect(screen.getAllByText('x')).toHaveLength(1);
    await user.keyboard('{Backspace}');
    expect(tiles[NUMBER_OF_LETTERS * NUMBER_OF_ROWS - 1]).toHaveTextContent('f');
  });
});
