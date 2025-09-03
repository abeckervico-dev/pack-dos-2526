# 🔧 CONFIGURACIÓN DNS PARA hikingtour.tur.ar

## ⚠️ PROBLEMA DETECTADO
El dominio `hikingtour.tur.ar` está registrado en Cloudflare pero NO está apuntando correctamente a tu proyecto de Cloudflare Pages.

### Estado Actual:
- ✅ El dominio está agregado al proyecto `packrafting-elchalten` en Cloudflare Pages
- ❌ Los registros DNS actuales apuntan a otro sitio/proyecto
- ❌ El dominio muestra contenido diferente (otro sitio de packrafting)

## 🎯 SOLUCIÓN REQUERIDA

### Opción 1: CONFIGURACIÓN MANUAL EN CLOUDFLARE DASHBOARD (RECOMENDADO)

1. **Acceder al Dashboard de Cloudflare:**
   - Ve a https://dash.cloudflare.com
   - Selecciona el dominio `hikingtour.tur.ar`

2. **Ir a la sección DNS:**
   - Click en "DNS" en el menú lateral
   - Busca los registros actuales para el dominio

3. **ELIMINAR registros existentes:**
   - Elimina cualquier registro A, AAAA o CNAME para `@` (root) o `hikingtour.tur.ar`
   - Esto es necesario porque actualmente apunta a otro proyecto

4. **CREAR nuevo registro CNAME:**
   ```
   Type: CNAME
   Name: @ (o hikingtour.tur.ar)
   Target: packrafting-elchalten.pages.dev
   Proxy status: Proxied (naranja activado)
   ```

5. **Guardar cambios y esperar:**
   - Los cambios pueden tardar hasta 5 minutos en propagarse

### Opción 2: USAR FLATTENING DE CNAME

Si Cloudflare no permite CNAME en root (@), usar la función de "CNAME Flattening":

1. **En el Dashboard de Cloudflare:**
   - Ve a Rules > Page Rules
   - O usa la configuración de "CNAME Flattening" automática

2. **Configurar:**
   ```
   Type: CNAME
   Name: @
   Target: packrafting-elchalten.pages.dev
   ```

### Opción 3: CREAR SUBDOMINIOS

Si prefieres no cambiar el root domain:

1. **Crear subdominios:**
   ```
   Type: CNAME
   Name: www
   Target: packrafting-elchalten.pages.dev
   Proxy: Activado
   ```

   ```
   Type: CNAME
   Name: packrafting
   Target: packrafting-elchalten.pages.dev
   Proxy: Activado
   ```

## 📝 VERIFICACIÓN POST-CONFIGURACIÓN

Una vez configurado el DNS correctamente, verifica:

1. **Test directo:**
   ```bash
   curl -I https://hikingtour.tur.ar
   # Debe mostrar el contenido de tu sitio
   ```

2. **Verificar en navegador:**
   - Abre https://hikingtour.tur.ar
   - Debe mostrar tu sitio de Packrafting El Chaltén con el video de YouTube

3. **URLs que deben funcionar:**
   - https://hikingtour.tur.ar (tu sitio)
   - https://packrafting-elchalten.pages.dev (URL original de Cloudflare Pages)

## 🚨 IMPORTANTE

**El problema NO es del código ni del deployment.**
- El sitio está funcionando perfectamente en: https://packrafting-elchalten.pages.dev
- Solo necesitas actualizar los registros DNS en el dashboard de Cloudflare

## 💡 ALTERNATIVA SI NO TIENES ACCESO AL DNS

Si no puedes modificar los DNS del dominio principal, podemos:
1. Usar un subdominio diferente (ej: app.hikingtour.tur.ar)
2. Registrar un dominio nuevo
3. Usar el dominio de Cloudflare Pages directamente

## 🆘 NECESITAS AYUDA?

Si necesitas que te genere un token API con permisos de DNS, puedes:
1. Ir a Cloudflare Dashboard > My Profile > API Tokens
2. Crear un token con permisos: Zone:DNS:Edit
3. Compartir el token de forma segura para que pueda configurarlo por ti

---

**Nota:** Los cambios DNS pueden tardar hasta 48 horas en propagarse completamente, aunque normalmente con Cloudflare es mucho más rápido (5-10 minutos).