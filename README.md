# GhostHunter

## `A transaction explorer similar to Etherscan, but only for AAVE transactions and users. `

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Data Queried from [theGraph](https://thegraph.com/hosted-service/subgraph/aave/protocol-v2)

All Graph Queries are included separately in `ghost_hunter/src/graph-qls` folder

## Prerequisites

Get a Etherscan API

Create a .env with `REACT_APP_ETHERSCAN_API_KEY = <YOUR_API_KEY>`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
