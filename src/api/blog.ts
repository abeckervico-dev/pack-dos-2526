import { Hono } from 'hono'

type Bindings = {
  DB: any
}

const blog = new Hono<{ Bindings: Bindings }>()

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Get all published blog posts
blog.get('/posts', async (c) => {
  try {
    const { DB } = c.env
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '10')
    const lang = c.req.query('lang') || 'es'
    const offset = (page - 1) * limit

    const posts = await DB.prepare(`
      SELECT 
        p.id, p.slug, p.title, p.subtitle, p.author, p.author_avatar,
        p.excerpt, p.featured_image, p.linkedin_url, p.views,
        p.created_at, p.published_at, p.language,
        GROUP_CONCAT(c.name) as categories
      FROM blog_posts p
      LEFT JOIN blog_post_categories pc ON p.id = pc.post_id
      LEFT JOIN blog_categories c ON pc.category_id = c.id
      WHERE p.published = 1 AND p.language = ?
      GROUP BY p.id
      ORDER BY p.published_at DESC
      LIMIT ? OFFSET ?
    `).bind(lang, limit, offset).all()

    const totalResult = await DB.prepare(`
      SELECT COUNT(*) as total FROM blog_posts WHERE published = 1 AND language = ?
    `).bind(lang).first()

    return c.json({
      posts: posts.results,
      pagination: {
        page,
        limit,
        total: totalResult?.total || 0,
        pages: Math.ceil((totalResult?.total || 0) / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return c.json({ error: 'Error fetching blog posts' }, 500)
  }
})

// Get single blog post by slug
blog.get('/posts/:slug', async (c) => {
  try {
    const { DB } = c.env
    const slug = c.req.param('slug')
    const lang = c.req.query('lang') || 'es'

    // Increment views
    await DB.prepare(`
      UPDATE blog_posts SET views = views + 1 WHERE slug = ? AND language = ?
    `).bind(slug, lang).run()

    const post = await DB.prepare(`
      SELECT 
        p.*,
        GROUP_CONCAT(c.name) as categories,
        (SELECT slug FROM blog_posts WHERE id = p.translation_of OR translation_of = p.id AND language != p.language LIMIT 1) as translation_slug
      FROM blog_posts p
      LEFT JOIN blog_post_categories pc ON p.id = pc.post_id
      LEFT JOIN blog_categories c ON pc.category_id = c.id
      WHERE p.slug = ? AND p.published = 1 AND p.language = ?
      GROUP BY p.id
    `).bind(slug, lang).first()

    if (!post) {
      return c.json({ error: 'Post not found' }, 404)
    }

    // Parse images JSON
    if (post.images) {
      post.images = JSON.parse(post.images)
    }

    return c.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return c.json({ error: 'Error fetching blog post' }, 500)
  }
})

// Create new blog post (protected - needs auth in production)
blog.post('/posts', async (c) => {
  try {
    const { DB } = c.env
    const body = await c.req.json()
    
    const {
      title,
      subtitle,
      content,
      excerpt,
      featured_image,
      images = [],
      linkedin_url,
      meta_description,
      meta_keywords,
      categories = [],
      publish = false
    } = body

    const slug = generateSlug(title)
    const published_at = publish ? new Date().toISOString() : null

    // Insert post
    const result = await DB.prepare(`
      INSERT INTO blog_posts (
        slug, title, subtitle, content, excerpt,
        featured_image, images, linkedin_url,
        meta_description, meta_keywords,
        published, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      slug, title, subtitle, content, excerpt,
      featured_image, JSON.stringify(images), linkedin_url,
      meta_description, meta_keywords,
      publish ? 1 : 0, published_at
    ).run()

    const postId = result.meta.last_row_id

    // Add categories
    for (const categoryName of categories) {
      const category = await DB.prepare(`
        SELECT id FROM blog_categories WHERE name = ?
      `).bind(categoryName).first()

      if (category) {
        await DB.prepare(`
          INSERT INTO blog_post_categories (post_id, category_id)
          VALUES (?, ?)
        `).bind(postId, category.id).run()
      }
    }

    return c.json({ 
      success: true, 
      slug,
      message: publish ? 'Post published successfully' : 'Post saved as draft'
    })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return c.json({ error: 'Error creating blog post' }, 500)
  }
})

// Get all categories
blog.get('/categories', async (c) => {
  try {
    const { DB } = c.env
    const categories = await DB.prepare(`
      SELECT * FROM blog_categories ORDER BY name
    `).all()

    return c.json(categories.results)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return c.json({ error: 'Error fetching categories' }, 500)
  }
})

export default blog