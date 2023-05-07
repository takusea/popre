import { testApiHandler } from "next-test-api-route-handler";

import handler from "@/pages/api/prefecture";

describe("/pages/api/prefecture", () => {
  it("200", async () => {
    expect.hasAssertions();

    await testApiHandler({
      handler,
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(200);
        await expect(res.json()).resolves.toHaveLength(47);
      },
    });
  });
});
