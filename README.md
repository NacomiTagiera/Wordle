# Wordle Clone

This is a clone of a popular word game - [Wordle](https://www.nytimes.com/games/wordle/index.html). The app is deployed on Vercel and can be accessed at [`https://nextjs-redux-wordle-clone.vercel.app`](https://nextjs-redux-wordle-clone.vercel.app)

## How to play

1. The computer chooses a random five-letter word.
2. You have six tries to guess the word by submitting a five-letter word each time.
3. If a letter in your guess is in the correct position in the secret word, it will appear in **green**.
4. If a letter in your guess is in the secret word but in the wrong position, it will appear in **yellow**.
5. If a letter in your guess is not in the secret word, it will appear in **gray**.

## Technologies Used

- [Next.js](https://nextjs.org/) - A popular React framework for building server-side rendered applications.
- [TypeScript](https://www.typescriptlang.org/docs/) - A statically typed language that provides better developer experience and code maintainability.
- [Redux Toolkit](https://redux-toolkit.js.org/) - A library that simplifies the process of creating Redux stores and reducers.
- [Material UI](https://mui.com/material-ui/) - A React UI framework that provides pre-built components and styling.
- [Sass](https://sass-lang.com/documentation/) - A CSS preprocessor that makes it easy to create reusable styles.

## Testing

The project includes tests for Redux Toolkit Slice written with **Jest** and **React Testing Library**. To run all the tests, you can use:

`npm run test`

## Getting Started

To install and start the app locally, follow these steps:

1. Clone the repo:

```bash
git clone https://github.com/NacomiTagiera/Wordle.git
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
