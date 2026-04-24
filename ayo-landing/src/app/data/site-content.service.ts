import { Injectable } from '@angular/core';
import {
  MODALIDADES_CARD,
  MODALIDADES_DETALHE,
  PLANOS,
  PROMOS,
  ModalidadeCardItem,
  ModalidadeDetalheItem,
  PlanoItem,
  PromoItem,
} from './site-content';

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  readonly promos: readonly PromoItem[] = PROMOS;
  readonly modalidadesCard: readonly ModalidadeCardItem[] = MODALIDADES_CARD;
  readonly modalidadesDetalhe: readonly ModalidadeDetalheItem[] = MODALIDADES_DETALHE;
  readonly planos: readonly PlanoItem[] = PLANOS;
}
