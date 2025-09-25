export const randomColor = (name: string) => {
  const nameToNumber = name
    .split('')
    .reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360;
  const color = `hsl(${hue}, 80%, 60%)`;
  return color;
};
