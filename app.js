// Aplicación Principal de Lectura de Cuentos & Galería Ilustrada

class StoryBookApp {
  constructor() {
    this.stories = this.loadStories();
    this.currentStoryId = this.stories[0].id;
    this.currentPageIndex = 0; // Índice de página actual (0 = Portada, 1 = Pág 1 & 2...)
    this.pagesPerSpread = window.innerWidth > 850 ? 2 : 1;
    this.fontSize = parseInt(localStorage.getItem("book_fontsize") || "17");
    this.paperTheme = localStorage.getItem("book_theme") || "parchment";
    this.ambientTheme = localStorage.getItem("book_ambient") || "mahogany";
    this.soundEnabled = localStorage.getItem("book_sound") !== "false";
    this.audioCtx = null;
    this.storyPages = [];
    this.isAnimating = false; // Bloqueo durante la animación de pase de hoja

    this.init();
  }

  // Carga cuentos desde localStorage o usa los predeterminados
  loadStories() {
    const saved = localStorage.getItem("custom_stories_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sincronizar ilustraciones predeterminadas si el primer cuento tiene menos de las 11
          const gargola = parsed.find(s => s.id === "gargola-tibia");
          const defaultGargola = defaultStories.find(s => s.id === "gargola-tibia");
          if (gargola && defaultGargola && gargola.illustrations.length < defaultGargola.illustrations.length) {
            gargola.illustrations = defaultGargola.illustrations;
            localStorage.setItem("custom_stories_v2", JSON.stringify(parsed));
          }
          return parsed;
        }
      } catch (e) {
        console.error("Error al cargar cuentos guardados:", e);
      }
    }
    return defaultStories;
  }

  saveStories() {
    localStorage.setItem("custom_stories_v2", JSON.stringify(this.stories));
  }

  getCurrentStory() {
    return this.stories.find(s => s.id === this.currentStoryId) || this.stories[0];
  }

  init() {
    this.setupAudio();
    this.setupAmbientParticles();
    this.setupEventListeners();
    this.renderStoryTabs();
    this.loadCurrentStory();
    this.applyPreferences();

    window.addEventListener("resize", () => {
      const newSpread = window.innerWidth > 850 ? 2 : 1;
      if (newSpread !== this.pagesPerSpread) {
        this.pagesPerSpread = newSpread;
        this.paginateStory();
        this.renderPages();
      }
    });
  }

  // Síntesis de sonido de hoja pasando con Web Audio API
  setupAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio no disponible");
    }
  }

  playPageTurnSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const bufferSize = this.audioCtx.sampleRate * 0.18;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generar susurro suave de papel (ruido rosa/blanco atenuado)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(350, now + 0.16);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      noise.start(now);
    } catch (e) {
      // Ignorar fallas silenciosas de audio
    }
  }

  // Partículas y atmósfera viva de fondo
  setupAmbientParticles() {
    const canvas = document.getElementById("ambientDustCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    let mouseX = width / 2;
    let mouseY = height / 2;
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Crear partículas cósmicas / motas de polvo iluminadas
    const particleCount = 70;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedY: -(Math.random() * 0.35 + 0.12),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.25,
        pulseSpeed: Math.random() * 0.025 + 0.01,
        pulseVal: Math.random() * Math.PI,
        isGold: Math.random() > 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.pulseVal += p.pulseSpeed;
        const currentAlpha = p.opacity * (0.65 + 0.35 * Math.sin(p.pulseVal));

        // Reacción leve al movimiento del ratón
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          p.x -= (dx / dist) * 0.45;
          p.y -= (dy / dist) * 0.45;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        // Reposicionar al salir de pantalla
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.isGold) {
          ctx.fillStyle = `rgba(255, 215, 0, ${currentAlpha})`;
          ctx.shadowColor = "rgba(255, 215, 0, 0.45)";
        } else {
          ctx.fillStyle = `rgba(0, 229, 255, ${currentAlpha * 0.75})`;
          ctx.shadowColor = "rgba(0, 229, 255, 0.35)";
        }
        ctx.shadowBlur = p.size * 2.5;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  // Paginación inteligente del contenido
  paginateStory() {
    const story = this.getCurrentStory();
    const raw = story.contentRaw || "";
    
    // Convertir markdown básico en bloques semánticos
    const lines = raw.split("\n");
    const blocks = [];
    let currentBlock = "";

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) {
        if (currentBlock) {
          blocks.push(currentBlock);
          currentBlock = "";
        }
      } else {
        if (currentBlock) currentBlock += "\n" + trimmed;
        else currentBlock = trimmed;
      }
    });
    if (currentBlock) blocks.push(currentBlock);

    // Estimación dinámica de caracteres por página según tamaño de pantalla y fuente
    const isMobile = window.innerWidth <= 850;
    const charsPerPage = isMobile 
      ? Math.floor(640 * (17 / this.fontSize)) 
      : Math.floor(1050 * (17 / this.fontSize));

    const pages = [];
    
    // Página 0: Portada interior del libro
    pages.push({
      isCover: true,
      title: story.title,
      author: story.author,
      genre: story.genre,
      synopsis: story.synopsis,
      tagline: story.tagline
    });

    let currentPageContent = [];
    let currentLength = 0;

    blocks.forEach(block => {
      const isSceneHeader = block.includes("**Escena") || block.includes("**Acto") || block.includes("###");
      const isDivider = block === "---";

      if (isDivider) {
        if (currentPageContent.length > 0) {
          pages.push({ isCover: false, content: [...currentPageContent] });
          currentPageContent = [];
          currentLength = 0;
        }
        return;
      }

      // Si es un cambio de escena y la página ya tiene bastante texto, iniciamos nueva página
      if (isSceneHeader && currentLength > 300) {
        pages.push({ isCover: false, content: [...currentPageContent] });
        currentPageContent = [];
        currentLength = 0;
      }

      // Si el bloque cabe en la página
      if (currentLength + block.length <= charsPerPage) {
        currentPageContent.push(block);
        currentLength += block.length;
      } else {
        // Si el bloque es muy largo (ej. párrafo largo), dividirlo por oraciones
        if (block.length > charsPerPage) {
          const sentences = block.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [block];
          sentences.forEach(sentence => {
            if (currentLength + sentence.length > charsPerPage && currentPageContent.length > 0) {
              pages.push({ isCover: false, content: [...currentPageContent] });
              currentPageContent = [];
              currentLength = 0;
            }
            if (currentPageContent.length === 0) {
              currentPageContent.push(sentence.trim());
              currentLength = sentence.trim().length;
            } else {
              currentPageContent[currentPageContent.length - 1] += " " + sentence.trim();
              currentLength += sentence.trim().length;
            }
          });
        } else {
          // Guardar página y empezar la siguiente
          pages.push({ isCover: false, content: [...currentPageContent] });
          currentPageContent = [block];
          currentLength = block.length;
        }
      }
    });

    if (currentPageContent.length > 0) {
      pages.push({ isCover: false, content: [...currentPageContent] });
    }

    this.storyPages = pages;

    // Restaurar marcador si existe
    const savedPage = localStorage.getItem(`bookmark_${story.id}`);
    if (savedPage) {
      const p = parseInt(savedPage);
      if (!isNaN(p) && p >= 0 && p < this.storyPages.length) {
        this.currentPageIndex = p;
      } else {
        this.currentPageIndex = 0;
      }
    } else {
      this.currentPageIndex = 0;
    }
  }

  // Carga y renderiza el cuento seleccionado
  loadCurrentStory() {
    this.paginateStory();
    this.renderPages();
    this.renderGallery();
    this.renderCharacters();
    this.renderTableOfContents();
    this.updateBookmarkDisplay();
  }

  // Renderizar las pestañas de cuentos superiores
  renderStoryTabs() {
    const tabsContainer = document.getElementById("storyTabsList");
    if (!tabsContainer) return;

    tabsContainer.innerHTML = "";

    this.stories.forEach(story => {
      const tab = document.createElement("button");
      tab.className = `story-tab-btn ${story.id === this.currentStoryId ? "active" : ""}`;
      tab.innerHTML = `
        <span class="tab-icon">📖</span>
        <span class="tab-title">${this.escapeHtml(story.title)}</span>
      `;
      tab.addEventListener("click", () => {
        if (this.currentStoryId !== story.id) {
          this.switchStory(story.id);
        }
      });
      tabsContainer.appendChild(tab);
    });

    // Botón para agregar nuevo cuento
    const addBtn = document.createElement("button");
    addBtn.className = "story-tab-btn add-story-btn";
    addBtn.innerHTML = `<span>➕</span><span>Nuevo Cuento</span>`;
    addBtn.title = "Cargar o redactar un nuevo cuento";
    addBtn.addEventListener("click", () => this.openNewStoryModal());
    tabsContainer.appendChild(addBtn);
  }

  switchStory(storyId) {
    this.currentStoryId = storyId;
    this.renderStoryTabs();
    this.loadCurrentStory();
    // Volver a la vista del libro
    this.switchMainTab("book-view");
  }

  // Renderizado del pliego actual del libro
  renderPages() {
    const bookContainer = document.getElementById("bookSpine");
    const pageNumLeft = document.getElementById("pageNumLeft");
    const pageNumRight = document.getElementById("pageNumRight");
    const progressFill = document.getElementById("bookProgressFill");
    const progressText = document.getElementById("bookProgressText");

    if (!bookContainer) return;

    // Limpieza preventiva de hojas en animación
    document.querySelectorAll(".flipping-leaf, .page-landing-shadow").forEach(el => el.remove());
    this.isAnimating = false;

    // Asegurarse de que el índice sea par en modo 2 páginas (excepto si es necesario)
    if (this.pagesPerSpread === 2) {
      if (this.currentPageIndex % 2 !== 0 && this.currentPageIndex > 0) {
        this.currentPageIndex--;
      }
    }

    const total = this.storyPages.length;
    const leftIndex = this.currentPageIndex;
    const rightIndex = leftIndex + 1;

    // Actualizar botones de navegación
    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");
    if (prevBtn) prevBtn.disabled = leftIndex <= 0;
    if (nextBtn) {
      nextBtn.disabled = this.pagesPerSpread === 2 
        ? rightIndex >= total 
        : leftIndex >= total - 1;
    }

    // Progreso
    const currentProgressPage = Math.min(total, leftIndex + (this.pagesPerSpread === 2 ? 2 : 1));
    const percent = Math.round((currentProgressPage / total) * 100);
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressText) progressText.innerText = `${percent}% (${currentProgressPage} / ${total})`;

    // Guardar marcador automático
    localStorage.setItem(`bookmark_${this.currentStoryId}`, leftIndex);

    // Renderizar página izquierda
    const leftPageEl = document.getElementById("pageLeft");
    const rightPageEl = document.getElementById("pageRight");

    if (leftPageEl) {
      leftPageEl.innerHTML = this.renderSinglePage(leftIndex, "left");
      if (pageNumLeft) pageNumLeft.innerText = leftIndex === 0 ? "Portada" : `Pág. ${leftIndex}`;
    }

    if (rightPageEl) {
      if (this.pagesPerSpread === 2) {
        rightPageEl.style.display = "block";
        if (rightIndex < total) {
          rightPageEl.innerHTML = this.renderSinglePage(rightIndex, "right");
          if (pageNumRight) pageNumRight.innerText = `Pág. ${rightIndex}`;
        } else {
          rightPageEl.innerHTML = `
            <div class="blank-end-page">
              <div class="ornament">✦ ✧ ✦</div>
              <p>Fin de este volumen</p>
              <small>Puedes consultar la Galería Ilustrada o el Dossier de Personajes</small>
            </div>
          `;
          if (pageNumRight) pageNumRight.innerText = "";
        }
      } else {
        rightPageEl.style.display = "none";
      }
    }

    // Animación suave de cambio
    bookContainer.classList.remove("page-flip-anim");
    void bookContainer.offsetWidth; // trigger reflow
    bookContainer.classList.add("page-flip-anim");
  }

  // Formato HTML de una sola página
  renderSinglePage(pageIndex, side) {
    if (pageIndex < 0 || pageIndex >= this.storyPages.length) return "";
    const pageData = this.storyPages[pageIndex];

    if (pageData.isCover) {
      return `
        <div class="book-cover-inner">
          <div class="cover-filigree top"></div>
          <div class="cover-badge">${this.escapeHtml(pageData.genre || "Relato Imperial")}</div>
          <h1 class="cover-title">${this.escapeHtml(pageData.title)}</h1>
          <div class="cover-divider">❖ ─── ✦ ─── ❖</div>
          <p class="cover-author">${this.escapeHtml(pageData.author || "Antología")}</p>
          <div class="cover-tagline">«${this.escapeHtml(pageData.tagline || "")}»</div>
          <div class="cover-synopsis-box">
            <p>${this.escapeHtml(pageData.synopsis || "")}</p>
          </div>
          <div class="cover-instructions">
            <span>Usa las flechas ◀ ▶ o haz clic para pasar las páginas</span>
          </div>
          <div class="cover-filigree bottom"></div>
        </div>
      `;
    }

    // Página regular de lectura
    let html = `<div class="page-text-content" style="font-size: ${this.fontSize}px;">`;
    
    // Encabezado decorativo de página
    html += `
      <div class="page-top-header">
        <span class="story-mini-title">${this.escapeHtml(this.getCurrentStory().title)}</span>
        <span class="header-gem">♦</span>
      </div>
    `;

    pageData.content.forEach((block, bIdx) => {
      let formatted = block;
      
      // Encabezados de Escena con ornamentos
      if (formatted.startsWith("**Escena") || formatted.startsWith("**Acto") || formatted.startsWith("###")) {
        const cleanTitle = formatted.replace(/\*\*/g, "").replace(/###/g, "").trim();
        html += `
          <div class="scene-heading-ornament">
            <div class="heading-line"></div>
            <h2 class="scene-title">${this.escapeHtml(cleanTitle)}</h2>
            <div class="heading-line"></div>
          </div>
        `;
        return;
      }

      // Título principal repetido en primer bloque
      if (formatted.startsWith("**El Teorema") || formatted.startsWith("**Asesinato")) {
        return;
      }

      // Si es diálogo o texto
      let paragraphHtml = this.formatMarkdownText(formatted);

      // Si es el primer párrafo de una escena o página inicial, aplicar capitular (drop cap)
      if (bIdx === 0 && !formatted.startsWith("—") && !formatted.startsWith("<")) {
        paragraphHtml = `<p class="has-dropcap">${paragraphHtml}</p>`;
      } else {
        paragraphHtml = `<p class="story-paragraph">${paragraphHtml}</p>`;
      }

      html += paragraphHtml;

      // Vincular píldora ilustrada interactiva si el párrafo describe un momento clave ilustrado
      const illustrationTriggers = [
        { text: "limaduras de latón dorado", id: "ilus-1", label: "Descubrimiento de la Gárgola Tibia" },
        { text: "El primero era el Margrave Kaelen", id: "ilus-2", label: "Los Tres Sospechosos" },
        { text: "Miren los nudillos de esa pieza", id: "ilus-3", label: "El Falso Guantelete" },
        { text: "Nobles centinelas del vacío", id: "ilus-4", label: "Paoliño Distrayendo a los Guardias" },
        { text: "Giro del Fénix Desplumado", id: "ilus-5", label: "El Giro del Fénix Desplumado" },
        { text: "abrir la compuerta de plomo", id: "ilus-6", label: "Descubrimiento de la Corona" },
        { text: "ballesta automática de plasma", id: "ilus-7", label: "La Trampa de la Ballesta" },
        { text: "La lente biselada interceptó el haz", id: "ilus-8", label: "Mine-Jaz Desviando el Disparo" },
        { text: "cardenillo verde", id: "ilus-9", label: "Enfrentamiento Final con Orlov" },
        { text: "péndulo humano", id: "ilus-10", label: "Paoliño Salvando a Mine-Jaz" },
        { text: "armadura de su caballero seguía quejándose", id: "ilus-11", label: "Gravedad para Dos" }
      ];

      const trigger = illustrationTriggers.find(t => formatted.includes(t.text));
      if (trigger) {
        html += `
          <div class="page-illustration-pill" onclick="app.openLightboxById('${trigger.id}')" title="Ver ilustración a pantalla completa">
            <span>🖼️ Ver Ilustración: ${trigger.label}</span>
          </div>
        `;
      }
    });

    html += `</div>`;
    return html;
  }

  // Formateador simple de negritas, cursivas y comillas
  formatMarkdownText(text) {
    let res = this.escapeHtml(text);
    // Negrita
    res = res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Cursiva
    res = res.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Guiones largos de diálogo estilizados
    res = res.replace(/^—/g, '<span class="dialogue-dash">—</span>');
    return res;
  }

  escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Navegación con animación 3D de vuelta de página
  nextPage() {
    this.flipPage("next");
  }

  prevPage() {
    this.flipPage("prev");
  }

  flipPage(direction) {
    if (this.isAnimating) return;
    const step = this.pagesPerSpread;
    const total = this.storyPages.length;

    if (direction === "next") {
      if (this.currentPageIndex + step >= total) return;
    } else if (direction === "prev") {
      if (this.currentPageIndex <= 0) return;
    }

    // Modo móvil (1 página por pantalla)
    if (this.pagesPerSpread === 1) {
      this.animateMobileFlip(direction);
      return;
    }

    // Modo escritorio (2 páginas por pliego)
    this.animateSpreadFlip(direction);
  }

  animateSpreadFlip(direction) {
    this.isAnimating = true;
    const container = document.querySelector(".book-pages-container");
    const pageLeftEl = document.getElementById("pageLeft");
    const pageRightEl = document.getElementById("pageRight");
    const pageNumLeft = document.getElementById("pageNumLeft");
    const pageNumRight = document.getElementById("pageNumRight");

    if (!container || !pageLeftEl || !pageRightEl) {
      this.isAnimating = false;
      return;
    }

    const currentLeftIdx = this.currentPageIndex;
    const currentRightIdx = currentLeftIdx + 1;
    const total = this.storyPages.length;

    if (direction === "next") {
      const nextLeftIdx = currentLeftIdx + 2;
      const nextRightIdx = nextLeftIdx + 1;

      // Contenido de la página derecha actual que se voltea
      const currentRightHtml = pageRightEl.innerHTML;
      // Contenido de la nueva página izquierda
      const nextLeftHtml = this.renderSinglePage(nextLeftIdx, "left");
      // Contenido de la nueva página derecha (fondo que queda debajo al levantarse)
      const nextRightHtml = nextRightIdx < total 
        ? this.renderSinglePage(nextRightIdx, "right")
        : `<div class="blank-end-page"><div class="ornament">✦ ✧ ✦</div><p>Fin de este volumen</p><small>Consulta la Galería Ilustrada o el Dossier</small></div>`;

      // 1. La página derecha de fondo muestra inmediatamente la nueva página derecha
      pageRightEl.innerHTML = nextRightHtml;
      if (pageNumRight) pageNumRight.innerText = nextRightIdx < total ? `Pág. ${nextRightIdx}` : "";

      // 2. Crear la hoja volante dinámica
      const leaf = document.createElement("div");
      leaf.className = "flipping-leaf flip-to-left";
      leaf.innerHTML = `
        <div class="leaf-face leaf-front">
          ${currentRightHtml}
          <div class="leaf-shadow-front"></div>
          <span class="page-footer-num" style="right: 45px;">${pageNumRight ? pageNumRight.innerText : ""}</span>
        </div>
        <div class="leaf-face leaf-back">
          ${nextLeftHtml}
          <div class="leaf-shadow-back"></div>
          <span class="page-footer-num" style="left: 45px;">Pág. ${nextLeftIdx}</span>
        </div>
      `;

      // Sombra que aterriza sobre el lado izquierdo
      const shadow = document.createElement("div");
      shadow.className = "page-landing-shadow on-left";

      container.appendChild(leaf);
      container.appendChild(shadow);

      // Reproducir sonido
      this.playPageTurnSound();

      // Forzar reflow para que el navegador registre la posición inicial 0deg
      void leaf.offsetWidth;

      // Iniciar la rotación 3D a -180deg
      leaf.classList.add("turning");
      shadow.classList.add("active");

      setTimeout(() => {
        // Al terminar el giro:
        pageLeftEl.innerHTML = nextLeftHtml;
        if (pageNumLeft) pageNumLeft.innerText = `Pág. ${nextLeftIdx}`;

        leaf.remove();
        shadow.remove();

        this.currentPageIndex = nextLeftIdx;
        this.updateNavState();
        this.isAnimating = false;
      }, 580);

    } else if (direction === "prev") {
      const prevLeftIdx = currentLeftIdx - 2;
      const prevRightIdx = prevLeftIdx + 1;

      // Contenido de la página izquierda actual que se levanta hacia la derecha
      const currentLeftHtml = pageLeftEl.innerHTML;
      // Contenido de la nueva página derecha
      const prevRightHtml = this.renderSinglePage(prevRightIdx, "right");
      // Contenido de la nueva página izquierda (fondo)
      const prevLeftHtml = this.renderSinglePage(prevLeftIdx, "left");

      // 1. La página izquierda de fondo muestra inmediatamente la nueva izquierda
      pageLeftEl.innerHTML = prevLeftHtml;
      if (pageNumLeft) pageNumLeft.innerText = prevLeftIdx === 0 ? "Portada" : `Pág. ${prevLeftIdx}`;

      // 2. Crear la hoja volante dinámica que parte desde la izquierda (-180deg) hacia la derecha (0deg)
      const leaf = document.createElement("div");
      leaf.className = "flipping-leaf flip-to-right";
      leaf.innerHTML = `
        <div class="leaf-face leaf-front">
          ${prevRightHtml}
          <div class="leaf-shadow-front"></div>
          <span class="page-footer-num" style="right: 45px;">Pág. ${prevRightIdx}</span>
        </div>
        <div class="leaf-face leaf-back">
          ${currentLeftHtml}
          <div class="leaf-shadow-back"></div>
          <span class="page-footer-num" style="left: 45px;">${pageNumLeft ? pageNumLeft.innerText : ""}</span>
        </div>
      `;

      const shadow = document.createElement("div");
      shadow.className = "page-landing-shadow on-right";

      container.appendChild(leaf);
      container.appendChild(shadow);

      // Reproducir sonido
      this.playPageTurnSound();

      void leaf.offsetWidth;

      // Animar hacia 0deg
      leaf.classList.add("turning");
      shadow.classList.add("active");

      setTimeout(() => {
        // Al terminar el giro:
        pageRightEl.innerHTML = prevRightHtml;
        if (pageNumRight) pageNumRight.innerText = `Pág. ${prevRightIdx}`;

        leaf.remove();
        shadow.remove();

        this.currentPageIndex = prevLeftIdx;
        this.updateNavState();
        this.isAnimating = false;
      }, 580);
    }
  }

  animateMobileFlip(direction) {
    this.isAnimating = true;
    const pageEl = document.getElementById("pageLeft");
    const total = this.storyPages.length;

    const nextIndex = direction === "next" 
      ? Math.min(total - 1, this.currentPageIndex + 1)
      : Math.max(0, this.currentPageIndex - 1);

    if (nextIndex === this.currentPageIndex) {
      this.isAnimating = false;
      return;
    }

    this.playPageTurnSound();

    const animClass = direction === "next" ? "mobile-page-flip-next" : "mobile-page-flip-prev";
    pageEl.classList.remove("mobile-page-flip-next", "mobile-page-flip-prev");
    void pageEl.offsetWidth;
    pageEl.classList.add(animClass);

    setTimeout(() => {
      this.currentPageIndex = nextIndex;
      this.renderPages();
    }, 250);

    setTimeout(() => {
      pageEl.classList.remove(animClass);
      this.isAnimating = false;
    }, 520);
  }

  updateNavState() {
    const total = this.storyPages.length;
    const leftIndex = this.currentPageIndex;
    const rightIndex = leftIndex + 1;

    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");
    if (prevBtn) prevBtn.disabled = leftIndex <= 0;
    if (nextBtn) {
      nextBtn.disabled = this.pagesPerSpread === 2 
        ? rightIndex >= total 
        : leftIndex >= total - 1;
    }

    const currentProgressPage = Math.min(total, leftIndex + (this.pagesPerSpread === 2 ? 2 : 1));
    const percent = Math.round((currentProgressPage / total) * 100);
    const progressFill = document.getElementById("bookProgressFill");
    const progressText = document.getElementById("bookProgressText");

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressText) progressText.innerText = `${percent}% (${currentProgressPage} / ${total})`;

    localStorage.setItem(`bookmark_${this.currentStoryId}`, leftIndex);
  }

  goToPage(index) {
    if (index >= 0 && index < this.storyPages.length) {
      this.currentPageIndex = this.pagesPerSpread === 2 ? Math.floor(index / 2) * 2 : index;
      this.playPageTurnSound();
      this.renderPages();
      this.switchMainTab("book-view");
    }
  }

  // Renderizar Galería Ilustrada del Cuento
  renderGallery() {
    const galleryContainer = document.getElementById("galleryGrid");
    if (!galleryContainer) return;

    const story = this.getCurrentStory();
    const illustrations = story.illustrations || [];

    if (illustrations.length === 0) {
      galleryContainer.innerHTML = `
        <div class="empty-gallery">
          <p>Este cuento aún no tiene ilustraciones registradas.</p>
          <button class="action-btn" onclick="app.openAddIllustrationModal()">Añadir Ilustración</button>
        </div>
      `;
      return;
    }

    galleryContainer.innerHTML = "";

    illustrations.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "gallery-card";
      
      // Obtener el arte (imagen del usuario, imagen del proyecto o SVG temático)
      let artContent = "";
      if (item.customImage) {
        artContent = `<img src="${item.customImage}" alt="${this.escapeHtml(item.title)}" class="custom-story-img" />`;
      } else if (item.image) {
        artContent = `<img src="${encodeURI(item.image)}" alt="${this.escapeHtml(item.title)}" class="custom-story-img" loading="lazy" />`;
      } else if (item.svgType && IllustrationArt[item.svgType]) {
        artContent = IllustrationArt[item.svgType]();
      } else {
        artContent = IllustrationArt.chamber();
      }

      card.innerHTML = `
        <div class="card-image-box" onclick="app.openLightbox(${index})">
          ${artContent}
          <div class="card-overlay">
            <span class="zoom-pill">🔍 Ver en pantalla completa</span>
          </div>
          <span class="scene-badge">${this.escapeHtml(item.badge || item.scene)}</span>
        </div>
        <div class="card-content">
          <div class="card-meta">
            <span class="card-scene-num">${this.escapeHtml(item.scene)}</span>
            <button class="replace-img-btn" title="Personalizar / Subir tu propia imagen para esta escena" onclick="app.promptCustomImage(${index})">
              📷 Cambiar Imagen
            </button>
          </div>
          <h3 class="card-title">${this.escapeHtml(item.title)}</h3>
          <p class="card-caption">${this.escapeHtml(item.caption)}</p>
          <blockquote class="card-quote">${this.escapeHtml(item.quote)}</blockquote>
        </div>
      `;
      galleryContainer.appendChild(card);
    });
  }

  // Abrir Lightbox de la Ilustración
  openLightbox(index) {
    const story = this.getCurrentStory();
    const illustrations = story.illustrations || [];
    if (!illustrations[index]) return;

    this.currentLightboxIndex = index;
    const item = illustrations[index];

    const modal = document.getElementById("lightboxModal");
    const content = document.getElementById("lightboxContent");
    const title = document.getElementById("lightboxTitle");
    const caption = document.getElementById("lightboxCaption");
    const quote = document.getElementById("lightboxQuote");
    const badge = document.getElementById("lightboxIndexBadge");

    let artContent = "";
    if (item.customImage) {
      artContent = `<img src="${item.customImage}" alt="${this.escapeHtml(item.title)}" class="lightbox-img-full" />`;
    } else if (item.image) {
      artContent = `<img src="${encodeURI(item.image)}" alt="${this.escapeHtml(item.title)}" class="lightbox-img-full" />`;
    } else if (item.svgType && IllustrationArt[item.svgType]) {
      artContent = IllustrationArt[item.svgType]();
    } else {
      artContent = IllustrationArt.chamber();
    }

    content.innerHTML = artContent;
    title.innerText = `${item.scene}: ${item.title}`;
    caption.innerText = item.caption;
    quote.innerText = item.quote;
    if (badge) badge.innerText = `${index + 1} / ${illustrations.length}`;

    modal.classList.add("active");
  }

  nextLightbox() {
    const story = this.getCurrentStory();
    const illustrations = story.illustrations || [];
    if (illustrations.length === 0) return;
    const nextIdx = (this.currentLightboxIndex + 1) % illustrations.length;
    this.openLightbox(nextIdx);
  }

  prevLightbox() {
    const story = this.getCurrentStory();
    const illustrations = story.illustrations || [];
    if (illustrations.length === 0) return;
    const prevIdx = (this.currentLightboxIndex - 1 + illustrations.length) % illustrations.length;
    this.openLightbox(prevIdx);
  }

  openLightboxById(id) {
    const story = this.getCurrentStory();
    const illustrations = story.illustrations || [];
    const idx = illustrations.findIndex(item => item.id === id);
    if (idx !== -1) {
      this.openLightbox(idx);
    }
  }

  closeLightbox() {
    const modal = document.getElementById("lightboxModal");
    if (modal) modal.classList.remove("active");
  }

  // Permitir al usuario subir su propia imagen o URL
  promptCustomImage(index) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const story = this.getCurrentStory();
          story.illustrations[index].customImage = event.target.result;
          this.saveStories();
          this.renderGallery();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  // Renderizar Fichas de Personajes y Objetos
  renderCharacters() {
    const charContainer = document.getElementById("charactersGrid");
    if (!charContainer) return;

    const story = this.getCurrentStory();
    const chars = story.characters || [];

    if (chars.length === 0) {
      charContainer.innerHTML = `<p class="empty-state">No hay fichas registradas para este cuento.</p>`;
      return;
    }

    charContainer.innerHTML = "";

    chars.forEach(char => {
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
        <div class="char-header">
          <div class="char-icon">${char.icon || "📜"}</div>
          <div>
            <h3 class="char-name">${this.escapeHtml(char.name)}</h3>
            <span class="char-role">${this.escapeHtml(char.role)}</span>
          </div>
        </div>
        <p class="char-desc">${this.escapeHtml(char.description)}</p>
        <div class="char-quote">${this.escapeHtml(char.quote)}</div>
      `;
      charContainer.appendChild(card);
    });
  }

  // Índice de escenas en el menú lateral
  renderTableOfContents() {
    const tocList = document.getElementById("tocList");
    if (!tocList) return;

    tocList.innerHTML = "";

    // Portada
    const coverItem = document.createElement("li");
    coverItem.className = "toc-item";
    coverItem.innerHTML = `<span class="toc-num">0</span><span class="toc-label">Portada & Prólogo</span>`;
    coverItem.onclick = () => { this.goToPage(0); this.toggleTocModal(false); };
    tocList.appendChild(coverItem);

    // Buscar escenas en las páginas
    this.storyPages.forEach((page, pIdx) => {
      if (!page.isCover && page.content) {
        page.content.forEach(block => {
          if (block.includes("**Escena") || block.includes("**Acto")) {
            const clean = block.replace(/\*\*/g, "").trim();
            const item = document.createElement("li");
            item.className = "toc-item";
            item.innerHTML = `<span class="toc-num">Pág ${pIdx}</span><span class="toc-label">${this.escapeHtml(clean)}</span>`;
            item.onclick = () => { this.goToPage(pIdx); this.toggleTocModal(false); };
            tocList.appendChild(item);
          }
        });
      }
    });
  }

  toggleTocModal(show) {
    const modal = document.getElementById("tocModal");
    if (modal) {
      if (show !== undefined) {
        modal.classList.toggle("active", show);
      } else {
        modal.classList.toggle("active");
      }
    }
  }

  // Cambio de pestañas principales (Lectura / Galería / Personajes / Acerca de)
  switchMainTab(tabId) {
    // Cerrar drawer de ajustes si estaba abierto
    document.getElementById("readingControls")?.classList.remove("open");
    document.getElementById("settingsBackdrop")?.classList.remove("active");

    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    document.querySelectorAll(".tab-view-panel").forEach(panel => {
      panel.classList.toggle("active", panel.id === tabId);
    });

    if (tabId === "book-view") {
      this.renderPages();
    }
  }

  // Modal para agregar un nuevo cuento (.txt o redactado)
  openNewStoryModal() {
    const modal = document.getElementById("newStoryModal");
    if (modal) modal.classList.add("active");
  }

  closeNewStoryModal() {
    const modal = document.getElementById("newStoryModal");
    if (modal) modal.classList.remove("active");
  }

  handleCreateStory(e) {
    e.preventDefault();
    const titleInput = document.getElementById("newStoryTitle");
    const authorInput = document.getElementById("newStoryAuthor");
    const genreInput = document.getElementById("newStoryGenre");
    const synopsisInput = document.getElementById("newStorySynopsis");
    const contentInput = document.getElementById("newStoryContent");

    const title = titleInput.value.trim() || "Cuento sin título";
    const author = authorInput.value.trim() || "Autor Anónimo";
    const genre = genreInput.value.trim() || "Ficción";
    const synopsis = synopsisInput.value.trim() || "";
    const content = contentInput.value.trim();

    if (!content) {
      alert("Por favor escribe o pega el texto del cuento.");
      return;
    }

    const newId = "story-" + Date.now();
    const newStory = {
      id: newId,
      title: title,
      author: author,
      genre: genre,
      synopsis: synopsis,
      tagline: "Un nuevo relato añadido a tu biblioteca.",
      contentRaw: content,
      illustrations: [
        {
          id: `ilus-${newId}-1`,
          scene: "Inicio",
          title: "Portada de " + title,
          caption: "Ilustración de apertura del nuevo cuento.",
          quote: synopsis || title,
          badge: "Capítulo I",
          svgType: "chamber"
        }
      ],
      characters: []
    };

    this.stories.push(newStory);
    this.saveStories();
    this.renderStoryTabs();
    this.closeNewStoryModal();
    this.switchStory(newId);

    // Limpiar formulario
    titleInput.value = "";
    authorInput.value = "";
    genreInput.value = "";
    synopsisInput.value = "";
    contentInput.value = "";
  }

  // Cargar archivo .txt desde el explorador
  handleFileUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const contentInput = document.getElementById("newStoryContent");
      const titleInput = document.getElementById("newStoryTitle");
      
      if (contentInput) contentInput.value = text;
      
      // Intentar extraer el título de la primera línea
      const firstLine = text.split("\n")[0].replace(/\*\*/g, "").trim();
      if (firstLine && titleInput && !titleInput.value) {
        titleInput.value = firstLine;
      }
    };
    reader.readAsText(file);
  }

  // Ajustes de Lectura y Temas
  changeFontSize(delta) {
    const newSize = Math.max(13, Math.min(26, this.fontSize + delta));
    if (newSize !== this.fontSize) {
      this.fontSize = newSize;
      localStorage.setItem("book_fontsize", this.fontSize);
      this.paginateStory();
      this.renderPages();
    }
  }

  setTheme(themeName) {
    this.paperTheme = themeName;
    localStorage.setItem("book_theme", themeName);
    this.applyPreferences();
  }

  setAmbient(ambientName) {
    this.ambientTheme = ambientName;
    localStorage.setItem("book_ambient", ambientName);
    this.applyPreferences();
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem("book_sound", this.soundEnabled);
    this.updateSoundBtn();
  }

  updateSoundBtn() {
    const btn = document.getElementById("soundToggleBtn");
    if (btn) {
      btn.innerText = this.soundEnabled ? "🔊 Sonido Activado" : "🔇 Sonido Silenciado";
      btn.classList.toggle("active", this.soundEnabled);
    }
  }

  applyPreferences() {
    document.body.className = `theme-${this.paperTheme} ambient-${this.ambientTheme}`;
    this.updateSoundBtn();

    // Actualizar botones de tema activos
    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.theme === this.paperTheme);
    });

    // Actualizar botones de ambiente activos
    document.querySelectorAll(".ambient-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.ambient === this.ambientTheme);
    });
  }

  updateBookmarkDisplay() {
    const ribbon = document.getElementById("bookBookmarkRibbon");
    if (ribbon) {
      ribbon.title = `Marcador: Guardado en página ${this.currentPageIndex + 1}`;
    }
  }

  // Event Listeners generales
  setupEventListeners() {
    // Botones de página
    document.getElementById("prevPageBtn")?.addEventListener("click", () => this.prevPage());
    document.getElementById("nextPageBtn")?.addEventListener("click", () => this.nextPage());

    // Clics directos en las páginas para pasar
    document.getElementById("pageLeft")?.addEventListener("click", (e) => {
      // Si hace clic en la mitad exterior, va atrás (o en móvil si toca el 35% izquierdo)
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (this.pagesPerSpread === 1) {
        if (x < rect.width * 0.3) {
          this.prevPage();
        } else if (x > rect.width * 0.7) {
          this.nextPage();
        }
      } else {
        if (x < rect.width * 0.4) {
          this.prevPage();
        }
      }
    });

    document.getElementById("pageRight")?.addEventListener("click", (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x > rect.width * 0.6) {
        this.nextPage();
      }
    });

    // Soporte táctil de Deslizar (Swipe) para teléfonos móviles
    const bookContainer = document.getElementById("bookSpine");
    if (bookContainer) {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      bookContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      bookContainer.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Deslizamiento horizontal intencional (> 42px y más horizontal que vertical)
        if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
          if (deltaX < 0) {
            // Deslizar izquierda -> siguiente
            this.flipPage("next");
          } else {
            // Deslizar derecha -> anterior
            this.flipPage("prev");
          }
        }
      }, { passive: true });
    }

    // Teclado (Flechas de dirección)
    window.addEventListener("keydown", (e) => {
      // Si el Lightbox de ilustraciones está activo
      const lightboxModal = document.getElementById("lightboxModal");
      if (lightboxModal && lightboxModal.classList.contains("active")) {
        if (e.key === "ArrowLeft") this.prevLightbox();
        if (e.key === "ArrowRight") this.nextLightbox();
        if (e.key === "Escape") this.closeLightbox();
        return;
      }

      if (document.querySelector(".modal.active")) return;
      if (e.key === "ArrowLeft") this.prevPage();
      if (e.key === "ArrowRight") this.nextPage();
    });

    // Pestañas de navegación
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tabId = e.currentTarget.dataset.tab;
        this.switchMainTab(tabId);
      });
    });

    // Drawer de Ajustes de Lectura en Móvil
    const readingControls = document.getElementById("readingControls");
    const settingsBackdrop = document.getElementById("settingsBackdrop");
    const readingSettingsBtn = document.getElementById("readingSettingsBtn");
    const closeSettingsBtn = document.getElementById("closeSettingsBtn");

    const toggleSettingsDrawer = (open) => {
      if (!readingControls) return;
      const isOpen = open !== undefined ? open : !readingControls.classList.contains("open");
      readingControls.classList.toggle("open", isOpen);
      settingsBackdrop?.classList.toggle("active", isOpen);
    };

    readingSettingsBtn?.addEventListener("click", () => toggleSettingsDrawer(true));
    closeSettingsBtn?.addEventListener("click", () => toggleSettingsDrawer(false));
    settingsBackdrop?.addEventListener("click", () => toggleSettingsDrawer(false));

    // Botones de fuente
    document.getElementById("fontDecBtn")?.addEventListener("click", () => this.changeFontSize(-1));
    document.getElementById("fontIncBtn")?.addEventListener("click", () => this.changeFontSize(1));

    // Botones de tema de papel
    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.setTheme(e.currentTarget.dataset.theme);
      });
    });

    // Botones de ambiente de fondo
    document.querySelectorAll(".ambient-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.setAmbient(e.currentTarget.dataset.ambient);
      });
    });

    // Sonido
    document.getElementById("soundToggleBtn")?.addEventListener("click", () => this.toggleSound());

    // Índice
    document.getElementById("tocBtn")?.addEventListener("click", () => this.toggleTocModal());
    document.getElementById("closeTocBtn")?.addEventListener("click", () => this.toggleTocModal(false));

    // Lightbox modal close y navegación
    document.getElementById("closeLightboxBtn")?.addEventListener("click", () => this.closeLightbox());
    document.getElementById("lightboxPrevBtn")?.addEventListener("click", () => this.prevLightbox());
    document.getElementById("lightboxNextBtn")?.addEventListener("click", () => this.nextLightbox());
    document.getElementById("lightboxModal")?.addEventListener("click", (e) => {
      if (e.target.id === "lightboxModal") this.closeLightbox();
    });

    // Modal nuevo cuento
    document.getElementById("closeNewStoryBtn")?.addEventListener("click", () => this.closeNewStoryModal());
    document.getElementById("newStoryForm")?.addEventListener("submit", (e) => this.handleCreateStory(e));
    
    // Drag & drop o selector de archivo txt
    const dropZone = document.getElementById("fileDropZone");
    const fileInput = document.getElementById("storyFileInput");

    if (dropZone && fileInput) {
      dropZone.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
          this.handleFileUpload(e.target.files[0]);
        }
      });

      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });

      dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover");
      });

      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
          this.handleFileUpload(e.dataTransfer.files[0]);
        }
      });
    }
  }
}

// Iniciar aplicación al cargar el DOM
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new StoryBookApp();
});
