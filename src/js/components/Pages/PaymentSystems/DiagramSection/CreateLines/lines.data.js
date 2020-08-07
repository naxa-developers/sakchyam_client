// export const middleLineData = [
//   { from: 'rtgs', to: 'psps', index: 2 },
//   { from: 'rtgs', to: 'bfis', index: 3 },
//   { from: 'rtgs', to: 'card systems', index: 0 },
// ];

export const middleLineData = [
  { leftIndex: 1, rightIndex: 4 },
  { leftIndex: 0, rightIndex: 2 },
  { leftIndex: 0, rightIndex: 1 },
  { leftIndex: 0, rightIndex: 3 },
  { leftIndex: 0, rightIndex: 0 },
];

export const leftLineData = [];

const apiData = {
  Sheet1: [
    {
      Components: 'RTGS',
      'Direct Link 1': 'National Switch',
      'Direct Link 2': 'BFIs',
      'Direct Link 3': 'NCHL',
    },
    {
      Components: 'National Switch',
      'Direct Link 1': 'RTGS',
      'Direct Link 2': 'Card and Switch System',
    },
    {
      Components: 'CSD',
      'Direct Link 1': 'Capital Market Players',
    },
    {
      Components: 'Card and Switch System',
      'Direct Link 1': 'National Switch',
      'Link with Indirect': 'National Switch',
      'Indirect Link': 'RTGS',
    },
    {
      Components: 'PSPs/PSOs',
      'Direct Link 1': 'NCHL',
      'Direct Link 2': 'BFIs',
      'Link with Indirect': 'NCHL',
      'Indirect Link': 'RTGS',
    },
    {
      Components: 'NCHL',
      'Direct Link 1': 'RTGS',
      'Direct Link 2': 'BFIs',
      'Direct Link 3': 'PSPs/PSOs',
    },
    {
      Components: 'BFIs',
      'Direct Link 1': 'RTGS',
      'Direct Link 2': 'PSPs/PSOs',
      'Direct Link 3': 'NCHL',
      'Link with Indirect': 'NCHL',
      'Indirect Link': 'Capital Market Players',
    },
    {
      Components: 'Capital Market Players',
      'Direct Link 1': 'NCHL',
      'Direct Link 2': 'BFIs',
      'Direct Link 3': 'CSD',
    },
  ],
};
