const { InstanceStatus } = require('@companion-module/base')

const ping = require('ping')
const arp = require('@network-utils/arp-lookup')
const wol = require('wake_on_lan')

module.exports = {
	startPing() {
		let self = this
		self.sendPing()
	},

	stopPing() {
		let self = this

		if (self.PING_INTERVAL) {
			self.log('info', 'Stopping Ping.')
		}

		clearInterval(self.PING_INTERVAL)
		self.PING_INTERVAL = null
		self.STOP_PING = true
	},

	async sendPing() {
		let self = this

		const host = self.config.ip
		const timeout = self.config.timeout
		const retryrate = self.config.retryrate

		try {
			if (self.config.verbose) {
				self.log('debug', 'Sending Ping to ' + host)
			}

			if (retryrate == 0) {
				self.log('info', 'Retry Rate is 0. Module will send one ping, and then stop.')
			}

			let res = await ping.promise.probe(host, {
				timeout: timeout,
			})

			if (self.config.verbose) {
				self.log('debug', 'Ping Output: ' + res.output)
			}

			self.DATA.pingAlive = res.alive
			self.DATA.pingResponseTimeMin = res.min
			self.DATA.pingResponseTimeMax = res.max
			self.DATA.pingResponseTimeAvg = res.avg
			self.DATA.pingPacketLoss = res.packetLoss
			self.DATA.pingLast = new Date()

			if (res.alive == true) {
				self.updateStatus(InstanceStatus.Ok, 'Host is alive.')
				self.log('info', 'Host is alive.')
			} else if (res.alive == false) {
				self.updateStatus(InstanceStatus.Disconnected, 'Host is not alive. Sending WOL Packet.')
				self.log('error', 'Host is not alive.')
				self.sendWOL()
			} else {
				self.updateStatus(InstanceStatus.UnknownError)
			}

			self.checkFeedbacks()
			self.checkVariables()

			if (self.STOP_PING || retryrate == 0) {
				clearInterval(self.PING_INTERVAL)
				self.PING_INTERVAL = null
			} else if (retryrate > 0) {
				self.PING_INTERVAL = setTimeout(self.sendPing.bind(self), retryrate, host, timeout, retryrate)
			}
		} catch (error) {
			self.log('error', 'Error pinging: ' + error)
		}
	},

	async performARP() {
		let self = this
		self.log('info', 'Performing ARP Lookup for ' + self.config.ip)

		let mac = await arp.toMAC(self.config.ip)

		let isMac = arp.isMAC(mac)

		if (isMac) {
			//save the MAC Address into the module config
			self.log('debug', 'Saving MAC Address to Config: ' + mac)
			self.config.mac = mac
			self.saveConfig(self.config)

			self.DATA.arpSuccess = true
		} else {
			self.log('error', 'Invalid MAC Address Returned: ' + mac)
			self.DATA.arpSuccess = false
		}

		self.DATA.arpLast = new Date()

		self.checkFeedbacks()
		self.checkVariables()
	},

	async sendWOL() {
		let self = this
		self.log('info', 'Sending Wake-On-LAN Packet to ' + self.config.mac)

		let options = {
			port: self.config.wolPort,
			address: self.config.wolBroadcast,
			num_packets: self.config.wolResend,
			interval: self.config.wolInterval,
		}

		if (self.config.verbose) {
			self.log('debug', 'WOL Options: ' + JSON.stringify(options))
		}

		wol.wake(self.config.mac, options, function (error) {
			if (error) {
				self.log('error', 'Error Sending WOL Packet: ' + error)
			}
		})

		self.DATA.wolLast = new Date()

		self.checkFeedbacks()
		self.checkVariables()
	},
}
