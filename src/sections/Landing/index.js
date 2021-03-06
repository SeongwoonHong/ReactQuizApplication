'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Landing from './Landing';
import { addCorrectQuestionNumber, addCurrentQuestionNumber, setCurrentNumber } from '../App/actions';
const mapStateToProps = (state) => {
  return {
    correctNumber: state.addNumber.correctNumber,
    currentNumber: state.addCurrentNumber.currentNumber
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCorrectQuestionNumber: () => dispatch(addCorrectQuestionNumber()),
    addCurrentQuestionNumber: () => dispatch(addCurrentQuestionNumber()),
    setCurrentNumber: () => dispatch(setCurrentNumber())
  };
};

export default connect(mapStateToProps, mapDispatchToProps, undefined, {withRef: true})(Landing);
