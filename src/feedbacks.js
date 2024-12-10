const { combineRgb } = require('@companion-module/base')

module.exports = {
	initFeedbacks() {
		let self = this
		const feedbacks = {}

		const foregroundColorWhite = combineRgb(255, 255, 255) // White
		const backgroundColorRed = combineRgb(255, 0, 0) // Red

		feedbacks['aliveState'] = {
			type: 'boolean',
			name: 'Show Host Alive State On Button',
			description: 'Indicate if Host is Alive or Not Alive',
			defaultStyle: {
				color: foregroundColorWhite,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
					type: 'dropdown',
					label: 'Indicate in X Status',
					id: 'state',
					default: 0,
					choices: [
						{ id: false, label: 'Not Alive' },
						{ id: true, label: 'Alive' },
					],
				},
			],
			callback: function (feedback) {
				let opt = feedback.options

				if (self.DATA.pingAlive == opt.state) {
					return true
				}

				return false
			},
		}

		self.setFeedbackDefinitions(feedbacks)
	},
}
