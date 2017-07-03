// Define actions here
/**
 * e.g. 

let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

 */

import fetch from 'isomorphic-fetch'

export const GET_MARKET = 'GET_MARKET';

export function getMarket(market) {
  return {
    type: GET_MARKET,
    market
  }
}

export const REQUEST_MARKET = 'REQUEST_MARKET';

function requestMarket(market) {
  return {
    type: REQUEST_MARKET,
    market
  }
}

export const RECEIVE_MARKET = 'RECEIVE_MARKET';

function receiveMarket(market, json) {
  return {
    type: RECEIVE_MARKET,
    market,
    response: json,
    receivedAt: Date.now()
  }
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchMarket(market) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestMarket(market))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://localhost:8080/public/getmarketsummary?market=${market}`)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveMarket(market, json))
      )

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}