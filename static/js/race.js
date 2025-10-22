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

/***/ "./js-src/components/race-house.js":
/*!*****************************************!*\
  !*** ./js-src/components/race-house.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RaceHouse: () => (/* binding */ RaceHouse)\n/* harmony export */ });\n/* harmony import */ var _services_roachesService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/roachesService.js */ \"./js-src/services/roachesService.js\");\n/* harmony import */ var _services_usersService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/usersService.js */ \"./js-src/services/usersService.js\");\n/* harmony import */ var _services_betService_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/betService.js */ \"./js-src/services/betService.js\");\n/* harmony import */ var _templater_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../templater.js */ \"./js-src/templater.js\");\n\n\n\n\n\n\n\nlet self = {};\n\nself.initElements = function(){\n\tself.main.roachHouseSection = document.querySelector(\".roach-house\");\n\tself.main.raceSection = document.querySelector(\".race\");\n\tself.main.getroachButton = document.querySelector(\".get-roach\");\n\tself.main.startButton = document.querySelector(\".start\");\n\tself.main.stadium = document.querySelector(\".stadium\");\n\tself.main.cstadium = document.querySelector(\".cstadium\");\n\tself.main.app = document.querySelector(\".race-app\");\n\tself.main.cRace = document.querySelector(\".roach-house-container\");\n\tself.main.cHouse = document.querySelector(\".race-container\");\n}\n\nself.initroachEvents = function(){\n\tself.initroachEventsHouse();\n\tself.initroachEventsRace();\n}\n\nself.initroachEventsRace = function(){\t\n\tlet roaches = document.querySelectorAll(\".race .roach\");\n\tfor(let h of roaches){\t\t\n\t\th.addEventListener(\"click\", clickroachbet);\n\t}\t\n\n\tlet roachesBetMenus = document.querySelectorAll(\".race .roach .roach-remove\");\n\tfor(let b of roachesBetMenus){\t\t\n\t\tb.addEventListener(\"click\", clickroachout);\n\t} \t\t\n\n\n\tself.main.nitroEl.addEventListener(\"click\", function(){\n\t\tself.main.nitro = true;\n\t});\n}\n\nself.initroachEventsHouse = function(){\t\n\tlet roachesHouse = document.querySelectorAll(\".roach-house .roach\");\n\tfor(let h of roachesHouse){\t\t\n\t\th.addEventListener(\"click\", clickroachin);\n\t} \t\n}\n\nself.initroachButtonsEvents = function(){\t\n\t\n\t// on auth\n\t\t\t// betService.bets(function(bets){\n\t\t\t// \tself.main.bets = bets;\n\t\t\t// \tself.drawBets();\n\t\t\t// })\n    \n\n\tself.main.startButton.addEventListener(\"click\", function(e){\n\t\tself.race()\t\n\t});\n\n\tlet bets = document.querySelectorAll(\".menu-bet .menu-item\");\n\tfor (let bet of bets){\n\t\tbet.addEventListener(\"click\", function(e){\n\t\t\te.stopPropagation();\n\n\t\t\tlet betamount = this.attributes[\"data-bet\"].value;\n\t\t\tlet roach = self.main.currentRoach;\n\n\t\t\t_services_betService_js__WEBPACK_IMPORTED_MODULE_2__.betService.bet({bet: betamount, roach: roach[\"id\"], user: self.main.user.id}, function(user){\n\t\t\t\tbet.parentElement.classList.add(\"hide\")\n\t\t\t\tself.main.bets.push({bet: betamount, roach: roach[\"number\"]  + \":\" + roach[\"name\"]});\t\t\t\t\n\t\t\t})\n\n\t\t\t_services_betService_js__WEBPACK_IMPORTED_MODULE_2__.betService.bets(function(bets){\n\t\t\t\tself.main.bets = bets;\n\t\t\t\tself.drawBets();\n\t\t\t})\n\t\t})\n\t}\n\n\tself.main.getroachButton.addEventListener(\"click\", function(e){\n\t\t_services_roachesService_js__WEBPACK_IMPORTED_MODULE_0__.roachesService.getroach(function(data){\n\t\t\tlet roachHtml = self.drawRoachesHtml([data.roach])\n\t\t\tself.main.roachHouseSection.innerHTML = self.main.roachHouseSection.innerHTML  + roachHtml; \n\t\t\tself.initroachEventsHouse();\n\t\t})\n\t});\n\n\tself.main.menuBetEl.addEventListener(\"mouseleave\", function(e){\n\t\te.stopPropagation();\n\t\tself.main.menuBetEl.classList.add(\"hide\");\n\t})\n\t\n}\n\n\n// load\n\nself.loadHouse = function(buttons = true){\t      \n\tif (self.main.roachHouseSection) {\n\t\t_services_roachesService_js__WEBPACK_IMPORTED_MODULE_0__.roachesService.getroaches(function(data){\n\t\t\tself.main.roacheshouse = data.roaches;\n\t\t\tself.main.roachesrace = data.race; \n\t\t\t\t\t\t\t\t\n\t\t\tself.drawHouseRace();            \n\t\t\tself.initroachEvents();   \n\t\t\t\n\t\t\tif (buttons)    \n\t\t\t\tself.initroachButtonsEvents();\n\n\t\t\tif (self.main.app.classList.contains(\"started\") ) {\n\t\t\t\tself.main.app.classList.remove(\"started\");\n\t\t\t\tself.race();\n\t\t\t} \n\t\t});\n\t}\n}\n\n\n// click events\n\nlet clickroachin = function(e){\n\tlet roachId = this.attributes[\"id\"].value.replace(\"id\", \"\");\n\tlet selfin = this;\n\t_services_roachesService_js__WEBPACK_IMPORTED_MODULE_0__.roachesService.toRace(function(data){ \n\t\t\tif (data.status == \"ok\") {\n\t\t\t\tselfin.remove();\n\t\t\t\tlet hhtml = self.drawRoachesHtml([data.roach]);\n\t\t\t\tself.main.raceSection.innerHTML = self.main.raceSection.innerHTML + hhtml;    \n\t\t\t\tself.initroachEventsRace();\n\t\t\t}\n\t}, roachId)\n\n\t_services_betService_js__WEBPACK_IMPORTED_MODULE_2__.betService.bets(function(bets){\n\t\tself.main.bets = bets;\n\t\tself.drawBets();\n\t})\n}\n\nlet clickroachbet = function(e){\n\te.stopPropagation();\n\n\tlet bets = document.querySelectorAll(\".menu-bet .menu-item\")\n\tfor (let bet of bets) {\n\t\tlet amount = bet.attributes[\"data-bet\"];\n\t\tif (self.main.user.money*1 < amount.value*1) {\n\t\t\tbet.classList.add(\"hide\");\n\t\t}\n\t\tself.main.currentRoach = JSON.parse(unescape(this.attributes[\"data-src\"].value));\n\t}\n\n\tif (self.main.user != null) {\n\t\tself.main.menuBetEl.classList.remove(\"hide\");\n\t\tself.main.menuBetEl.style.top = (e.y*1 - 10) + \"px\";\n\t\tself.main.menuBetEl.style.left = (e.x*1 + 10) + \"px\";\n\t}\n}\n\nlet clickroachout = function(e){\t\t\n\te.stopPropagation();\n\n\tlet roachId = this.parentElement.parentElement.attributes[\"id\"].value.replace(\"id\", \"\");\n\tlet selfin = this.parentElement.parentElement;\n\n\t_services_roachesService_js__WEBPACK_IMPORTED_MODULE_0__.roachesService.outRace(function(data){\n\t\tif (data.status == \"ok\") {\n\t\t\tselfin.remove();\n\t\t\tlet hhtml = self.drawRoachesHtml([data.roach]);\n\t\t\tself.main.roachHouseSection.innerHTML = self.main.roachHouseSection.innerHTML + hhtml;\n\t\t\tself.initroachEventsHouse();\n\t\t}\n\t}, roachId)\n};\n\nlet timer = null;\n\n\n// race method\n\nself.race = function(){\t\n\tif (!!timer) return false;\n\n\ttimer = setInterval(function(){    \n\t\tlet nitro = new FormData();\n\n\t\tif (self.main.nitro) {\n\t\t\tnitro.append(\"nitro\",  self.main.user[\"id\"]);\n\t\t\tself.main.nitroContainerEl.classList.add(\"hide\");\n\t\t\tself.main.nitro = false;\n\t\t}\n\n\t\t_services_roachesService_js__WEBPACK_IMPORTED_MODULE_0__.roachesService.start(function(data){\n\t\t\tif (data[\"status\"] == \"finished\"){\t\t\t\n\t\t\t\tif (self.main.user != null){ \n\t\t\t\t\t_services_usersService_js__WEBPACK_IMPORTED_MODULE_1__.usersService.postEmail(function(user){\n\t\t\t\t\t\tself.main.email = user.email;            \n\t\t\t\t\t\tself.main.showEmail(user);\n\t\t\t\t\t}, self.main.user.email)\n\t\t\t\t}\n\t\t\t\tself.main.bets = [];\t\t\t\t\n\n\t\t\t\tclearInterval(timer);\n\n\t\t\t\ttimer = null;\n\n\t\t\t\tself.loadHouse(false);\n\t\t\t\tself.showHouses();\n\t\t\t\tself.drawBets();\n\t\t\t} else {\n\t\t\t\tself.hideHouses();\n\t\t\t\tself.drawroachesRace(data.state);\n\t\t\t}\n\t\t}, nitro)\n\n\n\t\t_services_betService_js__WEBPACK_IMPORTED_MODULE_2__.betService.bets(function(bets){\n\t\t\tself.main.bets = bets;\n\t\t\tself.drawBets();\n\t\t})\n\t}, 500)\t\n}\n\n\n// draw html\n\nself.drawBets = function(){\t\n\tlet betsHtml = self.drawbetsHtml();\n    self.main.betContainerEl.innerHTML = betsHtml;    \n\tself.main.betContainerEl.classList.remove(\"hide\")\n}\n\nself.drawHouseRace = function(){\t\n\tlet bets = document.querySelectorAll(\".menu-bet .menu-item\");\n\tfor (let bet of bets) {\n\t\tbet.classList.remove(\"hide\");\t\n\t}\n\n\tlet roachesHtml = self.drawRoachesHtml(self.main.roacheshouse);\n    self.main.roachHouseSection.innerHTML = roachesHtml;    \n\n\tlet roachesHtmlrace = self.drawRoachesHtml(self.main.roachesrace);\n    self.main.raceSection.innerHTML = roachesHtmlrace;\t\n\t\n\tself.main.cstadium.classList.add(\"hide\")\t\n}\n\nself.drawbetsHtml = function(){\n\tlet html = \"\";\n\n\tif (self.main.bets.length > 0)\n\t\tfor (let b of self.main.bets) { \n\t\t\tlet bet = b;\n\t\t\tbet[\"roachstr\"] = b[\"roach\"][\"number\"] + \"-\" + b[\"roach\"][\"name\"];\n\t\t\tlet thtml = _templater_js__WEBPACK_IMPORTED_MODULE_3__.Templater.templates[\"bet\"];\n\t\t\thtml += _templater_js__WEBPACK_IMPORTED_MODULE_3__.Templater.template(thtml, bet);\n\t\t}\n\n\treturn html;\n}\n\nself.drawRoachesRaceHtml = function(roaches){\n\tlet html = \"\";\n\n\tif (roaches.length > 0)\n\t\tfor (let h of roaches) { \n\t\t\tlet thtml = _templater_js__WEBPACK_IMPORTED_MODULE_3__.Templater.templates[\"roach-race\"];\n\t\t\thtml += _templater_js__WEBPACK_IMPORTED_MODULE_3__.Templater.template(thtml, h)\n\t\t}\n\n\treturn html;\n}\n\nself.drawRoachesHtml = function(roaches){\n\tlet html = \"\";\n\n\tif (roaches.length > 0)\n\t\tfor (let h of roaches) { \n\t\t\tlet thtml = _templater_js__WEBPACK_IMPORTED_MODULE_3__.Templater.templates[\"roach\"];\n\t\t\thtml += _templater_js__WEBPACK_IMPORTED_MODULE_3__.Templater.template(thtml, h)\n\t\t}\n\n\treturn html;\n}\n\nself.drawroachesRace = function(state){\n\tif (state.length == 0)\n\t\treturn false;\n\t\n\tlet roaches = [];\n\tfor (let r of state) {\n\t\tlet roach = {};\n\t\tlet delta = r[\"gotrunned\"];\n\t\troach[\"id\"] = r[\"id\"];\n\t\troach[\"delta\"] = Math.ceil(delta * 800 / r[\"race\"]);\n\t\troach[\"pic\"] = \"&#129715;\";\n\t\troach[\"number\"] = r[\"roach\"][\"number\"];\n\t\troaches.push(roach);\n\t}\n\tlet rhtml = self.drawRoachesRaceHtml(roaches);\n\tself.main.stadium.innerHTML = rhtml;\t\t\n}\n\n// show hide containers\n\nself.hideHouses = function(){\n\tself.main.cHouse.classList.add(\"hide\");\n\tself.main.cRace.classList.add(\"hide\");\n\tself.main.getroachButton.classList.add(\"hide\");\n\tself.main.startButton.classList.add(\"hide\");\n\tself.main.cstadium.classList.remove(\"hide\")\t\n}\n\nself.showHouses = function(){\n\tself.main.cHouse.classList.remove(\"hide\");\n\tself.main.cRace.classList.remove(\"hide\");\n\tself.main.getroachButton.classList.remove(\"hide\");\n\tself.main.startButton.classList.remove(\"hide\");\n\tself.main.cstadium.classList.add(\"hide\")\t\n}\n\nself.pinModule = function(main){\n\tself.main = main;\n\tself.initElements();\n}\n\nlet RaceHouse = self;\n\n\n\n//# sourceURL=webpack://roach-race/./js-src/components/race-house.js?");

/***/ }),

/***/ "./js-src/components/shop.js":
/*!***********************************!*\
  !*** ./js-src/components/shop.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Shop: () => (/* binding */ Shop)\n/* harmony export */ });\n/* harmony import */ var _services_usersService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/usersService.js */ \"./js-src/services/usersService.js\");\n/* harmony import */ var _services_shopService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/shopService.js */ \"./js-src/services/shopService.js\");\n/* harmony import */ var _templater_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templater.js */ \"./js-src/templater.js\");\n\n\n\n\n\n\nlet self = {};\n\nlet buy = function(e, cb){\t\n\te.stopPropagation();\n\n\tlet item = JSON.parse(unescape(e.currentTarget.parentElement.attributes[\"data-src\"].value));\n\tlet ffdata = new FormData();\n\n\tffdata.append(\"item\", item.id)\n\tffdata.append(\"user\", self.main.user.id)\n\n\t_services_shopService_js__WEBPACK_IMPORTED_MODULE_1__.shopService.buy(ffdata)\n\tself.main.msg.innerHTML = \"Ok\"\n}\n\n\nself.initElements = function(){\n\tself.main.itemsContainer = document.querySelector(\".items-container\");\n\tself.main.msg = document.querySelector(\".message\");\n}\n\nself.initItemsEvents = function(){\n\tlet buybtns = document.querySelectorAll(\".items-container .item .item-buy\");\n\tfor(let bb of buybtns){\t\t\n\t\tbb.addEventListener(\"click\", buy);\n\t} \n\n}\n\n// load\n\nself.loadItems = function(){\t \n\tif (self.main.itemsContainer)\n\t\t_services_shopService_js__WEBPACK_IMPORTED_MODULE_1__.shopService.get(function(data){\n\t\t\tself.main.items = data.items;\n\n\t\t\tself.drawItems();            \n\t\t\tself.initItemsEvents();   \n\t\t});\n}\n\n\n// draw html\n\nself.drawItems = function(){\n    let itemsHtml = self.drawItemsHtml(self.main.items);\n    self.main.itemsContainer.innerHTML = itemsHtml;    \n}\n\nself.drawItemsHtml = function(items){\n\tlet html = \"\";\n\n\tif (items.length > 0)\n\t\tfor (let i of items) { \n\t\t\tlet thtml = _templater_js__WEBPACK_IMPORTED_MODULE_2__.Templater.templates[\"item\"];\n\t\t\thtml += _templater_js__WEBPACK_IMPORTED_MODULE_2__.Templater.template(thtml, i)\n\t\t}\n\n\treturn html;\n}\n\n// show hide containers\n\nself.pinModule = function(main){\n\tself.main = main;\n\t\n\tself.initElements();\n    self.loadItems()\n}\n\nlet Shop = self;\n\n\n\n//# sourceURL=webpack://roach-race/./js-src/components/shop.js?");

/***/ }),

/***/ "./js-src/index.js":
/*!*************************!*\
  !*** ./js-src/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _templater_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templater.js */ \"./js-src/templater.js\");\n/* harmony import */ var _services_usersService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/usersService.js */ \"./js-src/services/usersService.js\");\n/* harmony import */ var _services_betService_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/betService.js */ \"./js-src/services/betService.js\");\n/* harmony import */ var _components_race_house_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/race-house.js */ \"./js-src/components/race-house.js\");\n/* harmony import */ var _components_shop_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/shop.js */ \"./js-src/components/shop.js\");\n\n\n\n\n\n\n\n\nlet self = {};\n\n// возвращает куки с указанным name,\n// или undefined, если ничего не найдено\nself.getCookie = function(name) {\n  let matches = document.cookie.match(new RegExp(\n    \"(?:^|; )\" + name.replace(/([\\.$?*|{}\\(\\)\\[\\]\\\\\\/\\+^])/g, '\\\\$1') + \"=([^;]*)\"\n  ));\n  return matches ? decodeURIComponent(matches[1]) : undefined;\n}\n\nself.deleteCookie = function(name, path = \"/\") {\n  // Set the expires date to a past date (e.g., January 1, 1970)\n  document.cookie = name + \"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;\" +\n                    (path ? \"; path=\" + path : \"\");\n}\n\nself.initElements = function(){\n\tself.emailEl = document.querySelector(\".email\");\n\tself.emailOkEl = document.querySelector(\".email-ok\");\n\tself.emailViewEl = document.querySelector(\".email-view\");\n\tself.moneyViewEl = document.querySelector(\".money-view\");\n\tself.emailViewContainerEl = document.querySelector(\".email-view-container\");\n\tself.moneyViewContainerEl = document.querySelector(\".money-view-container\");\n\tself.emailContainerEl = document.querySelector(\".email-container\");\n\tself.menuBetEl = document.querySelector(\".menu-bet\");\n\tself.betContainerEl = document.querySelector(\".bets-container\");\n\tself.nitroEl = document.querySelector(\".set-nitro input\");\n\tself.nitroContainerEl = document.querySelector(\".set-nitro\");\n\tself.logoutEl = document.querySelector(\".logout\");\n}\n\nself.initEvents = function(){\n\tself.emailOkEl.addEventListener(\"click\", function(){\n\t\tif (self.emailEl.value){\n\t\t\t_services_usersService_js__WEBPACK_IMPORTED_MODULE_1__.usersService.postEmail(function(user){\n\t\t\t\tself.showEmail(user);\n\t\t\t}, self.emailEl.value)\n\t\t}\n\t});\n\n\tself.logoutEl.addEventListener(\"click\", function(){\n\t\tif (self.user || self.email){\n\t\t\tself.deleteCookie(\"user\");\n\t\t}\n\t\tlocation.reload();\n\t});\n}\n\nself.loadModules = function(){\n\t_components_race_house_js__WEBPACK_IMPORTED_MODULE_3__.RaceHouse.pinModule(self);\t\n\n\tself.RaceHouse = _components_race_house_js__WEBPACK_IMPORTED_MODULE_3__.RaceHouse;\t\n\tself.RaceHouse.loadHouse();\t\t\n\n\t_components_shop_js__WEBPACK_IMPORTED_MODULE_4__.Shop.pinModule(self);\t\n\tself.Shop = _components_shop_js__WEBPACK_IMPORTED_MODULE_4__.Shop;\t\n} \n\nself.initUser = function(){\t\t\n\tlet email = self.getCookie(\"user\") || \"\";\n\n\tif (email){\n\t\t_services_usersService_js__WEBPACK_IMPORTED_MODULE_1__.usersService.postEmail(function(user){\n\t\t\tself.email = user.email;            \n\t\t\tself.showEmail(user);\n\t\t}, email)\n\t}\n}\n\nself.showEmail = function(user){\t\n\tself.user = user;\n\n\tif (self.user.nitro && self.user.nitro > 0 && self.nitroContainerEl) {\n\t\tself.nitroContainerEl.classList.remove(\"hide\")\n\t} else if (self.nitroContainerEl && self.user.nitro == 0) {\n\t\tself.nitroContainerEl.classList.add(\"hide\")\n\t}\n\n\tself.emailOkEl.classList.add(\"hide\");\n\tself.emailEl.classList.add(\"hide\");\n\t\n\tself.emailViewEl.innerHTML = user.email;\n\tself.moneyViewEl.innerHTML = user.money;\n\n\tself.emailViewContainerEl.classList.remove(\"hide\");\n\tself.moneyViewContainerEl.classList.remove(\"hide\");\n\tself.logoutEl.classList.remove(\"hide\");\n\n\t_services_betService_js__WEBPACK_IMPORTED_MODULE_2__.betService.bets(function(bets){\n\t\tself.bets = bets;\n\t\tself.RaceHouse.drawBets();\n\t})\n}\n\nlet init = function(){\t\n\t_templater_js__WEBPACK_IMPORTED_MODULE_0__.Templater.makeTemplates(document.getElementsByClassName(\"template\"));\n\t\n\tself.user = null;\n\tself.bets = [];\n\tself.nitro = false;\n\t\t\n\tself.loadModules();\n\n\tself.initElements();\n\tself.initEvents();\n\tself.initUser();\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", (event) => {\n\tinit();\n});\n\n\n//# sourceURL=webpack://roach-race/./js-src/index.js?");

/***/ }),

/***/ "./js-src/services/ajaxService.js":
/*!****************************************!*\
  !*** ./js-src/services/ajaxService.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AjaxService: () => (/* binding */ AjaxService)\n/* harmony export */ });\nlet AjaxService = {\n  doAjax: function(url, cb){\n    var xhttp = new XMLHttpRequest();\n\n    xhttp.onreadystatechange = function() {\n      if (this.readyState == 4 && this.status == 200) {\n        let data = JSON.parse(this.response);\n        cb(data);\n      }\n    }\n\n    xhttp.open(\"GET\", url, true);\n    xhttp.send();\n  },\n  doAjaxPost: function(url, data, cb){\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function() {\n      if (this.readyState == 4 && this.status == 200) {\n        console.log(\"RESPONSE:\", this.response)\n        let data = JSON.parse(this.response);        \n        cb(data);\n      }\n    }\n    xhttp.open(\"POST\", url, true);\n    xhttp.send(data);\n  }\n}\n\n\n\n\n//# sourceURL=webpack://roach-race/./js-src/services/ajaxService.js?");

/***/ }),

/***/ "./js-src/services/betService.js":
/*!***************************************!*\
  !*** ./js-src/services/betService.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   betService: () => (/* binding */ betService)\n/* harmony export */ });\n/* harmony import */ var _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxService.js */ \"./js-src/services/ajaxService.js\");\n\n\nlet betService = {\n  bet: function(data, cb){\n    let fdata = new FormData();\n\n    fdata.append(\"user\", data.user);\n    fdata.append(\"roach\", data.roach);\n    fdata.append(\"bet\", data.bet);\n\n    _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/bet/\", fdata, function(data){\n\t\t\tlet result = data.result;\n\t\t\tcb(result)\n\t\t})\n\t},\n  bets: function(cb){\n    _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/bets/\", {}, function(data){\n\t\t\tlet bets = data.bets;\n\t\t\tcb(bets)\n\t\t})\n\t},\n}\n\n\n\n\n//# sourceURL=webpack://roach-race/./js-src/services/betService.js?");

/***/ }),

/***/ "./js-src/services/roachesService.js":
/*!*******************************************!*\
  !*** ./js-src/services/roachesService.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   roachesService: () => (/* binding */ roachesService)\n/* harmony export */ });\n/* harmony import */ var _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxService.js */ \"./js-src/services/ajaxService.js\");\n\n\nlet roachesService = {\n\tgetroaches: function(cb){\n        _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/roaches/out/\", {}, function(data){\t\t\t\n\t\t\tcb(data)\n\t\t})\n\t},\n\tgetroach: function(cb){\n        _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/roaches/get/\", {}, function(data){\t\t\t\n\t\t\tcb(data)\n\t\t})\n\t},\n\ttoRace: function(cb, roachId){\n        _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/roaches/race/in/\" + roachId + \"/\", {}, function(data){\t\t\t\n\t\t\tcb(data)\n\t\t})\n\t},\n\toutRace: function(cb, roachId){\n        _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/roaches/race/out/\" + roachId + \"/\", {}, function(data){\t\t\t\n\t\t\tcb(data)\n\t\t})\n\t},\n\tstart: function(cb, fdata){\n        _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/roaches/race/\", fdata, function(data){\t\t\t\n\t\t\tcb(data)\n\t\t})\n\t}\n};\n\n\n\n\n//# sourceURL=webpack://roach-race/./js-src/services/roachesService.js?");

/***/ }),

/***/ "./js-src/services/shopService.js":
/*!****************************************!*\
  !*** ./js-src/services/shopService.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shopService: () => (/* binding */ shopService)\n/* harmony export */ });\n/* harmony import */ var _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxService.js */ \"./js-src/services/ajaxService.js\");\n\n\nlet shopService = {\n\tget: function(cb){\n\t  _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/shop/get/\", {}, function(data){\n\t\t\t  cb(data);\n\t\t  })\n\t  },\n\tbuy: function(buy){\n\t\t_ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/shop/buy/\", buy, function(){})\n\t}\n}\n\n\n\n\n//# sourceURL=webpack://roach-race/./js-src/services/shopService.js?");

/***/ }),

/***/ "./js-src/services/usersService.js":
/*!*****************************************!*\
  !*** ./js-src/services/usersService.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   usersService: () => (/* binding */ usersService)\n/* harmony export */ });\n/* harmony import */ var _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxService.js */ \"./js-src/services/ajaxService.js\");\n\n\nlet usersService = {\n  postEmail: function(cb, email){\n\tlet fdata = new FormData();\n\tfdata.append(\"email\", email);\n\n    _ajaxService_js__WEBPACK_IMPORTED_MODULE_0__.AjaxService.doAjaxPost(\"/raceuser/in/\", fdata, function(data){\n\t\t\tlet user = data.user;\n\t\t\tcb(user)\n\t\t})\n\t},\n}\n\n\n\n\n//# sourceURL=webpack://roach-race/./js-src/services/usersService.js?");

/***/ }),

/***/ "./js-src/templater.js":
/*!*****************************!*\
  !*** ./js-src/templater.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Templater: () => (/* binding */ Templater)\n/* harmony export */ });\nself = {};\n\nself.template = function(html, obj) {\t\n\tlet rhtml = html;\n\n\tfor (let k in obj) {\n\t\tlet opt = '---' + k + '---';\n\t\trhtml = rhtml.replace(opt, obj[k]);\n\t}\n\n\trhtml = rhtml.replace(\"------\", escape(JSON.stringify(obj)))\n\trhtml = rhtml.replaceAll(\"ssssss\", obj)\n\treturn rhtml;\n}\n\nself.makeTemplates = function(templateselems){\n\tlet result = {};\n\t\n\tfor (let el of templateselems){\n\t\tresult[el.id] = el.innerHTML;\n\t}\n\n\tself.templates = result;\n}\n\n\nlet Templater = self;\n\n\n\n//# sourceURL=webpack://roach-race/./js-src/templater.js?");

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