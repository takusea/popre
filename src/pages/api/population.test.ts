import { testApiHandler } from "next-test-api-route-handler";

import handler from "./population";

describe("/pages/api/population", () => {
  it("400:非数", async () => {
    expect.hasAssertions();

    await testApiHandler({
      handler,
      requestPatcher: (req) => (req.url = "/api/population?prefCode=TEST"),
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(400);
      },
    });
  });

  it("400:範囲外", async () => {
    expect.hasAssertions();

    await testApiHandler({
      handler,
      requestPatcher: (req) => (req.url = "/api/population?prefCode=-1"),
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(400);
      },
    });
  });

  it("200", async () => {
    expect.hasAssertions();

    const prefCode = 1;
    const expected = {
      populations: expect.anything(),
      prefCode: prefCode,
    };

    await testApiHandler({
      handler,
      requestPatcher: (req) => (req.url = `/api/population?prefCode=1`),
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(200);
        await expect(res.json()).resolves.toEqual(expected);
      },
    });
  });
});
