import request from "supertest";
import app from "../src/app"; // Assuming you have an express app instance in app.ts
import User from "../src/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../src/models/User");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Auth Controller", () => {
  describe("POST /register", () => {
    it("should return 400 if user with phone already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce(true);

      const res = await request(app).post("/api/auth/register").send({
        name: "John Doe",
        phone: "1234567890",
        email: "john@example.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "User already exists with this phone number"
      );
    });

    it("should return 400 if user with email already exists", async () => {
      (User.findOne as jest.Mock)
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true);

      const res = await request(app).post("/api/auth/register").send({
        name: "John Doe",
        phone: "1234567890",
        email: "john@example.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("User already exists with this email");
    });

    it("should return 201 if user is registered successfully", async () => {
      (User.findOne as jest.Mock)
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(false);
      (bcrypt.genSalt as jest.Mock).mockResolvedValueOnce("salt");
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashedPassword");
      (User.prototype.save as jest.Mock).mockResolvedValueOnce(true);

      const res = await request(app).post("/api/auth/register").send({
        name: "John Doe",
        phone: "1234567890",
        email: "john@example.com",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("User registered successfully");
    });

    it("should return 500 if there is a server error", async () => {
      (User.findOne as jest.Mock).mockRejectedValueOnce(
        new Error("Server error")
      );

      const res = await request(app).post("/api/auth/register").send({
        name: "John Doe",
        phone: "1234567890",
        email: "john@example.com",
        password: "password123",
      });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Server error");
    });
  });

  describe("POST /login", () => {
    it("should return 400 if email is invalid", async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce(null);

      const res = await request(app).post("/api/auth/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid email or password");
    });

    it("should return 400 if password is invalid", async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce({
        password: "hashedPassword",
      });
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

      const res = await request(app).post("/api/auth/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid email or password");
    });

    it("should return 200 if login is successful", async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce({
        _id: "userId",
        name: "John Doe",
        password: "hashedPassword",
      });
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      (jwt.sign as jest.Mock).mockReturnValueOnce("token");

      const res = await request(app).post("/api/auth/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ name: "John Doe", token: "token" });
    });

    it("should return 500 if there is a server error", async () => {
      (User.findOne as jest.Mock).mockRejectedValueOnce(
        new Error("Server error")
      );

      const res = await request(app).post("/api/auth/login").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Server error");
    });
  });
});
