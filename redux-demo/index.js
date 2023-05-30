const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

// Action type
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

// Action is an object with type property
//Action Creator is function that returns an action
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function reStockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

// (previousState, action) => newState
const initialState = {
  numOfCakes: 10,
};

// Pure reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

// Passing reducer store have the initial state
const store = createStore(reducer, applyMiddleware(logger));
console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => {});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(reStockCake(3));

const action = bindActionCreators({ orderCake, reStockCake }, store.dispatch);

action.orderCake();
action.orderCake();
action.orderCake();
action.reStockCake(3);

unsubscribe();
