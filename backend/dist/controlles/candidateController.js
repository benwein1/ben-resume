"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidatesController = getCandidatesController;
exports.getCandidateByIdController = getCandidateByIdController;
exports.createCandidateController = createCandidateController;
exports.updateCandidateController = updateCandidateController;
exports.deleteCandidateController = deleteCandidateController;
const candidateService_1 = require("../services/candidateService");
async function getCandidatesController(req, res, next) {
    try {
        const candidates = await (0, candidateService_1.getCandidatesService)();
        res.json(candidates);
    }
    catch (err) {
        next(err);
    }
}
async function getCandidateByIdController(req, res, next) {
    try {
        const id = Number(req.params.id);
        const candidate = await (0, candidateService_1.getCandidateByIdService)(id);
        res.json(candidate);
    }
    catch (err) {
        next(err);
    }
}
async function createCandidateController(req, res, next) {
    try {
        const created = await (0, candidateService_1.createCandidateService)(req.body);
        res.status(201).json(created);
    }
    catch (err) {
        next(err);
    }
}
async function updateCandidateController(req, res, next) {
    try {
        const id = Number(req.params.id);
        const updated = await (0, candidateService_1.updateCandidateService)(id, req.body);
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
}
async function deleteCandidateController(req, res, next) {
    try {
        const id = Number(req.params.id);
        const deleted = await (0, candidateService_1.deleteCandidateService)(id);
        res.json(deleted);
    }
    catch (err) {
        next(err);
    }
}
