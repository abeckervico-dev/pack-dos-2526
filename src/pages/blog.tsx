export const blogListPage = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - Packrafting El Chaltén</title>
    <meta name="description" content="Lee nuestros artículos sobre packrafting, trekking y aventuras en la Patagonia argentina">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <style>
        .blog-card:hover {
            transform: translateY(-4px);
        }
        .blog-card {
            transition: all 0.3s ease;
        }
        :root {
            --patagonia-blue: #1a5490;
            --patagonia-green: #2d5016;
        }
        .text-patagonia-blue { color: var(--patagonia-blue); }
        .bg-patagonia-blue { background-color: var(--patagonia-blue); }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav id="navbar" class="bg-white shadow-md sticky top-0 z-40">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <a href="/" class="text-xl font-bold text-gray-700">Packrafting El Chaltén</a>
                </div>
                
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/" class="text-gray-700 hover:text-patagonia-blue transition">Inicio</a>
                    <a href="/#experience" class="text-gray-700 hover:text-patagonia-blue transition">Experiencia</a>
                    <a href="/#gallery" class="text-gray-700 hover:text-patagonia-blue transition">Galería</a>
                    <a href="/blog" class="text-patagonia-blue font-semibold">Blog</a>
                    <a href="/#contact" class="text-gray-700 hover:text-patagonia-blue transition">Contacto</a>
                    
                    <a href="/#experience" 
                       class="bg-patagonia-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        <i class="fas fa-calendar-check mr-2"></i>
                        Reservar
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section with Background Image -->
    <section class="relative h-96 bg-cover bg-center" style="background-image: url('https://page.gensparksite.com/v1/base64_upload/f8c05b7c6479a64823f393c4a474d1ce');">
        <div class="absolute inset-0 bg-gradient-to-r from-patagonia-blue/80 to-blue-700/80"></div>
        <div class="relative h-full flex items-center justify-center">
            <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4" id="blog-title">
                Blog de Packrafting El Chaltén
            </h1>
            <p class="text-xl max-w-3xl mx-auto" id="blog-subtitle">
                Descubre historias, consejos y guías sobre packrafting y aventuras en la Patagonia
            </p>
            <div class="mt-6">
                <button onclick="setLanguage('es')" class="lang-btn px-4 py-2 mx-2 rounded bg-white/20" data-lang="es">Español</button>
                <button onclick="setLanguage('en')" class="lang-btn px-4 py-2 mx-2 rounded bg-white/20" data-lang="en">English</button>
            </div>
            </div>
        </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="py-16">
        <div class="container mx-auto px-4">
            <div id="blog-posts" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Posts will be loaded here -->
                <div class="text-center py-8">
                    <i class="fas fa-spinner fa-spin text-4xl text-patagonia-blue"></i>
                    <p class="mt-4 text-gray-600">Cargando artículos...</p>
                </div>
            </div>
            
            <!-- Pagination -->
            <div id="pagination" class="mt-12 flex justify-center">
                <!-- Pagination will be loaded here -->
            </div>
        </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-gray-100 py-16">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">Suscríbete a nuestro Newsletter</h2>
            <p class="text-gray-600 mb-8">Recibe las últimas noticias y consejos sobre packrafting</p>
            <form class="max-w-md mx-auto flex gap-4">
                <input type="email" placeholder="Tu email" 
                       class="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:border-patagonia-blue">
                <button type="submit" 
                        class="bg-patagonia-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                    Suscribirse
                </button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p class="text-sm text-gray-400 mb-2">
                © 2024 Packrafting El Chaltén. Todos los derechos reservados.
            </p>
            <p class="text-sm text-gray-400">
                Operado por Hiking Tour El Chaltén | R.P.A.T: 2.231 | R.N.A.V: 20.311
            </p>
        </div>
    </footer>

    <script>
        // Get current language from localStorage or default to Spanish
        let currentLang = localStorage.getItem('language') || 'es';
        
        // Function to format date
        function formatDate(dateString) {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'es-ES', options);
        }

        // Function to create blog card
        function createBlogCard(post) {
            const categories = post.categories ? post.categories.split(',').map(cat => 
                \`<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">\${cat}</span>\`
            ).join(' ') : '';

            return \`
                <article class="blog-card bg-white rounded-lg shadow-lg overflow-hidden">
                    <a href="/blog/\${post.slug}">
                        <img src="\${post.featured_image}" alt="\${post.title}" 
                             class="w-full h-48 object-cover">
                    </a>
                    <div class="p-6">
                        <div class="flex items-center gap-2 mb-3">
                            \${categories}
                        </div>
                        <h2 class="text-xl font-bold mb-2">
                            <a href="/blog/\${post.slug}" class="hover:text-patagonia-blue transition">
                                \${post.title}
                            </a>
                        </h2>
                        <p class="text-gray-600 mb-4 line-clamp-3">
                            \${post.excerpt}
                        </p>
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <span>\${formatDate(post.published_at)}</span>
                            <span><i class="fas fa-eye mr-1"></i> \${post.views || 0}</span>
                        </div>
                        <a href="/blog/\${post.slug}" 
                           class="inline-block mt-4 text-patagonia-blue hover:underline">
                            Leer más →
                        </a>
                    </div>
                </article>
            \`;
        }

        // Load blog posts
        async function loadBlogPosts(page = 1) {
            try {
                const response = await fetch(\`/api/blog/posts?page=\${page}&limit=9&lang=\${currentLang}\`);
                const data = await response.json();
                
                const container = document.getElementById('blog-posts');
                
                if (data.posts && data.posts.length > 0) {
                    container.innerHTML = data.posts.map(post => createBlogCard(post)).join('');
                } else {
                    container.innerHTML = \`
                        <div class="col-span-full text-center py-12">
                            <i class="fas fa-newspaper text-6xl text-gray-300 mb-4"></i>
                            <p class="text-gray-500">No hay artículos disponibles en este momento.</p>
                        </div>
                    \`;
                }
                
                // Update pagination
                if (data.pagination && data.pagination.pages > 1) {
                    const paginationHtml = [];
                    for (let i = 1; i <= data.pagination.pages; i++) {
                        const isActive = i === page;
                        paginationHtml.push(\`
                            <button onclick="loadBlogPosts(\${i})" 
                                    class="px-4 py-2 mx-1 rounded \${isActive 
                                        ? 'bg-patagonia-blue text-white' 
                                        : 'bg-gray-200 hover:bg-gray-300'}">
                                \${i}
                            </button>
                        \`);
                    }
                    document.getElementById('pagination').innerHTML = paginationHtml.join('');
                }
            } catch (error) {
                console.error('Error loading blog posts:', error);
                document.getElementById('blog-posts').innerHTML = \`
                    <div class="col-span-full text-center py-12">
                        <p class="text-red-500">Error al cargar los artículos</p>
                    </div>
                \`;
            }
        }

        // Set language
        function setLanguage(lang) {
            currentLang = lang;
            localStorage.setItem('language', lang);
            
            // Update UI texts
            const translations = {
                es: {
                    title: 'Blog de Packrafting El Chaltén',
                    subtitle: 'Descubre historias, consejos y guías sobre packrafting y aventuras en la Patagonia',
                    loading: 'Cargando artículos...',
                    noArticles: 'No hay artículos disponibles en este momento.',
                    readMore: 'Leer más →',
                    newsletter: 'Suscríbete a nuestro Newsletter',
                    newsletterDesc: 'Recibe las últimas noticias y consejos sobre packrafting',
                    subscribe: 'Suscribirse'
                },
                en: {
                    title: 'Packrafting El Chaltén Blog',
                    subtitle: 'Discover stories, tips and guides about packrafting and adventures in Patagonia',
                    loading: 'Loading articles...',
                    noArticles: 'No articles available at this time.',
                    readMore: 'Read more →',
                    newsletter: 'Subscribe to our Newsletter',
                    newsletterDesc: 'Get the latest news and tips about packrafting',
                    subscribe: 'Subscribe'
                }
            };
            
            const t = translations[lang];
            document.getElementById('blog-title').textContent = t.title;
            document.getElementById('blog-subtitle').textContent = t.subtitle;
            
            // Update language buttons
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('bg-white/40', btn.dataset.lang === lang);
                btn.classList.toggle('bg-white/20', btn.dataset.lang !== lang);
            });
            
            // Reload posts
            loadBlogPosts();
        }
        
        // Load posts on page load
        document.addEventListener('DOMContentLoaded', () => {
            setLanguage(currentLang);
        });
    </script>
</body>
</html>
`

export const blogPostPage = (post: any) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} - Packrafting El Chaltén</title>
    <meta name="description" content="${post.meta_description || post.excerpt}">
    <meta name="keywords" content="${post.meta_keywords || ''}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt}">
    <meta property="og:image" content="${post.featured_image}">
    <meta property="og:type" content="article">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <style>
        :root {
            --patagonia-blue: #1a5490;
            --patagonia-green: #2d5016;
        }
        .text-patagonia-blue { color: var(--patagonia-blue); }
        .bg-patagonia-blue { background-color: var(--patagonia-blue); }
        
        .blog-content h2 {
            font-size: 1.875rem;
            font-weight: 700;
            margin: 2rem 0 1rem;
            color: var(--patagonia-blue);
        }
        .blog-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 1.5rem 0 0.75rem;
        }
        .blog-content p {
            margin: 1rem 0;
            line-height: 1.8;
        }
        .blog-content ul {
            list-style: disc;
            margin-left: 2rem;
            margin: 1rem 0 1rem 2rem;
        }
        .blog-content strong {
            font-weight: 600;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav id="navbar" class="bg-white shadow-md sticky top-0 z-40">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <a href="/" class="text-xl font-bold text-gray-700">Packrafting El Chaltén</a>
                </div>
                
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/" class="text-gray-700 hover:text-patagonia-blue transition">Inicio</a>
                    <a href="/#experience" class="text-gray-700 hover:text-patagonia-blue transition">Experiencia</a>
                    <a href="/blog" class="text-gray-700 hover:text-patagonia-blue transition font-semibold">Blog</a>
                    <a href="/#contact" class="text-gray-700 hover:text-patagonia-blue transition">Contacto</a>
                    
                    <a href="/#experience" 
                       class="bg-patagonia-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        <i class="fas fa-calendar-check mr-2"></i>
                        Reservar
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Article Header -->
    <header class="relative h-96 bg-cover bg-center" style="background-image: url('${post.featured_image}')">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div class="relative container mx-auto px-4 h-full flex items-end pb-8">
            <div class="text-white max-w-3xl">
                <div class="flex items-center gap-2 mb-4">
                    ${post.categories ? post.categories.split(',').map((cat: string) => 
                        `<span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded text-sm">${cat}</span>`
                    ).join('') : ''}
                </div>
                <h1 class="text-4xl md:text-5xl font-bold mb-4">${post.title}</h1>
                ${post.subtitle ? `<p class="text-xl">${post.subtitle}</p>` : ''}
            </div>
        </div>
    </header>

    <!-- Article Info -->
    <div class="bg-gray-100 py-4">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between max-w-4xl mx-auto text-sm text-gray-600">
                <div class="flex items-center gap-4">
                    <span><i class="fas fa-user mr-2"></i>${post.author}</span>
                    <span><i class="fas fa-calendar mr-2"></i>${new Date(post.published_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="flex items-center gap-4">
                    <span><i class="fas fa-eye mr-2"></i>${post.views || 0} vistas</span>
                    ${post.linkedin_url ? `
                        <a href="${post.linkedin_url}" target="_blank" rel="noopener" 
                           class="text-patagonia-blue hover:underline">
                            <i class="fab fa-linkedin mr-1"></i> LinkedIn
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    </div>

    <!-- Article Content -->
    <article class="py-12">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="blog-content prose prose-lg max-w-none">
                    ${post.content.replace(/\n/g, '<br>').replace(/##\s/g, '<h2>').replace(/<br><h2>/g, '</p><h2>').replace(/<\/h2>/g, '</h2><p>').replace(/###\s/g, '<h3>').replace(/<br><h3>/g, '</p><h3>').replace(/<\/h3>/g, '</h3><p>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                </div>
                
                ${post.images && post.images.length > 0 ? `
                    <div class="mt-12">
                        <h3 class="text-2xl font-bold mb-6">Galería de imágenes</h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            ${post.images.map((img: string) => `
                                <img src="${img}" alt="Imagen del artículo" 
                                     class="w-full rounded-lg shadow-lg">
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- CTA Section -->
                <div class="mt-16 bg-gradient-to-r from-patagonia-blue to-blue-700 rounded-lg p-8 text-white text-center">
                    <h3 class="text-2xl font-bold mb-4">¿Listo para tu aventura de packrafting?</h3>
                    <p class="mb-6">Reserva tu experiencia única en El Chaltén</p>
                    <a href="/#experience" 
                       class="inline-block bg-white text-patagonia-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Reservar Ahora
                    </a>
                </div>
            </div>
        </div>
    </article>

    <!-- Back to Blog -->
    <div class="bg-gray-100 py-8">
        <div class="container mx-auto px-4 text-center">
            <a href="/blog" class="text-patagonia-blue hover:underline">
                <i class="fas fa-arrow-left mr-2"></i> Volver al Blog
            </a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p class="text-sm text-gray-400 mb-2">
                © 2024 Packrafting El Chaltén. Todos los derechos reservados.
            </p>
            <p class="text-sm text-gray-400">
                Operado por Hiking Tour El Chaltén | R.P.A.T: 2.231 | R.N.A.V: 20.311
            </p>
        </div>
    </footer>
</body>
</html>
`