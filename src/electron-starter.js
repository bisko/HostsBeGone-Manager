const electron = require( 'electron' );
const Tray = electron.Tray;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let trayIcon = null;

function createWindow() {
	console.log( mainWindow );
	if ( mainWindow === null ) {
		// Create the browser window.
		mainWindow = new BrowserWindow( {
			width: 800,
			height: 600,
			webPreferences: {
				nodeIntegration: false,
				preload: __dirname + '/electron-preload.js'
			},
		} );

		// and load the index.html of the app.
		mainWindow.loadURL( 'http://localhost:3006' );

		// Open the DevTools.
		// mainWindow.webContents.openDevTools()

		// Emitted when the window is closed.
		mainWindow.on( 'closed', function() {
			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			mainWindow = null
		} )
	}
}

const initApp = () => {
	createWindow();
	initTray();

	ipcMain.on( 'static-entries-status', ( event, arg ) => {
		console.log( event, arg );
	} );

	ipcMain.on( 'server-running-state', ( event, arg ) => {
		if ( arg === false ) {
			// server is down - update the icon to full-red
			trayIcon.setImage( __dirname + '/../public/red@2x.png' );
			return;
		}

		trayIcon.setImage( __dirname + '/../public/orange@2x.png' );
	} );

	ipcMain.on( 'server-static-entries-state', ( event, arg ) => {
		if ( arg === false ) {
			// server is down - update the icon to full-red
			trayIcon.setImage( __dirname + '/../public/orange@2x.png' );
			return;
		}

		trayIcon.setImage( __dirname + '/../public/green@2x.png' );
	} );

	ipcMain.on( 'sonline-status-changed', ( event, status ) => {
		if ( status === 'online' ) {
			// TODO implement some logic here
		}
		else if ( status === 'offline' ) {
			// TODO implement some logic here
		}
	} );
};

const initTray = () => {
	trayIcon = new Tray( __dirname + '/../public/red@2x.png' );
	trayIcon.setTitle( 'Hosts Be Gone!' );

	trayIcon.on( 'click', ( event ) => {
		// disable/enable the static entries
		mainWindow.webContents.send( 'toggle-static-entries', 1 );
	} );
	trayIcon.on( 'right-click', ( event ) => {
		// show main window
		createWindow();
	} );
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on( 'ready', initApp );

// Quit when all windows are closed.
app.on( 'window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if ( process.platform !== 'darwin' ) {
		app.quit()
	}
} );

app.on( 'activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if ( mainWindow === null ) {
		createWindow()
	}
} );

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
