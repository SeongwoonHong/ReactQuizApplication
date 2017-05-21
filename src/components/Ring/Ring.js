import React from 'react';
import animate from 'gsap-promise';
import SVGContainer from '../SVGContainer/SVGContainer';
import BezierEasing from 'bezier-easing';
import CorrectRing from '../CorrectRing/CorrectRing';
import TransitionGroup from 'react-transition-group-plus';

const ease1 = new BezierEasing(0.14, 0.00, 0.64, 1.00);
const ease2 = new BezierEasing(0.39, 0.00, 0.79, 1.00);
const ease3 = new BezierEasing(0.34, 0.00, 0.52, 1.00);

class Ring extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    animate.set(this.component, { scale: 0 });
  }
  componentWillReceiveProps = (nextProps) => {

  }
  animateIn = async (delay) => {
    await animate.set({}, { delay: delay });

    return animate.all([
      animate.to(this.component, 0.23, {
        scale: 1.05,
        ease: ease1
      }).then(() => {
        return animate.to(this.component, 0.17, {
          scale: 0.95,
          ease: ease2
        });
      }).then(() => {
        return animate.to(this.component, 0.3, {
          scale: 1,
          ease: ease3
        });
      })
    ]);
  }
  render () {
    const style = { backgroundColor: this.props.isProgress ? '#ECBD5D' : undefined};
    return (
      <div className="ring" style={style} ref={ el => this.component = el }>
        <TransitionGroup component="div">
          {
            this.props.isCorrect && this.props.isProgress
            ? <CorrectRing />
            : undefined
          }
        </TransitionGroup>
      </div>
    );
  }
}
Ring.defaultProps = {
  isProgress: false,
  isCorrect: false
}
Ring.propTypes = {
  isProgress: React.PropTypes.bool,
  isCorrect: React.PropTypes.bool
}
export default Ring;
