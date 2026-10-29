// Generador de ilustraciones artísticas vectoriales temáticas
const IllustrationArt = {
  chamber: () => `
    <svg viewBox="0 0 800 500" class="story-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nebulaGlow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#192a56" stop-opacity="0.9"/>
          <stop offset="60%" stop-color="#0a0c16" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#030408" stop-opacity="1"/>
        </radialGradient>
        <linearGradient id="bronzePipe" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#795548"/>
          <stop offset="35%" stop-color="#d7ccc8"/>
          <stop offset="65%" stop-color="#ffb300"/>
          <stop offset="85%" stop-color="#8d6e63"/>
          <stop offset="100%" stop-color="#3e2723"/>
        </linearGradient>
        <linearGradient id="greenPlasma" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#00e676" stop-opacity="0"/>
          <stop offset="50%" stop-color="#00e676" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#b9f6ca" stop-opacity="1"/>
        </linearGradient>
        <filter id="glowEffect">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <pattern id="runeGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 0 30 L 60 30 M 30 0 L 30 60 M 15 15 L 45 45 M 45 15 L 15 45" stroke="rgba(255, 215, 0, 0.08)" stroke-width="1" fill="none"/>
          <circle cx="30" cy="30" r="12" stroke="rgba(255, 215, 0, 0.12)" fill="none"/>
        </pattern>
      </defs>

      <!-- Fondo Cámara Oscura & Suelo Obsidiana -->
      <rect width="800" height="500" fill="url(#nebulaGlow)"/>
      <rect y="360" width="800" height="140" fill="#08090f"/>
      <rect y="360" width="800" height="140" fill="url(#runeGrid)"/>
      <line x1="0" y1="360" x2="800" y2="360" stroke="#d4af37" stroke-width="2" stroke-opacity="0.5"/>

      <!-- Arcos Góticos de Fondo -->
      <path d="M 120 360 C 120 180, 220 100, 260 80 C 300 100, 400 180, 400 360 Z" fill="#0c101d" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.3"/>
      <path d="M 400 360 C 400 180, 500 100, 540 80 C 580 100, 680 180, 680 360 Z" fill="#0c101d" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.3"/>

      <!-- Relicario Central Vacío (Pedestal flotante) -->
      <ellipse cx="540" cy="340" rx="60" ry="15" fill="#1e272e" stroke="#00e676" stroke-width="2" filter="url(#glowEffect)"/>
      <path d="M 490 340 L 510 375 L 570 375 L 590 340 Z" fill="#141824" stroke="#d4af37" stroke-width="1"/>
      <ellipse cx="540" cy="336" rx="42" ry="10" fill="#2d132c"/>
      <!-- Partículas de vacío en el pedestal -->
      <circle cx="540" cy="315" r="3" fill="#00e676" opacity="0.6"/>
      <circle cx="530" cy="300" r="2" fill="#00e676" opacity="0.4"/>
      <circle cx="555" cy="310" r="2.5" fill="#00e676" opacity="0.5"/>

      <!-- Velas con llama verdosa (sulfato de cobre) -->
      <g filter="url(#glowEffect)">
        <rect x="440" y="280" width="8" height="35" fill="#e0e0e0" rx="2"/>
        <path d="M 444 280 Q 448 260 444 250 Q 440 260 444 280 Z" fill="url(#greenPlasma)"/>
        <rect x="630" y="280" width="8" height="35" fill="#e0e0e0" rx="2"/>
        <path d="M 634 280 Q 638 260 634 250 Q 630 260 634 280 Z" fill="url(#greenPlasma)"/>
      </g>

      <!-- Gárgola en el Muro Norte con incensarios inclinados -->
      <g transform="translate(680, 150)">
        <path d="M 10 30 Q 35 10 60 30 Q 80 40 85 70 Q 50 80 20 60 Z" fill="#2b303c" stroke="#546e7a" stroke-width="2"/>
        <circle cx="55" cy="35" r="4" fill="#ff5252"/>
        <!-- Rejilla con tenue vapor verde -->
        <rect x="25" y="60" width="40" height="20" fill="#1a1c23" stroke="#ffd54f"/>
        <line x1="35" y1="60" x2="35" y2="80" stroke="#ffd54f"/>
        <line x1="45" y1="60" x2="45" y2="80" stroke="#ffd54f"/>
        <line x1="55" y1="60" x2="55" y2="80" stroke="#ffd54f"/>
        <!-- Vapor verde sutil -->
        <path d="M 45 60 Q 30 40 45 20 Q 60 5 45 -10" fill="none" stroke="#00e676" stroke-width="2" stroke-opacity="0.6" filter="url(#glowEffect)"/>
      </g>

      <!-- El Gran Tubo Criogénico de Bronce -->
      <rect x="235" y="0" width="45" height="420" fill="url(#bronzePipe)"/>
      <ellipse cx="257" cy="420" rx="22.5" ry="8" fill="#3e2723"/>
      <!-- Anillos y abrazaderas de presión -->
      <rect x="230" y="110" width="55" height="12" fill="#d4af37" rx="3"/>
      <rect x="230" y="240" width="55" height="12" fill="#d4af37" rx="3"/>
      <rect x="230" y="370" width="55" height="12" fill="#d4af37" rx="3"/>

      <!-- Paoliño en su intento de giro / caída teatral -->
      <g transform="translate(210, 220)">
        <!-- Capa Carmesí enredada -->
        <path d="M 30 50 Q 80 70 95 140 Q 40 130 10 110 Z" fill="#b71c1c" stroke="#d32f2f" stroke-width="2"/>
        <!-- Torso Armadura Titanio -->
        <rect x="15" y="45" width="45" height="55" rx="10" fill="#90a4ae" stroke="#cfd8dc" stroke-width="2"/>
        <!-- Hombreras -->
        <circle cx="10" cy="50" r="14" fill="#78909c" stroke="#cfd8dc"/>
        <circle cx="65" cy="50" r="14" fill="#78909c" stroke="#cfd8dc"/>
        <circle cx="65" cy="52" r="5" fill="#263238"/> <!-- mancha grasa de litio -->
        <!-- Casco con visor operístico -->
        <path d="M 22 15 Q 38 0 54 15 L 56 42 L 20 42 Z" fill="#607d8b" stroke="#cfd8dc" stroke-width="2"/>
        <rect x="26" y="24" width="24" height="7" rx="3" fill="#00e5ff" filter="url(#glowEffect)"/>
        <!-- Brazos aferrados al tubo -->
        <path d="M 12 55 Q 35 40 45 42" fill="none" stroke="#90a4ae" stroke-width="9" stroke-linecap="round"/>
        <!-- Mano enguantada levantada con dignidad -->
        <path d="M 68 50 Q 85 25 90 10" fill="none" stroke="#90a4ae" stroke-width="8" stroke-linecap="round"/>
        <circle cx="90" cy="10" r="6" fill="#b0bec5"/>
        <!-- Grebas metálicas resbalando -->
        <path d="M 25 100 L 20 155 L 40 165" fill="none" stroke="#78909c" stroke-width="10" stroke-linecap="round"/>
        <path d="M 45 100 L 55 145 L 80 150" fill="none" stroke="#78909c" stroke-width="10" stroke-linecap="round"/>
      </g>

      <!-- Mine-Jaz parada elegantemente examinando con su monóculo -->
      <g transform="translate(100, 200)">
        <path d="M 25 60 L 5 180 L 55 180 Z" fill="#1a237e" stroke="#283593" stroke-width="2"/> <!-- Túnica/capa -->
        <rect x="18" y="55" width="22" height="40" fill="#283593" rx="4"/>
        <circle cx="29" cy="35" r="14" fill="#ffccbc"/> <!-- Rostro -->
        <!-- Cabello oscuro recogido gótico -->
        <path d="M 15 35 Q 29 18 43 35 Q 35 15 22 18 Z" fill="#212121"/>
        <!-- Monóculo de Plata en ojo derecho -->
        <circle cx="34" cy="34" r="5" fill="none" stroke="#ffffff" stroke-width="2" filter="url(#glowEffect)"/>
        <line x1="39" y1="34" x2="48" y2="55" stroke="#cfd8dc" stroke-width="1.5"/>
        <!-- Ojo ámbar brillante -->
        <circle cx="34" cy="34" r="2" fill="#ffb300"/>
        <!-- Brazo estirado con la bolsita de almendras -->
        <path d="M 38 65 Q 60 70 85 75" fill="none" stroke="#1a237e" stroke-width="6" stroke-linecap="round"/>
        <circle cx="88" cy="76" r="6" fill="#ffd54f"/> <!-- almendra -->
      </g>

      <!-- Rótulo Artístico -->
      <text x="400" y="470" text-anchor="middle" font-family="'Cinzel', 'Trajan Pro', serif" font-size="16" fill="#d4af37" letter-spacing="4">
        ACTO I • LA ANTECÁMARA CRIOGÉNICA & EL CONDUCTO TIBIO
      </text>
    </svg>
  `,

  gallery: () => `
    <svg viewBox="0 0 800 500" class="story-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="spaceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#050711"/>
          <stop offset="60%" stop-color="#0d1b2a"/>
          <stop offset="100%" stop-color="#1b263b"/>
        </linearGradient>
        <radialGradient id="vesperPlanet" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#64b5f6"/>
          <stop offset="70%" stop-color="#1976d2"/>
          <stop offset="100%" stop-color="#0d47a1"/>
        </radialGradient>
        <linearGradient id="ringGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.05)"/>
          <stop offset="50%" stop-color="rgba(179, 229, 252, 0.7)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.05)"/>
        </linearGradient>
      </defs>

      <!-- Fondo: Ventanal Ojival hacia el Cosmos -->
      <rect width="800" height="500" fill="#0d1117"/>

      <!-- Espacio Exterior visto por la ventana -->
      <g>
        <path d="M 160 380 L 160 170 Q 400 30 640 170 L 640 380 Z" fill="url(#spaceGradient)"/>
        <!-- Planeta Vésper con Anillos de Hielo -->
        <circle cx="480" cy="200" r="75" fill="url(#vesperPlanet)"/>
        <ellipse cx="480" cy="200" rx="145" ry="25" fill="none" stroke="url(#ringGlow)" stroke-width="14" transform="rotate(-15 480 200)"/>
        <!-- Dragones-Acorazados Mecánicos en órbita -->
        <path d="M 260 140 L 310 135 L 340 145 L 305 155 Z" fill="#37474f" stroke="#00e5ff" stroke-width="1"/>
        <path d="M 310 135 L 325 115 L 335 138 Z" fill="#263238"/>
        <path d="M 220 180 L 255 175 L 275 185 L 250 192 Z" fill="#263238" stroke="#00e5ff" stroke-width="0.8"/>
        <!-- Estrellas / polvo estelar -->
        <circle cx="210" cy="110" r="1.5" fill="#ffffff" opacity="0.8"/>
        <circle cx="360" cy="80" r="1.2" fill="#ffd54f" opacity="0.9"/>
        <circle cx="580" cy="110" r="1.5" fill="#ffffff" opacity="0.8"/>
      </g>

      <!-- Marco del Ventanal Ojival Gótico Espacial -->
      <path d="M 140 400 L 140 160 Q 400 10 660 160 L 660 400 L 640 400 L 640 170 Q 400 30 160 170 L 160 400 Z" fill="#212529" stroke="#d4af37" stroke-width="2"/>
      <!-- Celosías y nervaduras ojivales -->
      <path d="M 400 25 L 400 400" stroke="#d4af37" stroke-width="2" stroke-opacity="0.4"/>
      <path d="M 400 100 Q 280 130 160 210" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.3" fill="none"/>
      <path d="M 400 100 Q 520 130 640 210" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.3" fill="none"/>

      <!-- Conductos verticales flanqueando el ventanal -->
      <rect x="100" y="0" width="30" height="420" fill="url(#bronzePipe)"/>
      <rect x="670" y="0" width="30" height="420" fill="url(#bronzePipe)"/>

      <!-- Mesa Holográfica Central -->
      <ellipse cx="400" cy="400" rx="140" ry="30" fill="#141d26" stroke="#00e5ff" stroke-width="2"/>
      <ellipse cx="400" cy="397" rx="110" ry="20" fill="#0d2538"/>
      <!-- Guantelete chamuscado sobre la mesa -->
      <g transform="translate(375, 375)">
        <path d="M 10 15 L 40 8 L 48 20 L 15 25 Z" fill="#1b1b1b" stroke="#37474f" stroke-width="2"/>
        <circle cx="30" cy="15" r="4" fill="#ff7043" opacity="0.8"/> <!-- chamuscado -->
      </g>

      <!-- Tres Sospechosos en Silueta / Detalle -->
      <!-- Margrave Kaelen (Coloso acorazado con mandoble) -->
      <g transform="translate(180, 240)">
        <path d="M 15 20 L 40 5 L 65 20 L 60 130 L 18 130 Z" fill="#1e232a" stroke="#455a64" stroke-width="2"/>
        <rect x="30" y="0" width="20" height="20" rx="4" fill="#263238"/>
        <!-- Mandoble a la espalda -->
        <line x1="70" y1="-10" x2="20" y2="130" stroke="#00e5ff" stroke-width="4"/>
      </g>

      <!-- Senescal Orlov Vane (Manga terciopelo negro y mano relojería mecánica) -->
      <g transform="translate(530, 240)">
        <path d="M 15 25 L 35 15 L 55 25 L 50 130 L 15 130 Z" fill="#0f0f14" stroke="#d4af37" stroke-width="1.5"/>
        <circle cx="35" cy="10" r="12" fill="#ffccbc"/>
        <!-- Prótesis mecánica con cardenillo verde -->
        <rect x="8" y="70" width="12" height="35" rx="3" fill="#ffd54f" stroke="#b78103"/>
        <circle cx="14" cy="85" r="4" fill="#00e676"/> <!-- Cardenillo verde delatora! -->
      </g>

      <!-- Sor Sílice del Coro Binario (Pebeteros de humo azul en hombros) -->
      <g transform="translate(365, 230)">
        <path d="M 20 20 L 50 15 L 50 120 L 20 120 Z" fill="#283593"/>
        <ellipse cx="35" cy="10" r="10" fill="#e0e0e0"/>
        <!-- Humo azul de los hombros -->
        <circle cx="15" cy="25" r="5" fill="#42a5f5" opacity="0.6"/>
        <path d="M 15 20 Q 5 0 20 -15" fill="none" stroke="#42a5f5" stroke-width="2" opacity="0.7"/>
        <circle cx="55" cy="25" r="5" fill="#42a5f5" opacity="0.6"/>
        <path d="M 55 20 Q 65 0 50 -15" fill="none" stroke="#42a5f5" stroke-width="2" opacity="0.7"/>
      </g>

      <!-- Suelo de la Galería -->
      <rect y="440" width="800" height="60" fill="#080b11"/>
      <text x="400" y="475" text-anchor="middle" font-family="'Cinzel', 'Trajan Pro', serif" font-size="16" fill="#d4af37" letter-spacing="4">
        ACTO II • LOS TRES SOSPECHOSOS Y EL CARDENILLO VERDE
      </text>
    </svg>
  `,

  acrobatics: () => `
    <svg viewBox="0 0 800 500" class="story-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="laserWindow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#d500f9"/>
          <stop offset="50%" stop-color="#651fff"/>
          <stop offset="100%" stop-color="#00e5ff"/>
        </linearGradient>
        <radialGradient id="laserFlash" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="30%" stop-color="#ff1744"/>
          <stop offset="100%" stop-color="#d50000" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="800" height="500" fill="#0a0a14"/>

      <!-- Vitrales Láser de Fondo -->
      <path d="M 200 60 Q 280 10 360 60 L 360 300 L 200 300 Z" fill="url(#laserWindow)" opacity="0.25"/>
      <path d="M 440 60 Q 520 10 600 60 L 600 300 L 440 300 Z" fill="url(#laserWindow)" opacity="0.25"/>

      <!-- Pilar Central de Presurización (4 metros de bronce pulido) -->
      <rect x="380" y="0" width="40" height="420" fill="url(#bronzePipe)"/>

      <!-- Alabarderos petrificados por la confusión moral -->
      <g transform="translate(140, 260)">
        <rect x="10" y="40" width="30" height="70" fill="#37474f"/>
        <circle cx="25" cy="25" r="15" fill="#455a64"/>
        <line x1="0" y1="120" x2="35" y2="10" stroke="#00e5ff" stroke-width="4"/> <!-- alabarda inclinada -->
      </g>
      <g transform="translate(220, 270)">
        <rect x="10" y="40" width="30" height="70" fill="#37474f"/>
        <circle cx="25" cy="25" r="15" fill="#455a64"/>
        <line x1="5" y1="120" x2="25" y2="20" stroke="#00e5ff" stroke-width="4"/>
      </g>
      <g transform="translate(560, 260)">
        <rect x="10" y="40" width="30" height="70" fill="#37474f"/>
        <circle cx="25" cy="25" r="15" fill="#455a64"/>
        <line x1="30" y1="120" x2="0" y2="10" stroke="#00e5ff" stroke-width="4"/>
      </g>

      <!-- Paoliño: El Giro del Fénix Desplumado boca abajo en el poste -->
      <g transform="translate(360, 130)">
        <!-- Capa carmesí flotando -->
        <path d="M 40 40 Q 90 20 120 70 Q 80 80 40 50 Z" fill="#c62828" stroke="#ff5252" stroke-width="2"/>
        <!-- Cuerpo invertido acrobático -->
        <rect x="25" y="30" width="35" height="50" rx="8" fill="#b0bec5" stroke="#eceff1" stroke-width="2" transform="rotate(160 40 55)"/>
        <!-- Pierna aferrada al tubo con la bota trabada -->
        <path d="M 40 30 L 40 -10 L 50 -20" fill="none" stroke="#78909c" stroke-width="10" stroke-linecap="round"/>
        <!-- Bota libre formando bandera -->
        <path d="M 25 70 L -15 90" fill="none" stroke="#78909c" stroke-width="9" stroke-linecap="round"/>
        <!-- Brazos extendidos dramáticos -->
        <path d="M 40 45 L 80 30" fill="none" stroke="#b0bec5" stroke-width="7" stroke-linecap="round"/>
        <path d="M 20 50 L -20 60" fill="none" stroke="#b0bec5" stroke-width="7" stroke-linecap="round"/>
        <!-- Láser rojo apuntando al pecho de Paoliño -->
        <line x1="680" y1="30" x2="40" y2="55" stroke="#ff1744" stroke-width="2" stroke-dasharray="4,4"/>
        <circle cx="40" cy="55" r="5" fill="#ff1744"/>
      </g>

      <!-- Ballesta de plasma en el coro superior -->
      <g transform="translate(670, 20)">
        <rect x="0" y="0" width="45" height="20" fill="#212121" stroke="#d4af37"/>
        <line x1="5" y1="10" x2="-20" y2="10" stroke="#ff1744" stroke-width="3"/>
      </g>

      <!-- Mine-Jaz lanzando su monóculo de plata para interceptar el rayo -->
      <g transform="translate(680, 320)">
        <path d="M 15 40 L 0 100 L 40 100 Z" fill="#1a237e"/>
        <circle cx="20" cy="20" r="12" fill="#ffccbc"/>
        <!-- Brazo estirado lanzando el monóculo -->
        <path d="M 20 35 L -30 -10" fill="none" stroke="#1a237e" stroke-width="6" stroke-linecap="round"/>
      </g>

      <!-- El Monóculo fragmentándose e interceptando el rayo en el aire -->
      <circle cx="480" cy="100" r="28" fill="url(#laserFlash)"/>
      <circle cx="480" cy="100" r="10" fill="none" stroke="#ffffff" stroke-width="3"/>
      <line x1="470" y1="90" x2="490" y2="110" stroke="#ffffff" stroke-width="2"/>
      <line x1="490" y1="90" x2="470" y2="110" stroke="#ffffff" stroke-width="2"/>

      <rect y="440" width="800" height="60" fill="#080b11"/>
      <text x="400" y="475" text-anchor="middle" font-family="'Cinzel', 'Trajan Pro', serif" font-size="16" fill="#d4af37" letter-spacing="4">
        ACTO III • EL GIRO DEL FÉNIX Y EL REFLEJO DE PLATA
      </text>
    </svg>
  `,

  sacrifice: () => `
    <svg viewBox="0 0 800 500" class="story-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="decompressionVortex" cx="80%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.9"/>
          <stop offset="30%" stop-color="#1565c0" stop-opacity="0.8"/>
          <stop offset="70%" stop-color="#050811" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#020307" stop-opacity="1"/>
        </radialGradient>
      </defs>

      <!-- Vórtice de Descompresión hacia el vacío exterior -->
      <rect width="800" height="500" fill="url(#decompressionVortex)"/>

      <!-- Fragmentos de cristal blindado estallando -->
      <g fill="#e0f7fa" opacity="0.8">
        <polygon points="620,180 650,170 635,195"/>
        <polygon points="580,240 600,225 610,255"/>
        <polygon points="700,120 730,140 710,160"/>
        <polygon points="670,300 705,310 685,335"/>
        <polygon points="540,150 560,140 550,165"/>
      </g>

      <!-- Compuerta de emergencia de titanio bajando como guillotina -->
      <rect x="520" y="0" width="220" height="120" fill="#37474f" stroke="#78909c" stroke-width="3"/>
      <!-- Engranajes rúnicos con cortocircuito azul -->
      <circle cx="630" cy="115" r="22" fill="#ffd54f" stroke="#ff8f00" stroke-width="3"/>
      <!-- El Desfibrilador de Almas encajado provocando chispas -->
      <rect x="620" y="95" width="20" height="40" fill="#ffd700" stroke="#fff" stroke-width="2" transform="rotate(45 630 115)"/>
      <circle cx="630" cy="115" r="35" fill="none" stroke="#00e5ff" stroke-width="3" stroke-dasharray="6,6"/>

      <!-- Paoliño colgado de una sola corva en el tubo de bronce -->
      <rect x="340" y="0" width="35" height="500" fill="url(#bronzePipe)"/>
      <g transform="translate(330, 200)">
        <!-- Pierna enganchada -->
        <path d="M 25 10 L 25 -30 L 45 -40" fill="none" stroke="#90a4ae" stroke-width="12" stroke-linecap="round"/>
        <!-- Torso proyectado hacia el vacío -->
        <rect x="30" y="10" width="35" height="50" rx="8" fill="#78909c" transform="rotate(50 45 35)"/>
        <!-- Brazo izquierdo que acaba de lanzar la llave -->
        <path d="M 50 20 L 110 -20" fill="none" stroke="#90a4ae" stroke-width="8" stroke-linecap="round"/>
        <!-- Brazo derecho extendido sujetando a Mine-Jaz sobre el abismo -->
        <path d="M 60 50 L 150 110" fill="none" stroke="#90a4ae" stroke-width="10" stroke-linecap="round"/>
        <circle cx="150" cy="110" r="8" fill="#cfd8dc"/>
      </g>

      <!-- Mine-Jaz arrastrada por la descompresión, atrapada en el último instante -->
      <g transform="translate(470, 300)">
        <!-- Muñeca agarrada por Paoliño -->
        <circle cx="10" cy="10" r="7" fill="#ffccbc"/>
        <!-- Brazo y cuerpo suspendido en el vacío -->
        <path d="M 10 10 L 45 40 L 95 80" fill="none" stroke="#1a237e" stroke-width="10" stroke-linecap="round"/>
        <!-- Cabello flotando al vacío estelar -->
        <path d="M 45 25 Q 90 10 130 15" fill="none" stroke="#212121" stroke-width="4"/>
        <path d="M 45 30 Q 100 25 140 35" fill="none" stroke="#212121" stroke-width="3"/>
      </g>

      <!-- Cofre de Plomo de la Corona colgado de un solo eslabón -->
      <g transform="translate(260, 350)">
        <rect x="0" y="0" width="65" height="50" rx="6" fill="#455a64" stroke="#263238" stroke-width="3"/>
        <circle cx="32" cy="25" r="10" fill="#00e676" opacity="0.6"/> <!-- resplandor de la corona interior -->
        <line x1="32" y1="0" x2="340" y2="280" stroke="#cfd8dc" stroke-width="4"/>
      </g>

      <rect y="440" width="800" height="60" fill="#080b11"/>
      <text x="400" y="475" text-anchor="middle" font-family="'Cinzel', 'Trajan Pro', serif" font-size="16" fill="#d4af37" letter-spacing="4">
        ACTO IV • EL PESO DE UNA ESTRELLA Y EL SALTO AL VACÍO
      </text>
    </svg>
  `,

  romance: () => `
    <svg viewBox="0 0 800 500" class="story-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nightSky" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#1a1c38"/>
          <stop offset="50%" stop-color="#0a0c1a"/>
          <stop offset="100%" stop-color="#03040a"/>
        </radialGradient>
        <linearGradient id="meteorTrail" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
          <stop offset="80%" stop-color="rgba(0, 229, 255, 0.8)"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </linearGradient>
      </defs>

      <!-- Cielo Nocturno de Vésper y Anillos Plateados -->
      <rect width="800" height="500" fill="url(#nightSky)"/>
      <ellipse cx="400" cy="180" rx="380" ry="40" fill="none" stroke="rgba(207, 216, 220, 0.25)" stroke-width="18" transform="rotate(-10 400 180)"/>

      <!-- Lluvia de Meteoros cruzando los anillos -->
      <line x1="120" y1="40" x2="240" y2="120" stroke="url(#meteorTrail)" stroke-width="2.5"/>
      <line x1="550" y1="60" x2="680" y2="150" stroke="url(#meteorTrail)" stroke-width="3"/>
      <line x1="320" y1="10" x2="420" y2="80" stroke="url(#meteorTrail)" stroke-width="1.8"/>

      <!-- Torre de Observación: Cúpula de Cristal y Alféizar -->
      <path d="M 150 430 Q 400 240 650 430 Z" fill="#101420" stroke="#d4af37" stroke-width="1.5" stroke-opacity="0.5"/>
      <rect y="430" width="800" height="70" fill="#0b0e17"/>

      <!-- Tubo de Latón del Telescopio Real -->
      <rect x="220" y="80" width="22" height="350" fill="url(#bronzePipe)"/>
      <path d="M 180 80 L 280 40 L 290 65 L 190 105 Z" fill="#b78103" stroke="#ffd54f"/>

      <!-- Siluetas Románticas: Mine-Jaz y Paoliño en el Alféizar -->
      <g transform="translate(380, 310)">
        <!-- Paoliño de pie, atrapado por la solapa -->
        <rect x="35" y="20" width="30" height="60" fill="#455a64" rx="6"/>
        <circle cx="50" cy="5" r="14" fill="#ffccbc"/>
        <!-- Capa carmesí cayendo suave -->
        <path d="M 35 25 Q 15 60 20 90 Q 35 85 40 75 Z" fill="#b71c1c"/>

        <!-- Mine-Jaz inclinada sosteniéndolo y besándolo -->
        <path d="M -15 30 L 10 90 L -35 90 Z" fill="#1a237e"/>
        <circle cx="5" cy="15" r="13" fill="#ffccbc"/>
        <!-- Cabello oscuro gótico -->
        <path d="M -8 15 Q 5 0 18 10 Q 5 15 -8 20 Z" fill="#212121"/>
        <!-- El Nuevo Monóculo de Oro brillando en la mejilla/regazo -->
        <circle cx="12" cy="18" r="4" fill="none" stroke="#ffd700" stroke-width="2"/>
        <line x1="16" y1="18" x2="25" y2="35" stroke="#ffd700" stroke-width="1"/>

        <!-- Manos entrelazadas -->
        <circle cx="20" cy="50" r="6" fill="#ffd54f"/>
      </g>

      <rect y="440" width="800" height="60" fill="#080b11"/>
      <text x="400" y="475" text-anchor="middle" font-family="'Cinzel', 'Trajan Pro', serif" font-size="16" fill="#d4af37" letter-spacing="4">
        ACTO V • EL MONÓCULO DE ORO Y GRAVEDAD PARA DOS
      </text>
    </svg>
  `,

  train: () => `
    <svg viewBox="0 0 800 500" class="story-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trainNebula" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#120024"/>
          <stop offset="60%" stop-color="#001a33"/>
          <stop offset="100%" stop-color="#000"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#trainNebula)"/>

      <!-- Dos Lunas Gemelas -->
      <circle cx="180" cy="120" r="50" fill="#b0bec5" opacity="0.7"/>
      <circle cx="620" cy="160" r="65" fill="#cfd8dc" opacity="0.6"/>

      <!-- Rieles Magnéticos de Plasma Flotantes -->
      <path d="M 0 320 Q 400 260 800 310" stroke="#00e5ff" stroke-width="4" fill="none" opacity="0.8"/>
      <path d="M 0 335 Q 400 275 800 325" stroke="#00e5ff" stroke-width="4" fill="none" opacity="0.8"/>

      <!-- Galeón-Tren Interestelar: Cometa de Aldebarán -->
      <g transform="translate(250, 200)">
        <path d="M 20 70 L 60 20 L 260 20 L 290 70 Z" fill="#263238" stroke="#d4af37" stroke-width="2"/>
        <path d="M 60 20 L 90 -10 L 220 -10 L 260 20 Z" fill="#37474f"/>
        <!-- Ventanillas de Primera Clase con luz cálida -->
        <rect x="80" y="32" width="25" height="18" rx="3" fill="#ffe082"/>
        <rect x="120" y="32" width="25" height="18" rx="3" fill="#ffe082"/>
        <rect x="160" y="32" width="25" height="18" rx="3" fill="#ffe082"/>
        <rect x="200" y="32" width="25" height="18" rx="3" fill="#ffe082"/>
        <!-- Silueta de Paoliño colgado de la litera visible en una ventana -->
        <line x1="172" y1="35" x2="172" y2="48" stroke="#b71c1c" stroke-width="2"/>
        <!-- Mascarón de proa en forma de quimera estelar -->
        <path d="M 290 70 Q 330 65 350 50 Q 320 80 280 85 Z" fill="#d4af37"/>
        <!-- Propulsores de hiper-esencia -->
        <polygon points="10,40 -30,50 10,60" fill="#d500f9" opacity="0.9"/>
      </g>

      <rect y="440" width="800" height="60" fill="#080b11"/>
      <text x="400" y="475" text-anchor="middle" font-family="'Cinzel', 'Trajan Pro', serif" font-size="16" fill="#d4af37" letter-spacing="4">
        SECUELA • ASESINATO EN EL EXPRESO DE ORIÓN
      </text>
    </svg>
  `
};
