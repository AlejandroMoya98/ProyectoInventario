import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInventarioComponent } from './modificar-inventario.component';

describe('ModificarInventarioComponent', () => {
  let component: ModificarInventarioComponent;
  let fixture: ComponentFixture<ModificarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
