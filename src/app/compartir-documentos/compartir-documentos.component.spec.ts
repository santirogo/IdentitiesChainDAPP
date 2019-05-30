import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirDocumentosComponent } from './compartir-documentos.component';

describe('CompartirDocumentosComponent', () => {
  let component: CompartirDocumentosComponent;
  let fixture: ComponentFixture<CompartirDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompartirDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
