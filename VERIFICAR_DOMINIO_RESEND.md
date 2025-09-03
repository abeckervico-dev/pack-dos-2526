# 📧 CONFIGURACIÓN COMPLETA DEL EMAIL - PRÓXIMOS PASOS

## ✅ **ESTADO ACTUAL**
- **Formulario funcionando:** Los emails se envían correctamente
- **Destino temporal:** abeckervico@gmail.com
- **API Key configurada:** ✅ Resend funcionando

## 🔧 **PARA ACTIVAR EMAILS A contacto@hikingtour.tur.ar**

### **Paso 1: Verificar el dominio en Resend**

1. **Ingresá a Resend Dashboard:**
   - https://resend.com/domains
   - Click en "Add Domain"

2. **Agregar dominio:**
   - Domain: `hikingtour.tur.ar`
   - Click en "Add"

3. **Configurar registros DNS en Cloudflare:**
   
   Resend te va a dar 3 registros para agregar:
   
   **Registro 1 - SPF (TXT):**
   ```
   Name: @
   Type: TXT
   Value: "v=spf1 include:_spf.resend.com ~all"
   ```
   
   **Registro 2 - DKIM (TXT):**
   ```
   Name: resend._domainkey
   Type: TXT
   Value: [Te lo da Resend, es un texto largo]
   ```
   
   **Registro 3 - Return-Path (MX):**
   ```
   Name: bounces
   Type: MX
   Priority: 10
   Value: feedback-smtp.us-east-1.amazonses.com
   ```

4. **En Cloudflare Dashboard:**
   - Ve a DNS → Records
   - Agregar cada registro
   - Guardar cambios

5. **Verificar en Resend:**
   - Volver a Resend Dashboard
   - Click en "Verify DNS Records"
   - Esperar confirmación (puede tardar 5-10 minutos)

### **Paso 2: Actualizar el código**

Una vez verificado el dominio, necesito cambiar 2 líneas:

1. **Cambiar el remitente:**
   ```typescript
   from: 'Packrafting El Chaltén <noreply@hikingtour.tur.ar>'
   ```

2. **Cambiar el destinatario:**
   ```typescript
   to: 'contacto@hikingtour.tur.ar'
   ```

## 📊 **FLUJO ACTUAL DEL FORMULARIO**

```
Cliente llena formulario
    ↓
Validación de campos
    ↓
Envío a Resend API
    ↓
Email HTML formateado
    ↓
Llega a: abeckervico@gmail.com (temporal)
    ↓
Reply-To: email del cliente
```

## 📱 **DATOS QUE CAPTURA**

- **Nombre completo** ✅
- **Email** ✅  
- **Teléfono** (opcional)
- **Fecha deseada** (opcional)
- **Número de personas** (2-8)
- **Mensaje** ✅

## 🎨 **FORMATO DEL EMAIL**

El email llega con:
- Diseño HTML profesional
- Colores de marca
- Datos organizados
- Aviso de reenvío temporal
- Reply-To directo al cliente

## 💡 **TIPS**

1. **Los emails llegan instantáneamente** a tu Gmail
2. **Podés responder directo** - el Reply-To está configurado
3. **Una vez verificado el dominio**, los emails llegarán directo a contacto@hikingtour.tur.ar
4. **El formulario ya está 100% funcional** - solo falta el paso del dominio

## 🚀 **RESUMEN**

✅ Formulario funcionando
✅ Emails llegando a Gmail
✅ API de Resend configurada
⏳ Pendiente: Verificar dominio en Resend
⏳ Pendiente: Cambiar destino a contacto@hikingtour.tur.ar

---

**¿Necesitás ayuda con la verificación del dominio? Avisame cuando hayas agregado los DNS en Cloudflare.**