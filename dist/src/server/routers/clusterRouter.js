"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var clusterController_1 = __importDefault(require("../controllers/clusterController"));
var router = express_1.default.Router();
// get request for namespace list
router.get('/namespaces', clusterController_1.default.getNamespaces, function (req, res) {
    res.status(200).json(res.locals.namespaceList);
});
// get request for pod list
router.get('/pod/:namespace', clusterController_1.default.getPods, function (req, res) {
    res.status(200).json(res.locals.podList);
});
// get request for node list
router.get('/node/:namespace', clusterController_1.default.getNodes, function (req, res) {
    res.status(200).json(res.locals.nodeList);
});
exports.default = router;
