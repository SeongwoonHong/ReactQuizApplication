import React from 'react'
import animate from 'gsap-promise';
import ShareButton from '../../components/ShareButton/ShareButton';
import TransitionGroup from 'react-transition-group-plus';
import Summary from '../../components/Summary/Summary';
class SummaryTest extends React.Component {
  constructor(props) {
    super(props);
    this.percentage = Math.round(this.props.correctNumber / this.props.totalQuestionNumber * 100);
  }
  render() {
    return (
      <TransitionGroup component="div" style={{backgroundColor: '#369'}}>
        <Summary totalQuestionNumber={4} correctNumber={2} />
      </TransitionGroup>
    );
  }
}

export default SummaryTest;
