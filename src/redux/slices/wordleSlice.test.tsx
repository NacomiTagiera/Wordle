import { type GameState } from '@/types';

import {
  addLetter,
  reducer as wordle,
  removeLetter,
  resetGame,
  resetMessage,
  submitGuess,
} from './wordleSlice';

const initialState: GameState = {
  boardRowState: [],
  boardState: new Array(2).fill('') as string[],
  currentRowIndex: 0,
  keyboardLetterState: {},
  message: { message: '', duration: 1500 },
  solution: 'space',
  status: 'playing',
};

describe('wordleSlice', () => {
  it('should reset the game state correctly', () => {
    const prevState: GameState = {
      boardRowState: [
        ['present', 'absent', 'correct', 'correct', 'correct'],
        ['correct', 'correct', 'correct', 'correct', 'correct'],
      ],
      boardState: ['place', 'space'],
      currentRowIndex: 2,
      keyboardLetterState: {
        s: 'correct',
        p: 'correct',
        a: 'correct',
        c: 'correct',
        e: 'correct',
      },
      message: { message: 'You win!', duration: 0 },
      solution: 'space',
      status: 'win',
    };

    const currState = wordle(prevState, resetGame());

    expect(currState.boardRowState).toHaveLength(0);
    expect(currState.boardState).toHaveLength(6);
    expect(currState.boardState.every((row) => row === '')).toBe(true);
    expect(currState.currentRowIndex).toBe(0);
    expect(Object.keys(currState.keyboardLetterState)).toHaveLength(0);
    expect(currState.message).toEqual({ message: '', duration: 1500 });
    expect(typeof currState.solution).toBe('string');
    expect(currState.status).toBe('playing');
  });

  it('should add a letter to the current row correctly', () => {
    const prevState = wordle(initialState, addLetter('a'));
    expect(prevState.boardState[0]).toBe('a');

    const currState = wordle(prevState, addLetter('b'));
    expect(currState.boardState[0]).toBe('ab');
  });

  it('should not add a letter when the current row is already full', () => {
    const prevState: GameState = {
      ...initialState,
      boardState: ['aisle'],
    };

    expect(wordle(prevState, addLetter('a')).boardState[0]).toHaveLength(5);
  });

  it('should not add a letter when the game status is not equal to playing', () => {
    const prevState: GameState = {
      ...initialState,
      boardState: ['space'],
      status: 'win',
    };
    expect(wordle(prevState, addLetter('s')).boardState[0]).toBe('space');
  });

  it('should remove the last letter from the current row correctly', () => {
    const prevState: GameState = {
      ...initialState,
      boardState: ['knife', 'spice'],
      currentRowIndex: 1,
    };
    expect(wordle(prevState, removeLetter()).boardState[1]).toBe('spic');
  });

  it('should not remove a letter when the current row is empty', () => {
    const currState = wordle(initialState, removeLetter());

    expect(currState.boardState[0]).toBe('');
    expect(currState.currentRowIndex).toBe(0);
  });

  it('should not remove a letter when the game status is not equal to playing', () => {
    const prevState: GameState = {
      ...initialState,
      boardState: ['salty'],
      status: 'fail',
    };
    expect(wordle(prevState, removeLetter()).boardState[0]).toBe('salty');
  });

  it('should handle submitting correct guess', () => {
    const prevState: GameState = {
      ...initialState,
      boardState: ['space'],
    };
    const currState = wordle(prevState, submitGuess());

    expect(currState.status).toEqual('win');
    expect(currState.boardRowState).toEqual([
      ['correct', 'correct', 'correct', 'correct', 'correct'],
    ]);
    expect(currState.keyboardLetterState).toEqual({
      s: 'correct',
      p: 'correct',
      a: 'correct',
      c: 'correct',
      e: 'correct',
    });
    expect(currState.message).toEqual({
      message: 'You win!',
      duration: 0,
    });
  });

  it('should handle submitting incorrect guess', () => {
    const prevState: GameState = {
      ...initialState,
      boardState: ['place'],
    };
    const currState = wordle(prevState, submitGuess());

    expect(currState.boardRowState).toEqual([
      ['present', 'absent', 'correct', 'correct', 'correct'],
    ]);
    expect(currState.currentRowIndex).toBe(1);
    expect(currState.keyboardLetterState).toEqual({
      p: 'present',
      l: 'absent',
      a: 'correct',
      c: 'correct',
      e: 'correct',
    });
  });

  it('should not submit invalid word', () => {
    const prevState: GameState = {
      ...initialState,
      boardState: ['aaaaa'],
    };
    const currState = wordle(prevState, submitGuess());

    expect(currState.boardRowState).toHaveLength(0);
    expect(currState.currentRowIndex).toBe(0);
    expect(Object.keys(currState.keyboardLetterState)).toHaveLength(0);
    expect(currState.message.message).toBe('Not in word list');
  });

  it('should not submit incomplete guess', () => {
    const prevState: GameState = {
      ...initialState,
      boardState: ['spac'],
    };
    const currState = wordle(prevState, submitGuess());

    expect(currState.boardRowState).toHaveLength(0);
    expect(currState.currentRowIndex).toBe(0);
    expect(Object.keys(currState.keyboardLetterState)).toHaveLength(0);
    expect(currState.message.message).toBe('Not enough letters');
  });

  it('should end the game correctly', () => {
    const prevState: GameState = {
      ...initialState,
      boardState: ['sport', 'speed'],
      currentRowIndex: 1,
    };
    const currState = wordle(prevState, submitGuess());

    expect(currState.currentRowIndex).toBe(2);
    expect(currState.message).toEqual({ message: 'space', duration: 0 });
    expect(currState.status).toBe('fail');
  });

  it('should reset the message correctly', () => {
    const prevState: GameState = {
      ...initialState,
      message: { message: 'message', duration: 2000 },
    };
    expect(wordle(prevState, resetMessage()).message.message).toBe('');
    expect(wordle(prevState, resetMessage()).message.duration).toBe(1500);
  });
});
