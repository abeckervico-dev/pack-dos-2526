-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  author TEXT DEFAULT 'Hiking Tour El Chaltén',
  author_avatar TEXT,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  images TEXT, -- JSON array of image URLs
  linkedin_url TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  published BOOLEAN DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME
);

-- Blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Blog post categories junction table
CREATE TABLE IF NOT EXISTS blog_post_categories (
  post_id INTEGER,
  category_id INTEGER,
  PRIMARY KEY (post_id, category_id),
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);

-- Insert default categories
INSERT OR IGNORE INTO blog_categories (name, slug, description) VALUES 
  ('Packrafting', 'packrafting', 'Artículos sobre packrafting en El Chaltén'),
  ('Trekking', 'trekking', 'Rutas y consejos de trekking en la Patagonia'),
  ('Guías', 'guias', 'Guías completas de actividades y destinos'),
  ('Naturaleza', 'naturaleza', 'Flora, fauna y geografía de la región'),
  ('Consejos', 'consejos', 'Tips y recomendaciones para viajeros');