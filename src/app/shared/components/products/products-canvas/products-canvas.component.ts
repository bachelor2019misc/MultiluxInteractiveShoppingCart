import { Component, Input, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, OnInit, ViewChildren, QueryList, ContentChildren, EventEmitter, Output } from '@angular/core'
import { fromEvent } from 'rxjs';
import { RestService } from '../../../services/rest/rest.service';
import { Globals } from '../../../utils/globals';
import { Router } from '@angular/router';
import { RoomDot } from '../../../models/roomdot.model';
import { Product } from '../../../models/product.model';

@Component({
    selector: 'products-canvas',
    templateUrl: './products-canvas.component.html',
    styleUrls: ['./products-canvas.component.css']
})
export class ProductsCanvasComponent implements AfterViewInit {
    @ViewChild('canvas') public canvas: ElementRef;

    @Input() public width = 1400;
    @Input() public height = 700;
    @Output() changes = new EventEmitter<string>();
    public dots: RoomDot[] = [];
    public products: Product[] = [];

    readonly maxWidth: number = this.width;
    readonly maxHeight: number = this.height;

    private cx: CanvasRenderingContext2D;
    private roomImage: HTMLImageElement;

    constructor(public rest: RestService, private router: Router, public global: Globals) { }

    public ngAfterViewInit() {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');
        this.cx.imageSmoothingEnabled = false;

        canvasEl.width = this.width;
        canvasEl.height = this.height;

        this.roomImage = new Image();
        this.roomImage.src = this.global.currentSelectedRoom.image;

        this.roomImage.onload = () => {
            this.resize();
            this.draw();
            window.addEventListener('resize', () => this.resize());
        };
        this.captureEvents(canvasEl);
    }

    // taken from: https://medium.com/@tarik.nzl/creating-a-canvas-component-with-free-hand-drawing-with-rxjs-and-angular-61279f577415
    private captureEvents(canvasEl: HTMLCanvasElement) {
        var hoveringDot: RoomDot;
        var selectedDot: RoomDot;
        // this will capture all mousedown events from the canvas element
        fromEvent(canvasEl, 'mousemove').subscribe((res: MouseEvent) => {
            const rect = canvasEl.getBoundingClientRect();

            const currentPos = {
                x: res.clientX - rect.left,
                y: res.clientY - rect.top
            };

            var i = 0;
            while (i < this.dots.length) {
                let room = document.getElementsByClassName("roomText")[i] as HTMLElement;
                if (this.colideWithCircle(currentPos.x, currentPos.y, this.dots[i])) {
                    document.body.style.cursor = 'pointer';
                    hoveringDot = this.dots[i];
                    if (room === undefined) {
                        // Do nothing
                    } else {
                        room.classList.add("hover");
                    }
                    i = this.dots.length;
                } else {
                    hoveringDot = undefined;
                    if (room === undefined) {
                        // Do nothing
                    } else {
                        room.classList.remove("hover");
                    }
                    document.body.style.cursor = 'default';
                    i++;
                }
                if (this.global.editMode) {
                    if (selectedDot === undefined) {
                        // Do nothing
                    } else {
                        selectedDot.xCoordinates = currentPos.x * (this.maxWidth / this.width);
                        selectedDot.yCoordinates = currentPos.y * (this.maxHeight / this.height);
                        this.draw();
                    }
                }
            }
        });

        fromEvent(canvasEl, 'mousedown').subscribe((res: MouseEvent) => {
            if (hoveringDot === undefined) {
                // Do nothing
            } else {
                selectedDot = hoveringDot;
                console.log(selectedDot);
                if (this.global.editMode) {
                    // Do nothing
                } else {
                    document.body.style.cursor = 'default';
                    for (let i = 0; i < this.dots.length; i++) {
                        if (this.products[i].idProduct === +selectedDot.idProduct) {
                            this.global.currentSelectedProduct = this.products[i];
                        }
                    }
                    this.router.navigate(['/subproducts', this.global.currentSelectedVessel.idVessel, selectedDot.idRoom, selectedDot.idProduct]);
                }
            }
        });

        fromEvent(canvasEl, 'mouseup').subscribe((res: MouseEvent) => {
            if (selectedDot === undefined) {
                //Do nothing
            } else {
                this.updateDotLocation(selectedDot);
                selectedDot = undefined;
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

    public resize() {
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

    public draw() {
        this.cx.clearRect(0, 0, this.width, this.height);
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

    private updateDotLocation(dot: RoomDot) {
        console.log(dot);
        this.rest.httpPut("roomdot/" + dot.idRoomDot, dot).subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log("Error occured: ", err);
            }
        );
    }

    deleteRoomDot(product: Product) {
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].idProduct === product.idProduct) {
                this.rest.httpDelete("roomdot/" + this.dots[i].idRoomDot).subscribe(
                    res => {
                        console.log(res);
                        this.update();
                    },
                    err => {
                        console.log("Error occured: ", err);
                    }
                );
            }
        }
    }

    update() {
        this.changes.emit();
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
