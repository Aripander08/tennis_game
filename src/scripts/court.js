const CONSTANTS = {
    WHITE: "#F5F5F5",
    BLUE: "#3C638E",
    GREEN: "#6C935C",
    SHADOW: "rgba(23, 23, 23, 0.75)",
    FARLEFTX: 0.2625,
    NEARLEFTX: 0.2375,
    FARRIGHTX: 0.7375,
    NEARRIGHTX: 0.7625,
    FARY: 0.125,
    NEARY: 0.625,
    SERVEMIDX: 0.5,
    SERVEMIDY: 0.5,
    SERVEFARLEFTX: 0.25625,
    SERVENEARLEFTX: 0.24375,
    SERVEFARRIGHTX: 0.74375,
    SERVENEARRIGHTX: 0.75625,
    SERVEFARY: 0.333,
    SERVENEARY: 0.667
}

export default class Court {
    constructor (ctx) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.farCourtHalf = {
            farLeftX: this.canvas.width * CONSTANTS.FARLEFTX,
            farRightX: this.canvas.width * CONSTANTS.FARRIGHTX, 
            farY: this.canvas.width * CONSTANTS.FARY
        };
        this.nearCourtHalf = {
            nearLeftX: this.canvas.width * CONSTANTS.NEARLEFTX,
            nearRightX: this.canvas.width * CONSTANTS.NEARRIGHTX, 
            nearY: this.canvas.width * CONSTANTS.NEARY
        };
        this.farDeuce = {
            midX: this.canvas.width * CONSTANTS.SERVEMIDX,
            midY: this.canvas.height * CONSTANTS.SERVEMIDY,
            leftX: this.canvas.width * CONSTANTS.SERVEFARLEFTX, 
            farY: this.canvas.height * CONSTANTS.SERVEFARY
        };
        this.farAd = {
            midX: this.canvas.width * CONSTANTS.SERVEMIDX,
            midY: this.canvas.height * CONSTANTS.SERVEMIDY,
            rightX: this.canvas.width * CONSTANTS.SERVEFARRIGHTX, 
            farY: this.canvas.height * CONSTANTS.SERVEFARY
        };
        this.nearDeuce = {
            midX: this.canvas.width * CONSTANTS.SERVEMIDX,
            midY: this.canvas.height * CONSTANTS.SERVEMIDY,
            rightX: this.canvas.width * CONSTANTS.SERVENEARRIGHTX, 
            nearY: this.canvas.height * CONSTANTS.SERVENEARY
        };
        this.nearAd = {
            midX: this.canvas.width * CONSTANTS.SERVEMIDX,
            midY: this.canvas.height * CONSTANTS.SERVEMIDY,
            leftX: this.canvas.width * CONSTANTS.SERVENEARLEFTX, 
            nearY: this.canvas.height * CONSTANTS.SERVENEARY
        };
    };

    draw(ctx) {
        // outer court
        ctx.fillStyle = CONSTANTS.GREEN;
        ctx.beginPath();
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // outer court shadow
        ctx.fillStyle = CONSTANTS.SHADOW;
        ctx.beginPath();
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height / 20);
        // inner court & court lines
        ctx.fillStyle = CONSTANTS.BLUE;
        ctx.strokeStyle = CONSTANTS.WHITE;
        ctx.lineWidth = 3;
        ctx.beginPath();
        // upper-left vertex
        ctx.moveTo(
            this.farCourtHalf.farLeftX, this.farCourtHalf.farY
        ); 
        // upper-right vertx
        ctx.lineTo(        
            this.farCourtHalf.farRightX, this.farCourtHalf.farY
        );
        ctx.stroke();
        // lower-right vertx
        ctx.lineTo(
            this.nearCourtHalf.nearRightX, this.nearCourtHalf.nearY            
        ); 
        ctx.stroke();
        // lower-left vertex
        ctx.lineTo(
            this.nearCourtHalf.nearLeftX, this.nearCourtHalf.nearY     
        );
        ctx.stroke();
        ctx.fill();
        // upper-left vertex
        ctx.lineTo(
            this.farCourtHalf.farLeftX, this.farCourtHalf.farY
        );
        ctx.stroke();

        // service middle lines
        ctx.beginPath();
        ctx.moveTo(
            this.farDeuce.midX, this.farDeuce.farY
        );
        ctx.lineTo(
            this.farDeuce.midX, this.nearDeuce.nearY
        );
        ctx.stroke();

        // far service line
        ctx.beginPath();
        ctx.moveTo(
            this.farDeuce.leftX, this.farDeuce.farY
        );
        ctx.lineTo(
            this.farAd.rightX, this.farAd.farY
        );
        ctx.stroke();

        // near service line
        ctx.beginPath();
        ctx.moveTo(
            this.nearAd.leftX, this.nearAd.nearY
        );
        ctx.lineTo(
            this.nearDeuce.rightX, this.nearDeuce.nearY
        );
        ctx.stroke();
        
    }
}