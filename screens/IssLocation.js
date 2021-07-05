import React, { Component } from 'react';
import { Text, View,StyleSheet,ImageBackground,SafeAreaView,StatusBar,Platform,Alert } from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';

export default class IssLocationScreen extends React.Component {
constructor(props){
  super(props);
  this.state = {
    location :{},
  }
}

getIssLocation= ()=>{
  axios.get("https://api.wheretheiss.at/v1/satellites/25544").then(response =>{
    this.setState({
      location: response.data
    })
    .catch(error=>{
      Alert.alert(error.message);
    })
  })
}

componentDidMount(){
  this.getIssLocation()
}


    render() {
      if(Object.keys(this.state.location).length === 0){
        return(
          <Text>Loading..........</Text>
        );
      }
      else{
        return (
            <View
                style={{
                    flex: 1,
                   
                }}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View>
                <ImageBackground source={require('../assets/meteor_bg1.png')} style = {styles.backGroundImage}>
                <Text>ISS Location </Text>
                </View>
                <View>
                  <MapView />
                </View>
                </ImageBackground>
            </View>
        )
      }
    }
}


const styles = StyleSheet.create({
  droidSafeArea:{
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight :  0
  },
  backGroundImage:{
    flex:1,
    resizeMode: 'cover'
  }
})