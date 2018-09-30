import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Proptypes from 'prop-types';

class Modal extends Component {

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
            <Text>{this.props.message}</Text>
            <Button title="CLOSE ME" onPress={this.props.toggleFunc} />
          </View>
        </View>
      )
    }
    return null
  }
}

export default Modal;

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
