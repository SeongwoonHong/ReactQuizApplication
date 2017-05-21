import React from 'react'
import animate from 'gsap-promise';
import classnames from 'classnames';

class ContinueButton extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const animateText = [...this.button.querySelectorAll('.animate-text')];
    animate.set(this.button, { autoAlpha: 0 });
    animate.set(animateText, { autoAlpha: 0, y: '40px' });
  }
  componentWillReceiveProps = (nextProps) => {

  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  animateIn = async () => {
    const animateText = [...this.button.querySelectorAll('.animate-text')];
    await animate.to({}, this.props.delay, {});
    return animate.all([
      animate.to(this.button, 1, { autoAlpha: 1, delay: 0.6, ease: Expo.easeOut }),
      animate.to(this.buttonBackground, 1, { width: '100%', delay: 1, ease: Expo.easeOut }),
      animate.staggerTo(animateText, 0.3, { autoAlpha: 1, y: '0px', delay: 1.2 }, 0.1)
    ]);
  }
  onMouseEnterHandler = () => {
    return animate.to(this.button, 0.3, { scale: 1.1, ease: Expo.easeOut})
  }
  onMouseLeaveHandler = () => {
    return animate.to(this.button, 0.2, { scale: 1 });
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
      <div
        className={classnames(this.props.className)}
        onClick={ this.props.onClick }
        ref={ el => this.button = el }
        onMouseEnter={ this.onMouseEnterHandler }
        onMouseLeave={ this.onMouseLeaveHandler }
      >
        <div className="mask">
          <div className="button-animated" ref={ el => this.buttonBackground = el }/>
        </div>
        <div className="button-inner">
          <span>{ this.getSpanText(this.props.text) }</span>
        </div>
      </div>
    );
  }
}
ContinueButton.defaultProps = {

}
ContinueButton.propTypes = {
  text: React.PropTypes.string,
  onClick: React.PropTypes.func,
  className: React.PropTypes.string
}
export default ContinueButton;
