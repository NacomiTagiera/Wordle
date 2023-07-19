import { LetterState } from '@/types';

export const NUMBER_OF_ROWS = 6;
export const NUMBER_OF_LETTERS = 5;

export const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
];

export const examples: {
  word: string;
  letterState: LetterState;
  description: string;
}[] = [
  {
    word: 'weary',
    letterState: 'correct',
    description: 'W is in the word and in the correct spot.',
  },
  {
    word: 'pills',
    letterState: 'present',
    description: 'I is in the word but in the wrong spot.',
  },
  {
    word: 'vague',
    letterState: 'absent',
    description: 'G is not in the word in any spot.',
  },
];
