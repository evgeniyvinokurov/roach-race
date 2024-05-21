import { Templater } from './templater.js';

import { RaceHouse } from './components/race-house.js';

let self = {};

self.initElements = function(){
	self.roachHouseSection = document.querySelector(".roach-house");
	self.raceSection = document.querySelector(".race");
	self.getroachButton = document.querySelector(".get-roach");
	self.startButton = document.querySelector(".start");
	self.stadium = document.querySelector(".stadium");
	self.cstadium = document.querySelector(".cstadium");
	self.app = document.querySelector(".race-app");
	self.cRace = document.querySelector(".roach-house-container");
	self.cHouse = document.querySelector(".race-container");
	self.emailEl = document.querySelector(".email");
	self.emailOkEl = document.querySelector(".email-ok");
	self.emailViewEl = document.querySelector(".email-view");
	self.moneyViewEl = document.querySelector(".money-view");
	self.emailViewContainerEl = document.querySelector(".email-view-container");
	self.moneyViewContainerEl = document.querySelector(".money-view-container");
	self.emailContainerEl = document.querySelector(".email-container");
	self.menuBetEl = document.querySelector(".menu-bet");
	self.betContainerEl = document.querySelector(".bets-container");
}

self.loadModules = function(){
	RaceHouse.pinModule(self);	
	self.RaceHouse = RaceHouse;	
} 

self.showEmail = function(user){	
	self.user = user;

	self.emailOkEl.classList.add("hide");
	self.emailEl.classList.add("hide");
	
	self.emailViewEl.innerHTML = user.email;
	self.moneyViewEl.innerHTML = user.money;

	self.emailViewContainerEl.classList.remove("hide");
	self.moneyViewContainerEl.classList.remove("hide");
}

let init = function(){	
	Templater.makeTemplates(document.getElementsByClassName("template"));
	
	self.user = null;
	self.bets = [];

	self.initElements();		
	self.loadModules();
	self.RaceHouse.loadHouse();		
}

document.addEventListener("DOMContentLoaded", (event) => {
	init();
});
