import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { SiteContentService } from '../data/site-content.service';

@Component({
  selector: 'app-modalidades-page',
  imports: [],
  templateUrl: './modalidades.html',
  styleUrl: './modalidades.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalidadesPage implements AfterViewInit, OnDestroy {

  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);
  private readonly siteContent = inject(SiteContentService);

  readonly modalidades = this.siteContent.modalidadesDetalhe;
  activeIndex = signal(0);
  isClosing = false;

  @ViewChild('scrollEl') scrollEl!: ElementRef<HTMLDivElement>;
  @ViewChildren('sections') sections!: QueryList<ElementRef<HTMLElement>>;

  private observer!: IntersectionObserver;
  private readonly keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') this.goTo(this.activeIndex() + 1);
    if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  this.goTo(this.activeIndex() - 1);
    if (e.key === 'Escape')                              this.close();
  };

  ngAfterViewInit(): void {
    const startIndex: number = (history.state?.index as number) ?? 0;
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const el = this.scrollEl.nativeElement;
      el.scrollTop = startIndex * el.clientHeight;
      this.activeIndex.set(startIndex);

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              const idx = Number((entry.target as HTMLElement).dataset['index']);
              this.ngZone.run(() => this.activeIndex.set(idx));
            }
          });
        },
        { root: el, threshold: 0.48 }
      );

      this.sections.forEach(s => this.observer.observe(s.nativeElement));
    }, 50);

    document.addEventListener('keydown', this.keyHandler);
  }

  goTo(i: number): void {
    const clamped = Math.max(0, Math.min(this.modalidades.length - 1, i));
    this.scrollEl.nativeElement.scrollTo({
      top: clamped * this.scrollEl.nativeElement.clientHeight,
      behavior: 'smooth'
    });
  }

  close(): void {
    this.isClosing = true;
    setTimeout(() => this.router.navigate(['/']), 380);
  }

  getWaLink(nome: string): string {
    const msg = encodeURIComponent(`Ola! Quero saber mais sobre ${nome} no AYO Movimento.`);
    return `https://wa.me/5518981426731?text=${msg}`;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    document.removeEventListener('keydown', this.keyHandler);
    document.body.style.overflow = '';
  }
}
