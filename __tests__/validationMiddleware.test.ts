import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validateData } from "../src/middlewares/validationMiddleware";

describe("validateData middleware", () => {
  const schema = z.object({
    name: z.string(),
    age: z.number().int(),
  });

  let req: Partial<Request & { user?: any }>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next if data is valid", () => {
    req.body = { name: "John", age: 30 };

    validateData(schema)(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return 400 if data is invalid", () => {
    req.body = { name: "John", age: "thirty" };

    validateData(schema)(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid data",
      details: [
        {
          field: "age",
          message: "age is Expected number, received string",
        },
      ],
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 500 if an unexpected error occurs", () => {
    const invalidSchema = {
      parse: () => {
        throw new Error("Unexpected error");
      },
    };

    validateData(invalidSchema as any)(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
