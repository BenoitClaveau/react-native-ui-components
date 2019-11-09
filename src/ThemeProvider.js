import React, { PureComponent } from 'react';
import { customize } from './Theme';

class ThemeProvider extends PureComponent {

  constructor(props) {
    super(props);
    customize(props.customize)
  }

  render() {
    return this.props.children;
  }
}

export default ThemeProvider;