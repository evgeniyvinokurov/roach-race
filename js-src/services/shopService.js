import { AjaxService } from './ajaxService.js';

let shopService = {
	get: function(cb){
	  AjaxService.doAjaxPost("/shop/get/", {}, function(data){
			  cb(data);
		  })
	  },
	buy: function(buy){
		AjaxService.doAjaxPost("/shop/buy/", buy, function(){})
	}
}

export { shopService };
