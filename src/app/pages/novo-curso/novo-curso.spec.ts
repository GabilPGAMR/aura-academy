import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCurso } from './novo-curso';

describe('NovoCurso', () => {
  let component: NovoCurso;
  let fixture: ComponentFixture<NovoCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoCurso],
    }).compileComponents();

    fixture = TestBed.createComponent(NovoCurso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
