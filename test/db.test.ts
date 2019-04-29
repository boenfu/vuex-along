import { DBService } from "../src/db";

test("test local db", () => {
  const local = new DBService("local");

  local.set("a", 1);

  expect(local.get("a")).toBe(1);

  local.unset("a");

  expect(local.get("a")).toBe(undefined);
});

test("test session db", () => {
  const session = new DBService("session", true);

  session.set("b", 2);

  expect(session.get("b")).toBe(2);

  session.unset("b");

  expect(session.get("b")).toBe(undefined);
});
