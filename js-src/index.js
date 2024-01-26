import { Templater } from './templater.js';
import { RaceHouse } from './catalog/race-house.js';

let self = {};

self.initElements = function(){
	self.horseHouseSection = document.querySelector(".horse-house");
	self.raceSection = document.querySelector(".race");
	self.getHorseButton = document.querySelector(".get-horse");
	self.startButton = document.querySelector(".start");
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
