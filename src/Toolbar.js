import React, { PureComponent } from 'react';
import { 
        StyleSheet, 
        Platform, 
        View, 
        Text 
} from 'react-native';
import BackButton from './Buttons/BackButton';
import ClearButton from './Buttons/ClearButton';
import ValidateButton from './Buttons/ValidateButton';
import TextInput from './TextInput';
import { 
        TOOLBAR_BACKGROUND_COLOR,
        TITLE_FONT_SIZE,
        PRIMARY_COLOR
} from './theme';

class Toolbar extends PureComponent {

  render() {
    const { back, title, goBack, placeholder, value, onChange, onBlur, onEndEditing, clear, validate } = this.props;
    return (
      <View style={styles.container}>
        <BackButton goBack={goBack} />
{ title &&
        <Text style={styles.title}>{title}</Text>
}
{ onChange &&
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          blurOnSubmit={true}
          onChange={event => onChange(event.nativeEvent.text)}
          onBlur={event => onBlur && onBlur(event)}
          onEndEditing={event => onEndEditing && onEndEditing(event)}
        />
}
{ !title && !onChange && 
        <View style={{flex: 1}}></View>
}
{ clear &&
        <ClearButton clear={clear}/>
}
{ validate &&
        <ValidateButton validate={validate}/>
}
      </View>
    )
  }
};

const styles = StyleSheet.create({
        container: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
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
                paddingHorizontal: 16,
        },
        title: {
                paddingHorizontal: 16,
                flex: 1,
                fontSize: TITLE_FONT_SIZE,
                color: PRIMARY_COLOR,
                fontWeight: "600"
        },
        input: {
                flex: 1,
                marginRight: 16,
                marginTop: 6,
                marginBottom: 6,
        }
});

export default Toolbar;