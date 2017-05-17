import React from 'react'
import animate from 'gsap-promise';
import TransitionGroup from 'react-transition-group-plus';
import ContinueButton from '../ContinueButton/ContinueButton';
class ResultReveal extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const animateText = [...this.component.querySelectorAll('.animate-text')];
    animate.set(this.message, { autoAlpha: 0 });
    animate.set(animateText, { autoAlpha: 0 });
  }
  componentWillReceiveProps = (nextProps) => {

  }
  componentWillAppear = (done) => {
    this.animateIn().then();
  }
  componentWillEnter = (done) => {
    this.animateIn().then();
  }
  getSpanText = (text) => {
    return text.split('').map((txt, i) => {
      return (
        <span key={i} className={`animate-text txt-${i}`}>{ txt }</span>
      );
    })
  }
  animateIn = () => {
    const animateText = [...this.component.querySelectorAll('.animate-text')];
    return animate.all([
      animate.to(this.message, 3, { autoAlpha: 1 }),
      animate.staggerTo(animateText, 0.1, { autoAlpha: 1}, 0.05)
    ]);
  }
  render () {
    return (
      <div className="result-reveal" ref={ el => this.component = el }>
        <div className="result-message" ref={ el => this.message = el}>
          {
            this.props.isCorrect
            ? <span>{this.getSpanText('Great! That is correct')}</span>
            : <span>{this.getSpanText('Oops! That is not correct')}</span>
          }
        </div>
        <TransitionGroup component="div">
          <ContinueButton onClick={this.props.onClick} className="continue-button" text={this.props.currentQuestionNumber === this.props.totalQuestionNumber ? 'Summary' : 'Continue'} />
        </TransitionGroup>
      </div>
    );
  }
}
ResultReveal.defaultProps = {
  isCorrect: undefined
}
ResultReveal.propTypes = {
  isCorrect: React.PropTypes.bool
}
export default ResultReveal;
