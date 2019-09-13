import React, { PureComponent } from 'react';
import { customize as customizeTheme } from './Theme';
import { createStyleSheet as createStyleSheetButton } from './Button';
import { createStyleSheet as createStyleSheetCheckBox } from './CheckBox';
import { createStyleSheet as createStyleSheetColumn } from './Column';
import { createStyleSheet as createStyleSheetGroup } from './Group';
import { createStyleSheet as createStyleSheetIcon } from './Icon';
import { createStyleSheet as createStyleSheetPicture } from './Picture';
import { createStyleSheet as createStyleSheetRow } from './Row';
import { createStyleSheet as createStyleSheetSafeAreaView } from './SafeAreaView';
import { createStyleSheet as createStyleSheetText } from './Text';
import { createStyleSheet as createStyleSheetTextEditor } from './TextEditor';
import { createStyleSheet as createStyleSheetTextInput } from './TextInput';
import { createStyleSheet as createStyleSheetTitle } from './Title';
import { createStyleSheet as createStyleSheetToolbar } from './Toolbar';


export function customize(options) {
    customizeTheme(options);
    createStyleSheetButton();
    createStyleSheetCheckBox();
    createStyleSheetColumn();
    createStyleSheetGroup();
    createStyleSheetPicture();
    createStyleSheetRow();
    createStyleSheetSafeAreaView();
    createStyleSheetText();
    createStyleSheetTextEditor();
    createStyleSheetTextInput();
    createStyleSheetTitle();
    createStyleSheetToolbar();
    createStyleSheetIcon();
}

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