import request from "supertest";
import express from "express";
import router from "./health";

const app = express();
app.use(router);

describe("GET /", () => {
  it("should return a message indicating the server is up and running", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Server is up and running" });
  });
});
