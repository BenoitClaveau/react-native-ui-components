import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from './Icon';
import { button, flexLeftColumn, flexLeftRow } from './styles';

class Button extends PureComponent {

  render() {
    const { title, subTitle, onPress, disabled, iconLeft, iconRight, style, iconLeftStyle, iconRightStyle, textStyle, subTextStyle } = this.props;
    let ext = { opacity: disabled ? 0.4 : 1 };
    if (iconLeft && title) Object.assign(ext, flexLeftRow); 

    
    return (
      <TouchableOpacity
        style={[button.container, style, ext]}
        onPress={() => !disabled && onPress()}
      >
{ iconLeft &&
        <Icon 
          name={iconLeft}
          style={[button.iconLeft, iconLeftStyle]}
        />
}
{ title && !subTitle &&
        <Text 
          style={[button.text, textStyle]}
        >
          {title.toUpperCase()}
        </Text>
}
{ title && subTitle &&
        <View style={iconLeft ? flexLeftColumn: flexColumn}>
          <Text 
            style={[button.text, textStyle]}
          >
            {title.toUpperCase()}
          </Text>
          <Text 
            style={[{fontSize: 14 }, subTextStyle]}
          >
            {subTitle}
          </Text>
        </View>
}
{ iconRight &&
        <Icon 
          name={iconRight}
          style={[button.iconRight, iconRightStyle]}
        />
}
      </TouchableOpacity>
    )
  }
};

export default Button;