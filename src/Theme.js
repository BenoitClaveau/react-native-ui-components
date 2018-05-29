import { PixelRatio } from 'react-native';
import ReactNativePropRegistry from "react-native/Libraries/Renderer/shims/ReactNativePropRegistry";

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
}

export default theme;

export function customize(options) {
    Object.assign(theme, options);
}

export function overrideStyle(defaultStyle = {}, newStyle = {}) {
    if (typeof defaultStyle == "number") defaultStyle = ReactNativePropRegistry.getByID(defaultStyle)
    const copy = {...defaultStyle};
    for(([k, v]) of Object.entries(newStyle)) {
        if (v != null) {
            copy[k] = v;
        }
    }
    return copy;
}