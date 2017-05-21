import React from 'react'
import animate from 'gsap-promise';
import classnames from 'classnames';

class SpanAnimatedText extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const animateText = [...this.component.querySelectorAll('.animate-text')];
    animate.set(animateText, { autoAlpha: 0 });
  }
  componentWillReceiveProps = (nextProps) => {

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
      <div ref={ el => this.component = el } className={ classnames(this.props.className) }>
        { this.getSpanText(this.props.text) }
      </div>
    );
  }
}
SpanAnimatedText.defaultProps = {

}
SpanAnimatedText.propTypes = {
  text: React.PropTypes.string,
  className: React.PropTypes.string
}
export default SpanAnimatedText;
