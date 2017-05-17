'use strict';
import React from 'react';
import { findDOMNode } from 'react-dom';
import SVGInline from 'react-svg-inline';
import svgs from '../../models/svg';
import animate from 'gsap-promise';

export default class SVGContainer extends React.Component {
  static propTypes = {
    ...SVGInline.propTypes,
    svg: React.PropTypes.string,
    color: React.PropTypes.string
  };

  static defaultProps = {
    svg: '',
    color: ''
  };

  constructor(props) {
    super(props);

    if(!svgs[props.svg]) {
      console.warn(`Attempted to place undefined svg ${props.svg}. This svg will not be displayed.`);
    }
  }

  componentDidMount() {
    if(this.props.color && this.svgContainer) {
      this.setColor(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.color !== nextProps.color) {
      this.setColor(nextProps);
    }
  }

  setColor = (props) => {
    if(this.svgContainer) {
      const svg = this.svgContainer.querySelector('svg');

      if(svg) {
        animate.set(svg, { stroke: props.color, fill: props.color });
      }
    }
  }

  render() {
    const svg = svgs[this.props.svg];

    return (
      svg
      ? <SVGInline
          {...this.props}
          ref={ref => this.svgContainer = findDOMNode(ref)}
          svg={svg}
        />
      : undefined
    );
  }
}
