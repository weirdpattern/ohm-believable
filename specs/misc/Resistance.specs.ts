import Resistance from "../../src/misc/Resistance";

describe("Resistance class", (): void => {
  describe("constructor", (): void => {
    it("sets the properties", (): void => {
      const resistance: Resistance = new Resistance(4.1, "±1%");
      expect(resistance.value).toBe(4.1);
      expect(resistance.tolerance).toBe("±1%");
    });

    it("rounds to 4 decimals", (): void => {
      const resistance: Resistance = new Resistance(4.14567788, "±1%");
      expect(resistance.value).toBe(4.1457);
      expect(resistance.tolerance).toBe("±1%");
    });

    it("throws an error when an invalid argument is used", (): void => {
      expect(() => new Resistance(NaN, "±1%")).toThrowError(
        "value must be a number"
      );
    });
  });

  describe("toResistance method", (): void => {
    it("returns a string in compact mode", (): void => {
      expect(new Resistance(40000000, "±1%").toResistance(true)).toBe(
        "40 MΩ ±1%"
      );
    });

    it("returns a string in long mode", (): void => {
      expect(new Resistance(40000000, "±1%").toResistance(false)).toBe(
        "40000000 Ω ±1%"
      );
    });

    it("default to long mode", (): void => {
      expect(new Resistance(40000000, "±1%").toResistance()).toBe(
        "40000000 Ω ±1%"
      );
    });

    it("hides tolerance when is null", (): void => {
      expect(new Resistance(40000000, null).toResistance()).toBe("40000000 Ω");
    });
  });
});
