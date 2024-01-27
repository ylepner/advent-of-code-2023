import { getData, solve13 } from "./solution";


describe('Should get index before vertical line in the middle', () => {
  test('test1', async () => {
    const result = await solve13();
    expect(result).toBe(405);
  });
});