import { Platform } from 'react-native';

export const PRIMARY_COLOR = "#921863";
export const INACTIVE_PRIMARY_COLOR = "#AAA";
export const ACCENT_COLOR = "#0080FF";
export const BACKGROUND_COLOR = "#EEE";
export const TOOLBAR_BACKGROUND_COLOR = "#EEE";
export const INPUT_BACKGROUND_COLOR = "#CCC";
export const TEXT_COLOR = "#333";

const TEXT_FONT_SIZE = 16;
const INPUT_FONT_SIZE = 18;
const TITLE_FONT_SIZE = 20;
const ICON_FONT_SIZE = 28;

export const padding = {
  padding: 16,
}

export const paddingHorizontal = {
  paddingHorizontal: 16,
}

export const flexColumn = {
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}

export const flexLeftColumn = {
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-around"
}

export const flexRow = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
}

export const flexLeftRow = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
}


const input = {
  ...flexRow,
  ...padding
}

export const button = {
  container: {
    ...flexRow,
    ...padding,
    backgroundColor: PRIMARY_COLOR
  },
  text: {
    fontSize: INPUT_FONT_SIZE,
    color: BACKGROUND_COLOR,
    fontWeight: "600"
  },
  iconLeft: {
    marginRight: 8,
    fontSize: ICON_FONT_SIZE,
    color: BACKGROUND_COLOR,
  },
  iconRight: {
    marginLeft: 8,
    fontSize: ICON_FONT_SIZE,
    color: BACKGROUND_COLOR,
  }
}

export const textinput = {
  container: {
    backgroundColor: INPUT_BACKGROUND_COLOR,
    ...paddingHorizontal,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: "600"
  }
}

export const texteditor = {
  textinput: {
    backgroundColor: "#FFF",
    ...paddingHorizontal,
    fontSize: INPUT_FONT_SIZE,
    fontWeight: "600",
    textAlignVertical: "top",
    color: TEXT_COLOR
  }
}

export const autocomplete = {
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 54,
    backgroundColor: INPUT_BACKGROUND_COLOR,
    ...paddingHorizontal,
    borderRadius: 12,
  },
  inputText: {
    fontSize: INPUT_FONT_SIZE,
    fontWeight: "600",
    
  }
}

export const combobox = {
  ...input,
}

export const toolbar = {
  container: {
    ...flexLeftRow,
    backgroundColor: TOOLBAR_BACKGROUND_COLOR,
    ...Platform.select({
        ios: {
            height: 64,
            paddingTop: 20,
        },
        android: {
            height: 54,
            paddingTop: 0,
        }
    })
  },
  back: {
    ...paddingHorizontal,
  },
  title: {
    ...paddingHorizontal,
    flex: 1,
    fontSize: INPUT_FONT_SIZE,
    color: PRIMARY_COLOR,
    fontWeight: "600"
  },
  input: {
    flex: 1,
    marginRight: 16,
    marginTop: 6,
    marginBottom: 6,
  }
}

export const title = {
  container: {
    ...flexRow,
    ...padding,
  },
  text: {
    fontSize: INPUT_FONT_SIZE,
    color: PRIMARY_COLOR,
    fontWeight: "600",
  }
}

export const text = {
  ...paddingHorizontal,
  fontSize: TEXT_FONT_SIZE,
  color: TEXT_COLOR,
  fontWeight: "500"
}

export const separator = {
  height: 1,
  backgroundColor: TEXT_COLOR
}

export const picture = {
  container: {
    ...flexColumn,
  }
}

export const row = {
  ...flexLeftRow,
}

export const group = {
  container: {
    ...padding,
  }
}