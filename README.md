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


## Some Enhancements / TODO
- Add more unit tests
- Save sorting / filters to session storage or DB
- Refactor filters state
- Add similar characters to individual character page
- Update preloader / pre-fetch some data