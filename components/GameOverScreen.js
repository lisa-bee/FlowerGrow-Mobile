import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { ImageBackground, Text, StyleSheet, Image, View } from 'react-native';
import Images from '../assets/Images';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;
export default class Grass extends Component {
  render() {
    return (
      <ImageBackground source={Images['background']} style={styles.fullScreen}>
        <Image source={Images['flower_0']} style={styles.flower_0} />
        <View style={styles.textContainer}>
          <Text style={styles.gameOverText}>GROW OVER!</Text>
          <Text style={styles.scoreText}>You grew {this.props.score} meter</Text>
        </View>
      </ImageBackground>
    ) 
  } 
}

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  gameOverText: {
    color: '#AC722A',
    fontSize: 42,
    textAlign: 'center'
  },
  scoreText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  flower_0: {
    position: 'absolute',
    top: max_height / 3 - 60,
    width: 108,
    height: 112.5,
    zIndex: 1
  },
  textContainer: {
    position: 'absolute',
    top: max_height / 3,
    borderColor: '#9B4C1B',
    borderWidth: 5,
    borderRadius: 10,
    paddingTop: 50,
    paddingBottom: 40,
    padding: 35,
    backgroundColor: '#A8E5FC'
  }
})
