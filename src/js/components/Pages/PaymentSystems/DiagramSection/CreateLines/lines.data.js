export const lineData = [
  {
    leftRef: 0,
    leftRefLinks: [0],
    rightRefLinks: [2, 3],
    leftToLeftLink: [
      [0, 1],
      [0, 2],
    ],
    rightToRightLink: [],
    indirectLink: [],
  },
  {
    leftRef: 1,
    leftRefLinks: [1],
    rightRefLinks: [0],
    leftToLeftLink: [[0, 1]],
    rightToRightLink: [],
    indirectLink: [],
  },
  {
    leftRef: 2,
    leftRefLinks: [2],
    rightRefLinks: [4],
    leftToLeftLink: [[0, 2]],
    rightToRightLink: [],
    indirectLink: [],
  },
  {
    rightRef: 0,
    leftRefLinks: [1],
    rightRefLinks: [0],
    leftToLeftLink: [[0, 1]],
    rightToRightLink: [],
    indirectLink: [],
  },
  {
    rightRef: 1,
    leftRefLinks: [0],
    rightRefLinks: [1, 2, 3],
    leftToLeftLink: [],
    rightToRightLink: [
      [1, 2],
      [2, 3],
    ],
    indirectLink: [],
  },
  {
    rightRef: 2,
    leftRefLinks: [0],
    rightRefLinks: [1, 2, 3, 4],
    leftToLeftLink: [],
    rightToRightLink: [
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    indirectLink: [],
  },
  {
    rightRef: 3,
    leftRefLinks: [0],
    rightRefLinks: [1, 2, 3],
    leftToLeftLink: [],
    rightToRightLink: [
      [1, 2],
      [2, 3],
    ],
    indirectLink: [2, 4],
  },
  {
    rightRef: 4,
    leftRefLinks: [2],
    rightRefLinks: [2, 3, 4],
    leftToLeftLink: [],
    rightToRightLink: [
      [2, 3],
      [3, 4],
    ],
    indirectLink: [],
  },
];

export const leftLineData = [];
