export default {
  name: 'nivo',
  color: 'hsl(149, 70%, 50%)',
  children: [
    {
      name: 'viz',
      color: 'hsl(32, 70%, 50%)',
      children: [
        {
          name: 'stack',
          color: 'hsl(288, 70%, 50%)',
          children: [
            {
              name: 'chart',
              color: 'hsl(170, 70%, 50%)',
              loc: 177373,
            },
            {
              name: 'xAxis',
              color: 'hsl(323, 70%, 50%)',
              loc: 197045,
            },
            {
              name: 'yAxis',
              color: 'hsl(67, 70%, 50%)',
              loc: 104515,
            },
            {
              name: 'layers',
              color: 'hsl(327, 70%, 50%)',
              loc: 138929,
            },
          ],
        },
        {
          name: 'pie',
          color: 'hsl(237, 70%, 50%)',
          children: [
            {
              name: 'chart',
              color: 'hsl(20, 70%, 50%)',
              children: [
                {
                  name: 'pie',
                  color: 'hsl(232, 70%, 50%)',
                  children: [
                    {
                      name: 'outline',
                      color: 'hsl(111, 70%, 50%)',
                      loc: 46483,
                    },
                    {
                      name: 'slices',
                      color: 'hsl(121, 70%, 50%)',
                      loc: 139453,
                    },
                    {
                      name: 'bbox',
                      color: 'hsl(253, 70%, 50%)',
                      loc: 102255,
                    },
                  ],
                },
                {
                  name: 'donut',
                  color: 'hsl(340, 70%, 50%)',
                  loc: 189343,
                },
                {
                  name: 'gauge',
                  color: 'hsl(191, 70%, 50%)',
                  loc: 176219,
                },
              ],
            },
            {
              name: 'legends',
              color: 'hsl(107, 70%, 50%)',
              loc: 124744,
            },
          ],
        },
      ],
    },
    {
      name: 'colors',
      color: 'hsl(71, 70%, 50%)',
      children: [
        {
          name: 'rgb',
          color: 'hsl(332, 70%, 50%)',
          loc: 11533,
        },
        {
          name: 'hsl',
          color: 'hsl(11, 70%, 50%)',
          loc: 146995,
        },
      ],
    },
    {
      name: 'utils',
      color: 'hsl(38, 70%, 50%)',
      children: [
        {
          name: 'randomize',
          color: 'hsl(336, 70%, 50%)',
          loc: 92453,
        },
        {
          name: 'resetClock',
          color: 'hsl(72, 70%, 50%)',
          loc: 50649,
        },
        {
          name: 'noop',
          color: 'hsl(44, 70%, 50%)',
          loc: 119187,
        },
        {
          name: 'tick',
          color: 'hsl(54, 70%, 50%)',
          loc: 171020,
        },
        {
          name: 'forceGC',
          color: 'hsl(174, 70%, 50%)',
          loc: 182172,
        },
        {
          name: 'stackTrace',
          color: 'hsl(155, 70%, 50%)',
          loc: 78683,
        },
        {
          name: 'dbg',
          color: 'hsl(321, 70%, 50%)',
          loc: 161675,
        },
      ],
    },
    {
      name: 'generators',
      color: 'hsl(358, 70%, 50%)',
      children: [
        {
          name: 'address',
          color: 'hsl(291, 70%, 50%)',
          loc: 88933,
        },
        {
          name: 'city',
          color: 'hsl(142, 70%, 50%)',
          loc: 67312,
        },
        {
          name: 'animal',
          color: 'hsl(286, 70%, 50%)',
          loc: 50987,
        },
        {
          name: 'movie',
          color: 'hsl(347, 70%, 50%)',
          loc: 10856,
        },
        {
          name: 'user',
          color: 'hsl(292, 70%, 50%)',
          loc: 19476,
        },
      ],
    },
    {
      name: 'set',
      color: 'hsl(24, 70%, 50%)',
      children: [
        {
          name: 'clone',
          color: 'hsl(229, 70%, 50%)',
          loc: 163531,
        },
        {
          name: 'intersect',
          color: 'hsl(246, 70%, 50%)',
          loc: 10437,
        },
        {
          name: 'merge',
          color: 'hsl(58, 70%, 50%)',
          loc: 60042,
        },
        {
          name: 'reverse',
          color: 'hsl(77, 70%, 50%)',
          loc: 45887,
        },
        {
          name: 'toArray',
          color: 'hsl(306, 70%, 50%)',
          loc: 1505,
        },
        {
          name: 'toObject',
          color: 'hsl(323, 70%, 50%)',
          loc: 41267,
        },
        {
          name: 'fromCSV',
          color: 'hsl(120, 70%, 50%)',
          loc: 78802,
        },
        {
          name: 'slice',
          color: 'hsl(201, 70%, 50%)',
          loc: 147689,
        },
        {
          name: 'append',
          color: 'hsl(291, 70%, 50%)',
          loc: 5961,
        },
        {
          name: 'prepend',
          color: 'hsl(358, 70%, 50%)',
          loc: 67629,
        },
        {
          name: 'shuffle',
          color: 'hsl(74, 70%, 50%)',
          loc: 40414,
        },
        {
          name: 'pick',
          color: 'hsl(217, 70%, 50%)',
          loc: 32925,
        },
        {
          name: 'plouc',
          color: 'hsl(156, 70%, 50%)',
          loc: 118499,
        },
      ],
    },
    {
      name: 'text',
      color: 'hsl(179, 70%, 50%)',
      children: [
        {
          name: 'trim',
          color: 'hsl(157, 70%, 50%)',
          loc: 102688,
        },
        {
          name: 'slugify',
          color: 'hsl(149, 70%, 50%)',
          loc: 146186,
        },
        {
          name: 'snakeCase',
          color: 'hsl(164, 70%, 50%)',
          loc: 133165,
        },
        {
          name: 'camelCase',
          color: 'hsl(203, 70%, 50%)',
          loc: 20394,
        },
        {
          name: 'repeat',
          color: 'hsl(30, 70%, 50%)',
          loc: 35646,
        },
        {
          name: 'padLeft',
          color: 'hsl(66, 70%, 50%)',
          loc: 105887,
        },
        {
          name: 'padRight',
          color: 'hsl(202, 70%, 50%)',
          loc: 158176,
        },
        {
          name: 'sanitize',
          color: 'hsl(221, 70%, 50%)',
          loc: 27598,
        },
        {
          name: 'ploucify',
          color: 'hsl(160, 70%, 50%)',
          loc: 10159,
        },
      ],
    },
    {
      name: 'misc',
      color: 'hsl(175, 70%, 50%)',
      children: [
        {
          name: 'greetings',
          color: 'hsl(72, 70%, 50%)',
          children: [
            {
              name: 'hey',
              color: 'hsl(203, 70%, 50%)',
              loc: 191675,
            },
            {
              name: 'HOWDY',
              color: 'hsl(116, 70%, 50%)',
              loc: 148859,
            },
            {
              name: 'aloha',
              color: 'hsl(327, 70%, 50%)',
              loc: 54468,
            },
            {
              name: 'AHOY',
              color: 'hsl(240, 70%, 50%)',
              loc: 8549,
            },
          ],
        },
        {
          name: 'other',
          color: 'hsl(215, 70%, 50%)',
          loc: 51697,
        },
        {
          name: 'path',
          color: 'hsl(360, 70%, 50%)',
          children: [
            {
              name: 'pathA',
              color: 'hsl(171, 70%, 50%)',
              loc: 17221,
            },
            {
              name: 'pathB',
              color: 'hsl(331, 70%, 50%)',
              children: [
                {
                  name: 'pathB1',
                  color: 'hsl(307, 70%, 50%)',
                  loc: 44813,
                },
                {
                  name: 'pathB2',
                  color: 'hsl(170, 70%, 50%)',
                  loc: 9628,
                },
                {
                  name: 'pathB3',
                  color: 'hsl(301, 70%, 50%)',
                  loc: 95589,
                },
                {
                  name: 'pathB4',
                  color: 'hsl(155, 70%, 50%)',
                  loc: 112746,
                },
              ],
            },
            {
              name: 'pathC',
              color: 'hsl(97, 70%, 50%)',
              children: [
                {
                  name: 'pathC1',
                  color: 'hsl(108, 70%, 50%)',
                  loc: 84981,
                },
                {
                  name: 'pathC2',
                  color: 'hsl(219, 70%, 50%)',
                  loc: 61966,
                },
                {
                  name: 'pathC3',
                  color: 'hsl(76, 70%, 50%)',
                  loc: 48166,
                },
                {
                  name: 'pathC4',
                  color: 'hsl(284, 70%, 50%)',
                  loc: 93316,
                },
                {
                  name: 'pathC5',
                  color: 'hsl(262, 70%, 50%)',
                  loc: 197719,
                },
                {
                  name: 'pathC6',
                  color: 'hsl(40, 70%, 50%)',
                  loc: 56930,
                },
                {
                  name: 'pathC7',
                  color: 'hsl(210, 70%, 50%)',
                  loc: 65289,
                },
                {
                  name: 'pathC8',
                  color: 'hsl(213, 70%, 50%)',
                  loc: 1823,
                },
                {
                  name: 'pathC9',
                  color: 'hsl(38, 70%, 50%)',
                  loc: 5764,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
