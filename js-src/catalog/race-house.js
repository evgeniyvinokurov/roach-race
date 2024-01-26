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

self.initHorseButtonsEvents = function(){	
	self.main.startButton.addEventListener("click", function(e){
		HorseService.start(function(winner){			
			self.loadHouse();
		})
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


self.loadHouse = function(){
	HorseService.getHorses(function(data){
		self.main.horseshouse = data.horses;
		self.main.horsesrace = data.race; 
							
		self.drawHouseRace();            
		self.initHorseEvents();       
		self.initHorseButtonsEvents();
	});
}

self.pinModule = function(main){
	self.main = main;
}

let RaceHouse = self;
export { RaceHouse };
