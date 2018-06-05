/*
    \(・ω・\)
 */

import './styles/app.css';

require('babel-polyfill');

const PIXI = (global.PIXI = require('pixi.js'));
const PIXISND = (global.PIXISND = require('pixi-sound'));
const PIXIPART = (global.PIXIPART = require('./pixi-particles.js'));

require('fbengine').MiscPolyfills;

//require('./engine/FBInstant.js');

const Settings = (global.Settings = require('./Settings.js'));
//const Leaderboards = (global.Leaderboards = require('./engine/gamesparks/FBLeaderboards.js'));
//const AdAPI = (global.AdAPI = require('fbengine').Adverts);
//const SaveData = (global.SaveData = require('./engine/SaveData.js'));
const AudioAPI = (global.AudioAPI = new (require('fbengine')).Audio());
const AssetLoader = (global.AssetLoader = require('fbengine').AssetLoader);
//const Analytics = (global.Analytics = require('./engine/Analytics.js'));
const Easing = (global.Easing = new (require('fbengine')).Easing());
const Tokens = (global.Tokens = []);

PIXI.settings.SCALE_MODE = Settings.applicationSettings.scaleMode;
const Application = (global.Application = new PIXI.Application(Settings.applicationSettings));
const EventHandler = (global.EventHandler = new (require('fbengine')).EventHandler(
	Application.ticker
));
Application.renderer.backgroundColor = Settings.applicationSettings.backgroundColor;
document.body.appendChild(Application.view);
SetRendererProperties(Application.renderer.view);
global.__CACHEDCSSSTYLE = Application.view.getAttribute('style');

let GameObject = require('fbengine').GameObject;
let testGameobject = new GameObject(null, {});

let resize = function() {
	let scale = { x: 1, y: 1 };
	scale.x = (window.innerWidth - 10) / Application.view.width;
	scale.y = (window.innerHeight - 10) / Application.view.height;

	if (scale.x < 1 || scale.y < 1) {
		scale = '1, 1';
	} else if (scale.x < scale.y) {
		scale = scale.x + ', ' + scale.x;
	} else {
		scale = scale.y + ', ' + scale.y;
	}

	Application.view.setAttribute(
		'style',
		' ' +
			'-ms-transform: scale(' +
			scale +
			'); -webkit-transform: scale3d(' +
			scale +
			', 1); -moz-transform: scale(' +
			scale +
			'); -o-transform: scale(' +
			scale +
			'); transform: scale(' +
			scale +
			'); max-width: 100%;max-height: 100%;'
	);
};
window.addEventListener('resize', resize);
resize();

Application.ticker.add(delta => {
	'use strict';
	let deltaTime = Application.ticker.elapsedMS;

	if (global.flowController && flowController.currentAction) flowController.currentAction();

	for (let i = 0; i < Tokens.length; i++) {
		if (!Tokens[i]._queuedForDestruction && Tokens[i].startStep) {
			Tokens[i].startStep(deltaTime);
		}
	}
	for (let i = 0; i < Tokens.length; i++) {
		if (!Tokens[i]._queuedForDestruction && Tokens[i].endStep) {
			Tokens[i].endStep(deltaTime);
		}
	}
	for (let i = Tokens.length - 1; i >= 0; i--) {
		if (Tokens[i]._queuedForDestruction) {
			Tokens[i] = null;
			Tokens.splice(i, 1);
		}
	}
});

if (global.module && module.hot) {
	module.hot.accept();
}
