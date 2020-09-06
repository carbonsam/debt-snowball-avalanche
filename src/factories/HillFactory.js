import { Bodies, Vertices } from 'matter-js';
import { segmentHeight, segmentLength, segmentOverlap } from '../constants';

const segment = Vertices.fromPath(
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
  milestones.map(({ x, y }) =>
    Bodies.fromVertices(
      x + segmentLength / 2,
      y + (segmentHeight + 5000) / 2,
      segment,
      { isStatic: true, render: { fillStyle: '#e8eced' } }
    )
  );
