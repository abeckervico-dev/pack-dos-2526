# Packrafting El Chaltén

## Resumen del Proyecto
- **Nombre**: Packrafting El Chaltén
- **Objetivo**: Web profesional bilingüe para comercializar experiencias de packrafting en la Patagonia Argentina
- **Características principales**: Sistema de reservas integrado, galería multimedia, información de seguridad, FAQ, formulario de contacto

## URLs
- **Desarrollo**: https://3000-ibsupbn1lt9f5yzdu36xl-6532622b.e2b.dev
- **Producción**: https://packrafting-elchalten.pages.dev (pendiente de deploy)
- **GitHub**: https://github.com/[pendiente]
- **Backup completo**: https://page.gensparksite.com/project_backups/toolu_01MFBZJjyWcu59e7iWy7stMb.tar.gz

## Arquitectura de Datos
- **Modelos de datos**: Contactos del formulario (nombre, email, teléfono, fecha, cantidad de personas, mensaje)
- **Servicios de almacenamiento**: Cloudflare Pages para hosting, posible integración con D1 para almacenar consultas
- **Flujo de datos**: Frontend → API Hono → Email/Base de datos

## Funcionalidades Implementadas ✅
1. **Sistema bilingüe completo (ES/EN)** con cambio dinámico
2. **Hero section** con imagen real del Fitz Roy y packrafting
3. **Sección de experiencia** con fotos profesionales del servicio
4. **Sección de seguridad** con imágenes del equipo en acción
5. **Galería fotográfica profesional** con 12+ imágenes reales
6. **Sección Aventura Todo el Año** mostrando actividades invernales
7. **FAQ interactivo** con preguntas frecuentes
8. **Formulario de contacto** funcional con API endpoint
9. **Widget Turitop oficial** (código P2) integrado y funcional
10. **Logo oficial** de Packrafting El Chaltén en header y footer
11. **Diseño responsive** optimizado para móviles
12. **SEO optimizado** con meta tags y Open Graph

## Funcionalidades Pendientes 🚧
1. Integración con servicio de email real (SendGrid/Resend)
2. Base de datos D1 para almacenar consultas
3. Sistema de notificaciones automáticas
4. Galería con lightbox para ampliar imágenes
5. Blog/Noticias para contenido SEO
6. Integración con WhatsApp Business API
7. Dashboard administrativo para gestión de reservas
8. Optimización de carga de imágenes con lazy loading

## Próximos Pasos Recomendados 🎯
1. **Configurar dominio personalizado** en Cloudflare Pages
2. **Integrar servicio de email** para formulario de contacto
3. ~~**Subir imágenes reales**~~ ✅ COMPLETADO - 15 imágenes profesionales integradas
4. **Crear contenido para blog** (SEO)
5. **Implementar analytics** (Google Analytics/Plausible)
6. **Configurar certificado SSL** y security headers
7. **Optimizar imágenes** con formato WebP y lazy loading
8. **Añadir testimonios** de clientes satisfechos

## Guía de Usuario 📖

### Para Visitantes:
1. Navega por las secciones usando el menú superior
2. Cambia el idioma con los botones ES/EN
3. Explora la experiencia y requisitos de seguridad
4. Consulta las preguntas frecuentes
5. Reserva directamente con el botón "Reservar Ahora" o usa el widget Turitop
6. Contacta mediante el formulario para consultas personalizadas

### Para Administradores:
1. Accede al código en `/home/user/webapp/`
2. Modifica traducciones en `src/i18n/translations.ts`
3. Actualiza estilos en `tailwind.config.js`
4. Gestiona el servicio con PM2: `pm2 status`, `pm2 restart packrafting-elchalten`
5. Deploy a producción: `npm run deploy`

## Stack Tecnológico
- **Framework**: Hono + TypeScript
- **Hosting**: Cloudflare Pages
- **Estilos**: Tailwind CSS
- **Idiomas**: Sistema i18n personalizado
- **Reservas**: Widget Turitop integrado
- **Runtime**: Cloudflare Workers

## Comandos Útiles
```bash
# Desarrollo local
npm run dev:sandbox

# Compilar proyecto
npm run build

# Deploy a Cloudflare Pages
npm run deploy

# Gestión con PM2
pm2 status
pm2 logs packrafting-elchalten --nostream
pm2 restart packrafting-elchalten

# Git
git add .
git commit -m "mensaje"
git push origin main
```

## Notas de Deployment
- Configurar variable de entorno `CLOUDFLARE_API_TOKEN` antes de deploy
- El proyecto usa `wrangler` para deployment a Cloudflare Pages
- Las imágenes deben estar en `public/static/images/`
- El widget de Turitop requiere el script externo cargado

## Contacto
- **Email**: contacto@hikingtour.tur.ar
- **Desarrollado por**: Alexander Becker Vico
- **Licencia**: Todos los derechos reservados - Hiking Tour El Chaltén

---
*Última actualización: Diciembre 2024*