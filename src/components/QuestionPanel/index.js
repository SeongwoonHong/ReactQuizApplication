'use strict';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import QuestionPanel from './QuestionPanel';
const mapStateToProps = (state) => {
  return {
    correctNumber: state.addNumber
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCorrectQuestionNumber: () => dispatch(addCorrectQuestionNumber())
  };
};

@connect(mapStateToProps, mapDispatchToProps, undefined, {withRef: true})
export default class extends QuestionPanel {
  constructor(props) {
    super(props);
    this.displayName = "QuestionPanel";
  }
}
