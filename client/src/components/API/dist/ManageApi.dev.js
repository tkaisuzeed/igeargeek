"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Booking = exports.LockerList = exports.Deposit = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Deposit = function Deposit(balance) {
  var res;
  return regeneratorRuntime.async(function Deposit$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:5000/manage/deposit', balance));

        case 2:
          res = _context.sent;

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.Deposit = Deposit;

var LockerList = function LockerList() {
  var res;
  return regeneratorRuntime.async(function LockerList$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get('http://localhost:5000/manage/lockerlist'));

        case 2:
          res = _context2.sent;
          return _context2.abrupt("return", res);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.LockerList = LockerList;

var Booking = function Booking(newData) {
  var res;
  return regeneratorRuntime.async(function Booking$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post('http://localhost:5000/manage/booking', newData));

        case 2:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.Booking = Booking;