import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    spyOn(App.prototype, 'ngAfterViewInit').and.stub();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('cria o componente principal', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('gera link do WhatsApp para o plano', () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;

    const link = component.getPlanoWaLink('8 VOUCHER');

    expect(link).toContain('https://wa.me/5518981426731?text=');
    expect(decodeURIComponent(link)).toContain('8 VOUCHER');
  });
});
