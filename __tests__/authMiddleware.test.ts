import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../src/middlewares/authMiddleware";
import User from "../src/models/User";

jest.mock("jsonwebtoken");
jest.mock("../src/models/User");

describe("authMiddleware", () => {
  let req: Partial<Request & { user?: any }>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      header: jest.fn().mockReturnValue("fakeToken"),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
  it("should return 401 if no token is provided", async () => {
    req.header = jest.fn().mockReturnValue(null);

    await authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Access Denied" });
  });

  it("should return 401 if token is invalid", async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Access Denied" });
  });

  it("should return 401 if user is not found", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: "fakeId" });
    (User.findById as jest.Mock).mockResolvedValue(null);

    await authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token or user" });
  });

  it("should call next if token is valid and user is found", async () => {
    const mockUser = { id: "fakeId", name: "John Doe" };
    (jwt.verify as jest.Mock).mockReturnValue({ id: "fakeId" });
    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    await authMiddleware(req as Request, res as Response, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });
});
