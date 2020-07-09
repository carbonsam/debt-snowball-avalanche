export default (debtPayoffCalendar, currentMonthIndex) => {
  const startingMonth = debtPayoffCalendar[0];
  const startingPayment = startingMonth.currentExtraPayment;

  const finalMonth = debtPayoffCalendar[debtPayoffCalendar.length - 1];
  const finalPayment = finalMonth.currentExtraPayment;

  const getMonthScale = ({ currentExtraPayment: payment }) =>
    (payment - startingPayment) / (finalPayment - startingPayment) + 1;

  const currentMonth = debtPayoffCalendar[currentMonthIndex] || finalMonth;
  const previousMonth = debtPayoffCalendar[currentMonthIndex - 1];

  const currentScale = getMonthScale(currentMonth);
  const previousScale = getMonthScale(previousMonth);

  return currentScale - previousScale + 1;
};
