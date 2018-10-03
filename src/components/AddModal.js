import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput} from 'react-native';

import Proptypes from 'prop-types';

class AddModal extends Component {

static propTypes = {
  isVisible: Proptypes.bool.isRequired,
  toggleFunc: Proptypes.func.isRequired,
  message: Proptypes.string
}
  render(){

    if(this.props.isVisible ){
      return (
        <View style={styles.container}>
          <View style={styles.box}>
            <Text>{'Add a category'}</Text>

            <TextInput
              style={styles.input}
              placeholder={'Enter Category'}
              onChangeText={cat => this.props.onChangeText(cat)}/>


            <Button title="CLOSE ME" onPress={this.props.toggleFunc} />
          </View>
        </View>
      )
    }
    return null
  }
}

export default AddModal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: 20
  },
  box: {
    padding: 20,
    backgroundColor: 'white'
  }
})
