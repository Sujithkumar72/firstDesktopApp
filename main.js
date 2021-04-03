const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

app.on("ready", function(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname+"index.html"),
        protocol: "file",
        slashes:true
    }));
    mainWindow.on("closed", function(){
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

//create menu template

const mainMenuTemplate =[
    {label:"File",
    submenu:[
        {
            label:"Add item",
            click(){
                createAddWindow();
            }
        
        },
        {label:"clear items"},
        {label:"Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q", 
        click(){
            app.quit();
        }}
    ]
    }
];


function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add Item"
    });
    addWindow.loadURL(url.format({
        pathname:path.join(__dirname,"addWindow.html"),
        protocol: "file",
        slashes:true    
    }));
    addWindow.on("closed", function(){
        addWindow =null;
    });
}