import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonAComponent } from './button-a.component';

describe('ButtonAComponent', () => {
  let component: ButtonAComponent;
  let fixture: ComponentFixture<ButtonAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonAComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain(
      'button-a works!'
    );
  });

  it('should be raised button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const btn = compiled.querySelector('button');
    expect(btn?.hasAttribute('mat-raised-button')).toBeTruthy();
  });
});
