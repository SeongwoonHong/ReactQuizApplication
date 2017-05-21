import React from 'react'
import classnames from 'classnames'
import TransitionGroup from 'react-transition-group-plus';
import animate from 'gsap-promise';
import { findDOMNode } from 'react-dom';
import SVGContainer from '../SVGContainer/SVGContainer';
import ResultReveal from '../ResultReveal/ResultReveal';
import SpanAnimatedText from '../SpanAnimatedText/SpanAnimatedText';
class QuestionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: undefined,
      eventReady: false
    }
    this.QuestionPanelAnimate = [];
    this.answertext = [];
    this.answerSvg = [];
  }
  componentDidMount = () => {
    const answerSvg = [...this.component.querySelectorAll('.answer-box svg')];
    animate.set(answerSvg, { strokeDasharray: '616px', strokeDashoffset: '-610px'});
    animate.set(this.answertext, { fontSize: '0px' });
  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  animateIn = () => {
    const answerSvg = [...this.component.querySelectorAll('.answer-box svg')];
    const animateText = [...this.component.querySelectorAll('.animate-text')];
    return animate.all([
      animate.staggerTo(animateText, 0.05, { autoAlpha: 1}, 0.025),
      animate.to(answerSvg, 2, { strokeDashoffset: '0px', ease: Expo.easeOut})
      .then(() => this.setState({ eventReady: true}, () => Promise.resolve()))
    ]);
  }
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.question !== this.props.question) {
      this.setState({ selectedAnswer: undefined });
    }
  }
  onClickHandler = (text) => {
    const answerSvg = [...this.component.querySelectorAll('.answer-box svg')];
    if(!this.state.selectedAnswer && this.state.eventReady) {
      this.setState({
        selectedAnswer: text
      })
      if(text === this.props.correctAnswer) {
        this.props.setIsCorrect(this.props.currentQuestionNumber);
        this.props.addCorrectQuestionNumber();
      }
    }
  }
  onMouseEnterHandler = (i) => {
    const answerSvg = [...this.component.querySelectorAll('.answer-box svg')];
    if(!this.state.selectedAnswer) {
      animate.set(answerSvg[i], { strokeDasharray: '616px', strokeDashoffset: '-610px'});
      animate.to(answerSvg, 1.5, { strokeDashoffset: '0px'}),
      animate.to(this.answerSvg[i], 0.35, { backgroundColor: 'rgba(181, 170, 129, 0.1)'});
    }
  }
  onMouseLeaveHandler = (i) => {
    if(!this.state.selectedAnswer) {
      animate.to(this.answerSvg[i], 0.35, { backgroundColor: 'initial'});

    }
  }
  getSpanText = (text) => {
    return text.split('').map((txt, i) => {
      return (
        <span key={i} className={`animate-text txt-${i}`}>{ txt }</span>
      );
    })
  }
  render () {
    return (
      <div className="question-panel" ref={ el => this.component = el }>
        <SpanAnimatedText className="question" text={this.props.question} />
        <div className="answers">
          {
            this.props.answers.map((answer, i) => {
              return (
                <div
                  key={i}
                  onClick={ () => this.onClickHandler(answer.text) }
                  ref={ el => this.QuestionPanelAnimate[answer[i]] = el }
                >
                  <SVGContainer
                    className="answer-box"
                    svg="answer-box"
                    onMouseEnter={ () => this.state.eventReady && this.onMouseEnterHandler(i) }
                    onMouseLeave={ () => this.state.eventReady && this.onMouseLeaveHandler(i) }
                    ref={ el => this.answerSvg[i] = findDOMNode(el)}
                  />
                  <SpanAnimatedText text={ answer.text} />
                  {
                    this.state.selectedAnswer === answer.text && this.state.selectedAnswer !== this.props.correctAnswer
                    ? <SVGContainer className="icons" svg="icon-incorrect" />
                    : undefined
                  }
                  {
                    this.state.selectedAnswer && this.props.correctAnswer === answer.text
                    ? <SVGContainer className="icons" svg="icon-correct" />
                    : undefined
                  }
                </div>
              );
            })
          }
        </div>
        <TransitionGroup component="div">
        {
          this.state.selectedAnswer
          ? <ResultReveal
              onClick={ this.props.onClick }
              currentQuestionNumber={ this.props.currentQuestionNumber}
              isCorrect={ this.state.selectedAnswer === this.props.correctAnswer }
              totalQuestionNumber={ this.props.totalQuestionNumber }
            />
          : undefined
        }
        </TransitionGroup>
      </div>
    );
  }
}
QuestionPanel.defaultProps = {

}
QuestionPanel.propTypes = {
  answer1: React.PropTypes.string,
  answer2: React.PropTypes.string,
  answer3: React.PropTypes.string,
  answer4: React.PropTypes.string,
  correctAnswer: React.PropTypes.string
}
export default QuestionPanel;
