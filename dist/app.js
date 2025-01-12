"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const topic_routes_1 = __importDefault(require("./routes/topic.routes"));
const progress_routes_1 = __importDefault(require("./routes/progress.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: "https://dsa-sheet-fe.vercel.app", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Include credentials if needed (e.g., cookies, HTTP auth)
}));
app.use(body_parser_1.default.json());
// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/topics", topic_routes_1.default);
app.use("/api/progress", progress_routes_1.default);
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGO_URI);
exports.default = app;
