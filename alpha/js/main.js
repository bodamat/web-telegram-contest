var rippleBtns = document.querySelectorAll('.ripple')

rippleBtns.forEach(function(rippleBtn){

	rippleBtn.addEventListener('mousedown', function(e){
		//get the button's width and height
		var width = this.offsetWidth
		var height = this.offsetHeight
		
		//get the cursor's x and y position within the button
		var posX = e.pageX - this.offsetLeft
		var posY = e.pageY - this.offsetTop
		
		spawnRipple(width, height, posX, posY, this)
	});

	rippleBtn.addEventListener('animationend', function(e){
		var rippleEl = e.target
		rippleEl.parentNode.removeChild(rippleEl);
	})
});