import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskBodyComponent } from './dialog-task-body.component';

describe('DialogTaskBodyComponent', () => {
  let component: DialogTaskBodyComponent;
  let fixture: ComponentFixture<DialogTaskBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTaskBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogTaskBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
