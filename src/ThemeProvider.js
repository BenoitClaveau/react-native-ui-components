import React, { PureComponent } from 'react';
import { init } from '../index';

class ThemeProvider extends PureComponent {
  
  constructor(props) {
    super(props);
    init(props.customize)
  }

  render() {
    return this.props.children;
  }
}

export default ThemeProvider;