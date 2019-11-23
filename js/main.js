// Ripple effect init
function rippleInit() {
	var rippleBtns = document.querySelectorAll('.ripple')
	rippleBtns.forEach(function(rippleBtn){
		addRipleEffect(rippleBtn)
	})
}

function addRipleEffect(rippleBtn) {
	rippleBtn.addEventListener('mousedown', function(e){
		//get the button's width and height
		var width = this.offsetWidth
		var height = this.offsetHeight
		
		//get the cursor's x and y position within the button
		var posX = e.offsetX
		var posY = e.offsetY
		
		spawnRipple(width, height, posX, posY, this)
	});

	rippleBtn.addEventListener('animationend', function(e){
		var rippleEl = e.target
		rippleEl.parentNode.removeChild(rippleEl);
	})
}

// allInputs init
function inputsInit() {
	var radioInputs = document.querySelectorAll('input[type=radio]')
	inputs.imgRadio()
	radioInputs.forEach(input => {
		input.addEventListener('click', function() {
			inputs.imgRadio()
		})
	})

	inputs.imgCheckbox()
	var checkboxBtns = getEls('.btn.btn-checkbox')
	checkboxBtns.forEach(el => {
		el.addEventListener('click', () => {
			inputs.updateCheckedBtn(el)
		})
	})

	// input[type="range"] change value

	let ranges = getEls('.range')
	ranges.forEach(function(range, key) {
		range.id = "range" + key
		let input = getEl('input', range)
		let styleEl = getEl('style', range)
		let valueEl = getEl('#general-settings .range .value')

		let value = input.value
		let n = (value / input.max) * 100

		valueEl.innerText = value
		styleEl.innerHTML = "#" + range.id + " input[type=range]::-webkit-slider-runnable-track {background:linear-gradient(to right, var(--input-border-color-focus) 0%, var(--input-border-color-focus) " + n + "%, #eee " + n + "%)}"

		range.addEventListener('input', function() {
			value = input.value
			n = (value / input.max) * 100
			
			valueEl.innerText = value
			styleEl.innerHTML = "#" + range.id + " input[type=range]::-webkit-slider-runnable-track {background:linear-gradient(to right, var(--input-border-color-focus) 0%, var(--input-border-color-focus) " + n + "%, #eee " + n + "%)}"
		})
	})
}

// autocomplete init
function autocompleteInit(){
	let memberInput = getEl("#memberInput")
	if (memberInput) {
		autocomplete(memberInput, vars.memberList);
	}
}



function init() {
	inputsInit()
	rippleInit()
	autocompleteInit()
}

init()