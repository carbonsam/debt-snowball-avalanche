import HillFactory from './HillFactory';
import MarkerFactory from './MarkerFactory';
import MilestonesFactory from './MilestonesFactory';

export default (debtPayoffCalendar) => {
  const milestones = MilestonesFactory(50, 300, debtPayoffCalendar);
  const hill = HillFactory(milestones);
  const markers = MarkerFactory(milestones);

  return { hill, markers, milestones };
};
