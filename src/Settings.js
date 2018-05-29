class Settings {
	constructor() {
		this.DEBUG = {
			suppressLoadingLogs: true
		};

		this.SaveData = {
			defaultSaveData: {}
		};

		/**
		 * @deprecated
		 */
		this.GameSparks = {
			key: '',
			secret: '',
			logger: console.log,
			debug: false,
			offlineMode: true
		};

		this.applicationSettings = {
			// REQUIRED
			width: 790,
			height: 1280,
			sharedTicker: true,
			autoStart: false,
			backgroundColor: 0x000000,
			scaleMode: 0, // 0 == linear, 1 == nearest

			// unneeded
			antialias: true,
			roundPixels: false,
			renderScale: 1.0
		};

		this.styleSettings = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		this.GameSettings = {};

		this.Analytics = {
			enabled: false,
			mode: 'FBINSTANT', // options: FBINSTANT or GOOGLE
			tid: '',
			debug: false,
			url: 'https://www.google-analytics.com/collect?' // deprecated
		};

		this.resources = {
			t_black: 'black.png',
			t_white: 'white.png'
		};

		this.Leaderboards = {
			leaderboard_names: [],
			offlineMode: true
		};

		this.audioSettings = {
			globalVolume: 0.15,
			sfxVolume: 1.0, // unused
			musicVolume: 1.0 // unused
		};

		this.flowSettings = {
			// 	mainMenuToken: mainMenu,
			// 	gameToken: game
		};

		this.adverts = {
			placementId: '...',
			enabled: false
		};
	}
}

module.exports = new Settings();
