export interface PromoItem {
  titulo: string;
  desc: string;
  img: string;
  bgSize: string;
  bgPos: string;
  delay: number;
}

export interface ModalidadeCardItem {
  nome: string;
  img: string;
  imgDetalhe: string;
  desc: string;
}

export interface ModalidadeDetalheItem {
  nome: string;
  imgDetalhe: string;
  desc: string;
  listaTitulo: string;
  lista: readonly string[];
  nota?: string;
}

export interface PlanoItem {
  nome: string;
  img: string;
  valor: string;
  parcelas: string | null;
  acesso: string;
  destaque?: boolean;
}

export const PROMOS: readonly PromoItem[] = [
  {
    titulo: 'AYO MOVIMENTO<br><strong>Movimento que transforma</strong>',
    desc: 'Cuidar do corpo e da mente em um espaco acolhedor, com acompanhamento profissional e evolucao no seu ritmo.',
    img: 'fotos/foto%20inicial.jpeg',
    bgSize: 'contain',
    bgPos: 'center center',
    delay: 9000,
  },
  {
    titulo: 'Turmas reduzidas<br><strong>atencao de verdade</strong>',
    desc: 'Cada pratica foi pensada para desenvolver forca, mobilidade, consciencia corporal e bem-estar.',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80',
    bgSize: 'cover',
    bgPos: 'center center',
    delay: 5200,
  },
  {
    titulo: 'Agende sua aula experimental<br><strong>e viva essa experiencia</strong>',
    desc: 'Venha conhecer o AYO Movimento e descubra como o movimento pode transformar sua rotina.',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1400&q=80',
    bgSize: 'cover',
    bgPos: 'center top',
    delay: 5200,
  },
];

export const MODALIDADES_CARD: readonly ModalidadeCardItem[] = [
  {
    nome: 'Mat Pilates',
    img: 'fotos/mat%20pilates.jpg',
    imgDetalhe: 'fotos/mat%20pilates.jpg',
    desc: 'Pilates no solo com exercicios que usam o peso do corpo e acessorios. Uma pratica completa para estabilidade, forca e consciencia corporal.',
  },
  {
    nome: 'Barre',
    img: 'fotos/barre.jpg',
    imgDetalhe: 'fotos/barre.jpg',
    desc: 'Treino dinamico que mistura pilates, ballet e funcional. Um metodo intenso e elegante para fortalecer pernas, gluteos e core.',
  },
  {
    nome: 'Yoga',
    img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-3.webp',
    imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/runner-1024x1024.webp',
    desc: 'Pratica que integra movimento, respiracao e presenca para desacelerar, melhorar a flexibilidade e desenvolver consciencia corporal.',
  },
  {
    nome: 'Clube do Reformer Fit',
    img: 'fotos/reforme.jpg',
    imgDetalhe: 'fotos/reforme.jpg',
    desc: 'Treinos em grupo no reformer com foco em condicionamento fisico, forca e performance. Turmas de ate 6 alunos por aula.',
  },
  {
    nome: 'Pilates Clinico',
    img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-8.webp',
    imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/hot-pilates-1-1024x1024.webp',
    desc: 'Sessoes terapeuticas para saude e reabilitacao, com atendimento personalizado para tratar dores, recuperar lesoes e melhorar a postura.',
  },
];

export const MODALIDADES_DETALHE: readonly ModalidadeDetalheItem[] = [
  {
    nome: 'Mat Pilates',
    imgDetalhe: 'https://nyma.com.br/wp-content/uploads/2025/09/mat-pilates-1-1024x1024.webp',
    desc: 'Pilates no solo com exercicios que utilizam o peso do proprio corpo e acessorios. Essa pratica desenvolve estabilidade, forca e consciencia corporal.',
    listaTitulo: 'Beneficios',
    lista: [
      'fortalecimento muscular',
      'mobilidade e flexibilidade',
      'melhora da postura',
      'controle e estabilidade do corpo',
    ],
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
      'aumento da resistencia',
    ],
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
      'equilibrio entre corpo e mente',
    ],
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
      'estabilidade e controle corporal',
    ],
    nota: 'Turmas reduzidas: ate 6 alunos por aula, garantindo acompanhamento e qualidade.',
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
      'fortalecimento profundo do core',
    ],
  },
];

export const PLANOS: readonly PlanoItem[] = [
  {
    nome: 'AVULSO',
    img: 'https://nyma.com.br/wp-content/uploads/2025/09/4.webp',
    valor: 'R$90,00',
    parcelas: null,
    acesso: 'Acesso a todas as modalidades',
  },
  {
    nome: '4 VOUCHER',
    img: 'https://nyma.com.br/wp-content/uploads/2025/09/1-1.webp',
    valor: 'R$85,00',
    parcelas: 'R$340,00 em ate 6x',
    acesso: 'Acesso a todas as modalidades (validade 30 dias)',
  },
  {
    nome: '8 VOUCHER',
    img: 'https://nyma.com.br/wp-content/uploads/2025/09/2-1.webp',
    valor: 'R$80,00',
    parcelas: 'R$480,00 em ate 6x',
    acesso: 'Acesso a todas as modalidades (validade 90 dias)',
    destaque: true,
  },
  {
    nome: '12 VOUCHER',
    img: 'https://nyma.com.br/wp-content/uploads/2025/09/3-1.webp',
    valor: 'R$75,00',
    parcelas: 'R$900,00 em ate 6x',
    acesso: 'Acesso a todas as modalidades (validade 180 dias)',
  },
  {
    nome: '16 VOUCHER',
    img: 'https://nyma.com.br/wp-content/uploads/2025/09/1-1.webp',
    valor: 'R$70,00',
    parcelas: 'R$1.120,00 em ate 6x',
    acesso: 'Acesso a todas as modalidades (validade 180 dias)',
  },
];
