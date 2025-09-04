-- Add language column to blog_posts
ALTER TABLE blog_posts ADD COLUMN language TEXT DEFAULT 'es';

-- Add language index
CREATE INDEX IF NOT EXISTS idx_blog_posts_language ON blog_posts(language);

-- Add translation reference
ALTER TABLE blog_posts ADD COLUMN translation_of INTEGER REFERENCES blog_posts(id);

-- Create index for translations
CREATE INDEX IF NOT EXISTS idx_blog_posts_translation ON blog_posts(translation_of);

-- Update existing post to Spanish
UPDATE blog_posts SET language = 'es' WHERE language IS NULL;