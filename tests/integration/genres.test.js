const request = require("supertest");
const { Genre } = require("../../models/genre");

let server;

describe("/api/vidly/genres", () => {
  beforeEach(() => {
    server = require("../../vidly");
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      //arrange
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      //action
      const res = await request(server).get("/api/vidly/genres");

      //assert
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/vidly/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get('/api/vidly/genres/toptoptoptop');
      
      expect(res.status).toBe(404);
    });
  });
});
