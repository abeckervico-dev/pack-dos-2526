import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { translations } from './i18n/translations'

type Bindings = {
  RESEND_API_KEY?: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))

// API endpoint for contact form
app.post('/api/contact', async (c) => {
  try {
    const { name, email, phone, date, people, message } = await c.req.json()
    
    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ 
        success: false, 
        message: 'Por favor complete todos los campos requeridos' 
      }, 400)
    }

    // Format the email content
    const emailContent = `
      <h2>Nueva consulta desde Packrafting El Chaltén</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
      ${date ? `<p><strong>Fecha deseada:</strong> ${date}</p>` : ''}
      ${people ? `<p><strong>Número de personas:</strong> ${people}</p>` : ''}
      <p><strong>Mensaje:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Este mensaje fue enviado desde el formulario de contacto de hikingtour.tur.ar</small></p>
    `

    // Send email using Resend API
    const RESEND_API_KEY = c.env.RESEND_API_KEY
    
    if (!RESEND_API_KEY) {
      // Fallback if API key is not configured
      console.log('Contact form submission (no API key):', { name, email, phone, date, people, message })
      return c.json({ 
        success: true, 
        message: 'Gracias por tu consulta. Te responderemos a la brevedad.' 
      })
    }
    
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Packrafting El Chaltén <onboarding@resend.dev>',
        to: 'contacto@hikingtour.tur.ar',
        subject: `Nueva consulta de ${name} - Packrafting El Chaltén`,
        html: emailContent,
        reply_to: email
      })
    })
    
    if (!resendResponse.ok) {
      const errorData = await resendResponse.text()
      console.error('Resend API error:', errorData)
      throw new Error('Error al enviar el email')
    }
    
    // Log successful submission
    console.log('Email sent successfully to contacto@hikingtour.tur.ar')
    
    return c.json({ 
      success: true, 
      message: 'Gracias por tu consulta. Te responderemos a la brevedad.' 
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return c.json({ 
      success: false, 
      message: 'Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.' 
    }, 500)
  }
})

// API endpoint for translations
app.get('/api/translations/:lang', (c) => {
  const lang = c.req.param('lang') as 'es' | 'en'
  const validLang = lang === 'en' ? 'en' : 'es'
  
  return c.json(translations[validLang])
})

// Serve B2B Dossier in Spanish - GitHub Pages
app.get('/dossier-es', (c) => {
  return c.redirect('https://abeckervico-dev.github.io/pack-dos-2526/Dosier%20Comercial%20-%20Packrafting%20El%20Chalt%C3%A9n%20espa%C3%B1ol.htm')
})

// Serve B2B Dossier in English - GitHub Pages
app.get('/dossier-en', (c) => {
  return c.redirect('https://abeckervico-dev.github.io/pack-dos-2526/Commercial%20Dossier%20-%20Packrafting%20El%20Chalt%C3%A9n%20ingles.htm')
})

// Main HTML route
app.get('/', (c) => {
  const html = `
<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Packrafting El Chaltén - Descubre la Patagonia Auténtica</title>
    <meta name="description" content="Experiencias únicas de packrafting en El Chaltén. Navega el Río de las Vueltas con vistas al Fitz Roy. Aventura segura y profesional en la Patagonia Argentina.">
    <meta name="keywords" content="packrafting, el chalten, patagonia, argentina, adventure, turismo aventura, río de las vueltas, fitz roy">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://packrafting-elchalten.com/">
    <meta property="og:title" content="Packrafting El Chaltén - Descubre la Patagonia Auténtica">
    <meta property="og:description" content="Experiencias únicas de packrafting en El Chaltén. Navega el Río de las Vueltas con vistas al Fitz Roy.">
    <meta property="og:image" content="/static/images/hero-packrafting.jpg">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              'patagonia-blue': '#4A90E2',
              'patagonia-sky': '#87CEEB',
              'patagonia-green': '#2F5233',
              'patagonia-rock': '#696969',
              'patagonia-ice': '#E6F3FF',
            }
          }
        }
      }
    </script>
    
    <!-- Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Custom Styles -->
    <style>
      .hero-gradient {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.35) 100%);
      }
      
      .glass-effect {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .btn-primary {
        @apply px-6 py-3 bg-patagonia-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg;
      }
      
      .fade-in {
        animation: fadeIn 1s ease-in;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .parallax {
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      
      /* Hero HD image optimization */
      #hero-bg {
        background-color: #0a0a0a;
        overflow: hidden;
      }
      
      #hero-bg picture,
      #hero-bg img {
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        perspective: 1000px;
        -webkit-perspective: 1000px;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
      }
      
      /* Force high quality rendering */
      #hero-bg img {
        rendering: optimizeQuality;
        color-rendering: optimizeQuality;
        shape-rendering: geometricPrecision;
        text-rendering: geometricPrecision;
      }
      
      @media (max-width: 768px) {
        .hero-image-container img {
          object-position: center center;
        }
      }
      
      /* Video optimization styles for HD quality */
      video {
        object-fit: cover;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        will-change: transform;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      
      /* Parallax para video y imagen */
      [data-parallax] {
        will-change: transform;
        transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
      }
      
      video::-webkit-media-controls {
        display: none !important;
      }
      
      .video-container {
        position: relative;
        overflow: hidden;
        background: #000;
      }
      
      /* Ensure smooth playback */
      @media (prefers-reduced-motion: reduce) {
        video {
          display: none;
        }
      }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav id="navbar" class="fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-md">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <span class="text-xl font-bold text-gray-700">Packrafting El Chaltén</span>
                </div>
                
                <div class="hidden md:flex items-center space-x-6">
                    <a href="#home" class="nav-link text-gray-700 hover:text-patagonia-blue transition" data-i18n="nav.home">Inicio</a>
                    <a href="#experience" class="nav-link text-gray-700 hover:text-patagonia-blue transition" data-i18n="nav.experience">Experiencia</a>
                    <a href="#safety" class="nav-link text-gray-700 hover:text-patagonia-blue transition" data-i18n="nav.safety">Seguridad</a>
                    <a href="#gallery" class="nav-link text-gray-700 hover:text-patagonia-blue transition" data-i18n="nav.gallery">Galería</a>
                    <a href="#faq" class="nav-link text-gray-700 hover:text-patagonia-blue transition" data-i18n="nav.faq">FAQ</a>
                    <a href="#contact" class="nav-link text-gray-700 hover:text-patagonia-blue transition" data-i18n="nav.contact">Contacto</a>
                    
                    <!-- Language Switcher -->
                    <div class="flex items-center space-x-2 ml-4">
                        <button onclick="setLanguage('es')" class="lang-btn text-sm px-2 py-1 rounded" data-lang="es">ES</button>
                        <span class="text-gray-400">|</span>
                        <button onclick="setLanguage('en')" class="lang-btn text-sm px-2 py-1 rounded" data-lang="en">EN</button>
                    </div>
                    
                    <a href="#experience" 
                       class="bg-patagonia-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 inline-block">
                        <i class="fas fa-calendar-check mr-2"></i>
                        <span data-i18n="nav.book">Reservar</span>
                    </a>
                </div>
                
                <!-- Mobile menu button -->
                <button id="mobile-menu-btn" class="md:hidden text-gray-700">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>
        
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
            <div class="px-4 py-2 space-y-2">
                <a href="#home" class="block py-2 text-gray-700" data-i18n="nav.home">Inicio</a>
                <a href="#experience" class="block py-2 text-gray-700" data-i18n="nav.experience">Experiencia</a>
                <a href="#safety" class="block py-2 text-gray-700" data-i18n="nav.safety">Seguridad</a>
                <a href="#gallery" class="block py-2 text-gray-700" data-i18n="nav.gallery">Galería</a>
                <a href="#faq" class="block py-2 text-gray-700" data-i18n="nav.faq">FAQ</a>
                <a href="#contact" class="block py-2 text-gray-700" data-i18n="nav.contact">Contacto</a>
                <div class="flex space-x-2 py-2">
                    <button onclick="setLanguage('es')" class="lang-btn text-sm px-3 py-1 bg-gray-100 rounded" data-lang="es">ES</button>
                    <button onclick="setLanguage('en')" class="lang-btn text-sm px-3 py-1 bg-gray-100 rounded" data-lang="en">EN</button>
                </div>
                <a href="#experience" 
                   class="block w-full bg-patagonia-blue text-white text-center py-2 rounded-lg">
                    <span data-i18n="nav.book">Reservar Ahora</span>
                </a>
            </div>
        </div>
    </nav>
    
    <!-- Hero Section -->
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <!-- Parallax Background with Hero Image -->
        <div class="absolute inset-0 z-0" id="hero-bg">
            <!-- Gradient Overlay -->
            <div class="hero-gradient absolute inset-0 z-20"></div>
            
            <!-- Hero Video Background from YouTube -->
            <div class="absolute inset-0 z-10 overflow-hidden bg-black">
                <!-- YouTube Video Embed - Packrafting El Chaltén -->
                <div class="absolute inset-0 w-full h-full">
                    <iframe 
                        id="hero-video"
                        src="https://www.youtube.com/embed/tBe7LSnO2Dk?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&playlist=tBe7LSnO2Dk"
                        class="absolute inset-0 w-full h-full"
                        style="width: 100vw; 
                               height: 56.25vw; 
                               min-height: 100vh; 
                               min-width: 177.77vh;
                               position: absolute;
                               top: 50%;
                               left: 50%;
                               transform: translate(-50%, -50%) scale(1.1);"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
                
                <!-- Overlay muy suave para mejorar legibilidad sin ocultar el video -->
                <div class="absolute inset-0 bg-black/20 z-10"></div>
            </div>
        </div>
        
        <!-- Content -->
        <div class="relative z-20 text-center text-white px-4 fade-in mt-20">
            <div class="bg-black/30 backdrop-blur-sm p-8 rounded-xl max-w-4xl mx-auto">
                <h1 class="text-5xl md:text-7xl font-bold mb-2 tracking-wider" 
                    style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);" 
                    data-i18n="hero.title">
                    PACKRAFTING
                </h1>
                <h2 class="text-4xl md:text-6xl font-bold mb-6 tracking-wide" 
                    style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);" 
                    data-i18n="hero.title2">
                    EL CHALTÉN
                </h2>

                <p class="text-lg md:text-2xl mb-8 max-w-3xl mx-auto" 
                   style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);" 
                   data-i18n="hero.description">
                    Experiencias 100% Privadas en el Río de las Vueltas
                </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#experience" 
                   class="px-8 py-4 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition transform hover:scale-105 shadow-xl">
                    <span data-i18n="hero.cta1">RESERVAR AHORA</span>
                </a>
                <a href="#gallery" 
                   class="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-patagonia-blue transition">
                    <i class="fas fa-images mr-2"></i>
                    <span data-i18n="hero.cta2">VER GALERÍA</span>
                </a>
            </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <i class="fas fa-chevron-down text-white text-2xl"></i>
        </div>
    </section>
    
    <!-- Experience Section -->
    <section id="experience" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4" data-i18n="experience.title">La Experiencia</h2>
                <p class="text-xl text-gray-600" data-i18n="experience.subtitle">Una aventura única en la Patagonia argentina</p>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Left Column: Experience Details -->
                <div>
                    <p class="text-lg text-gray-700 mb-6" data-i18n="experience.description">
                        Imaginate remando por aguas cristalinas mientras el viento patagónico acaricia tu rostro 
                        y el Fitz Roy se alza majestuoso en el horizonte. No es solo una actividad, es tu conexión 
                        íntima con la Patagonia salvaje.
                    </p>
                    
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-3 text-patagonia-blue">
                                <i class="fas fa-check-circle mr-2"></i>
                                <span data-i18n="experience.includes">Tu aventura incluye:</span>
                            </h3>
                            <ul class="space-y-2 text-gray-700">
                                <li><i class="fas fa-chevron-right text-patagonia-green mr-2"></i><span data-i18n="experience.include1">Packraft de expedición</span></li>
                                <li><i class="fas fa-chevron-right text-patagonia-green mr-2"></i><span data-i18n="experience.include2">Equipo completo de seguridad</span></li>
                                <li><i class="fas fa-chevron-right text-patagonia-green mr-2"></i><span data-i18n="experience.include3">Guías locales certificados</span></li>
                                <li><i class="fas fa-chevron-right text-patagonia-green mr-2"></i><span data-i18n="experience.include4">Snack patagónico</span></li>
                                <li><i class="fas fa-chevron-right text-patagonia-green mr-2"></i><span data-i18n="experience.include5">Transporte desde El Chaltén</span></li>
                            </ul>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-patagonia-ice p-4 rounded-lg">
                                <i class="fas fa-clock text-patagonia-blue text-2xl mb-2"></i>
                                <h4 class="font-semibold" data-i18n="experience.duration.title">Duración</h4>
                                <p class="text-sm" data-i18n="experience.duration.time">5 horas de pura aventura</p>
                            </div>
                            <div class="bg-patagonia-ice p-4 rounded-lg">
                                <i class="fas fa-water text-patagonia-blue text-2xl mb-2"></i>
                                <h4 class="font-semibold">Remada</h4>
                                <p class="text-sm" data-i18n="experience.duration.difficulty">1,5 horas de remada</p>
                            </div>
                            <div class="bg-patagonia-ice p-4 rounded-lg">
                                <i class="fas fa-calendar text-patagonia-blue text-2xl mb-2"></i>
                                <h4 class="font-semibold" data-i18n="experience.season">Temporada</h4>
                                <p class="text-sm" data-i18n="experience.seasonValue">Octubre - Abril</p>
                            </div>
                            <div class="bg-patagonia-ice p-4 rounded-lg">
                                <i class="fas fa-signal text-patagonia-blue text-2xl mb-2"></i>
                                <h4 class="font-semibold" data-i18n="experience.level">Dificultad</h4>
                                <p class="text-sm" data-i18n="experience.levelValue">Moderada</p>
                            </div>
                        </div>
                        

                    </div>
                </div>
                
                <!-- Right Column: Turitop Widget -->
                <div class="lg:sticky lg:top-24">
                    <div class="bg-gray-50 p-6 rounded-lg shadow-xl">
                        <h3 class="text-2xl font-bold text-center mb-6 text-patagonia-blue">
                            <i class="fas fa-calendar-check mr-2"></i>
                            <span data-i18n="experience.bookingTitle">Reservá tu aventura</span>
                        </h3>
                        
                        <!-- Turitop Widget Embed -->
                        <div class="load-turitop widget-spanish" data-service="P2" data-lang="es" data-embed="box"></div>
                        <div class="load-turitop widget-english hidden" data-service="P2" data-lang="en" data-embed="box"></div>
                        
                        <!-- Fallback iframe si el widget no carga -->
                        <noscript>
                            <iframe src="https://app.turitop.com/booking/box/H407/P2/es/" 
                                    width="100%" 
                                    height="600" 
                                    frameborder="0" 
                                    style="border: none; margin-top: 20px;">
                            </iframe>
                        </noscript>
                        
                        <!-- Alternative Booking Button -->
                        <div class="mt-4 text-center">
                            <p class="text-sm text-gray-600 mb-2">¿Problemas con el calendario?</p>
                            <a href="https://app.turitop.com/booking/box/H407/P2/es/" 
                               target="_blank" 
                               class="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                                <i class="fas fa-external-link-alt mr-2"></i>
                                Abrir Sistema de Reservas
                            </a>
                        </div>
                        
                        <!-- Trust Badges -->
                        <div class="mt-6 pt-6 border-t border-gray-200">
                            <div class="flex justify-around items-center">
                                <div class="text-center">
                                    <i class="fas fa-shield-alt text-2xl text-green-600 mb-1"></i>
                                    <p class="text-xs text-gray-600" data-i18n="experience.secure">Pago Seguro</p>
                                </div>
                                <div class="text-center">
                                    <i class="fas fa-undo text-2xl text-blue-600 mb-1"></i>
                                    <p class="text-xs text-gray-600" data-i18n="experience.cancellation">Cancelación Flexible</p>
                                </div>
                                <div class="text-center">
                                    <i class="fas fa-headset text-2xl text-purple-600 mb-1"></i>
                                    <p class="text-xs text-gray-600" data-i18n="experience.support">Soporte 24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Safety Section -->
    <section id="safety" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4" data-i18n="safety.title">Seguridad y Protocolos</h2>
                <p class="text-xl text-gray-600" data-i18n="safety.subtitle">Tu seguridad es nuestra prioridad</p>
                <p class="text-lg text-gray-500 mt-2" data-i18n="safety.description">Por cuarta temporada, seguimos siendo el único operador habilitado en la Reserva Provincial Lago del desierto</p>
            </div>
            
            <!-- Safety Hero Image -->
            <div class="mb-12">
                <img src="https://page.gensparksite.com/v1/base64_upload/0318f95f857e0f1d13d458cd0f6d9183" 
                     alt="Trabajo en equipo y seguridad" 
                     class="w-full max-w-4xl mx-auto rounded-lg shadow-xl">
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div class="text-center mb-4">
                        <i class="fas fa-certificate text-4xl text-patagonia-blue"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Certificaciones</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Prestador CAP</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>R.P.A.T: 2.231</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>R.N.A.V: 20.311</li>
                    </ul>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div class="text-center mb-4">
                        <i class="fas fa-life-ring text-4xl text-patagonia-blue"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Equipamiento</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Packrafts certificados</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Chalecos salvavidas</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i>Trajes secos</li>
                    </ul>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div class="text-center mb-4">
                        <i class="fas fa-cloud-sun text-4xl text-patagonia-blue"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Condiciones</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li><i class="fas fa-wind text-blue-500 mr-2"></i>Vientos < 22 nudos</li>
                        <li><i class="fas fa-water text-blue-500 mr-2"></i>Caudal seguro</li>
                        <li><i class="fas fa-sun text-yellow-500 mr-2"></i>Sin alertas</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Adventure in All Seasons Section -->
    <section id="seasons" class="py-20 bg-gradient-to-b from-white to-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4" data-i18n="seasons.title">Aventura Todo el Año</h2>
                <p class="text-xl text-gray-600" data-i18n="seasons.subtitle">Desde primavera hasta otoño, cada temporada tiene su magia</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8 mb-12">
                <div class="relative group">
                    <img src="https://page.gensparksite.com/v1/base64_upload/c266fce8e15e566f7d56b9956dcbe85a" 
                         alt="Packrafting invernal" 
                         class="rounded-lg shadow-xl w-full h-80 object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                        <div class="p-6 text-white">
                            <h3 class="text-2xl font-bold" data-i18n="seasons.winter">Aventuras Invernales</h3>
                        </div>
                    </div>
                </div>
                
                <div class="relative group">
                    <img src="https://page.gensparksite.com/v1/base64_upload/00f9eb05e6a52341d15d843d5b56c531" 
                         alt="Equipo en condiciones extremas" 
                         class="rounded-lg shadow-xl w-full h-80 object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                        <div class="p-6 text-white">
                            <h3 class="text-2xl font-bold" data-i18n="seasons.unique">Experiencias Únicas</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Gallery Section -->
    <section id="gallery" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4" data-i18n="gallery.title">Galería de Aventuras</h2>
                <p class="text-xl text-gray-600" data-i18n="gallery.subtitle">Momentos inolvidables en la Patagonia</p>
                
                <!-- Enlaces externos -->
                <div class="mt-6 flex flex-wrap justify-center gap-4">
                    <a href="https://www.instagram.com/hiking.tour.chalten" 
                       target="_blank" 
                       class="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105">
                        <i class="fab fa-instagram mr-2"></i>
                        <span>@hiking.tour.chalten</span>
                    </a>
                    <a href="https://wa.me/5492902484140" 
                       target="_blank" 
                       class="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105">
                        <i class="fab fa-whatsapp mr-2"></i>
                        <span>WhatsApp Directo</span>
                    </a>
                </div>
            </div>
            
            <!-- Media Gallery with Videos -->
            <div class="mb-12">
                <div class="grid lg:grid-cols-3 gap-4">
                    <!-- Left Column: Photos Grid -->
                    <div class="lg:col-span-2">
                        <div class="grid grid-cols-2 gap-4">
                            <!-- Photo 1 -->
                            <div class="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                                <img src="https://page.gensparksite.com/v1/base64_upload/415d3394dd5f0c748694368bd91683fc" 
                                     alt="Packrafting con vista al Fitz Roy" 
                                     class="w-full h-48 object-cover hover:scale-110 transition duration-500">
                            </div>
                            
                            <!-- Photo 2 -->
                            <div class="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                                <img src="https://page.gensparksite.com/v1/base64_upload/afce1c4d34ff63a51d7751d8b7c72f48" 
                                     alt="Preparación del grupo" 
                                     class="w-full h-48 object-cover hover:scale-110 transition duration-500">
                            </div>
                            
                            <!-- Photo 3 -->
                            <div class="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                                <img src="https://page.gensparksite.com/v1/base64_upload/f8c05b7c6479a64823f393c4a474d1ce" 
                                     alt="Grupo con packrafts" 
                                     class="w-full h-48 object-cover hover:scale-110 transition duration-500">
                            </div>
                            
                            <!-- Photo 4 -->
                            <div class="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                                <img src="https://page.gensparksite.com/v1/base64_upload/a0af2b4a61487b9f5c50f8dbb1956a4c" 
                                     alt="Soledad y naturaleza" 
                                     class="w-full h-48 object-cover hover:scale-110 transition duration-500">
                            </div>
                            
                            <!-- Row 3: 2 photos -->
                            <div class="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                                <img src="https://page.gensparksite.com/v1/base64_upload/901b16630c289572a34bc012a86d0fd4" 
                                     alt="Navegando aguas cristalinas" 
                                     class="w-full h-48 object-cover hover:scale-110 transition duration-500">
                            </div>
                            
                            <div class="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                                <img src="https://page.gensparksite.com/v1/base64_upload/4e16fb0b0de94b3ee796b135a5ee5167" 
                                     alt="Equipamiento profesional" 
                                     class="w-full h-48 object-cover hover:scale-110 transition duration-500">
                            </div>
                            
                            <!-- Video spanning two columns -->
                            <div class="col-span-2 relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
                                <video 
                                    class="w-full h-48 object-cover"
                                    autoplay 
                                    muted 
                                    loop 
                                    playsinline
                                    controls>
                                    <source src="https://page.gensparksite.com/get_upload_url/a73915a0384c4aa8dc21bda3b0b378699830a8942f7f06e714ba3195ec5bc669/default/0a778588-5631-4b3c-b635-8c8bb61eeb79" type="video/mp4">
                                    Tu navegador no soporta el elemento de video.
                                </video>
                                <div class="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                    <span class="animate-pulse mr-2">•</span>
                                    MOMENTOS DESTACADOS
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column: Main Video Only -->
                    <div class="lg:col-span-1">
                        <div class="sticky top-24">
                            <!-- Main Video -->
                            <div class="relative rounded-lg overflow-hidden shadow-2xl">
                                <video 
                                    class="w-full h-auto"
                                    autoplay 
                                    muted 
                                    loop 
                                    playsinline
                                    controls
                                    poster="https://page.gensparksite.com/v1/base64_upload/415d3394dd5f0c748694368bd91683fc">
                                    <source src="https://page.gensparksite.com/get_upload_url/a73915a0384c4aa8dc21bda3b0b378699830a8942f7f06e714ba3195ec5bc669/default/129abc05-0761-404e-bd50-12aee41f91c4" type="video/mp4">
                                    Tu navegador no soporta el elemento de video.
                                </video>
                                <div class="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                    <span class="animate-pulse mr-2">•</span>
                                    EN VIVO
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Additional Photos Strip -->
            <div class="grid grid-cols-4 md:grid-cols-8 gap-2 mb-8">
                <div class="relative overflow-hidden rounded shadow-md hover:shadow-lg transition">
                    <img src="https://page.gensparksite.com/v1/base64_upload/8e63c98b00dbaafcd37c1a57b5668a09" 
                         alt="Aventura" 
                         class="w-full h-24 object-cover hover:scale-110 transition duration-300">
                </div>
                <div class="relative overflow-hidden rounded shadow-md hover:shadow-lg transition">
                    <img src="https://page.gensparksite.com/v1/base64_upload/51f859f74b373cbcb7292b27eb87939c" 
                         alt="Trekking" 
                         class="w-full h-24 object-cover hover:scale-110 transition duration-300">
                </div>
                <div class="relative overflow-hidden rounded shadow-md hover:shadow-lg transition">
                    <img src="https://page.gensparksite.com/v1/base64_upload/afce1c4d34ff63a51d7751d8b7c72f48" 
                         alt="Grupo" 
                         class="w-full h-24 object-cover hover:scale-110 transition duration-300">
                </div>
                <div class="relative overflow-hidden rounded shadow-md hover:shadow-lg transition">
                    <img src="https://page.gensparksite.com/v1/base64_upload/f8c05b7c6479a64823f393c4a474d1ce" 
                         alt="Packrafts" 
                         class="w-full h-24 object-cover hover:scale-110 transition duration-300">
                </div>
                <div class="relative overflow-hidden rounded shadow-md hover:shadow-lg transition">
                    <img src="https://page.gensparksite.com/v1/base64_upload/a0af2b4a61487b9f5c50f8dbb1956a4c" 
                         alt="Naturaleza" 
                         class="w-full h-24 object-cover hover:scale-110 transition duration-300">
                </div>
                <div class="relative overflow-hidden rounded shadow-md hover:shadow-lg transition">
                    <img src="https://page.gensparksite.com/v1/base64_upload/901b16630c289572a34bc012a86d0fd4" 
                         alt="Río" 
                         class="w-full h-24 object-cover hover:scale-110 transition duration-300">
                </div>
                <div class="relative overflow-hidden rounded shadow-md hover:shadow-lg transition">
                    <img src="https://page.gensparksite.com/v1/base64_upload/4e16fb0b0de94b3ee796b135a5ee5167" 
                         alt="Equipo" 
                         class="w-full h-24 object-cover hover:scale-110 transition duration-300">
                </div>
                <div class="relative overflow-hidden rounded shadow-md hover:shadow-lg transition">
                    <img src="https://page.gensparksite.com/v1/base64_upload/415d3394dd5f0c748694368bd91683fc" 
                         alt="Fitz Roy" 
                         class="w-full h-24 object-cover hover:scale-110 transition duration-300">
                </div>
            </div>
            
            <!-- Call to Action -->
            <div class="mt-12 text-center bg-gradient-to-r from-patagonia-blue to-patagonia-green p-8 rounded-lg">
                <h3 class="text-2xl font-bold text-white mb-4">
                    <i class="fas fa-camera mr-2"></i>
                    <span data-i18n="gallery.ctaTitle">¿Querés aparecer en nuestra galería?</span>
                </h3>
                <p class="text-white mb-6" data-i18n="gallery.ctaText">
                    Cada aventura es única y tus fotos podrían inspirar a otros aventureros.
                    ¡Compartimos las mejores capturas en nuestras redes!
                </p>
                <a href="#experience" 
                   class="inline-block bg-white text-patagonia-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105">
                    <i class="fas fa-rocket mr-2"></i>
                    <span data-i18n="gallery.ctaButton">VIVI TU AVENTURA</span>
                </a>
            </div>
        </div>
    </section>
    

    <!-- Google Reviews Section -->
    <section id="reviews" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">
                    <i class="fab fa-google mr-2 text-blue-600"></i>
                    <span data-i18n="reviews.title">Lo que dicen nuestros aventureros</span>
                </h2>
                <p class="text-xl text-gray-600" data-i18n="reviews.subtitle">Reseñas verificadas de Google</p>
                <div class="flex justify-center items-center mt-4">
                    <div class="flex text-yellow-400 text-2xl">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <span class="ml-2 text-xl font-bold">5.0</span>
                </div>
            </div>
            
            <!-- Reviews Grid - Real Google Reviews -->
            <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <!-- Review 1 - Erika Prieto -->
                <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 rounded-full mr-3 bg-green-500 flex items-center justify-center text-white text-xl font-bold">
                            E
                        </div>
                        <div>
                            <h4 class="font-semibold">Erika Prieto</h4>
                            <div class="flex text-yellow-400 text-sm">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <p class="text-gray-700 mb-2">
                        "Excelente todo! Hicimos packrafting. Super atentos, amables y pacientes. Recomiendo al 100%, es una experiencia única 🤩"
                    </p>
                    <div class="flex items-center text-sm text-gray-500">
                        <i class="fab fa-google mr-1"></i>
                        <span>Reseña de Google</span>
                    </div>
                </div>
                
                <!-- Review 2 - Steph -->
                <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <div class="flex items-center mb-4">
                        <img src="https://page.gensparksite.com/v1/base64_upload/03dfdbb3b73f75164a1ab0ae758c5d51" 
                             alt="Steph" 
                             class="w-12 h-12 rounded-full mr-3 object-cover">
                        <div>
                            <h4 class="font-semibold">Steph</h4>
                            <div class="flex items-center">
                                <div class="flex text-yellow-400 text-sm mr-2">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <span class="text-xs text-gray-500">Local Guide</span>
                            </div>
                        </div>
                    </div>
                    <p class="text-gray-700 mb-2">
                        "I spent an excellent few hours with Alex Pakrafting. I loved the concept as well as the versatility of the kayaks and the excellent tips Alex gave me. If you want to do something more bespoke than the large group trips, I highly recommend this. I only wish it had been longer, it was over far too soon"
                    </p>
                    <div class="flex items-center text-sm text-gray-500">
                        <i class="fab fa-google mr-1"></i>
                        <span>Reseña de Google</span>
                    </div>
                </div>
                
                <!-- Review 3 - William Palmer -->
                <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 rounded-full mr-3 bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
                            W
                        </div>
                        <div>
                            <h4 class="font-semibold">William Palmer</h4>
                            <div class="flex text-yellow-400 text-sm">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <p class="text-gray-700 mb-2">
                        "Amazing experience! Alex was an incredible guide, he explained everything, gave us tips and made the experience really enjoyable. He is also very knowledgeable about Patagonia, delivering more than a conventional tour.<br><br>We totally recommend contacting him if you are visiting El Chalten."
                    </p>
                    <div class="flex items-center text-sm text-gray-500">
                        <i class="fab fa-google mr-1"></i>
                        <span>Reseña de Google</span>
                    </div>
                </div>
            </div>
            
            <!-- Google Reviews Button -->
            <div class="text-center mt-8">
                <a href="https://share.google/CBiCH7SWnbf5xdjQt" 
                   target="_blank" 
                   class="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    <i class="fab fa-google mr-2"></i>
                    Ver todas las reseñas en Google
                </a>
            </div>
        </div>
    </section>
    
    <!-- FAQ Section -->
    <section id="faq" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4 max-w-3xl">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4" data-i18n="faq.title">Preguntas Frecuentes</h2>
            </div>
            
            <div class="space-y-4" id="faq-container">
                <!-- FAQs will be loaded dynamically -->
            </div>
        </div>
    </section>
    
    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4" data-i18n="contact.title">Contacto y Reservas</h2>
                <p class="text-xl text-gray-600" data-i18n="contact.subtitle">Estamos aquí para hacer tu aventura realidad</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div>
                    <form id="contact-form" class="space-y-4">
                        <input type="text" name="name" placeholder="Nombre completo" required
                               class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-patagonia-blue">
                        <input type="email" name="email" placeholder="Correo electrónico" required
                               class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-patagonia-blue">
                        <input type="tel" name="phone" placeholder="Teléfono (opcional)"
                               class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-patagonia-blue">
                        <input type="date" name="date" placeholder="Fecha deseada"
                               class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-patagonia-blue">
                        <select name="people" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-patagonia-blue">
                            <option value="">Número de personas</option>
                            <option value="2">2 personas</option>
                            <option value="3">3 personas</option>
                            <option value="4">4 personas</option>
                            <option value="5">5 personas</option>
                            <option value="6">6 personas</option>
                            <option value="7">7 personas</option>
                            <option value="8">8 personas</option>
                        </select>
                        <textarea name="message" rows="4" placeholder="Mensaje"
                                  class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-patagonia-blue"></textarea>
                        <button type="submit" 
                                class="w-full bg-patagonia-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                            Enviar consulta
                        </button>
                    </form>
                </div>
                
                <div class="space-y-6">
                    <div>
                        <h3 class="text-xl font-semibold mb-4">Información de contacto</h3>
                        <div class="space-y-3">
                            <p class="flex items-center">
                                <i class="fas fa-envelope text-patagonia-blue mr-3"></i>
                                contacto@hikingtour.tur.ar
                            </p>
                            <p class="flex items-center">
                                <i class="fab fa-whatsapp text-green-500 mr-3"></i>
                                WhatsApp disponible
                            </p>
                            <p class="flex items-center">
                                <i class="fas fa-map-marker-alt text-patagonia-blue mr-3"></i>
                                El Chaltén, Santa Cruz, Argentina
                            </p>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-r from-patagonia-blue to-patagonia-green p-6 rounded-lg text-white mb-4">
                        <h3 class="text-xl font-semibold mb-4">
                            <i class="fas fa-calendar-check mr-2"></i>
                            <span data-i18n="contact.reserveTitle">Reservá tu experiencia</span>
                        </h3>
                        <p class="mb-4" data-i18n="contact.reserveText">Las reservas se realizan directamente en la sección "La Experiencia" donde encontrarás el calendario completo con disponibilidad en tiempo real.</p>
                        <a href="#experience" 
                           class="inline-block bg-white text-patagonia-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                            <i class="fas fa-arrow-up mr-2"></i>
                            <span data-i18n="contact.goToReserve">IR A RESERVAR</span>
                        </a>
                    </div>
                    
                    <div class="bg-patagonia-blue p-4 rounded-lg text-white">
                        <h4 class="text-lg font-semibold mb-3">
                            <i class="fas fa-briefcase mr-2"></i>
                            <span data-i18n="contact.b2bTitle">Servicios B2B</span>
                        </h4>

                        <a href="/dossier-es" 
                           target="_blank" 
                           rel="noopener"
                           id="b2b-button"
                           class="block w-full bg-white text-patagonia-blue px-4 py-2 rounded font-semibold hover:bg-gray-100 transition text-sm text-center">
                            <span data-i18n="contact.b2bButton">Consultá por Servicios B2B</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <div class="mb-4">
                <img src="https://page.gensparksite.com/v1/base64_upload/b318b0865758a4172d61ba8b693d8e41" 
                     alt="Hiking Tour Packrafting" 
                     class="h-20 mx-auto mb-2">
            </div>
            <p class="text-sm text-gray-400 mb-2">
                © 2024 Packrafting El Chaltén. Todos los derechos reservados.
            </p>
            <p class="text-sm text-gray-400">
                Operado por Hiking Tour El Chaltén | R.P.A.T: 2.231 | R.N.A.V: 20.311
            </p>
        </div>
    </footer>
    
    <!-- Removed old Turitop script as widget is now embedded directly -->
    
    <!-- Scripts -->
    <script>
        // Current language
        let currentLang = 'es';
        let translations = {};
        
        // Load translations
        async function loadTranslations(lang) {
            try {
                const response = await fetch(\`/api/translations/\${lang}\`);
                translations = await response.json();
                updatePageContent();
            } catch (error) {
                console.error('Error loading translations:', error);
            }
        }
        
        // Update page content with translations
        function updatePageContent() {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const keys = element.getAttribute('data-i18n').split('.');
                let value = translations;
                
                for (const key of keys) {
                    value = value[key];
                    if (!value) break;
                }
                
                if (value) {
                    element.textContent = value;
                }
            });
            
            // Update language buttons
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('bg-patagonia-blue', btn.dataset.lang === currentLang);
                btn.classList.toggle('text-white', btn.dataset.lang === currentLang);
                btn.classList.toggle('text-gray-700', btn.dataset.lang !== currentLang);
            });
            
            // Update FAQ section
            if (translations.faq && translations.faq.questions) {
                const faqContainer = document.getElementById('faq-container');
                faqContainer.innerHTML = translations.faq.questions.map((item, index) => \`
                    <div class="bg-white rounded-lg shadow">
                        <button class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                                onclick="toggleFAQ(\${index})">
                            <span class="font-semibold text-gray-800">\${item.q}</span>
                            <i class="fas fa-chevron-down text-gray-400 transition" id="faq-icon-\${index}"></i>
                        </button>
                        <div class="hidden px-6 pb-4" id="faq-answer-\${index}">
                            <p class="text-gray-700">\${item.a}</p>
                        </div>
                    </div>
                \`).join('');
            }
        }
        
        // Set language
        function setLanguage(lang) {
            currentLang = lang;
            document.documentElement.lang = lang;
            loadTranslations(lang);
            
            // Toggle between Spanish and English widgets
            const spanishWidget = document.querySelector('.widget-spanish');
            const englishWidget = document.querySelector('.widget-english');
            
            // Update B2B button link based on language
            const b2bButton = document.getElementById('b2b-button');
            if (b2bButton) {
                b2bButton.href = lang === 'en' ? '/dossier-en' : '/dossier-es';
            }
            
            if (lang === 'en') {
                if (spanishWidget) spanishWidget.classList.add('hidden');
                if (englishWidget) {
                    englishWidget.classList.remove('hidden');
                    // Trigger Turitop reload for English widget if needed
                    if (typeof window.TuritopApp !== 'undefined' && window.TuritopApp.init) {
                        setTimeout(() => window.TuritopApp.init(), 100);
                    }
                }
            } else {
                if (englishWidget) englishWidget.classList.add('hidden');
                if (spanishWidget) {
                    spanishWidget.classList.remove('hidden');
                    // Trigger Turitop reload for Spanish widget if needed
                    if (typeof window.TuritopApp !== 'undefined' && window.TuritopApp.init) {
                        setTimeout(() => window.TuritopApp.init(), 100);
                    }
                }
            }
        }
        
        // Toggle FAQ
        function toggleFAQ(index) {
            const answer = document.getElementById(\`faq-answer-\${index}\`);
            const icon = document.getElementById(\`faq-icon-\${index}\`);
            
            answer.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }
        
        // Mobile menu toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
        
        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert(result.message);
                    e.target.reset();
                }
            } catch (error) {
                console.error('Error sending form:', error);
                alert('Error al enviar el mensaje. Por favor intente nuevamente.');
            }
        });
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Close mobile menu if open
                    document.getElementById('mobile-menu').classList.add('hidden');
                }
            });
        });
        
        // Navbar scroll effect and Parallax
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            const scrolled = window.scrollY;
            
            // Navbar shadow
            if (scrolled > 50) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
            
            // Parallax effect for hero image
            const heroImage = document.querySelector('.hero-image-container');
            if (heroImage && scrolled < window.innerHeight) {
                const speed = 0.3;
                const yPos = -(scrolled * speed);
                const scale = 1.05 + (scrolled * 0.0001);
                heroImage.style.transform = \`translateY(\${yPos}px) scale(\${scale})\`;
            }
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Initialize
        loadTranslations(currentLang);
        
        // Contact form handler
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;
                
                try {
                    const formData = new FormData(contactForm);
                    const data = Object.fromEntries(formData.entries());
                    
                    const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        // Show success message
                        alert(result.message || 'Gracias por tu consulta. Te responderemos a la brevedad.');
                        contactForm.reset();
                    } else {
                        alert(result.message || 'Error al enviar el mensaje. Por favor intenta nuevamente.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error al enviar el mensaje. Por favor intenta nuevamente o contactanos por WhatsApp.');
                } finally {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            });
        }
        
        // Instagram Feed Integration
        if (typeof Instafeed !== 'undefined') {
            const feed = new Instafeed({
                accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN', // Necesitarás obtener esto
                target: 'instafeed',
                template: '<a href="{{link}}" target="_blank" class="relative group overflow-hidden rounded-lg shadow-lg"><img src="{{image}}" alt="{{caption}}" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500"><div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4"><div class="text-white"><i class="fas fa-heart mr-2"></i>{{likes}} <i class="fas fa-comment ml-4 mr-2"></i>{{comments}}</div></div></a>',
                limit: 8,
                resolution: 'standard_resolution'
            });
            feed.run();
        }
        
        // Parallax effect for hero section
        function initParallax() {
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            function handleParallax() {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = element.dataset.parallax || 0.2;
                    const yPos = -(scrolled * speed);
                    
                    // Apply only translation, no scale to maintain maximum quality
                    element.style.transform = \`translateY(\${yPos}px)\`;
                });
            }
            
            // Add scroll listener with throttling for performance
            let ticking = false;
            function updateParallax() {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        handleParallax();
                        ticking = false;
                    });
                    ticking = true;
                }
            }
            
            window.addEventListener('scroll', updateParallax);
            handleParallax(); // Initial call
        }
        
        // Ensure videos play automatically
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize parallax
            initParallax();
            
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                
                // Try to play video
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log('Auto-play prevented:', error);
                        // Add click to play functionality as fallback
                        video.addEventListener('click', () => {
                            video.play();
                        });
                    });
                }
                
                // Optimize video loading
                video.addEventListener('loadeddata', () => {
                    video.playbackRate = 1.0;
                });
            });
        });
    </script>
    
    <!-- Turitop Global Script (footer) -->
    <script id="js-turitop" src="https://app.turitop.com/js/load-turitop.min.js" 
            data-company="H407" 
            data-buttoncolor="green" 
            data-afftag="ttafid"></script>
</body>
</html>
  `
  
  return c.html(html)
})

export default app