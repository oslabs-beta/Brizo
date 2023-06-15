"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var clusterRouter_1 = __importDefault(require("./clusterRouter"));
var securityRouter_1 = __importDefault(require("./securityRouter"));
var router = express_1.default.Router();
router.use('/cluster', clusterRouter_1.default);
router.use('/security', securityRouter_1.default);
exports.default = router;
