import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import BackButton from './Buttons/BackButton';
import ClearButton from './Buttons/ClearButton';
import ValidateButton from './Buttons/ValidateButton';
import TextInput from './TextInput';
import { toolbar } from './styles';

class Toolbar extends PureComponent {

  render() {
    const { back, title, goBack, placeholder, value, onChange, onBlur, onEndEditing, clear, validate } = this.props;
    return (
      <View style={toolbar.container}>
        <BackButton goBack={goBack} />
{ title &&
        <Text style={toolbar.title}>{title}</Text>
}
{ onChange &&
        <TextInput
          style={toolbar.input}
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

export default Toolbar;