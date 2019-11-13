var rippleBtns = document.querySelectorAll('.ripple')

rippleBtns.forEach(function(rippleBtn){

	rippleBtn.addEventListener('mousedown', function(e){

		//get the button's width and height
		var width = this.offsetWidth
		var height = this.offsetHeight
		
		//get the cursor's x and y position within the button
		// var posX = e.pageX - this.offsetLeft
		// var posY = e.pageY - this.offsetTop
		var posX = e.offsetX
		var posY = e.offsetY
		
		spawnRipple(width, height, posX, posY, this)
	});

	rippleBtn.addEventListener('animationend', function(e){
		var rippleEl = e.target
		rippleEl.parentNode.removeChild(rippleEl);
	})
})

var radioInputs = document.querySelectorAll('input[type=radio]')
imgRadio()
radioInputs.forEach(input => {
	input.addEventListener('click', function() {
		imgRadio()
	})
})

function imgRadio() {
	var radioImgs = document.querySelectorAll('.radio-img')
	var checkedRadioImgs = document.querySelectorAll('input[type=radio]:checked + .radio-content .radio-img')

	radioImgs.forEach(item => item.src = "icons/radiooff_svg.svg")
	checkedRadioImgs.forEach(item => item.src = "icons/radioon_svg.svg")
}

var checkboxInputs = document.querySelectorAll('input[type=checkbox]')
imgCheckbox()
checkboxInputs.forEach(input => {
  input.addEventListener('click', function() {
    imgCheckbox()
  })
})

function imgCheckbox() {
  var checkboxImgs = document.querySelectorAll('.checkbox-img')
  var checkedCheckboxImgs = document.querySelectorAll('input[type=checkbox]:checked + .checkbox-content .checkbox-img')
  var indeterminateCheckboxImgs = document.querySelectorAll('input[type=checkbox]:indeterminate + .checkbox-content .checkbox-img')
  
  checkboxImgs.forEach(item => item.src = "icons/checkboxempty_svg.svg")
  checkedCheckboxImgs.forEach(item => item.src = "icons/checkboxon_svg.svg")
  indeterminateCheckboxImgs.forEach(item => item.src = "icons/checkboxblock_svg.svg")
}

function indeterminateInput(input) {
  if (input.readOnly) input.checked=input.readOnly=false;
  else if (!input.checked) input.readOnly=input.indeterminate=true;
}