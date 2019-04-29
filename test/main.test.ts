import create from "../src/main";

test("create vuex-along", () => {
  const vuexAlong = create({});

  expect(typeof vuexAlong).toBe("function");
});
