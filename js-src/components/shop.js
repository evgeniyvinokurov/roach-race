import { usersService } from '../services/usersService.js';
import { shopService } from '../services/shopService.js';

import { Templater } from '../templater.js';


let self = {};

let buy = function(e, cb){	
	e.stopPropagation();

	let item = JSON.parse(unescape(e.currentTarget.parentElement.attributes["data-src"].value));
	let ffdata = new FormData();

	ffdata.append("item", item.id)
	ffdata.append("user", self.main.user.id)

	shopService.buy(ffdata)
}


self.initElements = function(){
	self.main.itemsContainer = document.querySelector(".items-container");
}

self.initItemsEvents = function(){
	let buybtns = document.querySelectorAll(".items-container .item .item-buy");
	for(let bb of buybtns){		
		bb.addEventListener("click", buy);
	} 

}

// load

self.loadItems = function(){	 
    shopService.get(function(data){
		self.main.items = data.items;

		self.drawItems();            
		self.initItemsEvents();   
	});
}


// draw html

self.drawItems = function(){
    let itemsHtml = self.drawItemsHtml(self.main.items);
    self.main.itemsContainer.innerHTML = itemsHtml;    
}

self.drawItemsHtml = function(items){
	let html = "";

	if (items.length > 0)
		for (let i of items) { 
			let thtml = Templater.templates["item"];
			html += Templater.template(thtml, i)
		}

	return html;
}

// show hide containers

self.pinModule = function(main){
	self.main = main;
	
	self.initElements();
    self.loadItems()
}

let Shop = self;
export { Shop };
