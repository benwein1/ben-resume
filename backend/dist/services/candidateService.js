"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidatesService = getCandidatesService;
exports.getCandidateByIdService = getCandidateByIdService;
exports.createCandidateService = createCandidateService;
exports.updateCandidateService = updateCandidateService;
exports.deleteCandidateService = deleteCandidateService;
const candidateModel_1 = require("../models/candidateModel");
const candidateSchema_1 = require("../schemas/candidateSchema");
async function getCandidatesService() {
    return (0, candidateModel_1.findAllCandidatesWithRelations)();
}
async function getCandidateByIdService(id) {
    const candidate = await (0, candidateModel_1.findCandidateWithRelationsById)(id);
    if (!candidate) {
        const error = new Error('Candidate not found');
        error.status = 404;
        throw error;
    }
    return candidate;
}
async function createCandidateService(payload) {
    const data = candidateSchema_1.createCandidateSchema.parse(payload);
    return (0, candidateModel_1.createCandidateWithRelations)(data);
}
async function updateCandidateService(id, payload) {
    const data = candidateSchema_1.updateCandidateSchema.parse(payload);
    const updated = await (0, candidateModel_1.updateCandidateWithRelations)(id, data);
    if (!updated) {
        const error = new Error('Candidate not found');
        error.status = 404;
        throw error;
    }
    return updated;
}
async function deleteCandidateService(id) {
    const deleted = await (0, candidateModel_1.deleteCandidateWithRelations)(id);
    if (!deleted) {
        const error = new Error('Candidate not found');
        error.status = 404;
        throw error;
    }
    return deleted;
}
