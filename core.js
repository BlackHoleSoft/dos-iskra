const CORE_DT = 0.1; //delta time 100 ms
const CORE_SCREEN_W = 128;
const CORE_SCREEN_H = 128;

let visibleObjects = [];


var CoreLogo = {

    timer: 0,

    init: () => {
        this.timer = 0;
    },

    render: (g) => {
        if(this.timer < 3){
            g.setColor(1,1,1);
            g.fillRect(0, 0, CORE_SCREEN_W, CORE_SCREEN_H);

            g.setColor(0.8, 0.1, 1);
            g.setFontVector(32);
            g.drawString('DOS', CORE_SCREEN_W/2 - 40, CORE_SCREEN_H/2 - 16);

            for(var i=0; i<this.timer*2; i++){
                g.drawCircle(CORE_SCREEN_W/2 - i*8, CORE_SCREEN_H - 10, i*1+2);
                g.drawCircle(CORE_SCREEN_W/2 + i*8, CORE_SCREEN_H - 10, i*1+2);
            }          

        }
    },

    update: () => {
        if(this.timer < 3){
            this.timer += CORE_DT;
        }
    }
};

















visibleObjects.push(CoreLogo);

function initCore() {

    visibleObjects.forEach(el => {
        el.init();
    });

    //B15.set();// VCC
    //B14.reset(); // GND
    A0.set(); // Backlight On

    var spi = new SPI();
    spi.setup({mosi:B15 /* sda */, sck:B13 /* scl */});
    var g = require("ILI9163").connect(spi, A1 /* DC */, A3 /* CE */, A2 /* RST */, function() {
        g.clear();
        g.setRotation(2);
        g.setColor(0.8, 0.5, 0.9);
        g.fillRect(0, 0, 128, 128);
        g.setColor(1, 0, 0);
        g.drawString("Hello",0,0);
        g.setFontVector(16);
        g.setColor(0,0.5,1);
        g.drawString("Espruino",0,10);

        setInterval(() => {
            coreUpdate();
            coreRender(g);
        }, CORE_DT*1000);
    });
}

function coreUpdate() {
    visibleObjects.forEach(el => {
        el.update();
    });
}

function coreRender(g) {
    g.clear();

    visibleObjects.forEach(el => {
        el.render(g);
    });
}



initCore();


