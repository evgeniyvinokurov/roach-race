import { roachesService } from '../services/roachesService.js';
import { Templater } from '../templater.js';


let self = {};

self.initroachEvents = function(){
	self.initroachEventsHouse();
	self.initroachEventsRace();
}

self.initroachEventsRace = function(){	
	let roaches = document.querySelectorAll(".race .roach");
	for(let h of roaches){		
		h.addEventListener("click", clickroachout);
	} 		
}

self.initroachEventsHouse = function(){	
	let roachesHouse = document.querySelectorAll(".roach-house .roach");
	for(let h of roachesHouse){		
		h.addEventListener("click", clickroachin);
	} 	
}

self.initroachButtonsEvents = function(){	
	self.main.startButton.addEventListener("click", function(e){
		self.race()	
	});

	self.main.getroachButton.addEventListener("click", function(e){
		roachesService.getroach(function(data){
			let roachHtml = self.drawRoachesHtml([data.roach])
			self.main.roachHouseSection.innerHTML = self.main.roachHouseSection.innerHTML  + roachHtml; 
			self.initroachEventsHouse();
		})
	});
}


// load
self.loadHouse = function(buttons = true){	
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
}

let clickroachout = function(e){		
	let roachId = this.attributes["id"].value.replace("id", "");
	let selfin = this;
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
		roachesService.start(function(data){
			if (data["status"] == "finished"){			
				clearInterval(timer);
				timer = null;
				self.loadHouse(false);
				self.showHouses();
			} else
				self.hideHouses();
				self.drawroachesRace(data.state);
		})
	}, 500)	
}


// draw html

self.drawHouseRace = function(){
	let roachesHtml = self.drawRoachesHtml(self.main.roacheshouse);
    self.main.roachHouseSection.innerHTML = roachesHtml;    

	let roachesHtmlrace = self.drawRoachesHtml(self.main.roachesrace);
    self.main.raceSection.innerHTML = roachesHtmlrace;	
	
	self.main.cstadium.classList.add("hide")	
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
}

let RaceHouse = self;
export { RaceHouse };
