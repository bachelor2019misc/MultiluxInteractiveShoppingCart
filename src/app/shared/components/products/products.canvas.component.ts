import { Component, Input, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, OnInit } from '@angular/core'
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { logging } from 'protractor';
import { RoomDot } from '../../utils/entities/roomdot.entity';
import { element } from '@angular/core/src/render3';
import { Room } from '../../utils/entities/room.entity';
import { Globals } from '../../utils/globals';

@Component({
    selector: 'products-canvas',
    template: '<canvas #canvas></canvas>',
    styles: ['canvas { border: 1px solid #000;}']
})
export class ProductsCanvasComponent implements AfterViewInit {
    @ViewChild('canvas') public canvas: ElementRef;

    @Input() public width = 1400;
    @Input() public height = 700;

    readonly maxWidth:number = this.width;
    readonly maxHeight:number = this.height;

    private cx: CanvasRenderingContext2D;
    private roomImage: HTMLImageElement;
    private dots: Array<RoomDot> = new Array();

    public ngAfterViewInit() {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');
        this.cx.imageSmoothingEnabled = false;

        canvasEl.width = this.width;
        canvasEl.height = this.height;

        this.roomImage = new Image();

        this.roomImage.onload = () => {
            this.resize();

            this.draw();
            window.addEventListener('resize', () => this.resize());
        };
        this.captureEvents(canvasEl);
    }

    // taken from: https://medium.com/@tarik.nzl/creating-a-canvas-component-with-free-hand-drawing-with-rxjs-and-angular-61279f577415
    private captureEvents(canvasEl: HTMLCanvasElement) {
        var dot: RoomDot;
        // this will capture all mousedown events from the canvas element
        fromEvent(canvasEl, 'mousedown')
            .pipe(
                switchMap((e) => {
                    dot = undefined;
                    // after a mouse down, we'll record all mouse moves
                    return fromEvent(canvasEl, 'mousemove')
                        .pipe(
                            // we'll stop (and unsubscribe) once the user releases the mouse
                            // this will trigger a 'mouseup' event    
                            takeUntil(fromEvent(canvasEl, 'mouseup')),
                            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
                            //takeUntil(fromEvent(canvasEl, 'mouseleave')),
                            // pairwise lets us get the previous value to draw a line from
                            // the previous point to the current point    
                            pairwise()
                        )
                })
            )
            .subscribe((res: [MouseEvent, MouseEvent]) => {
                const rect = canvasEl.getBoundingClientRect();

                // previous and current position with the offset
                const prevPos = {
                    x: res[0].clientX - rect.left,
                    y: res[0].clientY - rect.top
                };

                const currentPos = {
                    x: res[1].clientX - rect.left,
                    y: res[1].clientY - rect.top
                };

                console.log(currentPos);

                if (dot === undefined) {
                    var i = 0;
                    while (i < this.dots.length) {
                        if (this.colideWithCircle(currentPos.x, currentPos.y, this.dots[i])) {
                            dot = this.dots[i];
                            i = this.dots.length;
                            console.log(dot);
                        } else {
                            i++;
                        }
                    }
                } else {
                    dot.xCoordinates = currentPos.x * (this.maxWidth/this.width);
                    dot.yCoordinates = currentPos.y * (this.maxHeight/this.height);
                    this.draw();
                }
            });
        fromEvent(canvasEl, 'mousemove').subscribe((res: MouseEvent) => {
            const rect = canvasEl.getBoundingClientRect();

            const currentPos = {
                x: res.clientX - rect.left,
                y: res.clientY - rect.top
            };

            var i = 0;
            while (i < this.dots.length) {
                if (this.colideWithCircle(currentPos.x, currentPos.y, this.dots[i])) {
                    document.body.style.cursor = 'pointer';
                    i = this.dots.length;
                } else {
                    document.body.style.cursor = 'default';
                    i++;
                }
            }
        });
    }

    private colideWithCircle(x, y, dot: RoomDot) {
        if (checkCollision(x, y, 10, 10, dot.xCoordinates * (this.width / this.maxWidth), dot.yCoordinates * (this.height / this.maxHeight), 20, 20)) {
            return true;
        } else {
            return false;
        }
    }

    private resize() {
        if (window.innerWidth < this.maxWidth) {
            this.cx.canvas.width = window.innerWidth;
            this.cx.canvas.height = window.innerWidth / 2;
            this.width = window.innerWidth;
            this.height = window.innerWidth / 2;
            this.draw();
        } else if (this.cx.canvas.width < this.maxWidth) {
            this.cx.canvas.width = this.maxWidth;
            this.cx.canvas.height = this.maxHeight
            this.width = this.maxWidth;
            this.height = this.maxHeight;
            this.draw();
        }
    }

    private draw() {
        this.cx.drawImage(this.roomImage, 0, 0, this.width, this.height);
        for (var i = 0; i < this.dots.length; i++) {
            this.drawCircle(this.dots[i]);
        }
    }

    private drawCircle(dot: RoomDot) {
        this.cx.beginPath();
        this.cx.arc(dot.xCoordinates * (this.width / this.maxWidth), dot.yCoordinates * (this.height / this.maxHeight), 10, 0, 2 * Math.PI);
        this.cx.closePath();
        var tempColor = "rgb(255,0,0)";
        this.cx.fillStyle = tempColor;
        this.cx.fill();
        this.cx.stroke();
    }
}

//Check collision
function checkCollision(targetX, targetY, targetW, targetH, coliderX, coliderY, coliderW, coliderH) {
    var result = false;
    if ((targetY < coliderY + coliderH) && (coliderY < targetY + targetH)
        && (targetX < coliderX + coliderW) && (coliderX < targetX + targetW)) {
        result = true;
    }
    return result;
}
