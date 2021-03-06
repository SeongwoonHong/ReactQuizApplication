'use strict';
import React from 'react';
import ReactF1 from 'react-f1';
import TransitionGroup from 'react-transition-group-plus';
import animate from 'gsap-promise';
import { findDOMNode } from 'react-dom';
import states from './states';
import transitions from './transitions';
import Ring from '../../components/Ring/Ring';
import Greeting from '../../components/Greeting/Greeting';
import QuestionPanel from '../../components/QuestionPanel/QuestionPanel';
import Summary from '../../components/Summary/Summary';
import Data from '../../data/data';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'out',
      currentQuestionNum: 0
    };
    this.landingAnimate = [];
    this.ringAnimate = [];
    this.isCorrect = [];
    this.questions = Data;
  }
  componentWillEnter(done) {
    this.animateIn().then(done);
  }
  componentWillLeave(done) {
    this.animateIn().then(done);
  }
  setIsCorrect = (questionNum) => {
    this.isCorrect[questionNum] = true;
  }
  componentDidMount = () => {
    animate.set([this.landingAnimate.title, this.landingAnimate.subtitle], { autoAlpha: 0});
    animate.set(this.ringAnimate, { scale: 0});
    this.animateIn();
  }
  animateIn = () => {
    return animate.all([
      animate.to(this.landingAnimate.title, 5, { autoAlpha: 1, ease: Expo.easeOut }),
      animate.to(this.landingAnimate.subtitle, 5, { autoAlpha: 1, delay: 0.5, ease: Expo.easeOut }),
      this.ringAnimate.map( (ring,i) => {
        return ring.animateIn(0.7 + (i * 0.33));
      })
    ]);
  }
  goToNext = () => {
    this.setState({ currentQuestionNum: this.state.currentQuestionNum + 1 })
    this.props.addCurrentQuestionNumber();
  }
  goToHome = () => {
    this.setState({ currentQuestionNum: 0});
    this.isCorrect = [];
    this.props.setCurrentNumber();
  }
  render() {
    return (
      <div id="Landing">
        <div className="landing-title" ref={ el => this.landingAnimate.title = el }>test your knowledge</div>
        <div className="landing-subtitle" ref={ el => this.landingAnimate.subtitle = el }>saturn</div>
          {
            this.questions.map((question, i) => {
              return (
                <Ring
                  key={question.questionNum}
                  isProgress={ this.props.currentNumber >= i+1 }
                  ref={ el => this.ringAnimate[i] = el }
                  isCorrect={ this.isCorrect[question.questionNum]}
                  index={ question.questionNum }
                />
              );
            })
          }
        <TransitionGroup component="div" className="greeting-wrapper">
          {
            this.state.currentQuestionNum === 0
            ? <Greeting onClick={ this.goToNext } />
            : undefined
          }
        </TransitionGroup>
        <TransitionGroup component="div" className="question-panel-wrapper">
          {
            this.state.currentQuestionNum !== 0 && this.state.currentQuestionNum <= this.questions.length
            ? <QuestionPanel
                question={this.questions[this.state.currentQuestionNum - 1].question}
                answers={this.questions[this.state.currentQuestionNum - 1].answerList}
                correctAnswer={this.questions[this.state.currentQuestionNum - 1].answerList.find(answer => answer.isCorrect === true).text}
                onClick={ this.goToNext }
                key={ this.state.currentQuestionNum }
                addCorrectQuestionNumber={ this.props.addCorrectQuestionNumber }
                currentQuestionNumber={ this.props.currentNumber}
                totalQuestionNumber={ this.questions.length }
                setIsCorrect={ (num) => this.setIsCorrect(num) }
              />
            : undefined
          }
        </TransitionGroup>
        <TransitionGroup component="div" className="summary-wrapper">
          {
            this.state.currentQuestionNum > this.questions.length
            ? <Summary goToHome={ this.goToHome } correctNumber={ this.props.correctNumber } totalQuestionNumber={ this.questions.length}/>
            : undefined
          }
        </TransitionGroup>
      </div>
    );
  }
};


export default Landing;
