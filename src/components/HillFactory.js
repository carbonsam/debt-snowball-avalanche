import { Bodies, Vertices } from 'matter-js';

export default (x, y, debtPayoffCalendar) => {
  const colors = ['red', 'green', 'blue'];
  const segmentOverlap = 10;
  const segmentLength = 75;
  const segmentHeight = 50;

  const milestones = debtPayoffCalendar.map((_, index) => ({
    x: x + segmentLength * index - segmentOverlap * index,
    y: y + segmentHeight * index - segmentOverlap * index
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
