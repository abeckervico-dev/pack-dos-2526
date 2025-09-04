import { Hono } from 'hono'

type Bindings = {
  DB: any
  ADMIN_KEY?: string
}

const blogAdmin = new Hono<{ Bindings: Bindings }>()

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Translate content using a simple approach (in production, use a translation API)
function translateContent(content: string, fromLang: string, toLang: string): string {
  // This is a placeholder - in production, integrate with translation API
  // For now, we'll return a note that translation is needed
  if (fromLang === toLang) return content
  
  const translations: any = {
    'es-en': {
      'Qué es': 'What is',
      'Cómo': 'How',
      'Por qué': 'Why',
      'Cuándo': 'When',
      'Dónde': 'Where',
      'experiencia única': 'unique experience',
      'aventura': 'adventure',
      'Patagonia': 'Patagonia',
      'El Chaltén': 'El Chaltén',
      'Río de las Vueltas': 'Río de las Vueltas',
      'Fitz Roy': 'Fitz Roy',
      'packraft': 'packraft',
      'packrafting': 'packrafting',
      'senderismo': 'hiking',
      'trekking': 'trekking',
      'naturaleza': 'nature',
      'montaña': 'mountain',
      'glaciar': 'glacier',
      'lago': 'lake',
      'río': 'river'
    },
    'en-es': {
      'What is': 'Qué es',
      'How': 'Cómo',
      'Why': 'Por qué',
      'When': 'Cuándo',
      'Where': 'Dónde',
      'unique experience': 'experiencia única',
      'adventure': 'aventura',
      'hiking': 'senderismo',
      'trekking': 'trekking',
      'nature': 'naturaleza',
      'mountain': 'montaña',
      'glacier': 'glaciar',
      'lake': 'lago',
      'river': 'río'
    }
  }
  
  let translated = content
  const dict = translations[`${fromLang}-${toLang}`] || {}
  
  for (const [original, translation] of Object.entries(dict)) {
    translated = translated.replace(new RegExp(original, 'gi'), translation as string)
  }
  
  return translated
}

// Create new blog post with automatic translation
blogAdmin.post('/create-bilingual-post', async (c) => {
  try {
    const { DB } = c.env
    const body = await c.req.json()
    
    // Check admin key
    const adminKey = c.req.header('X-Admin-Key')
    if (adminKey !== c.env.ADMIN_KEY && c.env.ADMIN_KEY) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    const {
      title_es,
      title_en,
      subtitle_es,
      subtitle_en,
      content_es,
      content_en,
      excerpt_es,
      excerpt_en,
      featured_image,
      images = [],
      linkedin_url,
      meta_keywords,
      categories = ['packrafting'],
      author = 'Alexander Becker Vico - Hiking Tour El Chaltén',
      publish = true
    } = body
    
    // Auto-translate if one language is missing
    const finalTitleEs = title_es || translateContent(title_en, 'en', 'es')
    const finalTitleEn = title_en || translateContent(title_es, 'es', 'en')
    const finalContentEs = content_es || translateContent(content_en, 'en', 'es')
    const finalContentEn = content_en || translateContent(content_es, 'es', 'en')
    const finalExcerptEs = excerpt_es || translateContent(excerpt_en, 'en', 'es')
    const finalExcerptEn = excerpt_en || translateContent(excerpt_es, 'es', 'en')
    
    const slugEs = generateSlug(finalTitleEs)
    const slugEn = generateSlug(finalTitleEn)
    const published_at = publish ? new Date().toISOString() : null
    
    // Insert Spanish version
    const resultEs = await DB.prepare(`
      INSERT INTO blog_posts (
        slug, title, subtitle, content, excerpt, author,
        featured_image, images, linkedin_url,
        meta_description, meta_keywords, language,
        published, published_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'es', ?, ?, ?)
    `).bind(
      slugEs, finalTitleEs, subtitle_es || '', finalContentEs, finalExcerptEs, author,
      featured_image, JSON.stringify(images), linkedin_url,
      finalExcerptEs, meta_keywords,
      publish ? 1 : 0, published_at, new Date().toISOString()
    ).run()
    
    const postIdEs = resultEs.meta.last_row_id
    
    // Insert English version
    const resultEn = await DB.prepare(`
      INSERT INTO blog_posts (
        slug, title, subtitle, content, excerpt, author,
        featured_image, images, linkedin_url,
        meta_description, meta_keywords, language,
        translation_of, published, published_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'en', ?, ?, ?, ?)
    `).bind(
      slugEn, finalTitleEn, subtitle_en || '', finalContentEn, finalExcerptEn, author,
      featured_image, JSON.stringify(images), linkedin_url,
      finalExcerptEn, meta_keywords,
      postIdEs, publish ? 1 : 0, published_at, new Date().toISOString()
    ).run()
    
    const postIdEn = resultEn.meta.last_row_id
    
    // Update Spanish post to reference English translation
    await DB.prepare(`
      UPDATE blog_posts SET translation_of = ? WHERE id = ?
    `).bind(postIdEn, postIdEs).run()
    
    // Add categories to both posts
    for (const categoryName of categories) {
      const category = await DB.prepare(`
        SELECT id FROM blog_categories WHERE slug = ?
      `).bind(categoryName.toLowerCase()).first()
      
      if (category) {
        await DB.prepare(`
          INSERT INTO blog_post_categories (post_id, category_id) VALUES (?, ?), (?, ?)
        `).bind(postIdEs, category.id, postIdEn, category.id).run()
      }
    }
    
    return c.json({
      success: true,
      posts: {
        es: { id: postIdEs, slug: slugEs },
        en: { id: postIdEn, slug: slugEn }
      },
      message: 'Bilingual posts created successfully'
    })
  } catch (error) {
    console.error('Error creating bilingual posts:', error)
    return c.json({ error: 'Error creating posts' }, 500)
  }
})

// Delete post and its translation
blogAdmin.delete('/posts/:id', async (c) => {
  try {
    const { DB } = c.env
    const postId = c.req.param('id')
    
    // Check admin key
    const adminKey = c.req.header('X-Admin-Key')
    if (adminKey !== c.env.ADMIN_KEY && c.env.ADMIN_KEY) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    
    // Get the post and its translation
    const post = await DB.prepare(`
      SELECT id, translation_of FROM blog_posts WHERE id = ?
    `).bind(postId).first()
    
    if (!post) {
      return c.json({ error: 'Post not found' }, 404)
    }
    
    // Delete both the post and its translation
    const idsToDelete = [postId]
    if (post.translation_of) {
      idsToDelete.push(post.translation_of)
    }
    
    // Also find posts that translate to this one
    const translations = await DB.prepare(`
      SELECT id FROM blog_posts WHERE translation_of = ?
    `).bind(postId).all()
    
    for (const trans of translations.results) {
      idsToDelete.push(trans.id)
    }
    
    // Delete all related posts
    for (const id of idsToDelete) {
      await DB.prepare(`DELETE FROM blog_posts WHERE id = ?`).bind(id).run()
    }
    
    return c.json({
      success: true,
      deleted: idsToDelete,
      message: 'Post and translations deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting post:', error)
    return c.json({ error: 'Error deleting post' }, 500)
  }
})

export default blogAdmin