import React, { PureComponent } from 'react';
import { 
  DatePickerAndroid, 
  DatePickerIOS, 
  TouchableOpacity, 
  Platform, 
  Text, 
} from 'react-native';
import moment from 'moment';
import Button from './Button';

class MyDatePicker extends PureComponent {

  static getDerivedStateFromProps(props, state) {
    return {
        date: moment(props.date).toDate(),
    }
  }

  state = {
  }


  render() {
    if (Platform.OS === 'ios')
      return (
        <DatePickerIOS
          style={{  width: width, height: 200 }}
          onDateChange={this.props.onDateChange}
          date={this.state.date}
          mode="date"
        />
      )

    else
      return (
        <Button
          onPress={() => {
            return DatePickerAndroid.open({
              date: this.state.date
            }).then(({ action, year, month, day }) => {
              if (action !== DatePickerAndroid.dismissedAction) {
                this.props.onDateChange(new Date(Date.UTC(year, month, day)))
              }
            });
          }}
          title={moment(this.props.date).format('DD/MM/YYYY')}
        />
      )
  }
};

export default MyDatePicker;