import React from 'react'
import animate from 'gsap-promise';
import BezierEasing from 'bezier-easing';
import ContinueButton from '../ContinueButton/ContinueButton';
import TransitionGroup from 'react-transition-group-plus';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.greetingAnimate = [];
  }
  componentDidMount = () => {
    animate.set([this.greetingAnimate.title, this.greetingAnimate.subtitle], { autoAlpha: 0, y: '40px' });
  }
  componentWillReceiveProps = (nextProps) => {

  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  componentWillLeave = (done) => {
    this.animateOut().then(done);
  }
  animateIn = async() => {
    await animate.to({}, 0.8);
    return animate.all([
      animate.to(this.greetingAnimate.title, 1, { autoAlpha: 1, y: '0px', ease: Expo.easeOut }),
      animate.to(this.greetingAnimate.subtitle, 1, { autoAlpha: 1, delay: 0.3, y: '0px', ease: Expo.easeOut }),
    ]);
  }
  animateOut = () => {
    return animate.to(this.component, 1, { autoAlpha: 0, ease: Expo.easeOut });
  }
  render () {
    return (
      <div className="greeting" ref={ el => this.component = el }>
        <h1 ref={ el => this.greetingAnimate.title = el }>{ this.props.title }</h1>
        <h3 ref={ el => this.greetingAnimate.subtitle = el}>{ this.props.subtitle }</h3>
        <TransitionGroup component="div">
          <ContinueButton onClick={this.props.onClick} className="greeting-button" text="Begin" />
        </TransitionGroup>
      </div>
    );
  }
}
Greeting.defaultProps = {
  title: 'Welcome',
  subtitle: 'Click begin to test your knowledge of Saturn'
}
Greeting.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
}
export default Greeting;
