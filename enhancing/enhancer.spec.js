const enhancer = require("./enhancer.js");

describe("Sanity Check", () => {
  test("running using test", () => {
    expect(true).not.toBe(false);
    expect([]).not.toBe([]);
    expect({}).toEqual({});
  });
});

const item1 = {name:"item1", durability: 12, enhancement:18};
const item2 = {name:"item2", durability: 60, enhancement:15};
const item3 = {name:"item3", durability: 36, enhancement:13};
const item4 = {name:"item4", durability:100, enhancement:20};
const item5 = {name:"item5", durability:  1, enhancement: 0};

describe("enhancer method: repair", () => {
  test("repair resets durability to 100", () => {
    const item = {...item1};
    const fixed = enhancer.repair(item);
    expect(fixed.durability).toBe(100);
  });
});

describe("enhancer method: fail", () => {
  test("If the item's enhancement is less than 15, the durability of the item is decreased by 5.", () => {
    const item = {...item3};
    const failing = enhancer.fail(item);
    expect(failing.durability).toBe(31);
  });
  test("If the item's enhancement is 15 or more, the durability of the item is decreased by 10.", () => {
    const item = {...item2};
    const failing = enhancer.fail(item);
    expect(failing.durability).toBe(50);
  });
  test("If the item's enhancement level is greater than 16, the enhancement level decreases by 1 (17 goes down to 16, 18 goes down to 17)", () => {
    const item = {...item1};
    const failing = enhancer.fail(item);
    expect(failing.enhancement).toBe(17);
  });
});

describe("enhancer method: success", () => {
  test("The item's enhancement increases by 1", () => {
    const item = {...item1};
    const succeeding = enhancer.success(item);
    expect(succeeding.enhancement).toBe(19);
  });
  test("If the item enhancement level is 20, the enhancement level is not changed", () => {
    const item = {...item4};
    const succeeding = enhancer.success(item);
    expect(succeeding.enhancement).toBe(20);
    expect(succeeding.enhancement).toEqual(item.enhancement);
  });
  test("The durability of the item is not changed", () => {
    const item = {...item4};
    const succeeding = enhancer.success(item);
    expect(succeeding.durability).toEqual(item.durability);
    expect(item1.durability).toBe(12);
    expect(item2.durability).toBe(60);
    expect(item3.durability).toBe(36);
    expect(item4.durability).toBe(100);
  });
});

describe("enhancer method: get", () => {
  test("if the enhancement level is 0, the the name is not modified", () => {
    const item = {...item5};
    const getting = enhancer.get(item);
    expect(getting.name).toEqual(item.name);
    expect(item5.name).toBe("item5");
  });
  test("if the enhancement level is greater than 0, change the name to include the enhancement level, preceded by a plus sign ( + ), between square brackets before the item's name. Example: the name of a 'Iron Sword' enhanced to 7 would be '[+7] Iron Sword'", () => {
    const item = {...item4};
    const getting = enhancer.get(item);
    expect(getting.name).toBe(`[+${item4.enhancement}] ${item4.name}`);
    expect(getting.name).toBe("[+20] item4");
  });
});
