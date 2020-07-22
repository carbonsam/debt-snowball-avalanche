import { Bodies } from 'matter-js';
import { segmentHeight, segmentLength, segmentOverlap } from '../constants';

export default (milestones) =>
  milestones
    .map(({ x, y, paidOffDebts }) => {
      if (paidOffDebts.length > 0) {
        return Bodies.circle(x + segmentLength, y + segmentHeight, 20, {
          isStatic: true,
          render: { fillStyle: 'orange' }
        });
      }
    })
    .filter(Boolean);
