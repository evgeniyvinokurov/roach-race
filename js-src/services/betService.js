import { AjaxService } from './ajaxService.js';

let betService = {
  bet: function(data, cb){
    let fdata = new FormData();

    fdata.append("user", data.user);
    fdata.append("roach", data.roach);
    fdata.append("bet", data.bet);

    AjaxService.doAjaxPost("/bet/", fdata, function(data){
			let result = data.result;
			cb(result)
		})
	},
  bets: function(cb){
    AjaxService.doAjaxPost("/bets/", {}, function(data){
			let bets = data.bets;
			cb(bets)
		})
	},
}

export { betService };
