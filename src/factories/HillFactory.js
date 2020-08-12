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
    segmentHeight,
    segmentLength - segmentOverlap,
    segmentHeight,
    0,
    segmentOverlap
  ].join(' ')
);

const backgroundSegment = Vertices.fromPath(
  [
    0,
    0,
    segmentLength,
    segmentHeight,
    segmentLength,
    segmentHeight + 1000,
    0,
    1000
  ].join(' ')
);

export default (milestones) => {
  const segments = milestones.map(({ x, y }) =>
    Bodies.fromVertices(x + segmentLength / 2, y + segmentHeight / 2, segment, {
      isStatic: true,
      render: { fillStyle: '#e8eced' }
    })
  );

  const backgroundSegments = milestones.map(({ x, y }) =>
    Bodies.fromVertices(
      x + segmentLength / 2,
      y + (segmentHeight + 1000) / 2,
      backgroundSegment,
      { isStatic: true, render: { fillStyle: '#e8eced' } }
    )
  );

  return backgroundSegments.concat(segments);
};
