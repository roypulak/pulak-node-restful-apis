const request = require("supertest");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../vidly");
  });

  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      const res = await request(server).get("/api/vidly/genres");
      expect(res.status).toBe(200);
    });
  });
});
