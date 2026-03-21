"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const candidateRoutes_1 = __importDefault(require("./routes/candidateRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
// place to set all the routes 
app.use('/api/candidates', candidateRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
// Simple error handler
app.use(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(err, _req, res, _next) => {
    const status = err.status ?? 500;
    const message = err.message ?? 'Internal server error';
    res.status(status).json({ error: message });
});
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${PORT}`);
});
