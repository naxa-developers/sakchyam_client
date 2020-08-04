const sankeyData = {
  nodes: [
    {
      id: 'John',
      color: 'hsl(52, 70%, 50%)',
    },
    {
      id: 'Raoul',
      color: 'hsl(140, 70%, 50%)',
    },
    {
      id: 'Jane',
      color: 'hsl(296, 70%, 50%)',
    },
    {
      id: 'Marcel',
      color: 'hsl(315, 70%, 50%)',
    },
    {
      id: 'Ibrahim',
      color: 'hsl(183, 70%, 50%)',
    },
    {
      id: 'Junko',
      color: 'hsl(301, 70%, 50%)',
    },
  ],
  links: [
    {
      source: 'Jane',
      target: 'Marcel',
      value: 125,
    },
    {
      source: 'Jane',
      target: 'John',
      value: 190,
    },
    {
      source: 'Marcel',
      target: 'John',
      value: 174,
    },
    {
      source: 'Ibrahim',
      target: 'Jane',
      value: 139,
    },
    {
      source: 'Ibrahim',
      target: 'Junko',
      value: 180,
    },
    {
      source: 'Junko',
      target: 'Jane',
      value: 76,
    },
    {
      source: 'Junko',
      target: 'Raoul',
      value: 193,
    },
    {
      source: 'Raoul',
      target: 'John',
      value: 196,
    },
    {
      source: 'Raoul',
      target: 'Marcel',
      value: 192,
    },
  ],
};
export default sankeyData;
