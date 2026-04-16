
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, 'src', 'app');

/* ============================================================
   app.html
   ============================================================ */
const html = `<!-- ===================== HEADER ===================== -->
<header id="header" [class.hidden]="headerHidden" [class.scrolled]="scrolled">
  <div class="header-inner">
    <div class="logo" (click)="scrollTo('inicio')">
      <span class="logo-name">AYO</span>
      <span class="logo-tag">PILATES</span>
    </div>
    <nav class="nav-desktop">
      <a href="#" (click)="$event.preventDefault(); scrollTo('modalidades')">Modalidades</a>
      <a href="#" (click)="$event.preventDefault(); scrollTo('sobre')">Sobre</a>
      <a href="#" (click)="$event.preventDefault(); scrollTo('planos')">Planos</a>
      <a href="#" (click)="$event.preventDefault(); scrollTo('contato')">Contato</a>
    </nav>
    <a class="btn-loc" href="https://maps.google.com/?q=Lins+SP+AYO+Pilates" target="_blank">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
      localização
    </a>
    <button class="hamburger" (click)="toggleMenu()" [class.active]="menuOpen" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-mobile" [class.open]="menuOpen">
    <a href="#" (click)="$event.preventDefault(); scrollTo('modalidades'); toggleMenu()">Modalidades</a>
    <a href="#" (click)="$event.preventDefault(); scrollTo('sobre'); toggleMenu()">Sobre</a>
    <a href="#" (click)="$event.preventDefault(); scrollTo('planos'); toggleMenu()">Planos</a>
    <a href="#" (click)="$event.preventDefault(); scrollTo('contato'); toggleMenu()">Contato</a>
  </div>
</header>

<!-- ===================== PROMO CAROUSEL ===================== -->
<section class="hero-promos" id="inicio">
  <div class="swiper hero-swiper" #heroSwiperEl>
    <div class="swiper-wrapper">
      @for (promo of promos; track promo.titulo) {
        <div class="swiper-slide promo-slide">
          <div class="promo-bg" [style.background-image]="'url(' + promo.img + ')'"></div>
          <div class="promo-overlay"></div>
          <div class="promo-content">
            <div class="promo-text">
              <h2 [innerHTML]="promo.titulo"></h2>
              <p>{{ promo.desc }}</p>
              <a href="https://wa.me/5518996274733" target="_blank" class="btn-promo">Eu quero</a>
            </div>
          </div>
        </div>
      }
    </div>
    <div class="swiper-pagination hero-pagination"></div>
  </div>
</section>

<!-- ===================== MODALIDADES ===================== -->
<section class="modalidades" id="modalidades">
  @for (mod of modalidades; track mod.nome; let i = $index) {
    <div class="mod-card" [class.alt]="i % 2 !== 0">
      <div class="mod-bg" [style.background-image]="'url(' + mod.img + ')'"></div>
      <div class="mod-titulo">
        <h2>{{ mod.nome }}</h2>
      </div>
    </div>
  }
</section>

<!-- ===================== SOBRE ===================== -->
<section class="sobre" id="sobre">
  <div class="sobre-inner">
    <div class="sobre-img-wrap" #sobreImgEl>
      <img src="https://nyma.com.br/wp-content/uploads/2025/09/Pilates.webp" alt="AYO Pilates" loading="lazy">
    </div>
    <div class="sobre-texto" #sobreTextEl>
      <p>Somos mais do que um espaço de pilates e treinos funcionais. O AYO é um ecossistema de bem-estar que une corpo, mente e estilo de vida em harmonia</p>
    </div>
  </div>
</section>

<!-- ===================== PLANOS ===================== -->
<section class="planos-header" id="planos">
  <h2>Conheça nossos planos!</h2>
</section>

<section class="planos-layout">
  <div class="planos-col-left">
    <div class="swiper planos-swiper" #planosSwiperEl>
      <div class="swiper-wrapper">
        @for (p of planos; track p.nome) {
          <div class="swiper-slide">
            <div class="plano-card">
              <div class="plano-img-wrap">
                <img [src]="p.img" [alt]="p.nome" loading="lazy">
              </div>
              <div class="plano-info-header">
                <h3>{{ p.nome }}</h3>
              </div>
              <strong class="plano-valor">{{ p.valor }}</strong>
              <p class="plano-por">POR AULA</p>
              @if (p.parcelas) {
                <p class="plano-parcelas">{{ p.parcelas }}</p>
              }
              <p class="plano-validade">{{ p.acesso }}</p>
              <a href="https://wa.me/5518996274733" target="_blank" class="btn-conhecer">CONHECER</a>
            </div>
          </div>
        }
      </div>
      <div class="swiper-button-prev plano-prev"></div>
      <div class="swiper-button-next plano-next"></div>
      <div class="swiper-pagination planos-pagination"></div>
    </div>
  </div>

  <div class="planos-col-right">
    <div class="pass-wrap">
      <h2 class="pass-titulo">AYO PASS</h2>
      <div class="pass-card">
        <div class="pass-img-wrap">
          <img src="https://nyma.com.br/wp-content/uploads/2025/09/10.webp" alt="AYO Pass Mensal" loading="lazy">
        </div>
        <div class="pass-info">
          <h3>MENSAL</h3>
          <p class="pass-frequencia">FREQUÊNCIA LIVRE</p>
          <strong class="pass-valor">R$650,00</strong>
          <p class="pass-por">POR MÊS</p>
          <p class="pass-acesso">Acesso ilimitado a todas modalidades<br>(validade 30 dias)</p>
          <a href="https://wa.me/5518996274733" target="_blank" class="btn-conhecer">CONHECER</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===================== APP ===================== -->
<section class="app-section">
  <div class="app-inner">
    <div class="app-img-col">
      <img src="https://nyma.com.br/wp-content/uploads/2025/09/app-e1757791658502-952x1024.webp" alt="App AYO" loading="lazy">
    </div>
    <div class="app-content-col">
      <h2>Nosso app é super fácil e intuitivo</h2>
      <ul class="app-steps">
        <li>
          <span class="step-check">✓</span>
          Faça o login com seu e-mail ou cadastro que você já fez no AYO PILATES
        </li>
        <li>
          <span class="step-check">✓</span>
          Para comprar as experiências, vá até a aba Contratos
        </li>
        <li>
          <span class="step-check">✓</span>
          Para reservar os horários, vá até a aba Agenda
        </li>
        <li>
          <span class="step-check">✓</span>
          Escolha a modalidade e o horário que você quer, e pronto!
        </li>
      </ul>
      <div class="app-btns">
        <a href="https://nextfit.com.br/appaluno" target="_blank" class="btn-app">Baixar app</a>
        <img src="https://nyma.com.br/wp-content/uploads/2025/09/app-bais.webp" alt="Disponível nas lojas" class="app-badges" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- ===================== FOOTER ===================== -->
<footer id="contato">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="footer-logo">
        <span class="logo-name">AYO</span>
        <span class="logo-tag">PILATES</span>
      </div>
      <p class="footer-viva">VIVÁ Café &amp; Bem Estar</p>
      <a href="https://instagram.com/ayopilatess" target="_blank" class="footer-social">
        <svg viewBox="0 0 448 512" width="20" height="20" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
        <span>&#64;ayopilatess</span>
      </a>
    </div>
    <div class="footer-col">
      <h3>Horário de atendimento</h3>
      <p>Segunda – Sexta: 07:00 – 21:00</p>
      <p>Sábados: 08:00 – 12:00</p>
      <p>Domingos: 08:00 – 12:00</p>
    </div>
    <div class="footer-col">
      <h3>Contatos</h3>
      <a href="https://wa.me/5518996274733" target="_blank" class="footer-link">
        <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
        WhatsApp
      </a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2025 AYO Pilates – VIVÁ Café &amp; Bem Estar. Todos os direitos reservados.</p>
  </div>
</footer>

<!-- ===================== FLOAT WHATSAPP ===================== -->
<a class="wpp-float" href="https://wa.me/5518996274733" target="_blank" aria-label="WhatsApp">
  <svg viewBox="0 0 448 512" fill="currentColor" width="26" height="26"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
</a>
`;

/* ============================================================
   app.css
   ============================================================ */
const css = `/* =====================================================
   AYO PILATES — Landing Page
   Paleta: Laranja #F26522 | Marrom escuro #3D1E13
           Creme #EEE8DF   | Beige #E6D0B7 | Marrom médio #B3937E
   ===================================================== */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: 'Montserrat', sans-serif;
  background: #1a0d08;
  color: #EEE8DF;
  overflow-x: hidden;
}
a { text-decoration: none; color: inherit; }
img { display: block; max-width: 100%; }

:root {
  --orange:      #F26522;
  --orange-dk:   #c94e10;
  --brown-dark:  #3D1E13;
  --brown-mid:   #B3937E;
  --brown-deep:  #915C37;
  --cream:       #EEE8DF;
  --beige:       #E6D0B7;
  --page-dark:   #1a0d08;
}

/* ============================================================
   HEADER
   ============================================================ */
#header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  transition: transform 0.38s cubic-bezier(.4,0,.2,1),
              background 0.3s ease,
              box-shadow 0.3s ease;
}
#header.scrolled {
  background: var(--brown-dark);
  box-shadow: 0 4px 28px rgba(0,0,0,0.55);
}
#header.hidden { transform: translateY(-100%); }

.header-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;
}
.logo-name {
  font-size: 26px;
  font-weight: 900;
  color: var(--orange);
  letter-spacing: 3px;
}
.logo-tag {
  font-size: 8px;
  font-weight: 700;
  color: var(--cream);
  letter-spacing: 5px;
  opacity: 0.75;
  margin-top: 2px;
}

.nav-desktop {
  display: flex;
  gap: 28px;
  margin-left: auto;
}
.nav-desktop a {
  font-size: 12px;
  font-weight: 700;
  color: var(--cream);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: color 0.2s;
  cursor: pointer;
}
.nav-desktop a:hover { color: var(--orange); }

.btn-loc {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border: 1.5px solid rgba(238,232,223,0.7);
  border-radius: 24px;
  font-size: 11px;
  font-weight: 700;
  color: var(--cream);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.22s;
  white-space: nowrap;
  flex-shrink: 0;
}
.btn-loc:hover {
  background: var(--cream);
  color: var(--brown-dark);
  border-color: var(--cream);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--cream);
  transition: all 0.28s ease;
  border-radius: 2px;
}
.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

.nav-mobile {
  display: none;
  flex-direction: column;
  background: var(--brown-dark);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s ease;
}
.nav-mobile.open { max-height: 320px; }
.nav-mobile a {
  display: block;
  padding: 15px 24px;
  font-size: 13px;
  font-weight: 700;
  color: var(--cream);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  transition: color 0.2s, background 0.2s;
}
.nav-mobile a:hover {
  color: var(--orange);
  background: rgba(242,101,34,0.08);
}

/* ============================================================
   PROMO CAROUSEL
   ============================================================ */
.hero-promos {
  padding-top: 64px; /* compensa header fixo */
  background: var(--brown-dark);
  overflow: hidden;
}

.hero-swiper { overflow: hidden; }

.promo-slide {
  position: relative;
  height: 560px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.promo-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.7s cubic-bezier(.4,0,.2,1);
  will-change: transform;
}
.promo-slide:hover .promo-bg { transform: scale(1.05); }

.promo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(20,5,0,0.92) 0%,
    rgba(20,5,0,0.55) 45%,
    rgba(20,5,0,0.15) 100%
  );
}

.promo-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 48px 56px;
}
.promo-text { max-width: 540px; }
.promo-content h2 {
  font-size: clamp(26px, 4.5vw, 52px);
  font-weight: 700;
  color: var(--cream);
  line-height: 1.1;
  margin-bottom: 14px;
}
.promo-content h2 strong {
  font-weight: 900;
  color: var(--orange);
}
.promo-content p {
  font-size: clamp(13px, 1.3vw, 16px);
  color: rgba(238,232,223,0.82);
  line-height: 1.65;
  margin-bottom: 28px;
  max-width: 440px;
}
.btn-promo {
  display: inline-block;
  padding: 13px 36px;
  background: var(--orange);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 3px;
  transition: background 0.22s, transform 0.18s;
}
.btn-promo:hover {
  background: var(--orange-dk);
  transform: translateY(-2px);
}

/* ============================================================
   MODALIDADES
   ============================================================ */
.modalidades {
  display: flex;
  flex-wrap: wrap;
  background: var(--page-dark);
}

.mod-card {
  position: relative;
  flex: 1 1 180px;
  min-height: 340px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.22s ease;
}
.mod-card:hover { transform: translateY(-5px); z-index: 2; }

.mod-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.55s ease;
}
.mod-card:hover .mod-bg { transform: scale(1.07); }

.mod-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(20,5,0,0.88) 0%,
    rgba(20,5,0,0.35) 50%,
    rgba(20,5,0,0.05) 100%
  );
  z-index: 1;
  transition: background 0.3s ease;
}
.mod-card:hover::before {
  background: linear-gradient(
    to top,
    rgba(20,5,0,0.72) 0%,
    rgba(20,5,0,0.2) 50%,
    rgba(20,5,0,0.0) 100%
  );
}

.mod-titulo {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 2;
  padding: 20px 18px;
}
.mod-titulo h2 {
  font-size: clamp(11px, 1.1vw, 16px);
  font-weight: 700;
  color: var(--cream);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 1.3;
}

/* alternating border-radius like Nyma */
.mod-card:nth-child(odd)  { border-radius: 20px 0 20px 0; }
.mod-card:nth-child(even) { border-radius: 0 20px 0 20px; }

/* ============================================================
   SOBRE
   ============================================================ */
.sobre { background: var(--cream); color: var(--brown-dark); overflow: hidden; }

.sobre-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 480px;
}

.sobre-img-wrap {
  overflow: hidden;
  will-change: transform;
}
.sobre-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.sobre-texto {
  display: flex;
  align-items: center;
  padding: 64px 60px;
  will-change: transform, opacity;
}
.sobre-texto p {
  font-size: clamp(16px, 1.8vw, 24px);
  font-weight: 500;
  line-height: 1.8;
  color: var(--brown-dark);
}

/* ============================================================
   PLANOS HEADER
   ============================================================ */
.planos-header {
  background: var(--brown-dark);
  padding: 72px 40px 48px;
  text-align: center;
}
.planos-header h2 {
  font-size: clamp(22px, 4vw, 44px);
  font-weight: 700;
  color: var(--cream);
}

/* ============================================================
   PLANOS LAYOUT
   ============================================================ */
.planos-layout {
  display: flex;
  background: var(--brown-dark);
  padding-bottom: 64px;
  gap: 0;
}

.planos-col-left {
  flex: 1;
  min-width: 0;
  padding: 0 0 70px;
}

.planos-swiper {
  overflow: hidden;
  padding-bottom: 56px !important;
}

.plano-card {
  display: flex;
  flex-direction: column;
  background: var(--page-dark);
  border: 1px solid rgba(255,255,255,0.06);
  height: 100%;
  overflow: hidden;
}

.plano-img-wrap { overflow: hidden; flex-shrink: 0; }
.plano-img-wrap img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.plano-card:hover .plano-img-wrap img { transform: scale(1.04); }

.plano-info-header {
  background: #2b1109;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.plano-info-header h3 {
  font-size: 15px;
  font-weight: 800;
  color: var(--cream);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.plano-valor {
  display: block;
  font-size: 32px;
  font-weight: 900;
  color: var(--orange);
  padding: 14px 20px 2px;
}
.plano-por {
  font-size: 11px;
  font-weight: 700;
  color: rgba(238,232,223,0.55);
  padding: 0 20px 6px;
  letter-spacing: 1.5px;
}
.plano-parcelas {
  font-size: 13px;
  color: rgba(238,232,223,0.6);
  padding: 0 20px 6px;
}
.plano-validade {
  font-size: 12px;
  color: rgba(238,232,223,0.55);
  padding: 0 20px 14px;
  line-height: 1.5;
  flex: 1;
}

.btn-conhecer {
  display: block;
  margin: 0 20px 20px;
  padding: 11px 0;
  background: var(--orange);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  border-radius: 3px;
  transition: background 0.22s, transform 0.18s;
}
.btn-conhecer:hover {
  background: var(--orange-dk);
  transform: translateY(-1px);
}

/* Coluna direita: AYO PASS */
.planos-col-right {
  width: 380px;
  flex-shrink: 0;
  padding: 0 40px 40px;
  border-left: 1px solid rgba(255,255,255,0.06);
}

.pass-wrap { position: sticky; top: 80px; }

.pass-titulo {
  font-size: 26px;
  font-weight: 900;
  color: var(--cream);
  letter-spacing: 3px;
  padding: 32px 0 20px;
}

.pass-card {
  background: var(--page-dark);
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
}

.pass-img-wrap { overflow: hidden; }
.pass-img-wrap img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.pass-card:hover .pass-img-wrap img { transform: scale(1.04); }

.pass-info { background: #2b1109; padding: 16px 20px 20px; }
.pass-info h3 {
  font-size: 15px;
  font-weight: 800;
  color: var(--cream);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.pass-frequencia {
  font-size: 11px;
  color: var(--brown-mid);
  letter-spacing: 1.5px;
  margin-bottom: 10px;
}
.pass-valor {
  display: block;
  font-size: 36px;
  font-weight: 900;
  color: var(--orange);
}
.pass-por {
  font-size: 11px;
  font-weight: 700;
  color: rgba(238,232,223,0.55);
  letter-spacing: 1.5px;
  margin-bottom: 8px;
}
.pass-acesso {
  font-size: 12px;
  color: rgba(238,232,223,0.55);
  line-height: 1.6;
  margin-bottom: 14px;
}

/* ============================================================
   SWIPER OVERRIDES
   ============================================================ */
.hero-pagination,
.planos-pagination {
  bottom: 20px !important;
}
.hero-pagination .swiper-pagination-bullet,
.planos-pagination .swiper-pagination-bullet {
  background: var(--cream);
  opacity: 0.4;
  width: 8px; height: 8px;
}
.hero-pagination .swiper-pagination-bullet-active,
.planos-pagination .swiper-pagination-bullet-active {
  background: var(--orange);
  opacity: 1;
  width: 24px;
  border-radius: 4px;
}

.plano-prev, .plano-next {
  color: var(--orange) !important;
}
.plano-prev::after, .plano-next::after {
  font-size: 18px !important;
}

/* ============================================================
   APP SECTION
   ============================================================ */
.app-section { background: var(--cream); color: var(--brown-dark); }

.app-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.app-img-col img {
  width: 100%;
  max-height: 620px;
  object-fit: contain;
}

.app-content-col { padding: 64px 56px; }
.app-content-col h2 {
  font-size: clamp(18px, 2.2vw, 30px);
  font-weight: 700;
  color: var(--brown-dark);
  line-height: 1.3;
  margin-bottom: 36px;
}

.app-steps {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 36px;
}
.app-steps li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 14px;
  color: var(--brown-dark);
  line-height: 1.55;
  font-weight: 500;
}
.step-check {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: var(--orange);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 900;
  margin-top: 1px;
}

.app-btns {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.btn-app {
  display: inline-block;
  padding: 13px 36px;
  background: var(--brown-dark);
  color: var(--cream);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 3px;
  transition: background 0.22s;
}
.btn-app:hover { background: var(--brown-deep); }

.app-badges { height: 42px; width: auto; }

/* ============================================================
   FOOTER
   ============================================================ */
footer {
  background: #0c0501;
  color: var(--cream);
  padding: 64px 40px 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto 48px;
}

.footer-col h3 {
  font-size: 13px;
  font-weight: 700;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 18px;
}
.footer-col p {
  font-size: 14px;
  color: rgba(238,232,223,0.6);
  line-height: 2;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
}
.footer-viva {
  font-size: 11px;
  color: var(--brown-mid) !important;
  letter-spacing: 1.5px;
  margin-bottom: 18px;
  margin-top: -4px;
}

.footer-social {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(238,232,223,0.65);
  transition: color 0.22s;
}
.footer-social:hover { color: var(--orange); }

.footer-link {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgba(238,232,223,0.6);
  margin-bottom: 16px;
  transition: color 0.22s;
}
.footer-link:hover { color: var(--orange); }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 24px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-bottom p {
  font-size: 11px;
  color: rgba(238,232,223,0.3);
  letter-spacing: 0.5px;
}

/* ============================================================
   WHATSAPP FLOAT
   ============================================================ */
.wpp-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
  width: 60px;
  height: 60px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 22px rgba(37,211,102,0.5);
  transition: transform 0.2s;
  animation: wppPulse 2.8s ease-in-out infinite;
}
.wpp-float:hover {
  transform: scale(1.12);
  animation-play-state: paused;
}

@keyframes wppPulse {
  0%, 100% { box-shadow: 0 4px 22px rgba(37,211,102,0.45); }
  50%       { box-shadow: 0 4px 32px rgba(37,211,102,0.85); }
}

/* ============================================================
   SCROLL ANIMATIONS — used via IntersectionObserver in TS
   ============================================================ */
.anim-fade-up {
  opacity: 0;
  transform: translateY(42px);
  transition: opacity 0.72s ease, transform 0.72s ease;
}
.anim-fade-left {
  opacity: 0;
  transform: translateX(-42px);
  transition: opacity 0.72s ease, transform 0.72s ease;
}
.anim-fade-right {
  opacity: 0;
  transform: translateX(42px);
  transition: opacity 0.72s ease, transform 0.72s ease;
}
.anim-fade-up.visible,
.anim-fade-left.visible,
.anim-fade-right.visible {
  opacity: 1 !important;
  transform: none !important;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 1100px) {
  .planos-layout { flex-direction: column; }
  .planos-col-right {
    width: 100%;
    border-left: none;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 0 40px 40px;
  }
  .pass-wrap { position: relative; top: auto; }
}

@media (max-width: 900px) {
  .nav-desktop, .btn-loc { display: none; }
  .hamburger { display: flex; }
  .nav-mobile { display: flex; }
  .header-inner { padding: 14px 20px; }

  .promo-slide { height: 480px; }
  .promo-content { padding: 32px 28px; }

  .sobre-inner { grid-template-columns: 1fr; }
  .sobre-texto { padding: 44px 28px; }

  .app-inner { grid-template-columns: 1fr; }
  .app-img-col img { max-height: 340px; }
  .app-content-col { padding: 40px 28px; }
}

@media (max-width: 600px) {
  .promo-slide { height: 400px; }
  .promo-content { padding: 24px 20px; }

  .mod-card { flex: 1 1 50%; min-height: 200px; }
  .mod-titulo h2 { font-size: 10px; letter-spacing: 0.8px; }
  .mod-card:nth-child(odd), .mod-card:nth-child(even) { border-radius: 0; }

  .planos-header { padding: 48px 20px 32px; }
  .planos-col-right { padding: 0 20px 32px; }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  footer { padding: 44px 20px 20px; }

  .wpp-float { bottom: 16px; right: 16px; width: 52px; height: 52px; }
}
`;

/* ============================================================
   app.ts
   ============================================================ */
const ts = `import {
  Component, OnInit, OnDestroy, HostListener,
  ElementRef, ViewChild, AfterViewInit, NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('heroSwiperEl')   heroSwiperEl!:   ElementRef;
  @ViewChild('planosSwiperEl') planosSwiperEl!: ElementRef;
  @ViewChild('sobreImgEl')     sobreImgEl!:     ElementRef;
  @ViewChild('sobreTextEl')    sobreTextEl!:    ElementRef;

  scrolled     = false;
  headerHidden = false;
  menuOpen     = false;

  private lastScroll  = 0;
  private tolerance   = 10;
  private heroSwiper!: Swiper;
  private planosSwiper!: Swiper;
  private observer!: IntersectionObserver;
  private scrollRaf   = 0;

  promos = [
    {
      titulo: 'Compre 1<br><strong>Leve&nbsp;2</strong>',
      desc: 'Presente AYO — compre sua primeira aula e ganhe a segunda para conhecer nosso estúdio e todas as modalidades.',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/banner-3-scaled.webp'
    },
    {
      titulo: 'Convide quem você gosta para viver uma <strong>experiência AYO</strong> com você',
      desc: 'Cada amiga que vier treinar, você ganha uma aula.',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/chegamos-em-campinas-1-scaled.webp'
    },
    {
      titulo: 'Seja bem-vindo ao<br><strong>AYO Pilates</strong>',
      desc: 'Mais do que um espaço de treinos. Um ecossistema de bem-estar que une corpo, mente e estilo de vida.',
      img: 'https://nyma.com.br/wp-content/uploads/2025/08/compre-1-leve-3-scaled.webp'
    }
  ];

  modalidades = [
    { nome: 'Pilates Reformer',   img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-7.webp' },
    { nome: 'Barre',              img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-5.webp' },
    { nome: 'Runners',            img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-3.webp' },
    { nome: 'Mat Pilates',        img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-4.webp' },
    { nome: 'Hot Pilates & Barre',img: 'https://nyma.com.br/wp-content/uploads/2025/08/card-8.webp' },
  ];

  planos = [
    {
      nome: 'AVULSO',
      img: 'https://nyma.com.br/wp-content/uploads/2025/09/4.webp',
      valor: 'R\\$90,00', parcelas: null,
      acesso: 'Acesso a todas as modalidades'
    },
    {
      nome: '4 VOUCHER',
      img: 'https://nyma.com.br/wp-content/uploads/2025/09/1-1.webp',
      valor: 'R\\$85,00', parcelas: 'R\\$340,00 em até 6x',
      acesso: 'Acesso a todas as modalidades (validade 30 dias)'
    },
    {
      nome: '8 VOUCHER',
      img: 'https://nyma.com.br/wp-content/uploads/2025/09/2-1.webp',
      valor: 'R\\$80,00', parcelas: 'R\\$480,00 em até 6x',
      acesso: 'Acesso a todas as modalidades (validade 90 dias)'
    },
    {
      nome: '12 VOUCHER',
      img: 'https://nyma.com.br/wp-content/uploads/2025/09/3-1.webp',
      valor: 'R\\$75,00', parcelas: 'R\\$900,00 em até 6x',
      acesso: 'Acesso a todas as modalidades (validade 180 dias)'
    },
    {
      nome: '16 VOUCHER',
      img: 'https://nyma.com.br/wp-content/uploads/2025/09/1-1.webp',
      valor: 'R\\$70,00', parcelas: 'R\\$1.120,00 em até 6x',
      acesso: 'Acesso a todas as modalidades (validade 180 dias)'
    },
  ];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      /* --- Hero Swiper --- */
      this.heroSwiper = new Swiper(this.heroSwiperEl.nativeElement, {
        modules: [Pagination, Autoplay],
        slidesPerView: 1,
        loop: true,
        speed: 700,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.hero-pagination', clickable: true },
        breakpoints: {
          768:  { slidesPerView: 1.6, spaceBetween: 0 },
          1200: { slidesPerView: 2.2, spaceBetween: 0 },
        }
      });

      /* --- Planos Swiper --- */
      this.planosSwiper = new Swiper(this.planosSwiperEl.nativeElement, {
        modules: [Pagination, Autoplay, Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 600,
        autoplay: { delay: 4500, disableOnInteraction: false },
        navigation: { prevEl: '.plano-prev', nextEl: '.plano-next' },
        pagination: { el: '.planos-pagination', clickable: true },
        breakpoints: {
          640:  { slidesPerView: 1 },
          900:  { slidesPerView: 2, spaceBetween: 12 },
          1300: { slidesPerView: 2, spaceBetween: 16 },
        }
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
          '.anim-fade-up, .anim-fade-left, .anim-fade-right'
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
`;

writeFileSync(join(appDir, 'app.html'), html, 'utf8');
writeFileSync(join(appDir, 'app.css'),  css,  'utf8');
writeFileSync(join(appDir, 'app.ts'),   ts,   'utf8');

console.log('✅ app.html, app.css e app.ts escritos com sucesso!');
