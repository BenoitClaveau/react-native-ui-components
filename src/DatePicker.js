import React, { PureComponent } from 'react';
import { DatePickerAndroid, DatePickerIOS, TouchableOpacity, Platform, Text, Dimensions } from 'react-native';
import moment from 'moment';
import Button from './Button';
const { height, width } = Dimensions.get('window');

class MyDatePicker extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      date: moment(this.props.date).toDate()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date != this.state.date.toJSON())
      this.setState({ date: moment(nextProps.date).toDate() })
  }

  render() {
    if (Platform.OS === 'ios')
      //TODO use modal
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