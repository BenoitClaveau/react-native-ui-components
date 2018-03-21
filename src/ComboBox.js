import React, { PureComponent } from 'react';
import Select from './Select';
import Modal from './Modal';

class ComboBox extends PureComponent {

  render() {
    const { 
      title,
      renderPlaceholder,
      ...others
    } = this.props;
    
    return (
      <View>
        <Modal
          title={title}
          renderPlaceholder={renderPlaceholder}
        >
          <Select
            {...others}
          />
        </Modal>
      </View>
    )
  }
};

export default ComboBox;