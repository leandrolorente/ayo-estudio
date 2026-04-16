import {
  Component, AfterViewInit, OnDestroy,
  ElementRef, ViewChild, ViewChildren, QueryList, NgZone,
  signal
} from '@angular/core';
import { Router } from '@angular/router';

interface Modalidade {
  nome: string;
  imgDetalhe: string;
  desc: string;
  listaTitulo: string;
  lista: string[];
  nota?: string;
}

const MODALIDADES: Modalidade[] = [
  {
    nome: 'Mat Pilates',
    imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/mat-pilates-1-1024x1024.webp',
    desc: 'Pilates no solo com exercicios que utilizam o peso do proprio corpo e acessorios. Essa pratica desenvolve estabilidade, forca e consciencia corporal.',
    listaTitulo: 'Beneficios',
    lista: [
      'fortalecimento muscular',
      'mobilidade e flexibilidade',
      'melhora da postura',
      'controle e estabilidade do corpo'
    ]
  },
  {
    nome: 'Barre',
    imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/barre-1-1024x1024.webp',
    desc: 'Modalidade dinamica que mistura pilates, ballet e exercicios funcionais, criando um treino intenso e elegante.',
    listaTitulo: 'Beneficios',
    lista: [
      'fortalecimento muscular',
      'melhora da postura',
      'definicao muscular',
      'aumento da resistencia'
    ]
  },
  {
    nome: 'Yoga',
    imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/runner-1024x1024.webp',
    desc: 'Pratica que integra movimento, respiracao e presenca. O Yoga ajuda a desacelerar e a desenvolver consciencia corporal.',
    listaTitulo: 'Beneficios',
    lista: [
      'melhora da respiracao',
      'aumento da flexibilidade',
      'reducao do estresse',
      'equilibrio entre corpo e mente'
    ]
  },
  {
    nome: 'Clube do Reformer Fit',
    imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/reformer-1024x1024.webp',
    desc: 'Treinos em grupo realizados no reformer, com foco em condicionamento fisico, forca e performance.',
    listaTitulo: 'Beneficios',
    lista: [
      'fortalecimento global',
      'condicionamento fisico',
      'resistencia muscular',
      'estabilidade e controle corporal'
    ],
    nota: 'Turmas reduzidas: ate 6 alunos por aula, garantindo acompanhamento e qualidade.'
  },
  {
    nome: 'Pilates Clinico',
    imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/hot-pilates-1-1024x1024.webp',
    desc: 'Sessoes terapeuticas voltadas para saude e reabilitacao, com atendimento personalizado que respeita as necessidades de cada aluno.',
    listaTitulo: 'Indicacoes',
    lista: [
      'dores na coluna',
      'reabilitacao de lesoes',
      'correcao postural',
      'fortalecimento profundo do core'
    ]
  },
];

@Component({
  selector: 'app-modalidades-page',
  standalone: true,
  imports: [],
  templateUrl: './modalidades.html',
  styleUrl: './modalidades.css'
})
export class ModalidadesPage implements AfterViewInit, OnDestroy {

  readonly modalidades = MODALIDADES;
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

  constructor(private router: Router, private ngZone: NgZone) {}

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
