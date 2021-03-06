import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


const Header = ({title, navigation, edit, gradient}) => {

  // little hack to only display the gradient if the gradient prop is true
  const colors = gradient ? [mainStyles.darkPurple, '#6560A4'] : ['rgba(0,0,0,0), rgba(0,0,0,0)']
  return (
    <LinearGradient colors={colors}  start={{x: 0.3, y: 1}} end={{x: 1, y: 0.4}} style={styles.helloTextContainer}>

      <TouchableOpacity style={[styles.iconContainer, {left: 0}]} onPress={()=>navigation.goBack()}>
        <Icon name={'arrow-left'} size={25} color={mainStyles.lightText} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>
        {title}
      </Text>

      {edit ? (
        <TouchableOpacity style={[styles.iconContainer, {right: 0}]} onPress={edit}>
          <Icon name={'settings'} color={mainStyles.lightText} size={25}/>
        </TouchableOpacity>
      )
      : null}
      </LinearGradient>
  )
}



export default Header;

const styles = StyleSheet.create({
  helloTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: mainStyles.lightText,
    fontSize: 23,
    fontFamily: mainStyles.mainFont,
    paddingTop: 40,
    paddingBottom: 20,
  },
  iconContainer: {
    height: '100%',
    position: 'absolute',
    padding: 15,
    paddingTop: 37,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
