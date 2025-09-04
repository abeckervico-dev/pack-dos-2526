-- Insert first blog post about Packrafting El Chaltén
INSERT INTO blog_posts (
  slug,
  title,
  subtitle,
  author,
  content,
  excerpt,
  featured_image,
  images,
  linkedin_url,
  meta_description,
  meta_keywords,
  published,
  published_at,
  created_at
) VALUES (
  'explora-el-chalten-en-packraft-una-experiencia-unica',
  'Explora El Chaltén en Packraft: Una experiencia única',
  'Descubre una nueva forma de explorar la naturaleza patagónica',
  'Alexander Becker Vico - Hiking Tour El Chaltén',
  '## Por: hikingtour.tur.ar

Imagina navegar por las aguas cristalinas del Río de las Vueltas, rodeado de montañas majestuosas y glaciares impresionantes. En El Chaltén, la aventura toma un nuevo significado con el packrafting, una forma de explorar la naturaleza de manera íntima y emocionante.

Esta experiencia única te permite acercarte a la belleza natural de El Chaltén de una manera que pocos han experimentado. Con el packraft, puedes recorrer ríos y lagos en un entorno de gran belleza escénica.

## Qué es el packrafting y su creciente popularidad en Argentina

El packrafting es una forma de navegación que utiliza botes inflables ligeros y portátiles, ideales para combinar con senderismo. Su creciente popularidad en Argentina se debe a la posibilidad de explorar áreas remotas y disfrutar de paisajes impresionantes.

### Características de los packraft

Los botes de packraft son ligeros y resistentes, diseñados para ser transportados fácilmente durante las excursiones de senderismo. Su versatilidad permite navegar por ríos y lagos sin dificultad.

### Versatilidad para combinar con senderismo

Una de las principales ventajas del packrafting es su capacidad para combinarse con el senderismo. Los aventureros pueden navegar y caminar en un entorno natural impresionante, disfrutando de vistas únicas.

## El Río de las Vueltas: El escenario perfecto para esta aventura

El Río de las Vueltas es un destino emblemático para el packrafting en El Chaltén. Sus aguas tranquilas y el paisaje circundante crean un escenario ideal para esta actividad.

### Geografía y condiciones ideales

La geografía del Río de las Vueltas ofrece condiciones ideales para el packrafting, con aguas generalmente calmadas y un entorno natural prístino.

### Vistas privilegiadas al Fitz Roy

Una de las experiencias más destacadas del packrafting en El Río de las Vueltas es la oportunidad de disfrutar de vistas impresionantes al Monte Fitz Roy, uno de los picos más emblemáticos de la Patagonia.

## ¿Por qué elegir Packrafting El Chaltén?

Nuestro servicio ofrece:
- **Experiencias 100% privadas y personalizadas**
- **Equipo de alta calidad y seguridad**
- **Guías certificados con experiencia local**
- **Grupos pequeños para una experiencia íntima**
- **Fotografías profesionales incluidas**

## Reserva tu aventura

¿Listo para vivir esta experiencia única? Contactanos para planificar tu aventura de packrafting en El Chaltén. No es solo una actividad, es tu conexión íntima con la Patagonia salvaje.',
  'Imagina navegar por las aguas cristalinas del Río de las Vueltas, rodeado de montañas majestuosas y glaciares impresionantes. En El Chaltén, la aventura toma un nuevo significado con el packrafting.',
  'https://page.gensparksite.com/v1/base64_upload/415d3394dd5f0c748694368bd91683fc',
  '["https://page.gensparksite.com/v1/base64_upload/415d3394dd5f0c748694368bd91683fc", "https://page.gensparksite.com/v1/base64_upload/ea4717796ac4ccff077c5ea89cbeae7c", "https://page.gensparksite.com/v1/base64_upload/277567c811f7ade0aa8a7dd08dc5e671"]',
  'https://www.linkedin.com/pulse/explora-el-chalt%25C3%25A9n-en-packraft-una-experiencia-%25C3%25BAnica-becker-vico-dbqjf',
  'Descubre el packrafting en El Chaltén, una experiencia única navegando el Río de las Vueltas con vistas al Fitz Roy. Aventura personalizada en la Patagonia argentina.',
  'packrafting, el chalten, patagonia, fitz roy, rio de las vueltas, aventura, kayak, trekking, turismo aventura, argentina',
  1,
  '2025-09-04 12:00:00',
  '2025-09-04 12:00:00'
);

-- Link post to categories
INSERT INTO blog_post_categories (post_id, category_id)
SELECT 
  (SELECT id FROM blog_posts WHERE slug = 'explora-el-chalten-en-packraft-una-experiencia-unica'),
  id
FROM blog_categories
WHERE slug IN ('packrafting', 'guias', 'naturaleza');