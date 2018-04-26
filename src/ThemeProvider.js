import React, { PureComponent } from 'react';
import { customize } from '../index';

class ThemeProvider extends PureComponent {
  
  constructor(props) {
    super(props);
    console.log("customize")
    customize(props.customize)
  }

  render() {
    return this.props.children;
  }
}

export default ThemeProvider;