// Script para actualizar los dossiers con las imágenes reales
const fs = require('fs');

// URLs de las imágenes
const images = [
  'https://page.gensparksite.com/v1/base64_upload/71685e7d3a5eab7719ae81798359b8d9', // Grupo celebrando
  'https://page.gensparksite.com/v1/base64_upload/69c626fd5dbdf79f275e08874a939a8b', // Vista al Fitz Roy
  'https://page.gensparksite.com/v1/base64_upload/4bb11c5808ede1cc726e20db8ff0f318', // Vista aérea río
  'https://page.gensparksite.com/v1/base64_upload/53cc5ccc881e11faf29955e14aa2e94b', // Packrafts con Fitz Roy
  'https://page.gensparksite.com/v1/base64_upload/5a8981b167f391ad2be0be21a0907b5f', // Guía remando
  'https://page.gensparksite.com/v1/base64_upload/8337938d282ddd5978b5d6561bb96f92', // Río con bosque otoñal
  'https://page.gensparksite.com/v1/base64_upload/d900be6e78c5a5f1d8e2200eb43041f1', // Grupo en el río otoño
  'https://page.gensparksite.com/v1/base64_upload/3cec3359821756c11f7e416270a1fae9', // Packrafts con Fitz Roy fondo
  'https://page.gensparksite.com/v1/base64_upload/0f0d6ec78029b751396275ff35647192'  // Logo Hiking Tour
];

// Leer el dossier español
let dossierEs = fs.readFileSync('Dosier Comercial - Packrafting El Chaltén español.htm', 'utf8');

// Contador para reemplazar imágenes secuencialmente
let imageCounter = 0;

// Reemplazar todas las referencias a imágenes placeholder
dossierEs = dossierEs.replace(/src="https:\/\/packrafting-elchalten\.pages\.dev\/static\/images\/hero-packrafting\.jpg"/g, function() {
  if (imageCounter < images.length - 1) { // -1 porque la última es el logo
    return `src="${images[imageCounter++]}"`;
  }
  return `src="${images[0]}"`;
});

// Guardar el archivo actualizado
fs.writeFileSync('Dosier Comercial - Packrafting El Chaltén español.htm', dossierEs);

// Hacer lo mismo con el dossier en inglés
let dossierEn = fs.readFileSync('Commercial Dossier - Packrafting El Chaltén ingles.htm', 'utf8');

imageCounter = 0;
dossierEn = dossierEn.replace(/src="https:\/\/packrafting-elchalten\.pages\.dev\/static\/images\/hero-packrafting\.jpg"/g, function() {
  if (imageCounter < images.length - 1) {
    return `src="${images[imageCounter++]}"`;
  }
  return `src="${images[0]}"`;
});

fs.writeFileSync('Commercial Dossier - Packrafting El Chaltén ingles.htm', dossierEn);

console.log('Dossiers actualizados con las imágenes reales!');