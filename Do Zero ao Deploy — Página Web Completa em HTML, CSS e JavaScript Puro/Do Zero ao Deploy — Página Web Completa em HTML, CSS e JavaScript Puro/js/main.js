// Interatividade básica — menu mobile, voltar ao topo e reveal on scroll
console.log("Do Zero ao Deploy — script carregado");

const qs = (s, ctx = document) => ctx.querySelector(s);
const qsa = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

/* Menu mobile */
(function(){
  const header = qs("header");
  const nav = qs("nav") || qs("#primary-navigation");
  if (!header || !nav) return;

  let btn = qs(".menu-toggle") || qs("#btn-menu");
  if (!btn) {
    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "btn-menu";
    btn.className = "menu-toggle";
    btn.setAttribute("aria-controls", "primary-navigation");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Abrir menu de navegação");
    btn.innerHTML = '<span class="hamburger" aria-hidden="true"></span>';
    header.insertBefore(btn, nav);
  }

  nav.id = nav.id || "primary-navigation";
  nav.setAttribute("aria-hidden", "true");

  function toggle(open) {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    const next = typeof open === "boolean" ? open : !isOpen;
    btn.setAttribute("aria-expanded", String(next));
    nav.setAttribute("aria-hidden", String(!next));
    nav.classList.toggle("show", next);
    btn.classList.toggle("is-open", next);
  }

  btn.addEventListener("click", (e) => { e.stopPropagation(); toggle(); });

  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && window.innerWidth <= 768) toggle(false);
  });

  document.addEventListener("click", (e) => {
    if (!header.contains(e.target) && btn.getAttribute("aria-expanded") === "true" && window.innerWidth <= 768) toggle(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      nav.classList.remove("show");
      nav.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("is-open");
    } else {
      nav.setAttribute("aria-hidden", "true");
    }
  });
})();

/* Voltar ao topo */
(function(){
  let btn = qs("#back-to-top");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "back-to-top";
    btn.className = "back-to-top";
    btn.type = "button";
    btn.title = "Voltar ao topo";
    btn.setAttribute("aria-label", "Voltar ao topo");
    btn.hidden = true;
    btn.style.opacity = "0";
    btn.innerHTML = "↑";
    document.body.appendChild(btn);
  }

  const threshold = 300;
  function onScroll() {
    if (window.scrollY > threshold) {
      btn.hidden = false;
      btn.style.opacity = "1";
    } else {
      btn.style.opacity = "0";
      setTimeout(() => { if (window.scrollY <= threshold) btn.hidden = true; }, 220);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

/* Reveal ao rolar */
(function(){
  const items = qsa("section, .card, .hero-inner");
  if (!items.length) return;
  items.forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  items.forEach(i => io.observe(i));
})();

/* Inserir ano atual no rodapé */
const y = qs("#current-year");
if (y) y.textContent = new Date().getFullYear();

window.addEventListener("load", () => console.log("Página totalmente carregada."));