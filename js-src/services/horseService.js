import { AjaxService } from './ajaxService.js';

let HorseService = {
	getHorses: function(cb){
        AjaxService.doAjaxPost("/horses/out/", {}, function(data){			
			cb(data)
		})
	},
	getHorse: function(cb){
        AjaxService.doAjaxPost("/horses/get/", {}, function(data){			
			cb(data)
		})
	},
	toRace: function(cb, horseId){
        AjaxService.doAjaxPost("/horses/race/in/" + horseId + "/", {}, function(data){			
			cb(data)
		})
	},
	outRace: function(cb, horseId){
        AjaxService.doAjaxPost("/horses/race/out/" + horseId + "/", {}, function(data){			
			cb(data)
		})
	},
	start: function(cb){
        AjaxService.doAjaxPost("/horses/race/", {}, function(data){			
			cb(data)
		})
	}
};

export { HorseService };
