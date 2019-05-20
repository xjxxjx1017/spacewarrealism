var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as Phaser from 'phaser-ce';
var Core = /** @class */ (function (_super) {
    __extends(Core, _super);
    function Core() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Core.prototype.create = function () {
        var game = this.game;
        //  Dimensions
        var spriteWidth = 8;
        var spriteHeight = 8;
        //  UI
        var ui;
        var paletteArrow;
        var rightCol = 532;
        //  Drawing Area
        var canvas;
        var canvasBG;
        var canvasGrid;
        var canvasSprite;
        var canvasZoom = 32;
        //  Keys + Mouse
        var keys;
        var isDown = false;
        var isErase = false;
        //  Palette
        var color = 0;
        var palette = 0;
        var pmap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
        var data;
        var colorIndex;
        create();
        function resetData() {
            data = [];
            for (var y = 0; y < spriteHeight; y++) {
                var a = [];
                for (var x = 0; x < spriteWidth; x++) {
                    a.push('.');
                }
                data.push(a);
            }
        }
        function copyToData(src) {
            data = [];
            for (var y = 0; y < src.length; y++) {
                var a = [];
                for (var x = 0; x < src[y].length; x++) {
                    a.push(src[y][x]);
                }
                data.push(a);
            }
        }
        function cloneData() {
            var clone = [];
            for (var y = 0; y < data.length; y++) {
                var a = [];
                for (var x = 0; x < data[y].length; x++) {
                    var v = data[y][x];
                    a.push(v);
                }
                clone.push(a);
            }
            return clone;
        }
        function createUI() {
            ui = game.make.bitmapData(800, 32);
            drawPalette();
            ui.addToWorld();
            game.add.text(12, 9, pmap.join("\t"), {
                font: "14px Courier",
                fill: "#000",
                tabs: 32
            });
            game.add.text(11, 8, pmap.join("\t"), {
                font: "14px Courier",
                fill: "#ffff00",
                tabs: 32
            });
            paletteArrow = game.add.sprite(8, 36, 'arrow');
        }
        function createDrawingArea() {
            canvas = game.make.bitmapData(spriteWidth * canvasZoom, spriteHeight * canvasZoom);
            canvasBG = game.make.bitmapData(canvas.width + 2, canvas.height + 2);
            canvasBG.rect(0, 0, canvasBG.width, canvasBG.height, '#fff');
            canvasBG.rect(1, 1, canvasBG.width - 2, canvasBG.height - 2, '#3f5c67');
            var x = 10;
            var y = 64;
            canvasBG.addToWorld(x, y);
            canvasSprite = canvas.addToWorld(x + 1, y + 1);
            canvasGrid = game.add.sprite(x + 1, y + 1, 'drawingGrid');
            canvasGrid.crop(new Phaser.Rectangle(0, 0, spriteWidth * canvasZoom, spriteHeight * canvasZoom));
        }
        function refresh() {
            //  Update both the Canvas
            canvas.clear();
            for (var y = 0; y < spriteHeight; y++) {
                for (var x = 0; x < spriteWidth; x++) {
                    var i = data[y][x];
                    if (i !== '.' && i !== ' ') {
                        color = game.create.palettes[palette][i];
                        canvas.rect(x * canvasZoom, y * canvasZoom, canvasZoom, canvasZoom, color);
                    }
                }
            }
        }
        function createEventListeners() {
            keys = game.input.keyboard.addKeys({
                'erase': Phaser.Keyboard.X,
                'up': Phaser.Keyboard.UP,
                'down': Phaser.Keyboard.DOWN,
                'left': Phaser.Keyboard.LEFT,
                'right': Phaser.Keyboard.RIGHT,
                'changePalette': Phaser.Keyboard.P,
                'color0': Phaser.Keyboard.ZERO,
                'color1': Phaser.Keyboard.ONE,
                'color2': Phaser.Keyboard.TWO,
                'color3': Phaser.Keyboard.THREE,
                'color4': Phaser.Keyboard.FOUR,
                'color5': Phaser.Keyboard.FIVE,
                'color6': Phaser.Keyboard.SIX,
                'color7': Phaser.Keyboard.SEVEN,
                'color8': Phaser.Keyboard.EIGHT,
                'color9': Phaser.Keyboard.NINE,
                'color10': Phaser.Keyboard.A,
                'color11': Phaser.Keyboard.B,
                'color12': Phaser.Keyboard.C,
                'color13': Phaser.Keyboard.D,
                'color14': Phaser.Keyboard.E,
                'color15': Phaser.Keyboard.F
            });
            keys.erase.onDown.add(cls, this);
            keys.changePalette.onDown.add(changePalette, this);
            for (var i = 0; i < 16; i++) {
                keys['color' + i].onDown.add(setColor, this, 0, i);
            }
            game.input.mouse.capture = true;
            game.input.onDown.add(onDown, this);
            game.input.onUp.add(onUp, this);
            game.input.addMoveCallback(paint, this);
        }
        function cls() {
            resetData();
            refresh();
        }
        function drawPalette() {
            //  Draw the palette to the UI bmd
            ui.clear(0, 0, 32 * 16, 32);
            var x = 0;
            for (var clr in game.create.palettes[palette]) {
                ui.rect(x, 0, 32, 32, game.create.palettes[palette][clr]);
                x += 32;
            }
            ui.copy('uiGrid');
        }
        function changePalette() {
            palette++;
            if (!game.create.palettes[palette])
                palette = 0;
            drawPalette();
            refresh();
        }
        function setColor(i, p) {
            if (p === void 0) { p = undefined; }
            if (typeof p !== 'undefined')
                //  It came from a Keyboard Event, in which case the color index is in p, not i.
                i = p;
            if (i < 0)
                i = 15;
            else if (i >= 16)
                i = 0;
            colorIndex = i;
            color = game.create.palettes[palette][pmap[colorIndex]];
            paletteArrow.x = (i * 32) + 8;
        }
        function create() {
            //   So we can right-click to erase
            document.body.oncontextmenu = function () {
                return false;
            };
            Phaser.Canvas.setUserSelect(game.canvas, 'none');
            Phaser.Canvas.setTouchAction(game.canvas, 'none');
            game.stage.backgroundColor = '#505050';
            createUI();
            createDrawingArea();
            createEventListeners();
            resetData();
            setColor(2);
        }
        function onDown(pointer) {
            if (pointer.y <= 32) {
                setColor(Phaser.Math.snapToFloor(pointer.x, 32) / 32);
            }
            else {
                isDown = true;
                if (pointer.rightButton.isDown) {
                    isErase = true;
                }
                else {
                    isErase = false;
                }
                paint(pointer);
            }
        }
        function onUp() {
            isDown = false;
        }
        function paint(pointer) {
            //  Get the grid loc from the pointer
            var x = Phaser.Math.snapToFloor(pointer.x - canvasSprite.x, canvasZoom) / canvasZoom;
            var y = Phaser.Math.snapToFloor(pointer.y - canvasSprite.y, canvasZoom) / canvasZoom;
            if (x < 0 || x >= spriteWidth || y < 0 || y >= spriteHeight)
                return;
            if (!isDown)
                return;
            if (isErase) {
                data[y][x] = '.';
                canvas.clear(x * canvasZoom, y * canvasZoom, canvasZoom, canvasZoom, color);
            }
            else {
                data[y][x] = pmap[colorIndex];
                canvas.rect(x * canvasZoom, y * canvasZoom, canvasZoom, canvasZoom, color);
            }
        }
    };
    Core.prototype.update = function () {
    };
    return Core;
}(Phaser.State));
export { Core };
//# sourceMappingURL=core.js.map