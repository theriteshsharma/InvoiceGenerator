import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

/**
 * @author
 * @function HomeScreen
 **/
export const HomeScreen = ({navigation}) => {
  const { container } = styles;
  return (
    <View style={container}>

      <Image source={require('../assets/icon.png')} />
      <TouchableOpacity
        style={styles.button}
        onPress={()=> navigation.navigate('CreateBill')}
      >
        <Text style={{color:'#fff'}}>Generate New Bill</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#fff'
  },
  button: {
    height: 40,
    width: 170,
    color:'#000',
    padding:10,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4,
    elevation: 10,
    marginTop:10,
  },
});
