export const eventPageStyles = `
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
  @keyframes archiveFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
  @keyframes cardReveal{0%{opacity:0;transform:translateY(28px) rotate(-2deg)}100%{opacity:1;transform:translateY(0) rotate(0)}}
  @keyframes galleryPop{0%{opacity:0;transform:translateY(18px) scale(.92) rotate(-3deg)}100%{opacity:1;transform:translateY(0) scale(1) rotate(0)}}
  @keyframes glitch1{0%,100%{clip-path:inset(0 0 95% 0);transform:translate(-4px,0)}20%{clip-path:inset(30% 0 50% 0);transform:translate(4px,0)}40%{clip-path:inset(60% 0 20% 0);transform:translate(-2px,0)}60%{clip-path:inset(10% 0 80% 0);transform:translate(3px,0)}80%{clip-path:inset(80% 0 5% 0);transform:translate(-4px,0)}}
  @keyframes glitch2{0%,100%{clip-path:inset(50% 0 30% 0);transform:translate(4px,0)}25%{clip-path:inset(20% 0 60% 0);transform:translate(-3px,0)}50%{clip-path:inset(70% 0 10% 0);transform:translate(2px,0)}75%{clip-path:inset(5% 0 85% 0);transform:translate(-4px,0)}}
  @keyframes bookOpen{0%{opacity:0;transform:scaleX(.85) scaleY(.9)}100%{opacity:1;transform:scaleX(1) scaleY(1)}}
  @keyframes overlayFadeIn{0%{opacity:0}100%{opacity:1}}

  .cursor-blink{animation:blink 1s step-end infinite}
  .scanline-anim{animation:scanline 3s linear infinite}
  .glitch-1{animation:glitch1 2.5s infinite}
  .glitch-2{animation:glitch2 2.5s infinite}
  .book-open{animation:bookOpen .45s cubic-bezier(.16,1,.3,1) forwards}
  .overlay-in{animation:overlayFadeIn .3s ease forwards}

  .scroll-track{display:flex;gap:24px;overflow-x:auto;padding:8px 6px 22px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;cursor:grab}
  .scroll-track::-webkit-scrollbar{height:8px}
  .scroll-track::-webkit-scrollbar-track{background:rgba(24,24,27,.55);border-radius:999px}
  .scroll-track::-webkit-scrollbar-thumb{background:linear-gradient(90deg,#3f3f46,#71717a);border-radius:999px}
  .scroll-track.grabbing{cursor:grabbing}

  .ev-card{flex:0 0 280px;scroll-snap-align:start;border:1px solid rgba(255,255,255,.08);border-radius:26px;overflow:hidden;background:linear-gradient(180deg,#17171a,#0f0f11);cursor:pointer;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s,border-color .35s;position:relative;user-select:none;animation:cardReveal .65s cubic-bezier(.16,1,.3,1) both}
  .ev-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.12),transparent 28%,transparent 70%,rgba(255,255,255,.06));opacity:.55;pointer-events:none}
  .ev-card::after{content:'';position:absolute;inset:auto -40% -45% auto;width:220px;height:220px;border-radius:999px;background:radial-gradient(circle,var(--ac,#bcf954) 0%,transparent 68%);opacity:.16;filter:blur(14px);transition:opacity .35s ease,transform .35s ease;transform:translate(20px,20px)}
  .ev-card:hover{transform:translateY(-10px) rotate(.8deg);box-shadow:0 24px 50px rgba(0,0,0,.35);border-color:color-mix(in srgb,var(--ac,#bcf954) 50%,rgba(255,255,255,.14))}
  .ev-card:hover::after{opacity:.26;transform:translate(0,0)}
  .ev-card-media{position:relative;height:180px;overflow:hidden}
  .ev-card-media img{transition:transform .7s cubic-bezier(.16,1,.3,1),filter .4s ease;filter:saturate(.96)}
  .ev-card:hover .ev-card-media img{transform:scale(1.08);filter:saturate(1.08)}
  .ev-card-media::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(12,12,13,.68))}
  .ev-card-chip{position:absolute;top:14px;left:14px;z-index:2;border:1px solid rgba(255,255,255,.14);background:rgba(8,8,10,.68);backdrop-filter:blur(12px);color:#f4f4f5;padding:7px 10px;border-radius:999px;font-size:9px;font-weight:800;letter-spacing:.22em;text-transform:uppercase}
  .ev-card-index{position:absolute;right:16px;bottom:14px;z-index:2;font-size:30px;font-weight:800;line-height:1;color:rgba(255,255,255,.18);font-family:Georgia,serif}
  .ev-card-body{position:relative;padding:18px 18px 20px}
  .ev-card-body::before{content:'';position:absolute;top:0;left:18px;right:18px;height:1px;background:linear-gradient(90deg,transparent,var(--ac,#bcf954),transparent);opacity:.35}
  .ev-card-kicker{display:flex;align-items:center;gap:8px;margin-bottom:14px;font-size:10px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;color:var(--ac,#bcf954)}
  .ev-card-dot{width:8px;height:8px;border-radius:999px;background:var(--ac,#bcf954);box-shadow:0 0 18px color-mix(in srgb,var(--ac,#bcf954) 70%,transparent);animation:archiveFloat 2.8s ease-in-out infinite}
  .ev-card-title{font-size:20px;font-weight:700;color:#f4f4f5;line-height:1.22;margin-bottom:10px}
  .ev-card-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:18px}
  .ev-card-date{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#a1a1aa;max-width:150px}
  .ev-card-open{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#fafafa;transition:transform .25s ease,background .25s ease,border-color .25s ease}
  .ev-card-open span:last-child{transition:transform .25s ease}
  .ev-card:hover .ev-card-open{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.18)}
  .ev-card:hover .ev-card-open span:last-child{transform:translateX(4px)}

  .book-overlay{position:fixed;inset:0;z-index:1000;background:radial-gradient(circle at top,rgba(255,255,255,.06),transparent 35%),rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:16px}
  .book-grid{display:grid;grid-template-columns:1fr 1fr;max-width:960px;width:100%;max-height:90vh;border:1px solid rgba(255,255,255,.08);border-radius:18px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.8),inset 0 0 0 1px rgba(255,255,255,.04);position:relative}
  .book-grid::before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent 15%,rgba(255,255,255,.04) 35%,transparent 55%);pointer-events:none}
  .book-spine{position:absolute;left:50%;top:0;bottom:0;width:8px;background:linear-gradient(90deg,#090909,#2a2a2a,#0a0a0a);box-shadow:0 0 18px rgba(0,0,0,.45);z-index:10;transform:translateX(-50%)}
  .book-left{background:radial-gradient(circle at top left,rgba(255,255,255,.04),transparent 35%),#0e0e0e;overflow:hidden;display:flex;flex-direction:column}
  .book-right{background:radial-gradient(circle at top right,rgba(255,255,255,.03),transparent 35%),#111;overflow-y:auto;padding:32px 28px;display:flex;flex-direction:column;gap:20px;border-left:1px solid rgba(255,255,255,.06)}
  .book-right::-webkit-scrollbar{width:8px}
  .book-right::-webkit-scrollbar-track{background:rgba(255,255,255,.04);border-radius:999px}
  .book-right::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#3f3f46,#71717a);border-radius:999px}
  .book-left-body{padding:24px;flex:1;display:flex;flex-direction:column;gap:12px}

  .polaroid-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .polaroid{background:linear-gradient(180deg,#212124,#151517);border:1px solid rgba(255,255,255,.08);padding:10px 10px 28px;border-radius:16px;position:relative;transition:transform .3s,border-color .3s ease,box-shadow .3s ease;animation:galleryPop .5s cubic-bezier(.16,1,.3,1) both}
  .polaroid:nth-child(odd){transform:rotate(-2deg)}
  .polaroid:nth-child(even){transform:rotate(1.5deg)}
  .polaroid:hover{transform:rotate(0) scale(1.04);z-index:2;border-color:color-mix(in srgb,var(--bac,#bcf954) 45%,rgba(255,255,255,.16));box-shadow:0 18px 32px rgba(0,0,0,.28)}
  .polaroid-img-box{width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:1px}
  .gallery-card-accent{position:absolute;left:14px;right:14px;bottom:12px;height:4px;border-radius:999px;background:linear-gradient(90deg,var(--bac,#bcf954),transparent)}
  .book-gallery-title{font-size:9px;font-weight:700;letter-spacing:.35em;text-transform:uppercase;color:#71717a;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.08)}
  .book-stat-card{background:linear-gradient(180deg,#1a1a1d,#131316);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:4px}
  .book-nav-btn{background:#18181b;border:1px solid rgba(255,255,255,.08);font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:10px 15px;border-radius:999px;cursor:pointer;display:flex;align-items:center;gap:6px;transition:transform .25s ease,background .25s ease,border-color .25s ease,color .25s ease}
  .book-nav-btn:hover:not(:disabled){transform:translateY(-2px);background:rgba(255,255,255,.05)}
  .book-nav-btn:disabled{cursor:not-allowed;opacity:.3}

  .page-corner{position:absolute;bottom:0;right:0;width:24px;height:24px;pointer-events:none}
  .page-corner::before{content:'';position:absolute;bottom:0;right:0;border:solid transparent;border-width:0 0 24px 24px;border-bottom-color:#1c1c1c}
  .page-corner::after{content:'';position:absolute;bottom:0;right:0;border:solid transparent;border-width:0 0 22px 22px;border-bottom-color:#0e0e0e}

  .book-close-btn{position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;background:#1c1c1c;border:1px solid rgba(255,255,255,.1);color:#a1a1aa;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:20;transition:background .2s,border-color .2s,transform .2s;line-height:1}
  .book-close-btn:hover{background:#2a2a2a;border-color:#3f3f46;color:#f3f2eb;transform:rotate(90deg)}

  @media(max-width:640px){
    .book-grid{grid-template-columns:1fr;max-height:85vh}
    .book-right{padding:20px;border-left:none;border-top:1px solid rgba(255,255,255,.08);max-height:280px}
    .polaroid-grid{grid-template-columns:repeat(2,1fr)}
    .book-spine{display:none}
    .ev-card{flex-basis:250px}
  }

  .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
  .scrollbar-hide::-webkit-scrollbar{display:none}
`;