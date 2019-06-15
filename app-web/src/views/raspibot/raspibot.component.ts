// Component for login.
import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../../services';
import { RaspyService} from '../../services/raspy.service';
import * as _ from 'underscore';

enum Servo{
  ELBOW = 0,
    HEAD_PAN,
    NA, // skip unused pin 2
    HEAD_TILT,
    SHOULDER,
    BASE,
    HAND,
    WRIST
}

@Component({
  selector: 'app-movie',
  templateUrl: './raspibot.component.html',
  styleUrls: ['./raspibot.component.css']
})
export class RaspibotComponent implements OnInit{
  step: number = 5;
  headPanMin: number=0;
  headPanMax: number=180;
  headTiltMin: number=0;
  headTiltMax: number=180;
  armBaseMin: number=0;
  armBaseMax: number=180;
  armShoulderMin: number=0;
  armShoulderMax: number=180;
  armElbowMin: number=0;
  armElbowMax: number=180;
  armWristMin: number=0;
  armWristMax: number=180;
  gripperMin: number=0;
  gripperMax: number=180;

  headPan: number = 0;
  headTilt: number = 0;
  armElbow: number = 0;
  armShoulder: number = 0;
  armBase: number = 0;
  armWrist: number = 0;
  hand: number = 0;

  constructor(private log: LoggerService,public raspySvc: RaspyService) { }

  ngOnInit() {

  }

  onHeadTilt(_headTilt?:number){
    if(!_.isUndefined(_headTilt))
      this.headTilt = _headTilt;

    console.info('Head tilt position = '+this.headTilt);
    this.sendCommand(Servo.HEAD_TILT,this.headTilt);
  }

  onHeadPan(_headPan?:number){
    if(!_.isUndefined(_headPan))
      this.headPan = _headPan;

    console.info('Head pan position = '+this.headPan);
    this.sendCommand(Servo.HEAD_PAN,this.headPan);
  }

  onArmElbow(_armElbow?:number){
    if(!_.isUndefined(_armElbow))
      this.armElbow = _armElbow;

    console.info('Arm elbow position = '+this.armElbow);
    this.sendCommand(Servo.ELBOW,this.armElbow);
  }

  onArmShoulder(_armShoulder?:number){
    if(!_.isUndefined(_armShoulder))
      this.armShoulder = _armShoulder;

    console.info('Arm shoulder position = '+this.armShoulder);
    this.sendCommand(Servo.SHOULDER,this.armShoulder);
  }

  onArmBase(_armBase?:number){
    if(!_.isUndefined(_armBase)) {
      console.info('i sent my own arm base');
      this.armBase = _armBase;
    }
    console.info('Arm base position = '+this.armBase);
    this.sendCommand(Servo.BASE,this.armBase);
  }

  onArmWrist(_armWrist?:number){
    if(!_.isUndefined(_armWrist))
      this.armWrist = _armWrist;

    console.info('Arm wrist position = '+this.armWrist);
    this.sendCommand(Servo.WRIST,this.armWrist);
  }

  onHand(_hand?:number){
    if(!_.isUndefined(_hand))
      this.hand = _hand;

    console.info('Hand gripper position = '+this.hand);
    this.sendCommand(Servo.HAND,this.hand);
  }

  onConnect(){
    this.raspySvc.connect().subscribe(
      res=> {console.info('Successfully connected to raspi-bot.')},
      err=>{console.info('failed to connect to raspi-bot.'+err)});
  }

  onDisconnect(){
    this.raspySvc.disconnect().subscribe(
      res=> {console.info('Successfully disconnected to raspi-bot.')},
      err=>{console.info('failed to disconnect to raspi-bot.'+err)});
  }

  onSleep(){
    //this.sendCommand(Servo.HEAD_TILT,180);//put head down
    this.onArmBase(85);
    this.onHeadPan(75);
    this.onArmShoulder(0);
    this.onArmElbow(180);
    this.onArmWrist(180);
    this.onHand(0);
    this.onHeadTilt(0);

    this.onDisconnect();
  }

  onWakeUp(){
    //this.sendCommand(Servo.HEAD_TILT,180);//put head down
    this.onArmBase(85);
    this.onHeadPan(75);
    this.onArmShoulder(0);
    this.onArmElbow(180);
    this.onArmWrist(180);
    this.onHand(0);
    this.onHeadTilt(90);
  }

  sendCommand(servo:number,pos:number) {
    let cmd = {
      'servo': servo,
      'pos': this.extrapolatePosition(pos)
    };

    this.raspySvc.postCommand(cmd).subscribe(
      res=> {console.info('rx response from raspi-bot.')},
      err=>{console.info('no word from raspi-bot.'+err)});
  }

  //convert 0-180 degrees to 3000-9000 for servo positions.
  extrapolatePosition(pos:number){
    let nPos: number = 0;
    let offset: number = 33.33333;

    nPos = Math.round(3000+(offset*pos));
    console.info("Extrapolated:"+pos+" -> "+nPos);
    return nPos;
  }
}
