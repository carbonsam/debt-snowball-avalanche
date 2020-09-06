import { Bodies, Vertices } from 'matter-js';
import { segmentHeight, segmentLength, segmentOverlap } from '../constants';

const segmentVertices = Vertices.fromPath(
  [
    0,
    0,
    segmentOverlap,
    0,
    segmentLength,
    segmentHeight - segmentOverlap,
    segmentLength,
    segmentHeight + 5000,
    segmentLength - segmentOverlap,
    segmentHeight + 5000,
    0,
    segmentOverlap + 5000
  ].join(' ')
);

export default (milestones) =>
  milestones.flatMap(({ x, y }) => {
    const segment = Bodies.fromVertices(
      x + segmentLength / 2,
      y + (segmentHeight + 5000) / 2,
      segmentVertices,
      { isStatic: true, render: { fillStyle: '#e8eced' } }
    );

    const tree = Bodies.rectangle(
      x + segmentLength / 2,
      y + (segmentHeight - 400) / 2,
      211,
      414,
      {
        isStatic: true,
        collisionFilter: false,
        render: { sprite: { texture: './images/tree1.png' } }
      }
    );

    const bush = Bodies.rectangle(
      x + segmentLength / 2 + 10,
      y + (segmentHeight - 40) / 2,
      200,
      87,
      {
        isStatic: true,
        collisionFilter: false,
        angle: Math.atan(segmentHeight / segmentLength), // Calculate angle in radians from slope
        render: { sprite: { texture: './images/bushes.png' } }
      }
    );

    const backgroundSprites = [];

    const randomNumber = Math.random();
    if (randomNumber >= 0.7) backgroundSprites.push(tree);
    else if (randomNumber >= 0.3) backgroundSprites.push(bush);

    return [...backgroundSprites, segment];
  });
