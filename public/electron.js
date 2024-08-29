import { app, BrowserWindow, screen } from 'electron'
import isDev from 'electron-is-dev';
import path from 'path'
import { fileURLToPath } from 'url';

// Manejo de __dirname y __filename en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Variable global para la ventana principal
let mainWindow;

const createWindow = () => {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    mainWindow = new BrowserWindow({
        width,
        height,
        title: 'MusicEl',
        titleBarStyle: "hiddenInset", //Funciona solo en MAC
        icon: "./icon.ico" ,
        //frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, // Mejorar la seguridad
            enableRemoteModule: false, // Desactivar el módulo remoto
            nodeIntegration: false // Desactivar integración de Node.js en el renderizador
        }
    });

    //Eliminar barra de menu
    //mainWindow.setMenu(null)

    // Este en desarrollo
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join('./dist/index.html'));
    }
    
}

// Renderiza cuando la aplicación está lista
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Cierre de la aplicación
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
