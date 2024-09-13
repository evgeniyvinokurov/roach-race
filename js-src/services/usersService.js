import { AjaxService } from './ajaxService.js';

let usersService = {
  postEmail: function(cb){
    AjaxService.doAjaxPost("/raceuser/in/", {}, function(data){
			let user = data.user;
			cb(user)
		})
	},
}

export { usersService };
