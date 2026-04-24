import { ElementRef } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { ModalidadesPage } from './modalidades';

describe('ModalidadesPage', () => {
  beforeEach(async () => {
    spyOn(ModalidadesPage.prototype, 'ngAfterViewInit').and.stub();

    await TestBed.configureTestingModule({
      imports: [ModalidadesPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('cria a pagina de modalidades', () => {
    const fixture = TestBed.createComponent(ModalidadesPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('faz scroll para a modalidade selecionada', () => {
    const fixture = TestBed.createComponent(ModalidadesPage);
    const component = fixture.componentInstance;
    const scrollTo = jasmine.createSpy('scrollTo');
    const fakeScrollEl = {
      nativeElement: {
        clientHeight: 900,
        scrollTo,
      },
    } as unknown as ElementRef<HTMLDivElement>;

    component.scrollEl = fakeScrollEl;

    component.goTo(2);

    expect(scrollTo).toHaveBeenCalledWith({
      top: 1800,
      behavior: 'smooth',
    });
  });
});
