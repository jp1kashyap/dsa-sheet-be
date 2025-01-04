"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const zod_1 = require("zod");
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    field: issue.path.join("."),
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res
                    .status(400)
                    .json({ message: "Invalid data", details: errorMessages });
            }
            else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    };
}
