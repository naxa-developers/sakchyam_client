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
    indirectLinkLeftToRight: [],
  },
  {
    leftRef: 1,
    leftRefLinks: [1],
    rightRefLinks: [0],
    leftToLeftLink: [[0, 1]],
    rightToRightLink: [],
    indirectLink: [],
    indirectLinkLeftToRight: [],
  },
  {
    leftRef: 2,
    leftRefLinks: [2],
    rightRefLinks: [4],
    leftToLeftLink: [[0, 2]],
    rightToRightLink: [],
    indirectLink: [],
    indirectLinkLeftToRight: [],
  },
  {
    rightRef: 0,
    leftRefLinks: [1],
    rightRefLinks: [0],
    leftToLeftLink: [[0, 1]],
    rightToRightLink: [],
    indirectLink: [],
    indirectLinkLeftToRight: [],
  },
  {
    rightRef: 1,
    leftRefLinks: [0],
    rightRefLinks: [],
    leftToLeftLink: [],
    rightToRightLink: [
      [1, 2],
      [2, 3],
    ],
    indirectLink: [],
    indirectLinkLeftToRight: [0, 2],
  },
  {
    rightRef: 2,
    leftRefLinks: [0],
    rightRefLinks: [1, 2, 3, 4],
    leftToLeftLink: [],
    rightToRightLink: [],
    indirectLink: [],
    indirectLinkLeftToRight: [],
  },
  {
    rightRef: 3,
    leftRefLinks: [0],
    rightRefLinks: [1, 2, 3],
    leftToLeftLink: [],
    rightToRightLink: [],
    indirectLink: [2, 4],
    indirectLinkLeftToRight: [],
  },
  {
    rightRef: 4,
    leftRefLinks: [2],
    rightRefLinks: [2, 3, 4],
    leftToLeftLink: [],
    rightToRightLink: [],
    indirectLink: [],
    indirectLinkLeftToRight: [],
  },
];

export const allConnections = {
  leftToLeftLink: [
    [0, 1],
    [0, 2],
  ],
  leftToRightLink: [
    { from: 0, to: [2, 3] },
    { from: 1, to: [0] },
    { from: 2, to: [4] },
  ],
  rightToRightLink: [
    [
      [1, 2],
      [2, 3],
    ],
    [
      [2, 3],
      [3, 4],
    ],
  ],
  // indirectLink: [2, 4],
};
