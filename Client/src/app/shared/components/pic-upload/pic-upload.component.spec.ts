import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicUploadComponent } from './pic-upload.component';

describe('PicUploadComponent', () => {
  let component: PicUploadComponent;
  let fixture: ComponentFixture<PicUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PicUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
