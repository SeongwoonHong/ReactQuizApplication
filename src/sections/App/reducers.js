'use strict';
import keys from './keys';

const defaultState = {
  correctNumber: 0,
  currentNumber: 0
}

export const progress = function(state = 0, action) {
  switch (action.type) {
    case keys.SET_PROGRESS:
      return action.progress;
    default:
      return state
  }
};

export const ready = function(state = false, action) {
  switch (action.type) {
    case keys.SET_READY:
      return action.ready;
    default:
      return state
  }
};

const list = require('../../../raw-assets/preload.json');
export const assets = (state = list, action) => {
  switch (action.type) {
    case keys.SET_ASSETS:
      return action.assets;
    default:
      return state
  }
};

export const addNumber = function(state = defaultState, action) {
  switch(action.type) {
    case keys.ADD_CORRECT_QUESTION_NUMBER:
      return { ...state, correctNumber: state.correctNumber + 1};
    case keys.SET_CURRENTNUMBER:
      return { ...state, correctNumber: 0 }
    default:
      return state;
  }
}

export const addCurrentNumber = function(state= defaultState, action) {
  switch(action.type) {
    case keys.ADD_CURRENT_QUESTION_NUMBER:
      return { ...state, currentNumber: state.currentNumber + 1}
    case keys.SET_CURRENTNUMBER:
      return { ...state, currentNumber: 0}
    default:
      return state;
  }
}
