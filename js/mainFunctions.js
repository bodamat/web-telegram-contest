function getEls(text, parentEl = document) {
	let els = parentEl.querySelectorAll(text)
	return els
}

function getEl(text, parentEl = document) {
	let el = parentEl.querySelector(text)
	return el
}

function splitString(stringToSplit, separator) {
	let arrayOfStrings = stringToSplit.split(separator)
	return arrayOfStrings
}

function hideEl(el) {
	el.style.display = "none"
}

function showEl(el) {
	el.style.display = ""
}

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