import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_width = Dimensions.get('screen').width;
const min_width = Dimensions.get('screen').width - Dimensions.get('screen').width;

const FlowerPhysics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let flower = entities.flower.body;

  
  // Function for the touch movement of the flower
  touches.filter(t => t.type === 'move').forEach(t => {
    const flowerRadius = 75;

    if (t.event.locationX < max_width / 2) {
      Matter.Body.translate(flower, { x: -3, y: 0 });
    } else if (t.event.locationX > max_width / 2) {
      Matter.Body.translate(flower, { x: +3, y: 0 });
    } if (flower.position.x > max_width - flowerRadius) {
      flower.position.x = max_width - flowerRadius;
    } if (flower.position.x < min_width) {
      flower.position.x = min_width;
    }
    return flower.position.x;
  });


  Matter.Engine.update(engine, time.delta); 

  return entities;
}

export default FlowerPhysics;