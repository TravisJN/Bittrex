NOTE: This app has been converted to a TypeScript project. Check it out here: https://github.com/TravisJN/bittrex-ts




Bittrex Portal
=====
This app connects to the Bittrex API and displays the current balances of the user's wallet.

I intend to add the ability to Buy and Sell currencies with advanced trading strategies such as trailing stops or other algorithm driven actions.

### How to Use
1. Clone this github repo into a local directory
2. You'll need to add a new folder in the root directory called `private` and add a new file `Keys.js` that contains the following code:
```
module.exports = {
    apiKey: 'your bittrex API key',
    secret: 'your bittrext API secret'
}
```
Note: the `private` folder is in `.gitignore` and will not be tracked by git

3. run `npm install`

4. In order to avoid CORS issues within the browser, the API requests are all proxied through a simple node server that will need to be running while the app is open. The server is located in the `server` folder and can be started by running the following command from this project's root directory `node server/server.js`. You should see a message in your terminal that says the server is now listening for requests.

5. In another terminal window, from this project's root directory, run `npm start`. This should automatically open your browser and load the application. Enjoy!

### Made with React

This project is open source and made with React. This is my first real React application and is mostly a learning opportunity for me to learn the React framework.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
