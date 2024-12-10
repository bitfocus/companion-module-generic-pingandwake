const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')

const UpgradeScripts = require('./src/upgrades')

const configFields = require('./src/configFields')
const api = require('./src/api')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')

class BetrPingAndWakeInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...configFields,
			...api,
			...actions,
			...feedbacks,
			...variables,
			...presets,
		})

		this.INTERVAL = null

		this.DATA = {
			pingAlive: false,
			pingResponseTimeMin: '',
			pingResponseTimeMax: '',
			pingResponseTimeAvg: '',
			pingPacketLoss: '',
			pingLast: '',

			arpLast: '',
			arpSuccess: '',

			wolLast: '',
		}

		this.PING_INTERVAL = null
		this.STOP_PING = false
	}

	async init(config) {
		this.configUpdated(config)
	}

	async configUpdated(config) {
		this.config = config

		this.initActions()
		this.initFeedbacks()
		this.initVariables()
		this.initPresets()

		this.checkFeedbacks()
		this.checkVariables()

		this.updateStatus(InstanceStatus.Ok)

		if (this.config.ip && this.config.ip !== '') {
			if (this.PING_INTERVAL) {
				this.stopPing()
			}

			this.updateStatus(InstanceStatus.Connecting)

			this.STOP_PING = false

			if (this.config.arpLookup == true) {
				this.performARP()
			}

			this.startPing()
		}
	}

	async destroy() {
		//close out any connections
		this.stopPing()

		this.debug('destroy', this.id)
	}
}

runEntrypoint(BetrPingAndWakeInstance, UpgradeScripts)
