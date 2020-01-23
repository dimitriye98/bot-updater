import { app, BrowserWindow, screen, Tray, Menu } from "electron";
import * as path from "path";

const Positioner = require("electron-positioner");

import debug = require("electron-debug");
debug({ showDevTools: false });

let mainWindow: Electron.BrowserWindow;
let tray: Electron.Tray;

async function createTray() {
	tray = new Tray("resources/icon.ico");
	const contextMenu = Menu.buildFromTemplate([
		{
			click: () => {
				app.quit();
			},
			label: "Exit",
			type: "normal"
		}
	]);
	tray.setContextMenu(contextMenu);
	tray.on("click", async () => {
		if (mainWindow === null) {
			await createWindow();
		}
	});
}

async function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		frame: false,
		height: 400,
		resizable: false,
		show: false,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
		width: 400
	});

	// Get app window and tray bounds
	const winBounds = mainWindow.getBounds();
	const trayBounds = tray.getBounds();

	const positioner = new Positioner(mainWindow);

	const display = screen.getPrimaryDisplay();
	positioner.move("trayBottomLeft", trayBounds);

	mainWindow.setMenu(null);

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, "index.html"));

	// Emitted when the window is closed.
	mainWindow.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

	mainWindow.once("ready-to-show", mainWindow.show);
}

async function init() {
	await createTray();
	await createWindow();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", init);

// Quit when all windows are closed.
app.on("window-all-closed", (e: Event) => e.preventDefault());

app.on("activate", () => {
	// On OS X it"s common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});

process.on("uncaughtException", (err) => {
	console.log(err);
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
