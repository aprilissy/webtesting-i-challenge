const enhancer = require("./enhancer.js");

describe("Sanity Check", () => {
  it("tests the file", () => {
    expect(true).not.toBe(false);
    expect([]).not.toBe([]);
    expect({}).toEqual({});
  });
});

let item1, item2, item3, item4, item5;

beforeEach(() => {
  item1 = {name:"item1", durability: 12, enhancement:18};
  item2 = {name:"item2", durability: 60, enhancement:15};
  item3 = {name:"item3", durability: 36, enhancement:13};
  item4 = {name:"item4", durability:100, enhancement:20};
  item5 = {name:"item5", durability:  1, enhancement: 0};
});

describe("Enhancer method: repair", () => {
  it("resets durability to 100", () => {
    expect(item1.durability).not.toBe(100);
    const fixed = enhancer.repair(item1);
    expect(fixed.durability).toBe(100);
  });
});

describe("Enhancer method: fail", () => {
  function failing(item){return enhancer.fail(item);}
  it("decreases the durability of the item by 5 if the item's enhancement is less than 15", () => {
    const check = failing(item3);
    expect(check.durability).toBe(31);
  });
  it("decreases the durability of the item by 10 if the item's enhancement is 15 or more", () => {  
    const check = failing(item2);
    expect(check.durability).toBe(50);
  });
  it("decreases the enhancement level by 1 if the item's enhancement level is greater than 16", () => {
    const check = failing(item1);
    expect(check.enhancement).toBe(17);
  });
});

describe("Enhancer method: success", () => {
  function succeeding(item){return enhancer.success(item);}
  it("increases the item's enhancement by 1", () => {
    const check = succeeding(item1);    
    expect(check.enhancement).toBe(19);
  });
  it("leaves the enhancement level unchanged if the item's enhancement level is 20", () => {
    const check = succeeding(item4);
    expect(check.enhancement).toBe(20);
  });
  it("leaves the durability of the item unchanged", () => {
    expect(item1.durability).toBe(12);
    expect(item2.durability).toBe(60);
    expect(item3.durability).toBe(36);
    expect(item4.durability).toBe(100);
  });
});

describe("Enhancer method: get", () => {
  function getting(item){return enhancer.get(item);}
  it("leaves the name unchanged if the enhancement level is 0", () => {
    const check = getting(item5);
    expect(check.name).toBe("item5");
  });
  it("changes the name to include the enhancement level if the enhancement level is greater than 0.", () => {
    const check = enhancer.get(item4);
    expect(check.name).toBe("[+20] item4");
  });
});
