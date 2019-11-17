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
	autocomplete(document.getElementById("memberInput"), vars.memberList);
}

// sidebar init
function sidebarInit() {
	sidebar.hideAllLeftSidebar()
	hideEl(doms.dialog)
	sidebar.openSidebar(null ,'#messages')
}

// dialog init
function dialogInit () {
	window.addEventListener("click", e => {
		if (!doms.dialog.classList.contains('left-click') && vars.openDialog) 
			dialog.toggleMenu("hide")
	});
	
	window.addEventListener('keydown', e => {
		if (e.keyCode == 27) {
			dialog.toggleMenu("hide")
		}
	})
	
	window.oncontextmenu = function(e) {
		e.preventDefault()
	}
	
	doms.messageBtns.forEach(btn => {
		dialog.rightClickDialog(btn, vars.messageBtnDialog)
	})
	
	dialog.leftClickDialog(doms.headerSearchBtn, vars.menuDialog)
}

function init() {
	inputsInit()
	sidebarInit()
	dialogInit()
	rippleInit()
	autocompleteInit()
}

init()
generate.generateCheckedMembers(doms.memberList, vars.memberList)

// Tabs
let tabMenu = getEl('.tabs .tab-menu')
let tabContent = getEl('.tabs .tab-content')
let tabMenusItems = getEls('.tab-index', tabMenu)

tabMenusItems.forEach(tabMenuItem => {
	tabMenuItem.addEventListener('click', e => {
		let tabMenuItemSelect = getEl('.tab-index.selected', tabMenu)
		tabMenuItemSelect.classList.remove('selected')
		tabMenuItem.classList.add('selected')

		getEl(tabMenuItemSelect.dataset.clickSwitch, tabContent).classList.remove('selected')
		getEl(tabMenuItem.dataset.clickSwitch, tabContent).classList.add('selected')
	})
})

function openTab(tabMenuItemId) {
	getEl('[data-click-switch="' + tabMenuItemId + '"]').classList.add('selected')
	getEl(tabMenuItemId, tabContent).classList.add('selected')
}

openTab('#audio')

function openLink(btn) {
	window.open(getEl('.link', btn).href, '_blank')
}