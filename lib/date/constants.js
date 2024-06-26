"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USA_MM_DD_YYYY_DATE_TIME = exports.USA_MM_DD_YYYY_DATE = exports.PREFIXED_DAY = exports.PREFIXED_MONTH = exports.FULL_YEAR = exports.UNIX_TIMESTAMP = exports.YYYY_MM_DD_T_TIME_Z = exports.YYYY_MM_DD_T_TIME_MS_OFFSET = exports.YYYY_MM_DD_T_TIME_OFFSET = exports.YYYY_MM_DD_TIME_MS_OFFSET = exports.YYYY_MM_DD_TIME_OFFSET = exports.YYYY_MM_DD_T_TIME = exports.DATE_TIME = exports.YYYY_MM_DD = exports.REGEX_DATE_ISO8601 = exports.REGEX_DATE_YYYY_MM_DD = void 0;
/* eslint-disable quotes */
exports.REGEX_DATE_YYYY_MM_DD = /^20\d{2}-(0[1-9]|1(0|1|2))-(0[1-9]|1[0-9]|2[0-9]|3(0|1))$/;
exports.REGEX_DATE_ISO8601 = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})[+-](\d{2}):(\d{2})/;
exports.YYYY_MM_DD = 'y-MM-dd';
exports.DATE_TIME = 'y-MM-dd HH:mm:ss';
exports.YYYY_MM_DD_T_TIME = "y-MM-dd'T'HH:mm:ss";
exports.YYYY_MM_DD_TIME_OFFSET = 'y-MM-dd HH:mm:ssZZ';
exports.YYYY_MM_DD_TIME_MS_OFFSET = 'y-MM-dd HH:mm:ss.SSSZZ';
exports.YYYY_MM_DD_T_TIME_OFFSET = "y-MM-dd'T'HH:mm:ssZZ";
exports.YYYY_MM_DD_T_TIME_MS_OFFSET = "y-MM-dd'T'HH:mm:ss.SSSZZ";
exports.YYYY_MM_DD_T_TIME_Z = "y-MM-dd'T'HH:mm:ss'Z'";
exports.UNIX_TIMESTAMP = 'X';
exports.FULL_YEAR = 'y';
exports.PREFIXED_MONTH = 'MM';
exports.PREFIXED_DAY = 'dd';
exports.USA_MM_DD_YYYY_DATE = 'MM/dd/yy';
exports.USA_MM_DD_YYYY_DATE_TIME = 'MM/dd/yy HH:mm:ss';
