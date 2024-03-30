import { Templater } from './templater.js';
import { RaceHouse } from './catalog/race-house.js';

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
}

self.loadModules = function(){
	RaceHouse.pinModule(self);	
	self.RaceHouse = RaceHouse;	
} 

let init = function(){	
	Templater.makeTemplates(document.getElementsByClassName("template"));
	self.initElements();		
	self.loadModules();
	self.RaceHouse.loadHouse();		
}

document.addEventListener("DOMContentLoaded", (event) => {
	init();
});
