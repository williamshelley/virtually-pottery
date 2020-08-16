/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./entry.js":
/*!******************!*\
  !*** ./entry.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(/*! ./src/html_util.js */ "./src/html_util.js"),
    html = _require.html,
    div = _require.div,
    span = _require.span,
    p = _require.p,
    h1 = _require.h1,
    h2 = _require.h2,
    h3 = _require.h3,
    createNode = _require.createNode,
    divNode = _require.divNode,
    spanNode = _require.spanNode,
    pNode = _require.pNode,
    h1Node = _require.h1Node,
    h2Node = _require.h2Node,
    h3Node = _require.h3Node;

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("root");
  root.innerHTML += div({
    children: [h1({
      children: ["h1", "Testing", "1", "2", p({
        children: ["3"]
      })]
    }), h2({
      children: ["h2"]
    }), h3({
      children: ["h3"]
    })]
  });
  var c1 = h3Node({
    innerText: "h3 child of h1"
  });
  var c2 = h3Node({
    innerText: "h3 child of h1"
  });
  var c3 = h3Node({
    innerText: "h3 child of h1"
  });
  var h1Child = divNode({
    innerText: "This is an h1 child!",
    children: [c1, c2, c3]
  });
  h1Child.addEventListener("click", function () {
    return console.log("hello");
  });
  root.appendChild(h1Child);
});

/***/ }),

/***/ "./src/html_util.js":
/*!**************************!*\
  !*** ./src/html_util.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var attr = function attr(_ref) {
  var key = _ref.key,
      value = _ref.value;
  return value ? "".concat(key, "=").concat(value) : "";
};

var classSelector = function classSelector(className) {
  return className ? ".".concat(className) : "";
};

var createNode = function createNode(_ref2) {
  var tag = _ref2.tag,
      _ref2$id = _ref2.id,
      id = _ref2$id === void 0 ? "" : _ref2$id,
      _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? "" : _ref2$className,
      _ref2$children = _ref2.children,
      children = _ref2$children === void 0 ? [] : _ref2$children,
      _ref2$innerText = _ref2.innerText,
      innerText = _ref2$innerText === void 0 ? "" : _ref2$innerText;
  id = attr("id", id);
  className = attr("class", id);
  var childNode = document.createElement(tag);
  childNode.id = id;
  childNode.className = className;
  childNode.innerText = innerText;
  children.forEach(function (child) {
    return childNode.appendChild(child);
  });
  return childNode;
};

var divNode = function divNode(props) {
  return createNode(_objectSpread({
    tag: "div"
  }, props));
};

var spanNode = function spanNode(props) {
  return createNode(_objectSpread({
    tag: "span"
  }, props));
};

var pNode = function pNode(props) {
  return createNode(_objectSpread({
    tag: "p"
  }, props));
};

var h1Node = function h1Node(props) {
  return createNode(_objectSpread({
    tag: "h1"
  }, props));
};

var h2Node = function h2Node(props) {
  return createNode(_objectSpread({
    tag: "h2"
  }, props));
};

var h3Node = function h3Node(props) {
  return createNode(_objectSpread({
    tag: "h3"
  }, props));
};

var html = function html(_ref3) {
  var tag = _ref3.tag,
      id = _ref3.id,
      className = _ref3.className,
      children = _ref3.children,
      onClick = _ref3.onClick;
  id = attr("id", id);
  className = attr("class", id);
  return "<".concat(tag, " ").concat(id, " ").concat(className, ">").concat(children.join(""), "</").concat(tag, ">");
};

var div = function div(props) {
  return html(_objectSpread({
    tag: "div"
  }, props));
};

var span = function span(props) {
  return html(_objectSpread({
    tag: "span"
  }, props));
};

var p = function p(props) {
  return html(_objectSpread({
    tag: "p"
  }, props));
};

var h1 = function h1(props) {
  return html(_objectSpread({
    tag: "h1"
  }, props));
};

var h2 = function h2(props) {
  return html(_objectSpread({
    tag: "h2"
  }, props));
};

var h3 = function h3(props) {
  return html(_objectSpread({
    tag: "h3"
  }, props));
};

module.exports = {
  html: html,
  div: div,
  span: span,
  p: p,
  h1: h1,
  h2: h2,
  h3: h3,
  createNode: createNode,
  divNode: divNode,
  spanNode: spanNode,
  pNode: pNode,
  h1Node: h1Node,
  h2Node: h2Node,
  h3Node: h3Node
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map