"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockjs_1 = require("mockjs");
const testRoutes = [
    {
        url: "/api/test",
        method: "get",
        response() {
            return {
                errno: 0,
                data: {
                    name: mockjs_1.Random.cname(),
                },
            };
        },
    },
];
exports.default = testRoutes;
