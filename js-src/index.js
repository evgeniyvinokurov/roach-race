import { Templater } from './templater.js';

import { usersService } from './services/usersService.js';

import { RaceHouse } from './components/race-house.js';
import { Shop } from './components/shop.js';

let self = {};

self.initElements = function(){
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
	self.RaceHouse.loadHouse();		

	Shop.pinModule(self);	
	self.Shop = Shop;	
} 

self.initButtonsEvents = function(){	
	self.emailOkEl.addEventListener("click", function(e){	
		e.stopPropagation();
		let email = self.emailEl.value;
		
        usersService.postEmail(email, function(user){
            self.email = user.email;            
            self.showEmail(user);
        })
	});
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
	self.nitro = false;
		
	self.loadModules();

	self.initElements();
	self.initButtonsEvents();
}

document.addEventListener("DOMContentLoaded", (event) => {
	init();
});
