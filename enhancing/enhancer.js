module.exports = {
  success,
  fail,
  repair,
  get,
};

function success(item) {
  if (item.enhancement < 20) {
    item.enhancement += 1;
  }
  return item;
}

function fail(item) {
  if(item.enhancement < 15){
    item.durability -= 5;
  } else if (item.enhancement >= 15){
    item.durability -= 10;
    if (item.enhancement > 16) {
      item.enhancement -= 1;
    }
  }
  return item;
}

function repair(item) {
  item.durability = 100;
  return item;
}

function get(item) {
  if (item.enhancement > 0) {
    item.name = `[+${item.enhancement}] ${item.name}`;
  }
  return item;
}
