"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
function gdaxFeedLoader(options) {
    const ws = new ws_1.default('ws');
    ws.on('message', () => {
    });
}
exports.gdaxFeedLoader = gdaxFeedLoader;
