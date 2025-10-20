import { Templater } from './templater.js';

import { usersService } from './services/usersService.js';
import { betService } from './services/betService.js';

import { RaceHouse } from './components/race-house.js';
import { Shop } from './components/shop.js';

let self = {};

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
self.getCookie = function(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

self.deleteCookie = function(name, path = "/") {
  // Set the expires date to a past date (e.g., January 1, 1970)
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;" +
                    (path ? "; path=" + path : "");
}

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
	self.nitroEl = document.querySelector(".set-nitro input");
	self.nitroContainerEl = document.querySelector(".set-nitro");
	self.logoutEl = document.querySelector(".logout");
}

self.initEvents = function(){
	self.emailOkEl.addEventListener("click", function(){
		if (self.emailEl.value){
			usersService.postEmail(function(user){
				self.showEmail(user);
			}, self.emailEl.value)
		}
	});

	self.logoutEl.addEventListener("click", function(){
		if (self.user || self.email){
			self.deleteCookie("user");
		}
		location.reload();
	});
}

self.loadModules = function(){
	RaceHouse.pinModule(self);	

	self.RaceHouse = RaceHouse;	
	self.RaceHouse.loadHouse();		

	Shop.pinModule(self);	
	self.Shop = Shop;	
} 

self.initUser = function(){		
	let email = self.getCookie("user") || "";
	console.log(email, "EMAIL");

	if (email){
		console.log(email);

		usersService.postEmail(function(user){
			self.email = user.email;            
			self.showEmail(user);
		}, email)
	}
}

self.showEmail = function(user){	
	self.user = user;

	if (self.user.nitro && self.user.nitro > 0 && self.nitroContainerEl) {
		self.nitroContainerEl.classList.remove("hide")
	} else if (self.nitroContainerEl && self.user.nitro == 0) {
		self.nitroContainerEl.classList.add("hide")
	}

	self.emailOkEl.classList.add("hide");
	self.emailEl.classList.add("hide");
	
	self.emailViewEl.innerHTML = user.email;
	self.moneyViewEl.innerHTML = user.money;

	self.emailViewContainerEl.classList.remove("hide");
	self.moneyViewContainerEl.classList.remove("hide");
	self.logoutEl.classList.remove("hide");

	betService.bets(function(bets){
		self.bets = bets;
		self.RaceHouse.drawBets();
	})
}

let init = function(){	
	Templater.makeTemplates(document.getElementsByClassName("template"));
	
	self.user = null;
	self.bets = [];
	self.nitro = false;
		
	self.loadModules();

	self.initElements();
	self.initEvents();
	self.initUser();
}

document.addEventListener("DOMContentLoaded", (event) => {
	init();
});
