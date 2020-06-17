const debts = [
  {
    name: 'Medical Bill',
    minimumPayment: 50,
    total: 500
  },
  {
    name: 'Credit Card',
    minimumPayment: 63,
    total: 2500
  },
  {
    name: 'Car Loan',
    minimumPayment: 135,
    total: 7000
  },
  {
    name: 'Student Loan',
    minimumPayment: 96,
    total: 10000
  },
]

// returns an array of months, containing
//  - current extra payment
//  - array of paid off debts
//    - debt name
//    - debt total
export default (debts, extraPayment) => [
    {
      currentExtraPayment: 500,
      paidOffDebts: [{
          name: 'Medical Bill',
          total: 500
        }]
    },
    {
      currentExtraPayment: 550,
      paidOffDebts: []
    },
    {
      currentExtraPayment: 550,
      paidOffDebts: []
    },
    {
      currentExtraPayment: 550,
      paidOffDebts: []
    },
    {
      currentExtraPayment: 550,
      paidOffDebts: [{
        name: 'Credit Card',
        total: 2500
      }]
    },
  ]
