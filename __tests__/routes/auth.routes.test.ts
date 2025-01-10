import request from "supertest";
import app from "../../src/app";

describe("Auth Route Test", () => {
  test("test register route", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        email: "jp1kashyap@gmail.com",
        name: "Jp1",
      })
      .expect(400);
  });

  test("test login route", async () => {
    await request(app)
      .post("/api/auth/login")
      .send({
        email: "jp1kashyap@gmail.com",
        password: "12345678",
      })
      .expect(200);
  });
});
