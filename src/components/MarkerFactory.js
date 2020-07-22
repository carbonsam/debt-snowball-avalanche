import { Bodies } from 'matter-js';
import { segmentHeight, segmentLength, segmentOverlap } from '../constants';

export default (milestones) =>
  milestones
    .map(({ x, y, paidOffDebts }) => {
      if (paidOffDebts.length > 0) {
        return Bodies.rectangle(
          x + segmentLength + 65,
          y + segmentHeight - 100,
          188,
          200,
          {
            isStatic: true,
            collisionFilter: false,
            render: {
              sprite: {
                texture: './images/flag.png',
                xScale: 1,
                yScale: 1
              }
            }
          }
        );
      }
    })
    .filter(Boolean);
