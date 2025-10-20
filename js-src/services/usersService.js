import { AjaxService } from './ajaxService.js';

let usersService = {
  postEmail: function(cb, email){
	let fdata = new FormData();
	fdata.append("email", email);

    AjaxService.doAjaxPost("/raceuser/in/", fdata, function(data){
			let user = data.user;
			cb(user)
		})
	},
}

export { usersService };
