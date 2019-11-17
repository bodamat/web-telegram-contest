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