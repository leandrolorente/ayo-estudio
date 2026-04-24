import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import Swiper from 'swiper';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { SiteContentService } from './data/site-content.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()'
  }
})
export class App implements AfterViewInit, OnDestroy {

  @ViewChild('heroSwiperEl')   heroSwiperEl!:   ElementRef;
  @ViewChild('planosSwiperEl') planosSwiperEl!: ElementRef;
  @ViewChild('sobreImgEl')     sobreImgEl!:     ElementRef;
  @ViewChild('sobreTextEl')    sobreTextEl!:    ElementRef;

  scrolled      = false;
  headerHidden  = false;
  menuOpen      = false;
  detalheIndex  = -1;
  detalheAberto = false;

  private lastScroll  = 0;
  private tolerance   = 10;
  private heroSwiper!: Swiper;
  private planosSwiper!: Swiper;
  private observer!: IntersectionObserver;
  private scrollRaf   = 0;

  private readonly ngZone = inject(NgZone);
  private readonly router = inject(Router);
  private readonly siteContent = inject(SiteContentService);

  readonly promos = this.siteContent.promos;
  readonly modalidades = this.siteContent.modalidadesCard;
  readonly planos = this.siteContent.planos;

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      /* --- Hero Swiper --- */
      this.heroSwiper = new Swiper(this.heroSwiperEl.nativeElement, {
        modules: [Pagination, Autoplay],
        slidesPerView: 1,
        loop: true,
        speed: 900,
        autoplay: { delay: 5200, disableOnInteraction: false },
        pagination: { el: '.hero-pagination', clickable: true },
      });

      /* --- Planos Swiper --- */
      this.planosSwiper = new Swiper(this.planosSwiperEl.nativeElement, {
        modules: [Pagination, Autoplay, Navigation],
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 700,
        grabCursor: true,
        autoplay: { delay: 4500, disableOnInteraction: false },
        navigation: { prevEl: '.plano-prev', nextEl: '.plano-next' },
        pagination: { el: '.planos-pagination', clickable: true, dynamicBullets: true },
        breakpoints: {
          640:  { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
        },
      });

      /* --- IntersectionObserver para animações de scroll --- */
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              this.observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      /* Aguarda renderização completa dos @for lists */
      setTimeout(() => {
        document.querySelectorAll(
          '.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-zoom-in'
        ).forEach(el => this.observer.observe(el));
      }, 80);
    });
  }

  onScroll(): void {
    cancelAnimationFrame(this.scrollRaf);
    this.scrollRaf = requestAnimationFrame(() => this._handleScroll());
  }

  private _handleScroll(): void {
    const current = window.scrollY;

    /* Reading progress bar */
    const docHeight = document.body.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      document.documentElement.style.setProperty(
        '--reading-progress',
        Math.min(100, (current / docHeight) * 100).toFixed(1) + '%'
      );
    }

    /* scrolled (muda background do header) */
    const wasScrolled = this.scrolled;
    this.scrolled = current > 50;
    if (this.scrolled !== wasScrolled) {
      this.ngZone.run(() => this.scrolled = current > 50);
    }

    /* header hide/show */
    if (Math.abs(current - this.lastScroll) > this.tolerance) {
      const wasHidden = this.headerHidden;
      const hide = current > this.lastScroll && current > 90;
      if (hide !== wasHidden) {
        this.ngZone.run(() => this.headerHidden = hide);
      }
      this.lastScroll = current;
    }

    /* Parallax na secao sobre */
    const imgEl  = this.sobreImgEl?.nativeElement  as HTMLElement | null;
    const txtEl  = this.sobreTextEl?.nativeElement as HTMLElement | null;
    if (!imgEl || !txtEl) return;

    const section = imgEl.closest('.sobre') as HTMLElement | null;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;

    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const clamp = (v: number, mn: number, mx: number) => Math.min(mx, Math.max(mn, v));
    const p = clamp(progress, 0, 1);
    const dy = (p - 0.5) * 50;
    imgEl.style.transform = 'translateY(' + (dy * 0.4).toFixed(1) + 'px)';
    txtEl.style.transform  = 'translateY(' + (dy * -0.25).toFixed(1) + 'px)';
    txtEl.style.opacity    = String(clamp(p * 2.5, 0.2, 1));
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  abrirDetalhe(i: number): void {
    this.router.navigate(['/modalidades'], { state: { index: i } });
  }

  fecharDetalhe(): void {
    this.detalheAberto = false;
    this.detalheIndex  = -1;
    if (!this.menuOpen) document.body.style.overflow = '';
  }

  navDetalhe(dir: number): void {
    this.detalheIndex = (this.detalheIndex + dir + this.modalidades.length) % this.modalidades.length;
  }

  getPlanoWaLink(nomePlano: string): string {
    const msg = encodeURIComponent(
      `Ola! Gostaria de saber mais sobre o plano ${nomePlano} no AYO Movimento.`
    );
    return `https://wa.me/5518981426731?text=${msg}`;
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.scrollRaf);
    this.heroSwiper?.destroy(true, true);
    this.planosSwiper?.destroy(true, true);
    this.observer?.disconnect();
    document.body.style.overflow = '';
  }
}
