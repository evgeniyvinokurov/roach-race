import { roachesService } from '../services/roachesService.js';
import { usersService } from '../services/usersService.js';
import { betService } from '../services/betService.js';

import { Templater } from '../templater.js';


let self = {};

self.initElements = function(){
	self.main.roachHouseSection = document.querySelector(".roach-house");
	self.main.raceSection = document.querySelector(".race");
	self.main.getroachButton = document.querySelector(".get-roach");
	self.main.startButton = document.querySelector(".start");
	self.main.stadium = document.querySelector(".stadium");
	self.main.cstadium = document.querySelector(".cstadium");
	self.main.app = document.querySelector(".race-app");
	self.main.cRace = document.querySelector(".roach-house-container");
	self.main.cHouse = document.querySelector(".race-container");
}

self.initroachEvents = function(){
	self.initroachEventsHouse();
	self.initroachEventsRace();
}

self.initroachEventsRace = function(){	
	let roaches = document.querySelectorAll(".race .roach");
	for(let h of roaches){		
		h.addEventListener("click", clickroachbet);
	}	

	let roachesBetMenus = document.querySelectorAll(".race .roach .roach-remove");
	for(let b of roachesBetMenus){		
		b.addEventListener("click", clickroachout);
	} 		


	self.main.nitroEl.addEventListener("click", function(){
		self.main.nitro = true;
	});
}

self.initroachEventsHouse = function(){	
	let roachesHouse = document.querySelectorAll(".roach-house .roach");
	for(let h of roachesHouse){		
		h.addEventListener("click", clickroachin);
	} 	
}

self.initroachButtonsEvents = function(){	
	
	// on auth
			// betService.bets(function(bets){
			// 	self.main.bets = bets;
			// 	self.drawBets();
			// })
    

	self.main.startButton.addEventListener("click", function(e){
		self.race()	
	});

	let bets = document.querySelectorAll(".menu-bet .menu-item");
	for (let bet of bets){
		bet.addEventListener("click", function(e){
			e.stopPropagation();

			let betamount = this.attributes["data-bet"].value;
			let roach = self.main.currentRoach;

			betService.bet({bet: betamount, roach: roach["id"], user: self.main.user.id}, function(user){
				bet.parentElement.classList.add("hide")
				self.main.bets.push({bet: betamount, roach: roach["number"]  + ":" + roach["name"]});				
			})

			betService.bets(function(bets){
				self.main.bets = bets;
				self.drawBets();
			})
		})
	}

	self.main.getroachButton.addEventListener("click", function(e){
		roachesService.getroach(function(data){
			let roachHtml = self.drawRoachesHtml([data.roach])
			self.main.roachHouseSection.innerHTML = self.main.roachHouseSection.innerHTML  + roachHtml; 
			self.initroachEventsHouse();
		})
	});

	self.main.menuBetEl.addEventListener("mouseleave", function(e){
		e.stopPropagation();
		self.main.menuBetEl.classList.add("hide");
	})
	
}


// load

self.loadHouse = function(buttons = true){	      
	if (self.main.roachHouseSection) {
		roachesService.getroaches(function(data){
			self.main.roacheshouse = data.roaches;
			self.main.roachesrace = data.race; 
								
			self.drawHouseRace();            
			self.initroachEvents();   
			
			if (buttons)    
				self.initroachButtonsEvents();

			if (self.main.app.classList.contains("started") ) {
				self.main.app.classList.remove("started");
				self.race();
			} 
		});
	}
}


// click events

let clickroachin = function(e){
	let roachId = this.attributes["id"].value.replace("id", "");
	let selfin = this;
	roachesService.toRace(function(data){ 
			if (data.status == "ok") {
				selfin.remove();
				let hhtml = self.drawRoachesHtml([data.roach]);
				self.main.raceSection.innerHTML = self.main.raceSection.innerHTML + hhtml;    
				self.initroachEventsRace();
			}
	}, roachId)

	betService.bets(function(bets){
		self.main.bets = bets;
		self.drawBets();
	})
}

let clickroachbet = function(e){
	e.stopPropagation();

	let bets = document.querySelectorAll(".menu-bet .menu-item")
	for (let bet of bets) {
		let amount = bet.attributes["data-bet"];
		if (self.main.user.money*1 < amount.value*1) {
			bet.classList.add("hide");
		}
		console.log(this.attributes["data-src"])
		self.main.currentRoach = JSON.parse(unescape(this.attributes["data-src"].value));
	}

	if (self.main.user != null) {
		self.main.menuBetEl.classList.remove("hide");
		self.main.menuBetEl.style.top = (e.y*1 - 10) + "px";
		self.main.menuBetEl.style.left = (e.x*1 + 10) + "px";
	}
}

let clickroachout = function(e){		
	e.stopPropagation();

	let roachId = this.parentElement.parentElement.attributes["id"].value.replace("id", "");
	let selfin = this.parentElement.parentElement;

	roachesService.outRace(function(data){
		if (data.status == "ok") {
			selfin.remove();
			let hhtml = self.drawRoachesHtml([data.roach]);
			self.main.roachHouseSection.innerHTML = self.main.roachHouseSection.innerHTML + hhtml;
			self.initroachEventsHouse();
		}
	}, roachId)
};

let timer = null;


// race method

self.race = function(){	
	if (!!timer) return false;

	timer = setInterval(function(){    
		let nitro = new FormData();
		if (self.main.nitro) {
			nitro.append("nitro",  self.main.user["id"]);
			self.main.nitroContainerEl.classList.add("hide");
			self.main.nitro = false;
		}

		roachesService.start(function(data){
			if (data["status"] == "finished"){			
				if (self.main.user != null){
					self.main.user.money = data["winner"]["user"]["money"];						
					self.main.showEmail(self.main.user);	
				}
				self.main.bets = [];				

				clearInterval(timer);

				timer = null;

				self.loadHouse(false);
				self.showHouses();
				self.drawBets();
			} else {
				self.hideHouses();
				self.drawroachesRace(data.state);
			}
		}, nitro)


		betService.bets(function(bets){
			self.main.bets = bets;
			self.drawBets();
		})
	}, 500)	
}


// draw html

self.drawBets = function(){	
	let betsHtml = self.drawbetsHtml();
    self.main.betContainerEl.innerHTML = betsHtml;    
	self.main.betContainerEl.classList.remove("hide")
}

self.drawHouseRace = function(){	
	let bets = document.querySelectorAll(".menu-bet .menu-item");
	for (let bet of bets) {
		bet.classList.remove("hide");	
	}

	let roachesHtml = self.drawRoachesHtml(self.main.roacheshouse);
    self.main.roachHouseSection.innerHTML = roachesHtml;    

	let roachesHtmlrace = self.drawRoachesHtml(self.main.roachesrace);
    self.main.raceSection.innerHTML = roachesHtmlrace;	
	
	self.main.cstadium.classList.add("hide")	
}

self.drawbetsHtml = function(){
	let html = "";

	if (self.main.bets.length > 0)
		for (let b of self.main.bets) { 
			let bet = b;
			bet["roachstr"] = b["roach"]["number"] + "-" + b["roach"]["name"];
			let thtml = Templater.templates["bet"];
			html += Templater.template(thtml, bet);
		}

	return html;
}

self.drawRoachesRaceHtml = function(roaches){
	let html = "";

	if (roaches.length > 0)
		for (let h of roaches) { 
			let thtml = Templater.templates["roach-race"];
			html += Templater.template(thtml, h)
		}

	return html;
}

self.drawRoachesHtml = function(roaches){
	let html = "";

	if (roaches.length > 0)
		for (let h of roaches) { 
			let thtml = Templater.templates["roach"];
			html += Templater.template(thtml, h)
		}

	return html;
}

self.drawroachesRace = function(state){
	let roaches = [];
	for (let r of state) {
		let roach = {};
		let delta = r["gotrunned"];
		roach["id"] = r["id"];
		roach["delta"] = Math.ceil(delta * 800 / r["race"]);
		roach["pic"] = "&#129715;";
		roach["number"] = r["roach"]["number"];
		roaches.push(roach);
	}
	let rhtml = self.drawRoachesRaceHtml(roaches);
	self.main.stadium.innerHTML = rhtml;		
}

// show hide containers

self.hideHouses = function(){
	self.main.cHouse.classList.add("hide");
	self.main.cRace.classList.add("hide");
	self.main.getroachButton.classList.add("hide");
	self.main.startButton.classList.add("hide");
	self.main.cstadium.classList.remove("hide")	
}

self.showHouses = function(){
	self.main.cHouse.classList.remove("hide");
	self.main.cRace.classList.remove("hide");
	self.main.getroachButton.classList.remove("hide");
	self.main.startButton.classList.remove("hide");
	self.main.cstadium.classList.add("hide")	
}

self.pinModule = function(main){
	self.main = main;
	self.initElements();
}

let RaceHouse = self;
export { RaceHouse };
