import { segmentHeight, segmentLength, segmentOverlap } from '../constants';

export default (x, y, debtPayoffCalendar) =>
  debtPayoffCalendar.map(({ paidOffDebts }, index) => ({
    x: x + (segmentLength - segmentOverlap) * index,
    y: y + (segmentHeight - segmentOverlap) * index,
    paidOffDebts
  }));
