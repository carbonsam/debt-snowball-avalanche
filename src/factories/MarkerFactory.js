import { Bodies } from 'matter-js';
import { segmentHeight, segmentLength } from '../constants';

export default (milestones) =>
  milestones
    .filter(({ paidOffDebts }) => paidOffDebts.length > 0)
    .map(({ x, y }) =>
      Bodies.rectangle(x + segmentLength, y + segmentHeight, 197, 66, {
        isStatic: true,
        collisionFilter: false,
        angle: Math.atan(segmentHeight / segmentLength), // Calculate angle in radians from slope
        render: { sprite: { texture: './images/car.png' } }
      })
    );
