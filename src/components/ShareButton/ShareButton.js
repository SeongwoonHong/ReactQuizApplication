import React from 'react'
import SVGContainer from '../SVGContainer/SVGContainer';
import classnames from 'classnames';
import animate from 'gsap-promise';

class ShareButton extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    animate.set(this.component, { scale: 0 });
  }
  componentWillReceiveProps = (nextProps) => {

  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  animateIn = (delay = 0) => {
    return animate.to(this.component, 0.3, { delay, scale: 1.05, ease: Power4.easeOut })
    .then( () => animate.to(this.component, 0.7, { scale: 0.95 }))
    .then( () => animate.to(this.component, 0.7, { scale: 1 }));
  }
  onMouseEnterHandler = () => {
    animate.to(this.component, 0.3, { scale: 1.1, ease: Power4.easeOut });
  }
  onMouseLeaveHandler = () => {
    animate.to(this.component, 0.3, { scale: 1, ease: Power4.easeOut });
  }
  render () {
    const style= { backgroundColor: this.props.color };
    return (
      <div
        className={classnames('share-button', this.props.className)}
        style={style} onClick={ this.props.onClick }
        ref={ el => this.component = el }
        onMouseEnter={ this.onMouseEnterHandler }
        onMouseLeave={ this.onMouseLeaveHandler }
      >
        <SVGContainer svg={this.props.svg} />
        <span className="text">{this.props.text}</span>
      </div>
    );
  }
}
ShareButton.defaultProps = {

}
ShareButton.propTypes = {
  color: React.PropTypes.string,
  svg: React.PropTypes.string,
  text: React.PropTypes.string,
  onClick: React.PropTypes.func
}
export default ShareButton;
