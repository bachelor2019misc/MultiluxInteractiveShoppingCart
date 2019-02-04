import { Component, Input, ElementRef, AfterViewInit, ViewChild, AfterViewChecked, OnInit } from '@angular/core';

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
          this.draw();
          window.addEventListener('resize', () => this.resize());
      };
    }

    private draw() {
        this.cx.drawImage(this.vesselImage, 0, 0, this.width, this.height);
    }

    private resize() {
        if(window.innerWidth < 1400) {
            this.cx.canvas.width  = window.innerWidth;
            this.cx.canvas.height = window.innerWidth/2;
            this.width = window.innerWidth;
            this.height = window.innerWidth/2;
            this.draw();
        } else if(this.cx.canvas.width < 1400) {
            this.cx.canvas.width  = 1400;
            this.cx.canvas.height = 700
            this.width = 1400;
            this.height = 700;
            this.draw();
        }
    }
}