module.exports = {
  success,
  fail,
  repair,
  get,
};

function success(item) {
  //accepts an item object 
  //returns a new item object modified according to the rules defined by the client for enhancement success
  if (item.enhancement < 20) {
    item.enhancement += 1;
  }

  return { ...item };
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
  return { ...item };
}

function repair(item) {
  item.durability = 100;
  return { ...item };
}

function get(item) {
  //takes an item
  //returns a new item with the name property modified according to the following rules:
  if (item.enhancement > 0) {
    item.name = `[+${item.enhancement}] ${item.name}`;
  }
  return { ...item };
}
