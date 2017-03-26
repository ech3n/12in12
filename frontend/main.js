(function () {
	var device_width = window['innerHeight'] || document.documentElement['clientHeight'] || document.body['clientHeight'];	
	var main_breakpoint = 960;
	var states = ['mobile_expand', 'mask', 'l-show', 'r-show'];
	var search_label = document.querySelector('.search_panel > label');
	
	// when device width less than 960 (breakpoint), setting search panel
  function triggerSearchPanel	() {
	search_label.addEventListener('click', function(e) {
		if (device_width < main_breakpoint) {
			contain(e)
		}
	}, false);
}
triggerSearchPanel()

	/* tag_index */	
	// Setting each block as a rectangle
	function setTagIndex() {
		var tag_index = document.querySelectorAll('.tag_index > a');
		tag_index.forEach( function (elm) {
			elm.style.height = elm.clientWidth + 'px';
			elm.style.lineHeight = elm.clientWidth + 'px';
		})
	}
	setTagIndex()
	
	
/* main_article */
//Setting each post temporary height and arrow down icon
function limitPostHeight(api, icon, more, fixed_height) {
	var qsa = document.querySelectorAll(api);
	var arrow_icon = document.querySelectorAll(icon);

	qsa.forEach( function (elm) {
		if(elm.scrollHeight > fixed_height) elm.classList.add(more)
	})
	
	arrow_icon.forEach( function (elm, idx) {
		elm.addEventListener('click', function(e) {
			e.preventDefault()
			qsa[idx].classList.remove(more);
		});
	})	
}
	
limitPostHeight('.article_description', '.article_description + a', 'article_more',155)	
limitPostHeight('.meetup_info', '.meetup_info + a', 'meetup_more',155)	


/* show */
// Setting icons to triggle each relative panel.
var arrow_btns = document.querySelectorAll('.header > a');

function resetStates (states, skip) {

	if(skip !== undefined) {
		var idx = states.indexOf(skip);
		states.splice(idx)
	}
	var len = states.length;

	for(var i = 0; i < len; i++) {
		var self = document.querySelectorAll('.' + states[i]);
		remove(self, states[i])
	}
}
	
function remove (self, className) {
	var len = self.length;
	for(var i = 0; i < len; i++) {
		self[i].classList.remove(className);
	}
}
	
function add (show, panel) {
	for(var i = 0; i < arrow_btns.length; i++) {
		arrow_btns[i].classList.add(show);
	}
	document.querySelector(panel).classList.add(show)
}
	

function contain (e) {
	switch(e.target.dataset.anchor) {
		case '12in12':
			if(e.target.classList.contains('l-show')) {
				resetStates(states) 
			} else {
				resetStates(states) 
					add('l-show', '.tag_index');
				}
			break;
		case 'meetup':
			if(e.target.classList.contains('r-show')) { 
				resetStates(states)
			} else { 
				resetStates(states)
				add('r-show', '.meetup_events');
			}
			break;
		case 'search_panel':
			if(document.querySelector('.search_panel').classList.contains('mobile_expand')) {
				resetStates(states)
			} else {
				resetStates(states)
				document.querySelector('.search_panel').classList.add('mobile_expand')
				document.querySelector('.container').classList.add('mask')
			}
			break;
	}
}	

arrow_btns.forEach(function (elm) {
	elm.addEventListener('click', function(e) {
		e.preventDefault();
		contain(e);
	});
})

// resize event to reset states
window.addEventListener('resize', function(e) {
	var device_width = this.innerWidth;
	console.log(device_width);
	if (device_width > main_breakpoint) {
		resetStates(states)
	}
});

})()