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

/*An array containing all the country names in the world:*/
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

