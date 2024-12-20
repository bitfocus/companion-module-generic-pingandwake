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

		actions.shutdownWindowsPC = {
			name: 'Shutdown Windows PC',
			options: [
				//time in seconds to wait before shutdown
				{
					type: 'number',
					label: 'Time to Wait (in seconds)',
					id: 'time',
					default: 0,
				},
				//force checkbox
				{
					type: 'checkbox',
					label: 'Force Shutdown (Close All Apps)',
					id: 'force',
					default: true,
				},

			],
			callback: async function (action, bank) {
				let time = action.options.time
				let force = action.options.force
				self.shutdownWindowsPC(time, force)
			},
		}

		self.setActionDefinitions(actions)
	},
}
