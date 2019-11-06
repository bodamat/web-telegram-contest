var rippleBtns = getEl('.ripple')

//creating a ripple effect for button
function spawnRipple(width, height, posX, posY, rippleBtn){
	calcWidth = ( width <= height ) ? height : width
	calcHeight = ( width <= height ) ? height : width
	calcTop = posY - (calcHeight * 0.5)
	calcLeft = posX - (calcWidth * 0.5)

	var rippleEl = document.createElement('span')
	rippleEl.classList.add("btn-ripple")
	rippleEl.style.width = calcWidth + "px"
	rippleEl.style.height = calcHeight + "px"
	rippleEl.style.top = calcTop + "px"
	rippleEl.style.left = calcLeft + "px"
	rippleBtn.appendChild(rippleEl)
}

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