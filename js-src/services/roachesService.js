import { AjaxService } from './ajaxService.js';

let roachesService = {
	getroaches: function(cb){
        AjaxService.doAjaxPost("/roaches/out/", {}, function(data){			
			cb(data)
		})
	},
	getroach: function(cb){
        AjaxService.doAjaxPost("/roaches/get/", {}, function(data){			
			cb(data)
		})
	},
	toRace: function(cb, roachId){
        AjaxService.doAjaxPost("/roaches/race/in/" + roachId + "/", {}, function(data){			
			cb(data)
		})
	},
	outRace: function(cb, roachId){
        AjaxService.doAjaxPost("/roaches/race/out/" + roachId + "/", {}, function(data){			
			cb(data)
		})
	},
	start: function(cb){
        AjaxService.doAjaxPost("/roaches/race/", {}, function(data){			
			cb(data)
		})
	}
};

export { roachesService };
