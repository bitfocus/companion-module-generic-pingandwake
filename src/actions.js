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

		self.setActionDefinitions(actions)
	},
}
