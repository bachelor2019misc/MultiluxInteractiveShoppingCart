import { Component, Input, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, OnInit, ViewChildren, QueryList, ContentChildren } from '@angular/core'
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { logging } from 'protractor';
import { BlueprintDot } from '../../../models/blueprintdot.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { element } from '@angular/core/src/render3';
import { RestService } from '../../../services/rest/rest.service';
import { Vessel } from '../../../models/vessel.model';
import { Globals } from '../../../utils/globals';
import { Blueprint } from '../../../models/blueprint.model';
import { Room } from '../../../models/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsComponent } from '../rooms.component';
import { EditBlueprintComponent } from './edit-blueprint/edit-blueprint.component';
import { AddRoomComponent } from '../add-room/add-room.component';
import { EditRoomComponent } from '../edit-room/edit-room.component'; //edit room

@Component({
    selector: 'rooms-canvas',
    templateUrl: './rooms-canvas.component.html',
    styleUrls: ['./rooms-canvas.component.css']
})
export class RoomsCanvasComponent implements AfterViewInit {
    @ViewChild('canvas') public canvas: ElementRef;

    @Input() public width = 1400;
    @Input() public height = 700;
    public dots: BlueprintDot[] = [];
    public viewDots: BlueprintDot[] = [];
    public rooms: Room[] = [];


    blueprint: Blueprint;
    EditBlueprintNameDialogRef: MatDialogRef<EditBlueprintComponent>;
    readonly maxWidth: number = this.width;
    readonly maxHeight: number = this.height;

    private cx: CanvasRenderingContext2D;
    private blueprintImage: HTMLImageElement;

    AddRoomNameDialogRef: MatDialogRef<AddRoomComponent>;
    constructor(public rest: RestService, private router: Router, public global: Globals, private dialog: MatDialog) { }
    //edit room
    EditRoomNameDialogRef: MatDialogRef<EditRoomComponent>;


    public ngAfterViewInit() {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d');
        this.cx.imageSmoothingEnabled = false;

        canvasEl.width = this.width;
        canvasEl.height = this.height;

        this.blueprintImage = new Image();

        this.getBlueprint();

        this.blueprintImage.onload = () => {
            this.resize();
            this.draw();
            window.addEventListener('resize', () => this.resize());
        };
        this.captureEvents(canvasEl);
    }

    getBlueprint() {
        this.rest.httpGet('blueprint/' + this.global.currentSelectedVessel.idBlueprint).subscribe(
            res => {
                console.log(res);
                this.blueprint = res;
                this.blueprintImage.src = this.blueprint.image;
                this.global.currentSelectedBlueprint = this.blueprint;
            },
            err => {
                console.log("Error occured: ", err);
            }
        );
    }

    openEditBlueprint() {
        this.EditBlueprintNameDialogRef = this.dialog.open(EditBlueprintComponent, {
            height: "400px",
            width: "700px",
            data: {
            }
        });
        this.EditBlueprintNameDialogRef.afterClosed().subscribe((value) => {
            if (value) {
                this.getBlueprint()
            }
        });
    }

    openAddRoom(file?) {
        this.AddRoomNameDialogRef = this.dialog.open(AddRoomComponent, {
            height: "600px",
            width: "700px",
            data: {

            }
        });

    }
    //edit room
    openEditRoom(room: Room) {
        this.EditRoomNameDialogRef = this.dialog.open(EditRoomComponent, {
            height: "400px",
            width: "700px",
            data: {
                room: room
            }
        });

    }


    // taken from: https://medium.com/@tarik.nzl/creating-a-canvas-component-with-free-hand-drawing-with-rxjs-and-angular-61279f577415
    private captureEvents(canvasEl: HTMLCanvasElement) {
        var hoveringDot: BlueprintDot;
        var selectedDot: BlueprintDot;
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
                        if (this.rooms[i].idRoom === selectedDot.idRoom) {
                            this.global.currentSelectedRoom = this.rooms[i];
                        }
                    }
                    this.router.navigate(['/products', selectedDot.idVessel, selectedDot.idRoom]);
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

    private colideWithCircle(x, y, dot: BlueprintDot) {
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
        console.log("draw");
        this.cx.clearRect(0, 0, this.width, this.height);
        this.cx.drawImage(this.blueprintImage, 0, 0, this.width, this.height);
        console.log("draw viewDots: ", this.viewDots);
        for (var i = 0; i < this.viewDots.length; i++) {
            this.drawCircle(this.viewDots[i]);
        }
    }

    private drawCircle(dot: BlueprintDot) {
        this.cx.beginPath();
        this.cx.arc(dot.xCoordinates * (this.width / this.maxWidth), dot.yCoordinates * (this.height / this.maxHeight), 10, 0, 2 * Math.PI);
        this.cx.closePath();
        var tempColor = "rgb(255,0,0)";
        this.cx.fillStyle = tempColor;
        this.cx.fill();
        this.cx.stroke();
    }

    private updateDotLocation(dot: BlueprintDot) {
        console.log(dot);
        this.rest.httpPut("blueprintdot/" + dot.idBlueprintDot, dot).subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log("Error occured: ", err);
            }
        );
    }

    showRoom(room: Room) {
        room.hidden = false;
        this.rest.httpPut('room/' + room.idRoom, room).subscribe(
            res => {
                console.log(res);
                this.resetViewDots();
            },
            err => {
                console.log("Error occured: ", err);
                room.hidden = true;
            }
        );
    }

    hideRoom(room: Room) {
        room.hidden = true;
        this.rest.httpPut('room/' + room.idRoom, room).subscribe(
            res => {
                console.log(res);
                this.resetViewDots();
            },
            err => {
                console.log("Error occured: ", err);
                room.hidden = false;
            }
        );
    }

    setDotsAndRooms(dots: BlueprintDot[], rooms: Room[]) {
        this.dots = dots;
        this.rooms = rooms;
        for (let id = 0; id < dots.length; id++) {
            for (let ir = 0; ir < rooms.length; ir++) {
                if ((rooms[ir].idRoom === dots[id].idRoom) && (rooms[ir].hidden === false)) {
                    this.viewDots.push(dots[id]);
                }
            }
        }
    }

    private resetViewDots() {
        this.viewDots = [];
        for (let id = 0; id < this.dots.length; id++) {
            for (let ir = 0; ir < this.rooms.length; ir++) {
                if ((this.rooms[ir].idRoom === this.dots[id].idRoom)) {
                    if (this.rooms[ir].hidden === false) {
                        this.viewDots.push(this.dots[id]);
                    }
                }
            }
        }
        console.log("ViewDots: ", this.viewDots);
        this.draw();
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
