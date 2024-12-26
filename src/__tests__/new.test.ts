function sum(a: number, b: number) {
  return a + b;
}

describe("new", () => {
  it("should return 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
