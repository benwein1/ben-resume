"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserController = getUserController;
exports.postUserController = postUserController;
exports.putUserController = putUserController;
exports.deleteUserController = deleteUserController;
const userService_1 = require("../services/userService");
async function getUserController(_req, res, next) {
    try {
        const user = await (0, userService_1.getUserService)();
        res.json(user);
    }
    catch (err) {
        next(err);
    }
}
async function postUserController(req, res, next) {
    try {
        const created = await (0, userService_1.postUserService)(req.body);
        res.status(201).json(created);
    }
    catch (err) {
        next(err);
    }
}
async function putUserController(req, res, next) {
    try {
        const updated = await (0, userService_1.putUserService)(req.body);
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
}
async function deleteUserController(_req, res, next) {
    try {
        const deleted = await (0, userService_1.deleteUserService)();
        res.json(deleted);
    }
    catch (err) {
        next(err);
    }
}
