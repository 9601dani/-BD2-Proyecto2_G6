import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEdicionUsuarioComponent } from './modal-edicion-usuario.component';

describe('ModalEdicionUsuarioComponent', () => {
  let component: ModalEdicionUsuarioComponent;
  let fixture: ComponentFixture<ModalEdicionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEdicionUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEdicionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
