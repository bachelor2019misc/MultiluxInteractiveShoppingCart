import { Component, Input, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise, timeout } from 'rxjs/operators'

@Component({
    selector: 'app-canvas',
    template: '<canvas #canvas></canvas>',
    styles: ['canvas { border: 1px solid #000; width: 100%;}']
})
export class CanvasComponent implements AfterViewInit, OnInit {

    @ViewChild('canvas') public canvas: ElementRef;
  
    @Input() public width = 300;
    @Input() public height = 150;
  
    private cx: CanvasRenderingContext2D;
    private vesselImage: HTMLImageElement;

    ngOnInit(){
        this.vesselImage = new Image();
        this.vesselImage.src = "assets/img/boat.jpg";
    }

    public ngAfterViewInit() {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      this.cx = canvasEl.getContext('2d');
  
      this.width = canvasEl.width;
      canvasEl.height = this.height;
      this.draw();
    }

    private draw() {
        this.cx.drawImage(this.vesselImage, 0, 0, this.width, this.height);
    }
  }