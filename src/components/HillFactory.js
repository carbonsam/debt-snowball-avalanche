import { Bodies, Vertices } from 'matter-js';
import { segmentHeight, segmentLength, segmentOverlap } from '../constants';

export default (x, y, debtPayoffCalendar) => {
  const colors = ['red', 'green', 'blue'];

  const milestones = debtPayoffCalendar.map(({ paidOffDebts }, index) => ({
    x: x + (segmentLength - segmentOverlap) * index,
    y: y + (segmentHeight - segmentOverlap) * index,
    paidOffDebts
  }));

  const bodies = milestones.map((milestone, index) =>
    Bodies.fromVertices(
      milestone.x + segmentLength / 2,
      milestone.y + segmentHeight / 2,
      Vertices.fromPath(
        [
          0,
          0,
          segmentOverlap,
          0,
          segmentLength,
          segmentHeight - segmentOverlap,
          segmentLength,
          segmentHeight,
          segmentLength - segmentOverlap,
          segmentHeight,
          0,
          segmentOverlap
        ].join(' ')
      ),
      { isStatic: true, render: { fillStyle: colors[index % colors.length] } }
    )
  );

  return { bodies, milestones };
};
