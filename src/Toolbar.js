import React, { PureComponent } from 'react';
import { 
        StyleSheet, 
        Platform, 
        View, 
        Text 
} from 'react-native';
import Button from './Button';
import TextInput from './TextInput';
import { 
        TOOLBAR_BACKGROUND_COLOR,
        TITLE_FONT_SIZE,
        PRIMARY_COLOR
} from './theme';

class Toolbar extends PureComponent {

  render() {
          
    const { 
        goBack,
        clear,
        title,
        renderPlaceholder,
        ...others
      } = this.props;

    return (
      <View style={styles.container}>
        <Button
                onPress={goBack}
                iconLeft="md-back"
        />
{ title &&
        <Text style={styles.title}>{title}</Text>
}
{ onChange &&
        <TextInput
          blurOnSubmit={true}
          {...others}
          style={styles.input}
        />
}
{ !title && !onChange && 
        <View style={{flex: 1}}></View>
}
{ clear &&
        <Button
                onPress={clear}
                iconLeft="md-clear"
        />
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