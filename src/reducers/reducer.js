/**
Example TODO app --- 

import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp


---
 */

import { combineReducers } from 'redux'
import {
  SELECT_MARKET, REQUEST_MARKET, RECEIVE_MARKET
} from '../actions'

function selectedMarket(state = 'btc-ltc', action) {
  switch (action.type) {
    case SELECT_MARKET:
      return action.market
    default:
      return state
  }
}

function marketData(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch(action.type) {
    case REQUEST_MARKET:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_MARKET:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.marketResponse,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function dataByMarket(state = {}, action) {
  switch (action.type) {
    case RECEIVE_MARKET:
    case REQUEST_MARKET:
      return Object.assign({}, state, {
        [action.market]: marketData(state[action.market], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  dataByMarket,
  selectedMarket
})

export default rootReducer