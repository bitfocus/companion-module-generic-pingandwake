module.exports = {
	initActions() {
		let self = this
		let actions = {}

		actions.startPing = {
			name: 'Start/Restart Ping Interval',
			options: [],
			callback: function (action, bank) {
				self.STOP_PING = false
				self.startPing()
			},
		}

		actions.stopPing = {
			name: 'Stop Ping Interval',
			options: [],
			callback: function (action, bank) {
				self.stopPing()
			},
		}

		actions.performARP = {
			name: 'Perform ARP Lookup Now',
			options: [],
			callback: function (action, bank) {
				self.performARP()
			},
		}

		actions.sendWOL = {
			name: 'Send Wake-On-LAN Packet Now',
			options: [],
			callback: function (action, bank) {
				self.sendWOL()
			},
		}

		actions.disableWOL = {
			name: 'Disable Wake-On-LAN',
			options: [],
			callback: function (action, bank) {
				self.log('info', 'Wake-On-LAN Function Disabled.')
				self.WOL_ENABLED = false
			},
		}

		actions.enableWOL = {
			name: 'Enable Wake-On-LAN',
			options: [],
			callback: function (action, bank) {
				self.log('info', 'Wake-On-LAN Function Enabled.')
				self.WOL_ENABLED = true
			},
		}

		self.setActionDefinitions(actions)
	},
}
