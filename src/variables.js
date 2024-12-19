module.exports = {
	initVariables() {
		let variables = [
			//Host Variables
			{ name: 'Host - IP Address', variableId: 'host_ip' },
			{ name: 'Host - MAC Address', variableId: 'host_mac' },

			//Ping Variables
			{ name: 'Ping - Alive State', variableId: 'ping_alive' },
			{ name: 'Ping - Response Time (Min)', variableId: 'ping_response_time_min' },
			{ name: 'Ping - Response Time (Max)', variableId: 'ping_response_time_max' },
			{ name: 'Ping - Response Time (Avg)', variableId: 'ping_response_time_avg' },
			{ name: 'Ping - Packet Loss %', variableId: 'ping_packet_loss' },
			{ name: 'Ping - Last Ping', variableId: 'ping_last' },

			//ARP Variables
			{ name: 'ARP - Last ARP Success', variableId: 'arp_success' },
			{ name: 'ARP - Last Performed', variableId: 'arp_last' },

			//WOL Variables
			{ name: 'WOL - UDP Port', variableId: 'wol_port' },
			{ name: 'WOL - Broadcast Address', variableId: 'wol_broadcast' },
			{ name: 'WOL - Resend Attempts', variableId: 'wol_resend' },
			{ name: 'WOL - Resend Interval', variableId: 'wol_interval' },
			{ name: 'WOL - Last Sent', variableId: 'wol_last' },

			//WOL Enabled/Disabled
			{ name: 'WOL - Enabled', variableId: 'wol_enabled' },
		]

		this.setVariableDefinitions(variables)
	},

	checkVariables() {
		try {
			let variableObj = {}

			//Host Variables
			variableObj['host_ip'] = this.config.ip
			variableObj['host_mac'] = this.config.mac

			//Ping Variables
			variableObj['ping_alive'] = this.DATA.pingAlive ? 'True' : 'False'
			variableObj['ping_response_time_min'] = this.DATA.pingResponseTimeMin
			variableObj['ping_response_time_max'] = this.DATA.pingResponseTimeMax
			variableObj['ping_response_time_avg'] = this.DATA.pingResponseTimeAvg
			variableObj['ping_packet_loss'] = this.DATA.pingPacketLoss
			variableObj['ping_last'] = this.DATA.pingLast

			//ARP Variables
			variableObj['arp_last'] = this.DATA.arpLast
			variableObj['arp_success'] = this.DATA.arpSuccess ? 'True' : 'False'

			//WOL Variables
			variableObj['wol_port'] = this.config.wolPort
			variableObj['wol_broadcast'] = this.config.wolBroadcast
			variableObj['wol_resend'] = this.config.wolResend
			variableObj['wol_interval'] = this.config.wolInterval
			variableObj['wol_last'] = this.DATA.wolLast

			//WOL Enabled/Disabled
			variableObj['wol_enabled'] = this.WOL_ENABLED ? 'True' : 'False'

			this.setVariableValues(variableObj)
		} catch (error) {
			//do something with that error
			if (this.config.verbose) {
				this.log('debug', 'Error Updating Variables: ' + error)
			}
		}
	},
}
