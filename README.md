# SWAPI challenge

## Getting Started

### SWAPI GraphQL wrapper

Clone the repository
```
git clone https://github.com/graphql/swapi-graphql.git
```

Install dependencies
```
yarn
```
or
```
npm install
```

Start the server
```
export PORT=3333; yarn start
```

or

```
export PORT=3333; npm run start
```


### Fullstack app
Clone the repository
```
git clone https://github.com/salman-amjad/swapi-challenge.git
```

Install dependencies
```
yarn
```
or
```
npm install
```

Run the app in production mode
```
blitz build && blitz start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the app.

## Tests

Runs your tests using Jest.

```
yarn test
```

Blitz comes with a test setup using [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  export    Export your Blitz app as a static application
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  install   Install a recipe
  help      Display help for blitz
  test      Run project tests