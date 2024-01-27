/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js-src/catalog/race-house.js":
/*!**************************************!*\
  !*** ./js-src/catalog/race-house.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RaceHouse: () => (/* binding */ RaceHouse)\n/* harmony export */ });\n/* harmony import */ var _services_horseService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/horseService.js */ \"./js-src/services/horseService.js\");\n/* harmony import */ var _templater_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templater.js */ \"./js-src/templater.js\");\n\n\n\n\nlet self = {};\n\nlet clickhorsein = function(e){\n\tlet horseId = this.attributes[\"id\"].value.replace(\"id\", \"\");\n\tlet selfin = this;\n\t_services_horseService_js__WEBPACK_IMPORTED_MODULE_0__.HorseService.toRace(function(data){ \n\t\t\tif (data.status == \"ok\") {\n\t\t\t\tselfin.remove();\n\t\t\t\tlet hhtml = self.drawHorses([data.horse]);\n\t\t\t\tself.main.raceSection.innerHTML = self.main.raceSection.innerHTML + hhtml;    \n\t\t\t\tself.initHorseEventsRace();\n\t\t\t}\n\t}, horseId)\n}\n\nlet clickhorseout = function(e){\t\t\n\tlet horseId = this.attributes[\"id\"].value.replace(\"id\", \"\");\n\tlet selfin = this;\n\t_services_horseService_js__WEBPACK_IMPORTED_MODULE_0__.HorseService.outRace(function(data){\n\t\tif (data.status == \"ok\") {\n\t\t\tselfin.remove();\n\t\t\tlet hhtml = self.drawHorses([data.horse]);\n\t\t\tself.main.horseHouseSection.innerHTML = self.main.horseHouseSection.innerHTML + hhtml;\n\t\t\tself.initHorseEventsHouse();\n\t\t}\n\t}, horseId)\n};\n\nself.initHorseEvents = function(){\n\tself.initHorseEventsHouse();\n\tself.initHorseEventsRace();\n}\n\nself.initHorseEventsRace = function(){\t\n\tlet horses = document.querySelectorAll(\".race .horse\");\n\tfor(let h of horses){\t\t\n\t\th.addEventListener(\"click\", clickhorseout);\n\t} \t\t\n}\n\nself.initHorseEventsHouse = function(){\t\n\tlet horsesHouse = document.querySelectorAll(\".horse-house .horse\");\n\tfor(let h of horsesHouse){\t\t\n\t\th.addEventListener(\"click\", clickhorsein);\n\t} \t\n}\n\nself.drawRoachesHtml = function(horses){\n\tlet html = \"\";\n\n\tif (horses.length > 0)\n\t\tfor (let h of horses) { \n\t\t\tlet thtml = _templater_js__WEBPACK_IMPORTED_MODULE_1__.Templater.templates[\"roach\"];\n\t\t\thtml += _templater_js__WEBPACK_IMPORTED_MODULE_1__.Templater.template(thtml, h)\n\t\t}\n\n\treturn html;\n}\n\nself.drawRoaches = function(state){\n\tlet roaches = [];\n\tfor (let r of state) {\n\t\tlet roach = {};\n\t\tlet delta = r[\"gotrunned\"];\n\t\troach[\"id\"] = r[\"id\"];\n\t\troach[\"delta\"] = Math.ceil(delta * 800 / r[\"race\"]);\n\t\troach[\"kind\"] = r[\"horse\"][\"kind\"] ? \"r\" : \"h\";\n\t\troach[\"pic\"] = r[\"horse\"][\"kind\"] ? \"&#129715;\" : \"&#x1F40E;\";\n\t\troach[\"number\"] = r[\"horse\"][\"number\"];\n\t\troaches.push(roach);\n\t}\n\tlet rhtml = self.drawRoachesHtml(roaches);\n\tself.main.stadium.innerHTML = rhtml;\t\t\n}\n\nlet timer = null;\n\nself.race = function(){\n\tconsole.log(\"race\")\n\tif (!!timer) return false;\n\ttimer = setInterval(function(){\n\t\t_services_horseService_js__WEBPACK_IMPORTED_MODULE_0__.HorseService.start(function(data){\n\t\t\tif (data[\"status\"] == \"finished\"){\t\t\t\n\t\t\t\tclearInterval(timer);\n\t\t\t\ttimer = null;\n\t\t\t\tself.loadHouse(false);\n\t\t\t} else\n\t\t\t\tself.drawRoaches(data.state);\n\t\t})\n\t}, 1000)\t\n}\n\nself.initHorseButtonsEvents = function(){\t\n\tself.main.startButton.addEventListener(\"click\", function(e){\n\t\tself.race()\t\n\t});\n\n\tself.main.getHorseButton.addEventListener(\"click\", function(e){\n\t\t_services_horseService_js__WEBPACK_IMPORTED_MODULE_0__.HorseService.getHorse(function(data){\n\t\t\tlet horseHtml = self.drawHorses([data.horse])\n\t\t\tself.main.horseHouseSection.innerHTML = self.main.horseHouseSection.innerHTML  + horseHtml; \n\t\t\tself.initHorseEventsHouse();\n\t\t})\n\t});\n}\n\nself.drawHouseRace = function(){\n\tlet horsesHtml = self.drawHorses(self.main.horseshouse);\n    self.main.horseHouseSection.innerHTML = horsesHtml;    \n\n\tlet horsesHtmlrace = self.drawHorses(self.main.horsesrace);\n    self.main.raceSection.innerHTML = horsesHtmlrace;    \n}\n\nself.drawHorses = function(horses){\n\tlet html = \"\";\n\n\tif (horses.length > 0)\n\t\tfor (let h of horses) { \n\t\t\tlet thtml = _templater_js__WEBPACK_IMPORTED_MODULE_1__.Templater.templates[\"horse\"];\n\t\t\thtml += _templater_js__WEBPACK_IMPORTED_MODULE_1__.Templater.template(thtml, h)\n\t\t}\n\n\treturn html;\n}\n\nself.loadHouse = function(buttons = true){\t\n\t_services_horseService_js__WEBPACK_IMPORTED_MODULE_0__.HorseService.getHorses(function(data){\n\t\tself.main.horseshouse = data.horses;\n\t\tself.main.horsesrace = data.race; \n\t\t\t\t\t\t\t\n\t\tself.drawHouseRace();            \n\t\tself.initHorseEvents();   \n\t\t\n\t\tif (buttons)    \n\t\t\tself.initHorseButtonsEvents();\n\n\t\tif (self.main.app.classList.contains(\"started\") ) {\n\t\t\tself.main.app.classList.remove(\"started\");\n\t\t\tself.race();\n\t\t} \n\t});\n}\n\nself.pinModule = function(main){\n\tself.main = main;\n}\n\nlet RaceHouse = self;\n\n\n\n//# sourceURL=webpack://xmled/./js-src/catalog/race-house.js?");

/***/ }),

/***/ "./js-src/index.js":
/*!*************************!*\
  !*** ./js-src/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _templater_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templater.js */ \"./js-src/templater.js\");\n/* harmony import */ var _catalog_race_house_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog/race-house.js */ \"./js-src/catalog/race-house.js\");\n\n\n\nlet self = {};\n\nself.initElements = function(){\n\tself.horseHouseSection = document.querySelector(\".horse-house\");\n\tself.raceSection = document.querySelector(\".race\");\n\tself.getHorseButton = document.querySelector(\".get-horse\");\n\tself.startButton = document.querySelector(\".start\");\n\tself.stadium = document.querySelector(\".stadium\");\n\tself.app = document.querySelector(\".race-app\");\n}\n\nself.loadModules = function(){\n\t_catalog_race_house_js__WEBPACK_IMPORTED_MODULE_1__.RaceHouse.pinModule(self);\t\n\tself.RaceHouse = _catalog_race_house_js__WEBPACK_IMPORTED_MODULE_1__.RaceHouse;\t\n} \n\nlet init = function(){\t\n\t_templater_js__WEBPACK_IMPORTED_MODULE_0__.Templater.makeTemplates(document.getElementsByClassName(\"template\"));\n\tself.initElements();\t\t\n\tself.loadModules();\n\tself.RaceHouse.loadHouse();\t\t\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", (event) => {\n\tinit();\n});\n\n\n//# sourceURL=webpack://xmled/./js-src/index.js?");

/***/ }),

/***/ "./js-src/services/ajaxService.js":
/*!****************************************!*\
  !*** ./js-src/services/ajaxService.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AjaxService: () => (/* binding */ AjaxService)\n/* harmony export */ });\nlet AjaxService = {\n  doAjax: function(url, cb){\n    var xhttp = new XMLHttpRequest();\n\n    xhttp.onreadystatechange = function() {\n      if (this.readyState == 4 && this.status == 200) {\n        let data = JSON.parse(this.response);\n        cb(data);\n      }\n    }\n\n    xhttp.open(\"GET\", url, true);\n    xhttp.send();\n  },\n  doAjaxPost: function(url, data, cb){\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function() {\n      if (this.readyState == 4 && this.status == 200) {\n        console.log(\"RESPONSE:\", this.response)\n        let data = JSON.parse(this.response);        \n        cb(data);\n      }\n    }\n    xhttp.open(\"POST\", url, true);\n    xhttp.send(data);\n  }\n}\n\n\n\n\n//# sourceURL=webpack://xmled/./js-src/services/ajaxService.js?");

/***/ }),

/***/ "./js-src/services/horseService.js":
/*!*****************************************!*\
  !*** ./js-src/services/horseService.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HorseService: () => (/* binding */ HorseService)\n/* harmony export */ });\n/* harmony import */ var _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxService.js */ \"./js-src/services/ajaxService.js\");\n\n\nlet HorseService = {\n\tgetHorses: function(cb){\n        _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/horses/out/\", {}, function(data){\t\t\t\n\t\t\tcb(data)\n\t\t})\n\t},\n\tgetHorse: function(cb){\n        _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/horses/get/\", {}, function(data){\t\t\t\n\t\t\tcb(data)\n\t\t})\n\t},\n\ttoRace: function(cb, horseId){\n        _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/horses/race/in/\" + horseId + \"/\", {}, function(data){\t\t\t\n\t\t\tcb(data)\n\t\t})\n\t},\n\toutRace: function(cb, horseId){\n        _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/horses/race/out/\" + horseId + \"/\", {}, function(data){\t\t\t\n\t\t\tcb(data)\n\t\t})\n\t},\n\tstart: function(cb){\n        _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/horses/race/\", {}, function(data){\t\t\t\n\t\t\tcb(data)\n\t\t})\n\t}\n};\n\n\n\n\n//# sourceURL=webpack://xmled/./js-src/services/horseService.js?");

/***/ }),

/***/ "./js-src/templater.js":
/*!*****************************!*\
  !*** ./js-src/templater.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Templater: () => (/* binding */ Templater)\n/* harmony export */ });\nself = {};\n\nself.template = function(html, obj) {\t\n\tlet rhtml = html;\n\n\tfor (let k in obj) {\n\t\tlet opt = '---' + k + '---';\n\t\trhtml = rhtml.replace(opt, obj[k]);\n\t}\n\n\trhtml = rhtml.replace(\"------\", escape(JSON.stringify(obj)))\n\trhtml = rhtml.replaceAll(\"ssssss\", obj)\n\treturn rhtml;\n}\n\nself.makeTemplates = function(templateselems){\n\tlet result = {};\n\t\n\tfor (let el of templateselems){\n\t\tresult[el.id] = el.innerHTML;\n\t}\n\n\tself.templates = result;\n}\n\n\nlet Templater = self;\n\n\n\n//# sourceURL=webpack://xmled/./js-src/templater.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js-src/index.js");
/******/ 	
/******/ })()
;