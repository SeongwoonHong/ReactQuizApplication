import React from 'react'
import SVGContainer from '../SVGContainer/SVGContainer';
import animate from 'gsap-promise';
import { findDOMNode } from 'react-dom';
class CorrectRing extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    animate.set(this.ringsvg, { autoAlpha: 0, y: '-30px' });
  }
  componentWillReceiveProps = (nextProps) => {

  }
  componentWillEnter =(done) => {
    this.animateIn().then(done);
  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  componentWillLeave = (done) => {
    this.animateOut().then(done);
  }
  animateIn = () => {
    return animate.to(this.ringsvg, 1, { autoAlpha: 1, y: '-5px', ease: Power4.easeOut });
  }
  animateOut = () => {
    return animate.to(this.ringsvg, 1, { autoAlpha: 0, ease: Power4.easeOut});
  }
  render () {
    return (
      <SVGContainer
          svg="correct-ring"
          className="ring-svg"
          ref={ el => this.ringsvg = findDOMNode(el) }
        />
    );
  }
}
CorrectRing.defaultProps = {

}
CorrectRing.propTypes = {

}
export default CorrectRing;
