import { TestBed, async }   from '@angular/core/testing';
import { AccountComponent } from './account.component';

describe('account component test', ()=>{
  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [AccountComponent]
    }).compileComponents();
    //you MUST compile the component before any test because of non inline
    //template and style urls that must be compiled before test.

    it('create account component',async(()=>{
      let fixture = TestBed.createComponent(AccountComponent);
      let accountComponent = fixture.debugElement.componentInstance;
      expect(accountComponent).toBeTruthy();
    }));

    it('test 2', ()=>{
      //let fixture = TestBed.createComponent(AccountComponent);
      //let accountTemplate = fixture.debugElement.nativeElement;
    });
  
  }));
});
