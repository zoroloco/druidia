import { Directive, Input } from '@angular/core';
import { Logger, LogLevels} from '../loggers/logger.service';

@Directive({
  selector: '[unless]'
})
export class Unless{
  constructor(private log:Logger){}

  @Input() set unless(conditionVal: boolean){
    this.log.log(LogLevels.INFO,"Conditional Value of unless directive = "+conditionVal);
  }

}
