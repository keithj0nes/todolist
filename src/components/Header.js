import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({title, navigation}) => {
  console.log('haha');
  return (
    <View style={styles.header}>

      <TouchableOpacity style={styles.left} onPress={()=>navigation.goBack()}>
        <Icon name={'arrow-left'} size={25} color={mainStyles.lightText} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>
        {title}
      </Text>

    </View>
  )
}


export default Header;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerTitle: {
    color: mainStyles.lightText,
    fontSize: 23,
    fontFamily: mainStyles.mainFont,
    paddingTop: 40,
    paddingBottom: 20,
  },
  left: {
    height: '100%',
    position: 'absolute',
    left: 0,
    padding: 10,
    paddingTop: 37,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
