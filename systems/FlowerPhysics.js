import Matter from 'matter-js';
import { Dimensions } from 'react-native';

const max_height = Dimensions.get('screen').height;
const max_width = Dimensions.get('screen').width;
const min_width = 0;

const FlowerPhysics = (entities, { touches }) => {
  let flower = entities.flower.body;
  let stem = entities.stem.body;
  
  // Function for the touch movement of the flower
  touches.filter(t => t.type === 'move').forEach(t => {
    const flowerRadius = 30;
      Matter.Body.setPosition(flower, { x: t.event.locationX, y: max_height / 2 });
    if (flower.position.x + flowerRadius > max_width) {
      Matter.Body.setPosition(flower, { x: max_width - flowerRadius, y: max_height / 2});
    } if (flower.position.x - flowerRadius < min_width) {
      Matter.Body.setPosition(flower, { x: min_width + flowerRadius, y: max_height / 2});
    }
  });


  Matter.Vertices.create([{ x: 0, y: 1 }, { x: 25, y: 50 }, { x: 0, y: 10 }], stem)

 // console.log('stjälk', stem)

  return entities;
}

export default FlowerPhysics;