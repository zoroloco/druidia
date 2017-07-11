import { Directive,
         ElementRef,
         Renderer2,
         OnInit,
         HostListener,
         HostBinding,
         Input } from '@angular/core';

@Directive({
  selector: '[inputstyler]'
})
export class InputStyler{
  @Input() defaultColor: string   = 'transparent';
  @Input() highlightColor: string = 'gray';

  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  constructor(private elRef: ElementRef,private renderer:Renderer2){}

  ngOnInit(){

  }

  @HostListener('mouseenter') onmouseover(e:Event){
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onmouseleave(e:Event){
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','red');
    this.backgroundColor = this.defaultColor;
  }

  /*
  @HostListener('mouseenter') onmouseover(e:Event){
    this.renderer.setStyle(this.elRef.nativeElement,'background-color','green');
  }

  @HostListener('mouseleave') onmouseleave(e:Event){
    this.renderer.setStyle(this.elRef.nativeElement,'background-color','red');
  }
  */
}
