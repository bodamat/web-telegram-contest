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
		if (doms.dialog) {
			if (vars.openDialog) {
				doms.dialog.classList.remove('left-click')
				doms.headerSearchBtn.classList.remove('active')
			}
			doms.dialog.style.display = command === "show" ? "" : "none";
			vars.openDialog = !vars.openDialog
		}
	},
	setPosition: function({ top, left }, menuItems) {
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
			dialog.setPosition(origin, menuItems);
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
			
			dialog.setPosition(origin, menuItems);
		})
	}
}

// Left and right sidebar
var sidebar = {
	hideAllLeftSidebar: function () {
		if (doms.searchLeftSidebarEls)
			doms.searchLeftSidebarEls.forEach(el => {
				hideEl(el)
			})

		if (doms.leftSidebarEls)
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


// inits
// sidebar init
function sidebarInit() {
	if (doms.leftSidebarEls.length != 0) {
		sidebar.hideAllLeftSidebar()
		if (doms.dialog) hideEl(doms.dialog)
		sidebar.openSidebar(null ,'#messages')
	}
}

// dialog init
function dialogInit () {
	if (doms.dialog) {
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
}

sidebarInit()
dialogInit()
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
