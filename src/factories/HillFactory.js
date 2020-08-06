import { Bodies, Vertices } from 'matter-js';
import { segmentHeight, segmentLength, segmentOverlap } from '../constants';

const colors = ['red', 'green', 'blue'];
const segment = Vertices.fromPath(
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
);

export default (milestones) =>
  milestones.map(({ x, y }, index) =>
    Bodies.fromVertices(x + segmentLength / 2, y + segmentHeight / 2, segment, {
      isStatic: true,
      render: { fillStyle: colors[index % colors.length] }
    })
  );
