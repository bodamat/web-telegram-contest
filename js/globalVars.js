vars = {
	openDialog: false,
	chipList: [],
	memberList: [
		{
			id: 1,
			img: "assets/imgs/accounts/account1.jpg",
			text: "Raaid El Syed",
			info: "last seen jus now"
		},
		{
			id: 2,
			img: "assets/imgs/accounts/account2.jpg",
			text: "John Smitt",
			info: "last seen just now"
		}
	],
	countries: {
		id: 1,
		img: "assets/icons/back_svg.svg",
		text: "Ukraine",
		tooltip: "+38"
	},
	menuDialog: [
		{
			img: "assets/icons/group_svg.svg",
			text: "New Group",
			do: "sidebar.openSidebar('#search-sidebar', '#new-group')"
		},
		{
			img: "assets/icons/user_svg.svg",
			text: "Contacts",
			do: "sidebar.openSidebar('#messages', '#contacts')"
		},
		{
			img: "assets/icons/archive_svg.svg",
			text: "Archived",
			do: "",
			number: 2,
			mute: "off"
		},
		{
			img: "assets/icons/savedmessages_svg.svg",
			text: "Saved",
			do: ""
		},
		{
			img: "assets/icons/settings_svg.svg",
			text: "Settings",
			do: "sidebar.openSidebar('#search-sidebar', '#settings')"
		},
		{
			img: "assets/icons/help_svg.svg",
			text: "Help",
			do: ""
		}
	],
	messageBtnDialog: [
		{
			img: "assets/icons/channel_svg.svg",
			text: "New Channel",
			do: "sidebar.openSidebar('#search-sidebar', '#new-channel')"
		},
		{
			img: "assets/icons/group_svg.svg",
			text: "New Group",
			do: "sidebar.openSidebar('#search-sidebar', '#new-group')"
		},
		{
			img: "assets/icons/newprivate_svg.svg",
			text: "New Private Chat",
			do: ""
		}
	]
}