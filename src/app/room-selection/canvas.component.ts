import { Component, Input, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, OnInit } from '@angular/core'
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { logging } from 'protractor';
import { Circle } from './circle';

@Component({
    selector: 'app-canvas',
    template: '<canvas #canvas></canvas>',
    styles: ['canvas { border: 1px solid #000;}']
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas') public canvas: ElementRef;

    @Input() public width = 1400;
    @Input() public height = 700;

    private cx: CanvasRenderingContext2D;
    private vesselImage: HTMLImageElement;
    private circles: Array<Circle> = new Array();

    public ngAfterViewInit() {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');
        this.cx.imageSmoothingEnabled = false;

        canvasEl.width = this.width;
        canvasEl.height = this.height;

        this.vesselImage = new Image();
        this.vesselImage.src = "assets/img/boat.jpg";

        this.vesselImage.onload = () => {
            this.resize();

            this.circles;
            this.circles.push({ x: 150, y: 100, radius: 10 });
            this.circles.push({ x: 200, y: 20, radius: 10 });
            this.circles.push({ x: 290, y: 120, radius: 10 });
            this.circles.push({ x: 180, y: 300, radius: 10 });
            this.circles.push({ x: 80, y: 220, radius: 10 });

            this.draw();
            window.addEventListener('resize', () => this.resize());
        };
        this.captureEvents(canvasEl);
    }

    // taken from: https://medium.com/@tarik.nzl/creating-a-canvas-component-with-free-hand-drawing-with-rxjs-and-angular-61279f577415
    private captureEvents(canvasEl: HTMLCanvasElement) {
        var circle: Circle;
        // this will capture all mousedown events from the canvas element
        fromEvent(canvasEl, 'mousedown')
            .pipe(
                switchMap((e) => {
                    circle = undefined;
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

                if (circle === undefined) {
                    var i = 0;
                    while (i < this.circles.length) {
                        if (this.colideWithCircle(currentPos.x, currentPos.y, this.circles[i])) {
                            circle = this.circles[i];
                            i = this.circles.length;
                            console.log(circle);
                        } else {
                            i++;
                        }
                    }
                } else {
                    circle.x = currentPos.x;
                    circle.y = currentPos.y;
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
            while (i < this.circles.length) {
                if (this.colideWithCircle(currentPos.x, currentPos.y, this.circles[i])) {
                    document.body.style.cursor = 'pointer';
                    i = this.circles.length;
                } else {
                    document.body.style.cursor = 'default';
                    i++;
                }
            }
        });
    }

    private colideWithCircle(x, y, circle: Circle) {
        if (checkCollision(x, y, 10, 10, circle.x, circle.y, 20, 20)) {
            return true;
        } else {
            return false;
        }
    }

    private resize() {
        if (window.innerWidth < 1400) {
            this.cx.canvas.width = window.innerWidth;
            this.cx.canvas.height = window.innerWidth / 2;
            this.width = window.innerWidth;
            this.height = window.innerWidth / 2;
            this.draw();
        } else if (this.cx.canvas.width < 1400) {
            this.cx.canvas.width = 1400;
            this.cx.canvas.height = 700
            this.width = 1400;
            this.height = 700;
            this.draw();
        }
    }

    private draw() {
        this.cx.drawImage(this.vesselImage, 0, 0, this.width, this.height);
        for (var i = 0; i < this.circles.length; i++) {
            this.drawCircle(this.circles[i]);
        }
    }

    private drawCircle(circle: Circle) {
        this.cx.beginPath();
        this.cx.arc(circle.x, circle.y, 10, 0, 2 * Math.PI);
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
