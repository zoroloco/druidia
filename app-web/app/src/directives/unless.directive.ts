import { Directive, Input } from '@angular/core';
import { Logger } from '../loggers/logger.service';

@Directive({
  selector: '[unless]'
})
export class Unless{
  constructor(private log:Logger){}

  @Input() set unless(conditionVal: boolean){
    this.log.log("Conditional Value of unless directive = "+conditionVal);
  }

}
