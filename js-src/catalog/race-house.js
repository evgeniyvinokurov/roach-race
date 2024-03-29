import { HorseService } from '../services/horseService.js';
import { Templater } from '../templater.js';


let self = {};

let clickhorsein = function(e){
	let horseId = this.attributes["id"].value.replace("id", "");
	let selfin = this;
	HorseService.toRace(function(data){ 
			if (data.status == "ok") {
				selfin.remove();
				let hhtml = self.drawHorses([data.horse]);
				self.main.raceSection.innerHTML = self.main.raceSection.innerHTML + hhtml;    
				self.initHorseEventsRace();
			}
	}, horseId)
}

let clickhorseout = function(e){		
	let horseId = this.attributes["id"].value.replace("id", "");
	let selfin = this;
	HorseService.outRace(function(data){
		if (data.status == "ok") {
			selfin.remove();
			let hhtml = self.drawHorses([data.horse]);
			self.main.horseHouseSection.innerHTML = self.main.horseHouseSection.innerHTML + hhtml;
			self.initHorseEventsHouse();
		}
	}, horseId)
};

self.initHorseEvents = function(){
	self.initHorseEventsHouse();
	self.initHorseEventsRace();
}

self.initHorseEventsRace = function(){	
	let horses = document.querySelectorAll(".race .horse");
	for(let h of horses){		
		h.addEventListener("click", clickhorseout);
	} 		
}

self.initHorseEventsHouse = function(){	
	let horsesHouse = document.querySelectorAll(".horse-house .horse");
	for(let h of horsesHouse){		
		h.addEventListener("click", clickhorsein);
	} 	
}

self.drawRoachesHtml = function(horses){
	let html = "";

	if (horses.length > 0)
		for (let h of horses) { 
			let thtml = Templater.templates["roach"];
			html += Templater.template(thtml, h)
		}

	return html;
}

self.drawRoaches = function(state){
	let roaches = [];
	for (let r of state) {
		let roach = {};
		let delta = r["gotrunned"];
		roach["id"] = r["id"];
		roach["delta"] = Math.ceil(delta * 800 / r["race"]);
		roach["pic"] = "&#129715;";
		roach["number"] = r["horse"]["number"];
		roaches.push(roach);
	}
	let rhtml = self.drawRoachesHtml(roaches);
	self.main.stadium.innerHTML = rhtml;		
}

let timer = null;

self.race = function(){	
	if (!!timer) return false;
	timer = setInterval(function(){
		HorseService.start(function(data){
			if (data["status"] == "finished"){			
				clearInterval(timer);
				timer = null;
				self.loadHouse(false);
				self.showHouses();
			} else
				self.hideHouses();
				self.drawRoaches(data.state);
		})
	}, 500)	
}

self.hideHouses = function(){
	self.main.cHouse.classList.add("hide");
	self.main.cRace.classList.add("hide");
	self.main.getHorseButton.classList.add("hide");
	self.main.startButton.classList.add("hide");
	self.main.cstadium.classList.remove("hide")	
}

self.showHouses = function(){
	self.main.cHouse.classList.remove("hide");
	self.main.cRace.classList.remove("hide");
	self.main.getHorseButton.classList.remove("hide");
	self.main.startButton.classList.remove("hide");
	self.main.cstadium.classList.add("hide")	
}

self.initHorseButtonsEvents = function(){	
	self.main.startButton.addEventListener("click", function(e){
		self.race()	
	});

	self.main.getHorseButton.addEventListener("click", function(e){
		HorseService.getHorse(function(data){
			let horseHtml = self.drawHorses([data.horse])
			self.main.horseHouseSection.innerHTML = self.main.horseHouseSection.innerHTML  + horseHtml; 
			self.initHorseEventsHouse();
		})
	});
}

self.drawHouseRace = function(){
	let horsesHtml = self.drawHorses(self.main.horseshouse);
    self.main.horseHouseSection.innerHTML = horsesHtml;    

	let horsesHtmlrace = self.drawHorses(self.main.horsesrace);
    self.main.raceSection.innerHTML = horsesHtmlrace;	
	
	self.main.cstadium.classList.add("hide")	
}

self.drawHorses = function(horses){
	let html = "";

	if (horses.length > 0)
		for (let h of horses) { 
			let thtml = Templater.templates["horse"];
			html += Templater.template(thtml, h)
		}

	return html;
}

self.loadHouse = function(buttons = true){	
	HorseService.getHorses(function(data){
		self.main.horseshouse = data.horses;
		self.main.horsesrace = data.race; 
							
		self.drawHouseRace();            
		self.initHorseEvents();   
		
		if (buttons)    
			self.initHorseButtonsEvents();

		if (self.main.app.classList.contains("started") ) {
			self.main.app.classList.remove("started");
			self.race();
		} 
	});
}

self.pinModule = function(main){
	self.main = main;
}

let RaceHouse = self;
export { RaceHouse };
