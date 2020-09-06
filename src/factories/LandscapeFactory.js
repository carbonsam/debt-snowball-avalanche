import { Bodies } from 'matter-js';
import HillFactory from './HillFactory';
import MarkerFactory from './MarkerFactory';
import MilestonesFactory from './MilestonesFactory';
import { segmentHeight, segmentLength, segmentOverlap } from '../constants';

export default (debtPayoffCalendar) => {
  const milestones = MilestonesFactory(50, 300, debtPayoffCalendar);
  const hill = HillFactory(milestones);
  const markers = MarkerFactory(milestones);

  const top = Bodies.rectangle(
    milestones[0].x + segmentOverlap - 2500,
    milestones[0].y + 2500,
    5000,
    5000,
    { render: { fillStyle: '#e8eced' }, isStatic: true }
  );

  const finish = Bodies.rectangle(
    milestones[milestones.length - 1].x + segmentLength + 2500 - segmentOverlap,
    milestones[milestones.length - 1].y + segmentHeight + 2500 - segmentOverlap,
    5000,
    5000,
    { render: { fillStyle: '#e8eced' }, isStatic: true }
  );

  return { hill: [top, ...hill, finish], markers, milestones };
};
