# Wordle Clone

This is a clone of a popular word game - [Wordle](https://www.nytimes.com/games/wordle/index.html). The app is deployed on Vercel and can be accessed at [`https://nextjs-redux-wordle-clone.vercel.app`](https://nextjs-redux-wordle-clone.vercel.app).

![Wordle](https://github.com/NacomiTagiera/Wordle/assets/106376178/be4f7218-3f6a-4ef4-b7b8-5ecbf23ea5c1)
![Instructions](https://github.com/NacomiTagiera/Wordle/assets/106376178/f514b768-8f5b-4e50-89bc-ab9bb1bd9fc3)

## How to play

1. The computer chooses a random five-letter word.
2. You have six tries to guess the word by submitting a five-letter word each time.
3. If a letter in your guess is in the correct position in the secret word, it will appear in **green**.
4. If a letter in your guess is in the secret word but in the wrong position, it will appear in **yellow**.
5. If a letter in your guess is not in the secret word, it will appear in **gray**.

## Technologies Used

- [Next.js](https://nextjs.org/) - Popular React framework for building server-side rendered applications. I haven't really utilized the SSR capabilities of Next.js in this project, but I chose it because it provides a great developer experience and makes it easy to build a production-ready React app.
- [TypeScript](https://www.typescriptlang.org/docs/) - Statically typed language that provides better developer experience and code maintainability.
- [Redux Toolkit](https://redux-toolkit.js.org/) - Library that simplifies the process of creating Redux stores and reducers.
- [Sass](https://sass-lang.com/documentation/) - CSS preprocessor that makes it easy to create reusable styles.
- [Material UI](https://mui.com/material-ui/) - React UI framework that provides pre-built components and styling.

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
