function rand(from, to) {
  return Math.random() * (to - from) + from;
}

function randInt(from, to) {
  return Math.floor(rand(from, to));
}

function randColor() {
  return `rgb(${randInt(0, 256)}, ${randInt(0, 256)}, ${randInt(0, 256)})`;
}

export { rand, randColor, randInt };
