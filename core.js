const CORE_DT = 0.3; //delta time 300 ms
const CORE_SCREEN_W = 128;
const CORE_SCREEN_H = 128;
const CORE_V = 'v0.1.1';

let procs = ['MAIN'];
let g = null;
let currentProc = 'MAIN';

//SETTINGS
//setTime(new Date('2019-05-26T20:52').getTime()/1000);

















function mainScreen() {    
    let menu = ['Files', 'Settings', 'Programs'];
    let selected = 0;

    if(currentProc === 'MAIN') {
        g.setColor(1, 1, 1);
        g.fillRect(0, 0, CORE_SCREEN_W, CORE_SCREEN_H);
        g.setColor(0.7, 0, 1);
        g.drawString(new Date(Date.now())
            .toISOString().replace('T', ' ').substring(0, 16), 3, 2);
        g.drawLine(0, 10, CORE_SCREEN_W, 10);
        g.drawString('DOS ' + CORE_V, CORE_SCREEN_W-42, CORE_SCREEN_H-10);

        for(var i=0; i<menu.length; i++) {
            if(i == selected){
                g.setColor(0.7, 0, 1);
                g.fillRect(0, 10*i+10, CORE_SCREEN_W, 10*i+20);
                g.setColor(1,1,1);                
            } else {
                g.setColor(0.7, 0, 1);                
            }
            g.drawString(menu[i], 4, 10*i+12);
            g.drawLine(0, 10*i+20, CORE_SCREEN_W, 10*i+20);
        }
    }
}


function initCore() {

    

    //B15.set();// VCC
    //B14.reset(); // GND
    A0.set(); // Backlight On

    var spi = new SPI();
    spi.setup({mosi:B15 /* sda */, sck:B13 /* scl */});
    g = require("ILI9163").connect(spi, A1 /* DC */, A3 /* CE */, A2 /* RST */, function() {
        g.clear();
        g.setRotation(1);
        g.setColor(0, 0, 0);
        g.fillRect(0, 0, 128, 128);
        g.setColor(0.5, 0.5, 0.5);
        g.drawString(CORE_V,0,0);        

        currentProc = 'MAIN';
        mainScreen();
    });
}

function coreUpdate() {
    procs.forEach(el => {
        el.update();
    });
}





initCore();


