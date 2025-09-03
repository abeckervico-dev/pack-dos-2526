# 📧 CONFIGURACIÓN DEL SERVICIO DE EMAIL

## ✅ **FORMULARIO CONFIGURADO**
El formulario de contacto ya está configurado y listo para enviar emails a `contacto@hikingtour.tur.ar`.

## 🔧 **OPCIONES PARA ACTIVAR EL ENVÍO DE EMAILS**

### **Opción 1: RESEND (RECOMENDADO - Más simple)**

1. **Crear cuenta en Resend:**
   - Ve a https://resend.com/signup
   - Registrate con tu email
   - Es GRATIS hasta 100 emails/día

2. **Verificar tu dominio:**
   - En Resend Dashboard, agregar dominio `hikingtour.tur.ar`
   - Agregar los registros DNS que te pide en Cloudflare
   - Esperar verificación (5-10 minutos)

3. **Obtener API Key:**
   - En Resend Dashboard → API Keys
   - Crear nueva API key
   - Copiar la key (empieza con `re_`)

4. **Configurar en Cloudflare:**
   ```bash
   npx wrangler pages secret put RESEND_API_KEY --project-name packrafting-elchalten
   # Pegar tu API key cuando te lo pida
   ```

5. **Activar el código:**
   - Descomenta el código entre `/* */` en el archivo `/api/contact`
   - Deploy nuevamente

### **Opción 2: SENDGRID**

1. **Crear cuenta en SendGrid:**
   - https://signup.sendgrid.com/
   - Plan gratuito: 100 emails/día

2. **Verificar sender:**
   - Settings → Sender Authentication
   - Verificar `contacto@hikingtour.tur.ar`

3. **Obtener API Key:**
   - Settings → API Keys → Create API Key

4. **Configurar en Cloudflare:**
   ```bash
   npx wrangler pages secret put SENDGRID_API_KEY --project-name packrafting-elchalten
   ```

### **Opción 3: MAILGUN**

Similar proceso a SendGrid pero con Mailgun.

## 📝 **CÓMO FUNCIONA ACTUALMENTE**

Mientras no configures un servicio de email:
- ✅ El formulario valida todos los campos
- ✅ Muestra mensaje de éxito al usuario
- ✅ Los datos se loguean en la consola
- ❌ No se envía email real (necesitas API key)

## 🚀 **PARA ACTIVAR EL ENVÍO REAL**

1. **Elegí un servicio** (Resend es el más fácil)
2. **Conseguí tu API Key**
3. **Pasame la key** de forma segura o configurala vos:
   ```bash
   npx wrangler pages secret put RESEND_API_KEY --project-name packrafting-elchalten
   ```
4. **Avisame para activar el código**

## 📱 **ALTERNATIVA SIN CONFIGURACIÓN**

Si no querés configurar emails ahora, podés:
1. Usar solo WhatsApp para contacto
2. Integrar un formulario de Google Forms
3. Usar Typeform embebido

## 🔒 **SEGURIDAD**

- **NUNCA** pongas API keys en el código
- Siempre usar `wrangler secret` para guardarlas
- Las keys se guardan encriptadas en Cloudflare

## 💡 **DATOS DEL FORMULARIO**

El formulario captura:
- Nombre completo (requerido)
- Email (requerido)
- Teléfono (opcional)
- Fecha deseada (opcional)
- Número de personas (opcional)
- Mensaje (requerido)

Cuando se active, cada email tendrá:
- Subject: `Nueva consulta de [NOMBRE] - Packrafting El Chaltén`
- To: `contacto@hikingtour.tur.ar`
- Reply-To: Email del cliente
- Formato HTML profesional

---

**¿Querés que active el envío de emails ahora? Necesito tu API Key de alguno de estos servicios.**