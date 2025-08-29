# Packrafting El Chaltén

## Resumen del Proyecto
- **Nombre**: Packrafting El Chaltén
- **Objetivo**: Web profesional bilingüe para comercializar experiencias de packrafting en la Patagonia Argentina
- **Características principales**: Sistema de reservas integrado, galería multimedia, información de seguridad, FAQ, formulario de contacto

## URLs
- **Desarrollo**: https://3000-ibsupbn1lt9f5yzdu36xl-6532622b.e2b.dev
- **Producción**: https://packrafting-elchalten.pages.dev (pendiente de deploy)
- **GitHub**: https://github.com/[pendiente]

## Arquitectura de Datos
- **Modelos de datos**: Contactos del formulario (nombre, email, teléfono, fecha, cantidad de personas, mensaje)
- **Servicios de almacenamiento**: Cloudflare Pages para hosting, posible integración con D1 para almacenar consultas
- **Flujo de datos**: Frontend → API Hono → Email/Base de datos

## Funcionalidades Implementadas ✅
1. **Sistema bilingüe completo (ES/EN)** con cambio dinámico
2. **Hero section** con llamadas a la acción prominentes
3. **Sección de experiencia** con detalles del servicio
4. **Sección de seguridad** con certificaciones y protocolos
5. **Galería de imágenes** responsive
6. **FAQ interactivo** con preguntas frecuentes
7. **Formulario de contacto** funcional con API endpoint
8. **Integración con widget Turitop** para reservas directas
9. **Diseño responsive** optimizado para móviles
10. **SEO optimizado** con meta tags y Open Graph

## Funcionalidades Pendientes 🚧
1. Integración con servicio de email real (SendGrid/Resend)
2. Base de datos D1 para almacenar consultas
3. Sistema de notificaciones automáticas
4. Galería con lightbox para ampliar imágenes
5. Blog/Noticias para contenido SEO
6. Integración con WhatsApp Business API
7. Dashboard administrativo para gestión de reservas

## Próximos Pasos Recomendados 🎯
1. **Configurar dominio personalizado** en Cloudflare Pages
2. **Integrar servicio de email** para formulario de contacto
3. **Subir imágenes reales** de las experiencias
4. **Crear contenido para blog** (SEO)
5. **Implementar analytics** (Google Analytics/Plausible)
6. **Configurar certificado SSL** y security headers
7. **Optimizar velocidad de carga** con CDN de imágenes

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