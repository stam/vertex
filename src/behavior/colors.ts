const colors = [
  "#e41a1c",
  "#377eb8",
  "#4daf4a",
  "#984ea3",
  "#ff7f00",
  "#ffff33",
  "#a65628",
  "#f781bf"
];

let _index = 0;

export const getColor = () => {
  const color = colors[_index];
  _index = (_index + 1) % colors.length;
  return color;
};
