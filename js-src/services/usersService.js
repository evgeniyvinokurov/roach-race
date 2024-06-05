import { AjaxService } from './ajaxService.js';

let usersService = {
  postEmail: function(email, cb){
    let data = new FormData();
    data.append("email", email);

    AjaxService.doAjaxPost("/raceuser/in/", data, function(data){
			let user = data.user;
			cb(user)
		})
	},
}

export { usersService };
