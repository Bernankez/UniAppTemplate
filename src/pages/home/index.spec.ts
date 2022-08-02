import {expect, describe, it} from "vitest";

// vitest test
describe('test vitest', () => {
  it('expect toBe', () => {
    expect(1 + 1).toBe(2)
  })
  it('matchInlineSnapshot', () => {
    expect({a: 1, b: 2}).toMatchInlineSnapshot(`
      {
        "a": 1,
        "b": 2,
      }
    `)
  })
})