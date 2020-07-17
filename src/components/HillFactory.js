import { Bodies, Vertices } from 'matter-js';

export default (x, y, debtPayoffCalendar) => {
  const colors = ['red', 'green', 'blue'];
  const segmentOverlap = 10;
  const segmentLength = 75;
  const segmentHeight = 50;

  const milestones = debtPayoffCalendar.map(
    (_, index) => x + segmentLength * index
  );

  const bodies = milestones.map((_, index) =>
    Bodies.fromVertices(
      x + segmentLength / 2 + index * segmentLength - index * segmentOverlap,
      y + segmentHeight / 2 + index * segmentHeight - index * segmentOverlap,
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
