# Packrafting El Chaltén 🚣‍♂️🏔️

## Descripción del Proyecto
**Nombre**: Packrafting El Chaltén  
**Objetivo**: Website profesional bilingüe para promocionar y gestionar reservas de experiencias de packrafting en El Chaltén, Patagonia Argentina  
**Características principales**: 
- Sistema de reservas integrado con Turitop (widget P2)
- Diseño responsive y optimizado para móviles
- Contenido bilingüe (ES/EN) con sistema i18n personalizado
- Galería multimedia con integración de videos HD
- Copy de marketing enfocado en experiencia auténtica patagónica

## URLs de Acceso
- **Producción**: https://hikingtour.tur.ar (pendiente DNS)
- **Cloudflare Pages**: https://packrafting-elchalten.pages.dev ✅
- **GitHub**: https://github.com/abeckervico-dev/pack-dos-2526 ✅
- **Dossier Español**: https://abeckervico-dev.github.io/pack-dos-2526/Dosier%20Comercial%20-%20Packrafting%20El%20Chalt%C3%A9n%20espa%C3%B1ol.htm ✅
- **Dossier Inglés**: https://abeckervico-dev.github.io/pack-dos-2526/Commercial%20Dossier%20-%20Packrafting%20El%20Chalt%C3%A9n%20ingles.htm ✅

## Arquitectura de Datos
- **Modelo de datos**: Website estático con contenido dinámico vía JavaScript
- **Servicios de almacenamiento**: No requiere base de datos (integración con Turitop para reservas)
- **Flujo de datos**: Widget Turitop maneja reservas, pagos y disponibilidad externamente

## Funcionalidades Completadas ✅
1. **Widgets de reservas Turitop bilingües**: Dos widgets separados (ES/EN) que se alternan según idioma
2. **Sistema i18n completo**: 100% del sitio traducido, incluyendo menús, botones y contenido dinámico
3. **Galería multimedia HD**: 
   - Videos embebidos directamente (no enlaces externos)
   - Hero image con efecto parallax
   - Grid responsivo de imágenes
4. **Reseñas reales de Google**: Integradas del perfil de Hiking Tour El Chaltén
5. **Servicios B2B**: 
   - Dossiers comerciales bilingües alojados en GitHub Pages
   - Enlaces dinámicos según idioma seleccionado (/dossier-es y /dossier-en)
   - Redirects automáticos a páginas HTML en GitHub Pages
   - Apertura en nueva pestaña para experiencia fluida
   - Integración con GitHub repository pack-dos-2526
6. **Diseño responsive**: Optimizado para todos los dispositivos
7. **Navegación suave**: Scroll smooth entre secciones
8. **Información actualizada**: 
   - WhatsApp: +54 9 2902 48-4140
   - Email: contacto@hikingtour.tur.ar
   - Instagram: @hiking.tour.chalten
   - Certificaciones: CAP, R.P.A.T: 2.231, R.N.A.V: 20.311

## URIs Funcionales Actuales

### Páginas principales
- `/` - Homepage con todas las secciones
- `/#experience` - Sección de experiencia con widget de reservas
- `/#safety` - Protocolos de seguridad
- `/#gallery` - Galería multimedia
- `/#faq` - Preguntas frecuentes
- `/#contact` - Información de contacto
- `/dossier-es` - Dossier comercial B2B en español (redirect a GitHub Pages)
- `/dossier-en` - Commercial dossier B2B in English (redirect to GitHub Pages)

### API Endpoints
- `/api/translations/es` - Traducciones en español
- `/api/translations/en` - Traducciones en inglés
- `/api/contact` - Envío de formulario de contacto (POST)

## Funcionalidades Pendientes 🔄
1. **Enlaces reales de Google Drive**: Reemplazar placeholders con URLs reales de galerías
2. **Video de YouTube real**: Cambiar video placeholder por contenido real de packrafting
3. **Redes sociales**: Actualizar enlaces a Instagram/Facebook reales
4. **SEO avanzado**: Implementar schema.org para mejor indexación
5. **Analytics**: Integrar Google Analytics o similar

## Próximos Pasos Recomendados 🎯
1. **Proporcionar contenido multimedia**:
   - Enlaces de Google Drive para galerías de fotos
   - URL de video destacado en YouTube
   - Handle de Instagram actualizado

2. **Deployment a producción**:
   - Configurar Cloudflare Pages
   - Conectar dominio personalizado
   - Configurar SSL y CDN

3. **Optimizaciones**:
   - Comprimir imágenes para carga más rápida
   - Implementar lazy loading en galería
   - Añadir testimonios de clientes

4. **Marketing digital**:
   - Configurar Google My Business
   - Implementar píxel de Facebook
   - Crear campaña de remarketing

## Guía de Uso

### Para el visitante:
1. Navegar por las secciones para conocer la experiencia
2. Ver galería de fotos y videos
3. Revisar información de seguridad y FAQs
4. Reservar directamente desde el widget en la sección "La Experiencia"
5. Cambiar idioma con los botones ES/EN en la navegación

### Para el administrador:
1. Las reservas se gestionan desde el panel de Turitop
2. Actualizar contenido editando archivos TypeScript
3. Modificar traducciones en `/src/i18n/translations.ts`
4. Agregar imágenes subiendo a CDN y actualizando URLs

## Stack Tecnológico
- **Framework**: Hono (Edge-first web framework)
- **Runtime**: Cloudflare Workers/Pages
- **Estilos**: Tailwind CSS (via CDN)
- **Iconos**: Font Awesome 6.4
- **Build**: Vite + TypeScript
- **Deployment**: Cloudflare Pages
- **Reservas**: Turitop Widget (Empresa H407, Servicio P2)

## Configuración de Deployment
- **Plataforma**: Cloudflare Pages
- **Branch de producción**: main
- **Estado**: ✅ ACTIVO EN PRODUCCIÓN
- **Dominio personalizado**: hikingtour.tur.ar (DNS propagado)
- **Última actualización**: 02/09/2025
- **GitHub Repository**: abeckervico-dev/pack-dos-2526

## Notas Técnicas
- Widget Turitop configurado con company="H407" y service="P2"
- Colores personalizados siguiendo paleta patagónica (azul, verde, ice)
- Imágenes optimizadas y servidas desde CDN de GenSpark
- Sistema i18n personalizado sin dependencias externas
- PM2 configurado para desarrollo local

## Contacto del Desarrollador
Proyecto desarrollado siguiendo las mejores prácticas de desarrollo web moderno, optimizado para edge computing y experiencia de usuario premium.

---
*"Donde el río te llama por tu nombre" - Packrafting El Chaltén* 🏔️🚣‍♂️