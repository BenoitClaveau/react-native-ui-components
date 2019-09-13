import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();

const theme = {
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
    PADDING: 16,
}

export default theme;

export function customize(options) {
    Object.assign(theme, options);
    console.log("[react-native-ui-components] customize", theme);
}
