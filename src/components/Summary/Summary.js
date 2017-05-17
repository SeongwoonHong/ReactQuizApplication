import React from 'react'
import animate from 'gsap-promise';
import ContinueButton from '../ContinueButton/ContinueButton';
import ShareButton from '../ShareButton/ShareButton';
import Share from 'easy-share-popup';
class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.percentage = Math.round(this.props.correctNumber / this.props.totalQuestionNumber * 100);
  }
  componentDidMount = () => {
    animate.set(this.title, { fontSize: '0rem'});
    animate.set([this.subtitle, this.sharetext], { autoAlpha: 0, y: '40px'});
    this.share = new Share(window.location.origin);
  }
  componentWillReceiveProps = (nextProps) => {

  }
  componentWillAppear = (done) => {
    this.animateIn().then(done);
  }
  componentWillEnter = (done) => {
    this.animateIn().then(done);
  }
  facebookShareHandler = () => {
    this.share.facebook();
  }
  twitterShareHandler = () => {
    this.share.twitter(window.location.origin);
  }
  animateIn = () => {
    return animate.all([
      animate.to(this.title, 0.5, { fontSize: '3.8rem', ease: Power4.easeOut})
      .then( () => animate.to(this.title, 0.2, { fontSize: '3.5rem', ease: Power4.easeOut}))
      .then( () => animate.to(this.title, 0.2, { fontSize: '3.6rem', ease: Power4.easeOut})),
      animate.to(this.subtitle, 1, { autoAlpha: 1, y: '0px', delay: 0.8, ease: Power4.easeOut }),
      animate.to(this.sharetext, 1, { autoAlpha: 1, y: '0px', delay: 1, ease: Power4.easeOut }),
      this.facebook.animateIn(1.5),
      this.twitter.animateIn(1.5)
    ]);
  }
  render () {
    return (
      <div className="summary">
        <div className="title" ref={ el => this.title = el }>Results</div>
        <div className="subtitle" ref={ el => this.subtitle = el }>
          {`You scroed ${this.percentage}% by correctly answering ${this.props.correctNumber} of the total ${this.props.totalQuestionNumber} questions.`}
        </div>
        <div className="share-text" ref={ el => this.sharetext = el }>Use the links below to challenge your friends !</div>
        <ShareButton
          className="facebook"
          text="Facebook"
          svg="facebook"
          onClick={ this.facebookShareHandler }
          color="#3b5998"
          ref={ el => this.facebook = el }
        />
        <ShareButton
          className="twitter"
          text="Twitter"
          svg="twitter"
          color="#55acee"
          ref={ el => this.twitter = el }
          onClick={ this.twitterShareHandler }
        />
      </div>
    );
  }
}
Summary.defaultProps = {

}
Summary.propTypes = {
  totalQuestionNumber: React.PropTypes.number,
  correctNumber: React.PropTypes.number
}
export default Summary;
