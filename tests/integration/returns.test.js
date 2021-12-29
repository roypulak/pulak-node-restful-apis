const request = require("supertest");
const { Rental } = require("../../models/rental");
const mongoose = require("mongoose");
const { User } = require("../../models/user");

describe("/api/vidly/returns", () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token;

  const exec = async () => {
    return await request(server)
      .post("/api/vidly/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    server = require("../../vidly");

    token = new User().generateAuthToken();

    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "123456",
      },
      movie: {
        _id: movieId,
        title: "movie title",
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    server.close();
    await Rental.remove({});
  });

  it("should work!", async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull();
  });

  it("should return 401 if client is not logged in", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not provided", async () => {
    const res = await request(server)
      .post("/api/vidly/returns")
      .set("x-auth-token", token)
      .send({ movieId });

    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    const res = await request(server)
    .post("/api/vidly/returns")
    .set("x-auth-token", token)
    .send({ customerId });

    expect(res.status).toBe(400);
  });
});
