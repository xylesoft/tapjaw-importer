"use strict";
/**
 * @module TapjawConfig
 * @see {@link ../../default.env} file for default configurations for TapjawConfig.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.DotEnvConfig = void 0;
const tslib_1 = require("tslib");
var dot_env_config_1 = require("./dot-env-config");
Object.defineProperty(exports, "DotEnvConfig", { enumerable: true, get: function () { return tslib_1.__importDefault(dot_env_config_1).default; } });
tslib_1.__exportStar(require("./tapjaw-config"), exports);
var tapjaw_config_1 = require("./tapjaw-config");
Object.defineProperty(exports, "getConfig", { enumerable: true, get: function () { return tslib_1.__importDefault(tapjaw_config_1).default; } });
