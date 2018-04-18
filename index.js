import { PixelRatio } from 'react-native';
import { createStyleSheet as createStyleSheetButton } from './src/Button';
import { createStyleSheet as createStyleSheetColumn } from './src/Column';
import { createStyleSheet as createStyleSheetGroup } from './src/Group';
import { createStyleSheet as createStyleSheetPicture } from './src/Picture';
import { createStyleSheet as createStyleSheetRow } from './src/Row';
import { createStyleSheet as createStyleSheetSafeAreaView } from './src/SafeAreaView';
import { createStyleSheet as createStyleSheetText } from './src/Text';
import { createStyleSheet as createStyleSheetTextEditor } from './src/TextEditor';
import { createStyleSheet as createStyleSheetTextInput } from './src/TextInput';
import { createStyleSheet as createStyleSheetTitle } from './src/Title';
import { createStyleSheet as createStyleSheetToolbar } from './src/Toolbar';

const fontScale = PixelRatio.getFontScale();

let theme = {
    PRIMARY_COLOR: "#921863",
    INACTIVE_PRIMARY_COLOR: "#AAA",
    ACCENT_COLOR: "#0080FF",
    BACKGROUND_COLOR: "#FFF",
    TOOLBAR_BACKGROUND_COLOR: "#EEE",
    INPUT_BACKGROUND_COLOR: "#CCC",
    TEXT_COLOR: "#333",
    TEXT_FONT_SIZE: 16 * fontScale,
    INPUT_FONT_SIZE: 18 * fontScale,
    TITLE_FONT_SIZE: 20 * fontScale,
    ICON_FONT_SIZE: 28 * fontScale,
}

export function init(options) {
    Object.assign(theme, options);
    createStyleSheetButton();
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
}

export default theme;
export { default as Button } from './src/Button';
export { default as Modal } from './src/Modal';
export { default as ComboBox } from './src/ComboBox';
export { default as DatePicker } from './src/DatePicker';
export { default as Icon } from './src/Icon';
export { default as Select } from './src/Select';
export { default as TextInput } from './src/TextInput';
export { default as Toolbar } from './src/Toolbar';
export { default as Title } from './src/Title';
export { default as Text } from './src/Text';
export { default as Picture } from './src/Picture';
export { default as AutoComplete } from './src/AutoComplete';
export { default as Row } from './src/Row';
export { default as Column } from './src/Column';
export { default as Dialog } from './src/Dialog';
export { default as TextEditor } from './src/TextEditor';
export { default as SafeAreaView } from './src/SafeAreaView';
export { default as ThemeProvider } from './src/ThemeProvider';