# 👑 El Relicario de Cuentos

Una experiencia web interactiva inspirada en un libro clásico encuadernado en cuero y oro, con animación de paso de página 3D, ilustraciones de alta fidelidad, efectos de sonido sintetizados y diseño totalmente responsivo para móviles y ordenadores.

---

## 📖 Cuento Destacado: *El Teorema de la Gárgola Tibia*

> **Protagonistas:** Mine-Jaz (Criminóloga Real) & Paoliño (Escudero-Ingeniero de Coraza y Capa Carmesí).  
> **Escenario:** El Castillo-Estación *Valcora*, orbitando los anillos del planeta Vésper.  
> **Misterio:** La sagrada Corona de Quásar ha desaparecido horas antes de la coronación imperial. Sin puertas forzadas ni sensores violados, una gárgola de desagüe sospechosamente tibia y un tubo de enfriamiento pondrán a prueba el ingenio (y la dignidad gimnástica) de nuestros héroes.

---

## ✨ Características Principales

1. **Lectura Inmersiva:**
   - Animación de vuelta de página en 3D (`page-flip`) con sombreado dinámico.
   - Efectos de sonido de paso de página generados dinámicamente mediante **Web Audio API** (sin dependencias externas).
   - Letra capitular ornamental, títulos dorados y marcas de libro interactivas.

2. **Apartado de Ilustraciones (Galería & Modal Lightbox):**
   - 11 ilustraciones en alta resolución que retratan cada momento crucial del cuento.
   - Pestaña de **Galería** con rejilla visual y citas textuales de la escena.
   - Visor Lightbox con navegación rápida (teclado, clics y gestos táctiles).

3. **Dossier de Personajes e Índice:**
   - Fichas detalladas con el perfil, rol y curiosidades de Mine-Jaz, Paoliño, el Margrave Kaelen, Sor Sílice y el Senescal Orlov.
   - Índice capitular con saltos de página instantáneos.

4. **Personalización del Lector:**
   - **4 Temas de Lectura:** Pergamino Clásico, Noche Estelar, Sepia de Archivo y Minimalista Limpio.
   - **3 Ambientes de Fondo:** Escritorio de Caoba, Estación Valcora y Mármol Imperial.
   - Control de tamaño de fuente (A- / A+) y conmutador de sonido.

5. **Diseño Móvil y Táctil (Responsive):**
   - Adaptación fluida a pantallas pequeñas (iPhone, Android, Tablets).
   - Cajón de ajustes inferior deslizante (`bottom sheet`) para una lectura limpia sin distracciones.
   - Soporte para gestos táctiles (swipe para pasar de página).

---

## 🚀 Despliegue en GitHub Pages

Este proyecto funciona enteramente con HTML5, CSS3 y Vanilla JavaScript, sin requerir compilación ni backend:

1. Ve a tu repositorio en GitHub: `Settings` > `Pages`.
2. En **Build and deployment** > **Branch**, selecciona la rama `main` (o `master`) y carpeta `/ (root)`.
3. Haz clic en **Save**. En un par de minutos tu libro estará disponible en línea en `https://<tu-usuario>.github.io/<tu-repositorio>/`.

---

## 📂 Estructura del Proyecto

```text
├── index.html              # Estructura del libro y paneles interactivos
├── styles.css              # Estilos visuales, temas, 3D flips y responsive design
├── app.js                 # Lógica del lector, audio API, gestos táctiles y navegación
├── stories.js             # Base de datos de cuentos, texto íntegro, metadatos e ilustraciones
├── illustrations.js       # Fallbacks vectoriales SVG y utilidades de renderizado
├── cuento uno.txt         # Manuscrito original del relato
├── assets/                # Fondos ambientales de escritorio
└── ilustraciones/         # Colección de ilustraciones HD organizadas por cuento
```

---
*Creado con pasión por la narrativa de ciencia ficción, misterio deductivo y diseño web artesanal.*
