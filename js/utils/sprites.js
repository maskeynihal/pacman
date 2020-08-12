const pacmanSprite = {
  animation: [
    {
      sourceX: 0,
      sourceY: 0,
      name: 'fullOpen',
    },
    {
      sourceX: 20,
      sourceY: 0,
      name: 'halfOpen',
    },
    {
      sourceX: 40,
      sourceY: 0,
      name: 'closed',
    },
    {
      sourceX: 60,
      sourceY: 0,
      name: 'fullOpen',
    },
    {
      sourceX: 80,
      sourceY: 0,
      name: 'halfOpen',
    },
    {
      sourceX: 100,
      sourceY: 0,
      name: 'freezed',
    },
  ],
};

const ghosts = {
  red: {
    animation: [
      {
        sourceX: 80,
        sourceY: 0,
        name: 'left',
      },
      {
        sourceX: 100,
        sourceY: 0,
        name: 'right',
      },
    ],
  },
  blue: {
    animation: [
      {
        sourceX: 120,
        sourceY: 0,
        name: 'left',
      },
      {
        sourceX: 140,
        sourceY: 0,
        name: 'right',
      },
    ],
  },
  orange: {
    animation: [
      {
        sourceX: 160,
        sourceY: 0,
        name: 'left',
      },
      {
        sourceX: 180,
        sourceY: 0,
        name: 'right',
      },
    ],
  },
  pink: {
    animation: [
      {
        sourceX: 200,
        sourceY: 0,
        name: 'left',
      },
      {
        sourceX: 220,
        sourceY: 0,
        name: 'right',
      },
    ],
  },
  frightBlue: {
    animation: [
      {
        sourceX: 0,
        sourceY: 0,
        name: 'left',
      },
      {
        sourceX: 20,
        sourceY: 0,
        name: 'right',
      },
    ],
  },
  frightWhite: {
    animation: [
      {
        sourceX: 40,
        sourceY: 0,
        name: 'left',
      },
      {
        sourceX: 60,
        sourceY: 0,
        name: 'right',
      },
    ],
  },
};

export { pacmanSprite, ghosts };
