export default {
  nodes: [
    {
      id: 'PGT',
      color: 'hsl(2, 70%, 50%)',
    },
    {
      id: 'Centre Meeting',
      color: 'hsl(205, 70%, 50%)',
    },
    {
      id: 'IVR',
      color: 'hsl(262, 70%, 50%)',
    },
    {
      id: 'VLBS Laghubitta',
      color: 'hsl(202, 70%, 50%)',
    },
    {
      id: 'Unique Laghubitta',
      color: 'hsl(315, 70%, 50%)',
    },
    {
      id: 'Other Initiatives',
      color: 'hsl(78, 70%, 50%)',
    },
  ],
  links: [
    {
      source: 'VLBS Laghubitta',
      target: 'PGT',
      value: 100,
    },
    {
      source: 'VLBS Laghubitta',
      target: 'Centre Meeting',
      value: 100,
    },
    {
      source: 'VLBS Laghubitta',
      target: 'IVR',
      value: 65,
    },
    {
      source: 'VLBS Laghubitta',
      target: 'Other Initiatives',
      value: 12,
    },
    {
      source: 'Unique Laghubitta',
      target: 'PGT',
      value: 66,
    },
    {
      source: 'Unique Laghubitta',
      target: 'Centre Meeting',
      value: 17,
    },
    {
      source: 'Unique Laghubitta',
      target: 'IVR',
      value: 10,
    },
    {
      source: 'Unique Laghubitta',
      target: 'Other Initiatives',
      value: 24,
    },
  ],

  // nodes: [
  //   { id: 9, color: 'hsl(41, 70%, 50%)' },
  //   { id: 10, color: 'hsl(41, 70%, 50%)' },
  //   { id: 2, color: 'hsl(41, 70%, 50%)' },
  //   { id: 11, color: 'hsl(41, 70%, 50%)' },
  //   { id: 6, color: 'hsl(41, 70%, 50%)' },
  //   { id: 12, color: 'hsl(41, 70%, 50%)' },
  // ],
  // links: [
  //   { source: 9, target: 10, value: 33190 },
  //   { source: 9, target: 2, value: 2399 },
  //   { source: 9, target: 11, value: 13839 },
  //   { source: 9, target: 6, value: 22644 },
  //   { source: 9, target: 12, value: 7129 },
  //   // { source: 9, target: 32, value: 56999 },
  //   // { source: 9, target: 34, value: 4346 },
  //   // { source: 9, target: 37, value: 14578 },
  //   // { source: 9, target: 38, value: 6372 },
  //   // { source: 9, target: 44, value: 14111 },
  //   // { source: 9, target: 45, value: 11935 },
  //   // { source: 9, target: 46, value: 9756 },
  // ],
};

// {
//   "nodes": [
//     {
//       "id": "John",
//       "color": "hsl(41, 70%, 50%)"
//     },
//     {
//       "id": "Raoul",
//       "color": "hsl(282, 70%, 50%)"
//     },
//     {
//       "id": "Jane",
//       "color": "hsl(70, 70%, 50%)"
//     },
//     {
//       "id": "Marcel",
//       "color": "hsl(147, 70%, 50%)"
//     },
//     {
//       "id": "Ibrahim",
//       "color": "hsl(311, 70%, 50%)"
//     },
//     {
//       "id": "Junko",
//       "color": "hsl(92, 70%, 50%)"
//     }
//   ],
//   "links": [
//     {
//       "source": "John",
//       "target": "Jane",
//       "value": 132
//     },
//     {
//       "source": "John",
//       "target": "Junko",
//       "value": 136
//     },
//     {
//       "source": "John",
//       "target": "Raoul",
//       "value": 151
//     },
//     {
//       "source": "John",
//       "target": "Ibrahim",
//       "value": 192
//     },
//     {
//       "source": "Jane",
//       "target": "Raoul",
//       "value": 9
//     },
//     {
//       "source": "Jane",
//       "target": "Junko",
//       "value": 198
//     },
//     {
//       "source": "Jane",
//       "target": "Marcel",
//       "value": 85
//     },
//     {
//       "source": "Raoul",
//       "target": "Marcel",
//       "value": 126
//     },
//     {
//       "source": "Raoul",
//       "target": "Junko",
//       "value": 12
//     },
//     {
//       "source": "Marcel",
//       "target": "Junko",
//       "value": 89
//     },
//     {
//       "source": "Ibrahim",
//       "target": "Junko",
//       "value": 20
//     }
//   ]
// }
