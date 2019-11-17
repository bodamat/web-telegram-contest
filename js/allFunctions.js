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

//generate from list
var generate = {
	generateCheckedMembers: function (domMemberList, memberList) {
		memberList.forEach(member => {
			domMemberList.insertAdjacentHTML("beforeEnd",
				'<button class="btn ripple btn-white btn-account btn-checkbox" data-id="' + member.id + '" onclick="inputs.updateCheckedBtn(this)">' +
					'<input type="checkbox" id="contact' + member.id + '">' +
					'<label for="contact' + member.id + '" class="checkbox-content">' +
						'<img alt="" class="icon checkbox-img">' +
						'<div class="btn-input-content">' +
							'<img src="' + member.img + '" class="account-img"/>' +
							'<div class="content">' +
								'<span class="name">' + member.text + '</span>' +
								'<span class="info">' + member.info + '</span>' +
							'</div>' +
						'</div>' +
					'</label>' +
				'</button>'
			)
			addRipleEffect(getEl('.ripple[data-id="' + member.id + '"]', domMemberList))
		})
		inputs.imgCheckbox()
	},
	addFixedBtn: function(insertDiv, imgSrc) {
		insertDiv.insertAdjacentHTML('beforeEnd', 
			'<button class="btn ripple btn-blue btn-add btn-next">' +
				'<img src="' + imgSrc + '" class="icon icon-white"/> ' +
			'</button>'
		)

		addRipleEffect(getEl('.ripple.btn-next', insertDiv))
	}
}

// update inputs img
var inputs = {
	imgRadio: function() {
		var radioImgs = getEls('.radio-img')
		var checkedRadioImgs = getEls('input[type=radio]:checked + .radio-content .radio-img')
	
		radioImgs.forEach(item => item.src = "assets/icons/radiooff_svg.svg")
		checkedRadioImgs.forEach(item => item.src = "assets/icons/radioon_svg.svg")
	},
	imgCheckbox: function () {
		var checkboxImgs = getEls('.checkbox-img')
		var checkedCheckboxImgs = getEls('input[type=checkbox]:checked + .checkbox-content .checkbox-img')
		var indeterminateCheckboxImgs = getEls('input[type=checkbox]:indeterminate + .checkbox-content .checkbox-img')
		
		checkboxImgs.forEach(item => item.src = "assets/icons/checkboxempty_svg.svg")
		checkedCheckboxImgs.forEach(item => item.src = "assets/icons/checkboxon_svg.svg")
		indeterminateCheckboxImgs.forEach(item => item.src = "assets/icons/checkboxblock_svg.svg")
	},
	indeterminateInput: function(input) {
		if (input.readOnly) input.checked=input.readOnly=false;
		else if (!input.checked) input.readOnly=input.indeterminate=true;
	},
	updateCheckedBtn: function(btn) {
		let input = getEl('input', btn)
		let statusCheckedBtn = getEl('.text-tooltip.status', btn)

		input.checked = !input.checked
		this.imgCheckbox()
	
		if (input.checked) {
			if(btn.dataset.id) {
				btn.classList.add('btn-checked')
				chips.addChip(btn)
			}
			if (statusCheckedBtn) statusCheckedBtn.innerText = "Enabled"
		}	
		else {
			if(btn.dataset.id) {
				btn.classList.remove('btn-checked')
				chips.deleteChip(btn, false)
			}
			if (statusCheckedBtn) statusCheckedBtn.innerText = "Disabled"
		}
	}
}

// Chips
var chips = {
	chipsEl: getEl('.chips'),
	chipsAutocompleteInput: getEl('.chips .autocomplete'),
	addChip: function (btn, isChip = false) {
		let btnId = btn.dataset.id
		let chipImgSrc = getEl('.account-img', btn).src
		let chipNameText = getEl('.name', btn).innerText
		
		let chipNames = splitString(chipNameText, ' ')
		let chipName = chipNames[0]
		
		vars.chipList.push({
			id: btnId,
			img: chipImgSrc,
			name: chipName
		})
		
		if (isChip) inputs.updateCheckedBtn(btn)

		this.updateChips()
	},
	deleteChip: function (chipButton, isChip = true) {
		vars.chipList.forEach((el, key) => {
			if (el.id == chipButton.dataset.id) {
				vars.chipList.splice(key, 1)
				if (isChip) {
					let btn = getEl('.btn[data-id="' + el.id + '"]', doms.memberList)
					inputs.updateCheckedBtn(btn)
				}
			}
		})
		this.updateChips()
	},
	updateChips: function () {
		let chipEls = getEls('.chip', this.chipsEl)
		chipEls.forEach(el => {
			el.remove()
		})
		vars.chipList.forEach((chipData) => {
			this.chipsAutocompleteInput.insertAdjacentHTML("beforeBegin", '<div class="chip">' +
					'<div class="img-relative">' +
						'<img src="' + chipData.img + '" alt="person" class="img">' +
						'<div class="img-hover">' +
							'<img src="assets/icons/close_svg.svg" alt="" class="icon-white" onclick="chips.deleteChip(this)" data-id="' + chipData.id + '">' +
						'</div>' +
					'</div>' +
					'<span class="text">' + chipData.name +'</span>' +
				'</div>')
		})

		let lastSection = getEl('#add-member section:last-child')
		let fixedBtn = getEl('.btn.btn-next', lastSection)

		if (vars.chipList && !fixedBtn)
			generate.addFixedBtn(lastSection, 'assets/icons/next_svg.svg')
		else if (vars.chipList.length == 0 && fixedBtn){
			fixedBtn.remove()
		}
	}
}

// Dialog
var dialog = {
	generateDialog: (dialog, menuItems) => {
		dialog.innerHTML = ""
	
		menuItems.forEach(menuItem => {
			if (menuItem.number) {
				dialog.insertAdjacentHTML("beforeEnd",
					'<div class="item btn btn-white ripple" onclick="' + menuItem.do + '">' +
						'<img src="' + menuItem.img + '" alt="" class="icon icon-gray">' +
						'<span class="text">' + menuItem.text + '</span>' +
						'<div class="number-message bg-muteoff">' +
							'<span>' + menuItem.number + '</span>' +
						'</div>' +
					'</div>'
				)
			}
			else {
				dialog.insertAdjacentHTML("beforeEnd",
					'<div class="item btn btn-white ripple" onclick="' + menuItem.do + '">' +
						'<img src="' + menuItem.img + '" alt="" class="icon icon-gray">' +
						'<span class="text">' + menuItem.text + '</span>' +
					'</div>'
				)
			}
		})
	},
	toggleMenu: function (command) {
		if (vars.openDialog) {
			doms.dialog.classList.remove('left-click')
			doms.headerSearchBtn.classList.remove('active')
		}
		doms.dialog.style.display = command === "show" ? "" : "none";
		vars.openDialog = !vars.openDialog
	},
	setPosition: ({ top, left }, menuItems) => {
		doms.dialog.style.left = `${left}px`;
		doms.dialog.style.top = `${top}px`;
		
		if (vars.openDialog) this.toggleMenu("hide")
		else this.toggleMenu("show");
		
		this.generateDialog(doms.dialog, menuItems)
	},
	rightClickDialog: function (el, menuItems) {
		el.addEventListener("contextmenu", e => {
			let origin = {
				left: e.pageX,
				top: e.pageY
			}
			this.setPosition(origin, menuItems);
			return false;
		})
	},
	leftClickDialog: function (el, menuItems) {
		el.addEventListener('click', function(e) {
			let target = e.target
			doms.dialog.classList.add('left-click')
			if (vars.openDialog) target.classList.remove('active')
			else target.classList.add('active')
		
			let origin = {
				top: target.offsetTop + target.offsetHeight + 10,
				left: target.offsetLeft
			}
			
			this.setPosition(origin, menuItems);
			return false;
		})
	}
}

// Left and right sidebar
var sidebar = {
	hideAllLeftSidebar: function () {
		doms.searchLeftSidebarEls.forEach(el => {
			hideEl(el)
		})
		doms.leftSidebarEls.forEach(el => {
			hideEl(el)
		})
	},
	openSidebar: function (closeDivId, openDivId) {
		if (closeDivId) hideEl(getEl(closeDivId))
		if (openDivId) showEl(getEl(openDivId))
		dialog.toggleMenu("hide")
	}
}

//autocomplete member input
function autocomplete(inp, arr) {
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (arr[i].text.substr(0, val.length).toLowerCase() == val.toLowerCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement("DIV");
				b.setAttribute("class", "autocomplete-item");
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
					// inp.value = this.querySelector("input[name=text]").value;
					
					let btnid = getEl("input[name=id]", this).value
					let btn = getEl('.btn[data-id="' + btnid + '"]', doms.memberList)
					inputs.updateCheckedBtn(btn)
					inp.value = ""
					/*close the list of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
				
				// add content to autocomplete item
				b.insertAdjacentHTML("afterBegin", 
					"<input type='hidden' name='id' value='" + arr[i].id + "'>" +
					"<img src='" + arr[i].img + "' class='account-img'>" +
					"<span class='text'>" +
						"<strong>" + arr[i].text.substr(0, val.length) + "</strong>" + arr[i].text.substr(val.length) +
						"<input type='hidden' name='text' value='" + arr[i].text + "'>" +
					"</span>"
				)

				if (arr[i].tooltip){
					b.insertAdjacentHTML("beforeEnd", 
						"<span class='tooltip'>" +
							arr[i].tooltip +
							"<input type='hidden' name='tooltip' value='" + arr[i].tooltip + "'>" +
						"</span>"
					)
				}
			}
		}
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {

		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
			increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) { //up
			/*If the arrow UP key is pressed,
			decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			}
		} else if (e.keyCode == 27) {
			closeAllLists()
		}
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
		closeAllLists(e.target);
  });
}

//change search input style when focus and blur
function styleSearch(input, action) {
	let parentDiv = input.parentElement
	let classes = parentDiv.classList
	if( classes.contains("search-input-group") ) {
		if (action === 'add') parentDiv.classList.add("focusSearch")
		else {
			if (!input.value) parentDiv.classList.remove("focusSearch");
		}	
	}
	else {
		styleSearch(parentDiv, action)
	}
}

/*An array containing all the country names in the world:*/
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

