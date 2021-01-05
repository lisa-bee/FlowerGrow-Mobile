import React, { Component } from 'react';
import Systems from './systems'

import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

import { View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

import Grass from './components/Grass';
import Pot from './components/Pot';
import Flower from './components/Flower';
import WaterMeter from './components/WaterMeter';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;

export default class GameArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0
    };
    
    this.GameEngine = null;
    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let grass = Matter.Bodies.rectangle(0, max_height - 150, max_width, 150, { isStatic: true });
    let pot = Matter.Bodies.rectangle(max_width / 2 - 50, max_height - 140, 100, 80, { isStatic: true });
    let flower = Matter.Bodies.rectangle(max_width / 2 - 38 , max_height / 2, 76, 79, { isStatic: true });
    let waterMeter = Matter.Bodies.rectangle(20, max_height - 300, 30, 170, { isStatic: true });
    // let badCloud1 = Matter.Bodies.rectangle(this.randomizeXpos(0, max_width), -30, 117, 60, {isStatic: true });
    // let badCloud2 = Matter.Bodies.rectangle(this.randomizeXpos(0, max_width), -30, 117, 60, {isStatic: true });
    

    Matter.World.add(world, [grass, pot, flower]);

    Matter.Events.on(engine, 'beforeUpdate', (event) => {
      let total_seconds = parseInt(Math.floor(engine.timing.timestamp / 1000))
      this.setState({
        time: total_seconds
      })
    });

    return {
      physics: { engine: engine, world: world },
      grass: { body: grass, size: [max_width, 150], renderer: Grass},
      pot: { body: pot, size: [100, 80], renderer: Pot},
      // badCloud1: { body: badCloud1, size: [117, 60], renderer: BadCloud},
      // badCloud2: { body: badCloud2, size: [117, 60], renderer: BadCloud},
      flower: { body: flower, size: [76, 79], renderer: Flower},
      waterMeter: { body: waterMeter, color: 'blue', size: [30, 170], renderer: WaterMeter}
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => { this.gameEngine = ref; }}
          style={styles.gameContainer}
          systems={Systems}
          entities={this.entities}
        />
      <Text style={styles.score}>{this.state.time}m</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 22,
    top: max_height - 50,
    left: 15,
    textShadowColor: '#444444',
    textShadowOffset: { width: 2, height: 2},
    textShadowRadius: 2,
  },
  container: {
    height: max_height,
    width: max_width,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
});

