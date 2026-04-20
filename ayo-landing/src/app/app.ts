import {
  Component, OnInit, OnDestroy, HostListener,
  ElementRef, ViewChild, AfterViewInit, NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import Swiper from 'swiper';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {

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

  promos = [
    {
      titulo: 'AYO MOVIMENTO<br><strong>Movimento que transforma</strong>',
      desc: 'Cuidar do corpo e da mente em um espaco acolhedor, com acompanhamento profissional e evolucao no seu ritmo.',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/banner-3-scaled.webp'
    },
    {
      titulo: 'Turmas reduzidas<br><strong>atencao de verdade</strong>',
      desc: 'Cada pratica foi pensada para desenvolver forca, mobilidade, consciencia corporal e bem-estar.',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/chegamos-em-campinas-1-scaled.webp'
    },
    {
      titulo: 'Agende sua aula experimental<br><strong>e viva essa experiencia</strong>',
      desc: 'Venha conhecer o AYO Movimento e descubra como o movimento pode transformar sua rotina.',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/compre-1-leve-3-scaled.webp'
    }
  ];

  modalidades = [
    {
      nome: 'Mat Pilates',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-7.webp',
      imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/mat-pilates-1-1024x1024.webp',
      desc: 'Pilates no solo com exercicios que usam o peso do corpo e acessorios. Uma pratica completa para estabilidade, forca e consciencia corporal.'
    },
    {
      nome: 'Barre',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-5.webp',
      imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/barre-1-1024x1024.webp',
      desc: 'Treino dinamico que mistura pilates, ballet e funcional. Um metodo intenso e elegante para fortalecer pernas, gluteos e core.'
    },
    {
      nome: 'Yoga',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-3.webp',
      imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/runner-1024x1024.webp',
      desc: 'Pratica que integra movimento, respiracao e presenca para desacelerar, melhorar a flexibilidade e desenvolver consciencia corporal.'
    },
    {
      nome: 'Clube do Reformer Fit',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-4.webp',
      imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/reformer-1024x1024.webp',
      desc: 'Treinos em grupo no reformer com foco em condicionamento fisico, forca e performance. Turmas de ate 6 alunos por aula.'
    },
    {
      nome: 'Pilates Clinico',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-8.webp',
      imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/hot-pilates-1-1024x1024.webp',
      desc: 'Sessoes terapeuticas para saude e reabilitacao, com atendimento personalizado para tratar dores, recuperar lesoes e melhorar a postura.'
    },
  ];

  planos: { nome: string; img: string; valor: string; parcelas: string | null; acesso: string; destaque?: boolean }[] = [
    {
      nome: 'AVULSO',
      img: 'https://nyma.com.br/wp-content/uploads/2025/09/4.webp',
      valor: 'R\$90,00', parcelas: null,
      acesso: 'Acesso a todas as modalidades'
    },
    {
      nome: '4 VOUCHER',
      img: 'https://nyma.com.br/wp-content/uploads/2025/09/1-1.webp',
      valor: 'R\$85,00', parcelas: 'R\$340,00 em até 6x',
      acesso: 'Acesso a todas as modalidades (validade 30 dias)'
    },
    {
      nome: '8 VOUCHER',
      img: 'https://nyma.com.br/wp-content/uploads/2025/09/2-1.webp',
      valor: 'R\$80,00', parcelas: 'R\$480,00 em até 6x',
      acesso: 'Acesso a todas as modalidades (validade 90 dias)',
      destaque: true
    },
    {
      nome: '12 VOUCHER',
      img: 'https://nyma.com.br/wp-content/uploads/2025/09/3-1.webp',
      valor: 'R\$75,00', parcelas: 'R\$900,00 em até 6x',
      acesso: 'Acesso a todas as modalidades (validade 180 dias)'
    },
    {
      nome: '16 VOUCHER',
      img: 'https://nyma.com.br/wp-content/uploads/2025/09/1-1.webp',
      valor: 'R\$70,00', parcelas: 'R\$1.120,00 em até 6x',
      acesso: 'Acesso a todas as modalidades (validade 180 dias)'
    },
  ];

  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit(): void {}

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

  @HostListener('window:scroll')
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
