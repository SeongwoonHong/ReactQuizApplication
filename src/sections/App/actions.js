'use strict';
import keys from './keys';

export const setReady = function(ready) {
  return {
    type: keys.SET_READY,
    ready
  }
};

export const setProgress = function(progress) {
  return {
    type: keys.SET_PROGRESS,
    progress
  }
};

export const setAssets = function(assets) {
  return {
    type: keys.SET_ASSETS,
    assets
  }
};

export const addCorrectQuestionNumber = function() {
  return {
    type: keys.ADD_CORRECT_QUESTION_NUMBER
  }
}

export const addCurrentQuestionNumber = function() {
  return {
    type: keys.ADD_CURRENT_QUESTION_NUMBER
  }
}
