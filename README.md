# Telepatía - Medical AI Assistant

Sistema de inteligencia artificial médica que procesa consultas de voz para generar transcripciones, extraer información médica relevante y proporcionar diagnósticos preliminares.

## 🏗️ Arquitectura del Sistema

**Telepatía** es una aplicación full-stack que combina:

- **Backend**: Firebase Cloud Functions con Node.js 20 y APIs de OpenAI
- **Frontend**: React 19.1.0 con TypeScript, Vite y Tailwind CSS
- **AI/ML**: Integración con OpenAI Whisper (transcripción) y GPT-3.5-turbo (análisis médico)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │───▶│ Firebase Cloud  │───▶│   OpenAI APIs   │
│   (Frontend)    │    │   Functions     │    │ (Whisper & GPT) │
│                 │    │   (Backend)     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Flujo de Datos Médicos

1. **Transcripción**: Audio → Whisper API → Texto
2. **Extracción**: Texto → GPT-3.5 → Información médica estructurada
3. **Diagnóstico**: Info médica → GPT-3.5 → Diagnóstico preliminar

## 📁 Estructura del Proyecto

```
telepatia/
├── back/                           # Backend Firebase
│   ├── .env.project-id            # Variables de entorno del backend
│   ├── .firebaserc               # Configuración del proyecto Firebase
│   ├── firebase.json             # Configuración Firebase
│   └── functions/                # Cloud Functions
│       ├── package.json         # Dependencias Node.js
│       ├── tsconfig.json        # TypeScript config
│       └── src/
│           └── index.ts         # Funciones principales
│
└── front/                         # Frontend React
    ├── .env                      # Variables de entorno (crear desde .env.example)
    ├── .env.example             # Plantilla de variables de entorno
    ├── package.json             # Dependencias React
    ├── vite.config.ts          # Configuración Vite
    └── src/
        ├── App.tsx             # Componente principal
        ├── config/
        │   └── api.ts          # Configuración de APIs
        ├── components/         # Componentes React
        ├── services/           # Llamadas API
        ├── types/              # Interfaces TypeScript
        └── hooks/              # Custom hooks
```

## 🚀 Configuración Paso a Paso

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js 20+** - [Descargar aquí](https://nodejs.org/)
- **npm o yarn** - Viene incluido con Node.js
- **Git** - [Descargar aquí](https://git-scm.com/)

### 📋 Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/mquijanoj09/telepatia.git
cd telepatia
```

### 🔑 Paso 2: Configurar Firebase

#### 2.1 Crear un Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en "Crear un proyecto"
3. Sigue el asistente de configuración
4. **Importante**: Anota tu **Project ID** (lo necesitarás más adelante)

#### 2.2 Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

#### 2.3 Autenticarse en Firebase

```bash
firebase login
```

#### 2.4 Configurar el Proyecto Local

```bash
cd back
firebase use --add
# Selecciona tu proyecto de Firebase cuando se te solicite
```

### 🔧 Paso 3: Configurar el Backend

#### 3.1 Instalar Dependencias

```bash
cd back/functions
npm install
```

#### 3.2 Configurar Variables de Entorno del Backend

1. **Encuentra tu Project ID de Firebase:**

   - Abre Firebase Console
   - Ve a ⚙️ Project Settings
   - Copia el "Project ID"

2. **Crear archivo de configuración:**

   ```bash
   cd back  # Asegúrate de estar en el directorio back/
   cp .env.project-id .env.tu-project-id-aqui
   ```

   **Ejemplo:** Si tu Project ID es `mi-proyecto-medico-123`, ejecuta:

   ```bash
   cp .env.project-id .env.mi-proyecto-medico-123
   ```

3. **Obtener API Key de OpenAI:**

   - Ve a [OpenAI Platform](https://platform.openai.com/api-keys)
   - Haz clic en "Create new secret key"
   - Copia la clave (empieza con `sk-`)
   - **⚠️ Importante**: Asegúrate de tener créditos en tu cuenta OpenAI

4. **Editar el archivo `.env.tu-project-id-aqui`:**

   ```bash
   nano .env.tu-project-id-aqui  # o usa tu editor preferido
   ```

   Reemplaza el contenido con:

   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=sk-tu-clave-openai-aqui
   ```

#### 3.3 Compilar el Backend

```bash
npm run build
```

### ⚛️ Paso 4: Configurar el Frontend

#### 4.1 Instalar Dependencias

```bash
cd front  # Desde la raíz del proyecto
npm install
```

#### 4.2 Configurar Variables de Entorno del Frontend

1. **Crear archivo de configuración:**

   ```bash
   cp .env.example .env
   ```

2. **Editar el archivo `.env`:**

   ```bash
   nano .env  # o usa tu editor preferido
   ```

   Reemplaza el contenido con tu configuración:

   ```env
   # Firebase Configuration
   # Reemplaza con los datos de tu proyecto Firebase

   # Tu Project ID de Firebase (el mismo que usaste en el backend)
   VITE_FIREBASE_PROJECT_ID=tu-project-id-aqui

   # Región donde están desplegadas tus funciones (normalmente us-central1)
   VITE_FIREBASE_REGION=us-central1
   ```

   **Ejemplo completo:**

   ```env
   # Firebase Configuration
   VITE_FIREBASE_PROJECT_ID=mi-proyecto-medico-123
   VITE_FIREBASE_REGION=us-central1
   ```

### 🔥 Paso 5: Ejecutar el Proyecto Localmente

#### Opción A: Desarrollo Local Completo (Recomendado)

1. **Terminal 1 - Backend (Emuladores Firebase):**

   ```bash
   cd back
   firebase emulators:start --only functions
   ```

   **Deberías ver algo como:**

   ```
   ┌─────────────────────────────────────────────────────────────┐
   │ ✔  All emulators ready! It is now safe to connect your app. │
   │ i  View Emulator UI at http://127.0.0.1:4000/               │
   └─────────────────────────────────────────────────────────────┘

   ┌────────────────┬────────────────┬─────────────────────────────────┐
   │ Emulator       │ Host:Port      │ View in Emulator UI             │
   ├────────────────┼────────────────┼─────────────────────────────────┤
   │ Functions      │ 127.0.0.1:5001│ http://127.0.0.1:4000/functions │
   └────────────────┴────────────────┴─────────────────────────────────┘
   ```

2. **Terminal 2 - Frontend:**

   ```bash
   cd front
   npm run dev
   ```

   **Deberías ver:**

   ```
   VITE v5.0.0  ready in 200 ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

3. **Abrir la aplicación:**
   - Ve a http://localhost:5173/
   - La aplicación se conectará automáticamente a:
     `http://127.0.0.1:5001/tu-project-id/us-central1/processCompleteConsultation`

## 🔧 Variables de Entorno - Referencia Completa

### Frontend (`.env`)

```env
# 🔥 Firebase Configuration
VITE_FIREBASE_PROJECT_ID=tu-project-id       # Tu Project ID de Firebase
VITE_FIREBASE_REGION=us-central1              # Región de tus Cloud Functions

# 🔍 Cómo encontrar estos valores:
# 1. Firebase Console → Project Settings → Project ID
# 2. Cloud Functions → ubicación mostrada en la consola
```

### Backend (`.env.tu-project-id`)

```env
# 🤖 OpenAI Configuration
OPENAI_API_KEY=sk-xxxxxxxxx                  # Tu API Key de OpenAI

# 🔍 Cómo obtener:
# 1. https://platform.openai.com/api-keys
# 2. Create new secret key
# 3. Asegúrate de tener créditos en tu cuenta
```

## 🛠️ Comandos Útiles

### Desarrollo

```bash
# Backend: Iniciar emuladores
cd back && firebase emulators:start --only functions

# Frontend: Servidor de desarrollo
cd front && npm run dev

# Frontend: Build para producción
cd front && npm run build

# Backend: Deploy a producción
cd back && firebase deploy --only functions
```

### Debugging y Monitoreo

```bash
# Ver logs en tiempo real
firebase functions:log

# Ver logs de una función específica
firebase functions:log --only processCompleteConsultation

# Verificar configuración de Firebase
firebase functions:config:get

# Ver proyectos disponibles
firebase projects:list

# Ver qué proyecto está activo
firebase use
```

## 🚨 Solución de Problemas Comunes

### ❌ Error: "OPENAI_API_KEY is not defined"

**Problema:** El backend no encuentra la API key de OpenAI

**Solución:**

1. Verifica que creaste el archivo `.env.tu-project-id` correctamente
2. Asegúrate de que el nombre del archivo coincida exactamente con tu Project ID
3. Verifica que la variable `OPENAI_API_KEY` esté configurada

```bash
# Verificar archivo
ls -la back/.env.*

# Verificar contenido
cat back/.env.tu-project-id
```

### ❌ Error: "VITE_FIREBASE_PROJECT_ID is not defined"

**Problema:** El frontend no encuentra la configuración de Firebase

**Solución:**

1. Verifica que existe el archivo `front/.env`
2. Asegúrate de que `VITE_FIREBASE_PROJECT_ID` esté configurado
3. Reinicia el servidor de desarrollo

```bash
# Verificar archivo
cat front/.env

# Reiniciar frontend
cd front && npm run dev
```

### ❌ Error: "Failed to connect to emulators"

**Problema:** El frontend no puede conectar con los emuladores

**Solución:**

1. Verifica que los emuladores estén corriendo:
   ```bash
   cd back && firebase emulators:start --only functions
   ```
2. Verifica que la URL en el frontend sea correcta
3. Comprueba que no haya conflictos de puertos

### ❌ Error: "OpenAI API quota exceeded" (429)

**Problema:** Sin créditos en OpenAI

**Solución:**

1. Ve a [OpenAI Billing](https://platform.openai.com/account/billing)
2. Agrega créditos a tu cuenta
3. Verifica el uso actual en el dashboard

### ❌ Error: "Firebase project not found"

**Problema:** Proyecto Firebase mal configurado

**Solución:**

1. Verifica el Project ID en Firebase Console
2. Ejecuta: `firebase use --add` y selecciona el proyecto correcto
3. Asegúrate de que `.firebaserc` tenga el Project ID correcto

## 📝 Notas Importantes

### 🔒 Seguridad

- ⚠️ **Nunca** commites archivos `.env` al repositorio
- 🔑 Mantén las API keys seguras y privadas
- 🛡️ Usa variables de entorno en producción

### 💰 Costos

- 🤖 **OpenAI**: Pago por uso (Whisper + GPT-3.5-turbo)
- 🔥 **Firebase**: Plan Spark (gratis) o Blaze (pago por uso)
- 📊 Monitorea el uso en los dashboards respectivos

### 🔄 Actualizaciones

- 📦 Mantén las dependencias actualizadas
- 🔍 Revisa logs regularmente para detectar errores
- 📈 Monitorea el rendimiento en producción

## 📞 Soporte

Si encuentras problemas:

1. 📋 Revisa la sección "Solución de Problemas"
2. 📖 Consulta la documentación oficial:
   - [Firebase Functions](https://firebase.google.com/docs/functions)
   - [OpenAI API](https://platform.openai.com/docs)
   - [Vite](https://vitejs.dev/)
3. 🐛 Crea un issue en el repositorio con detalles del error

---

**Desarrollado usando React, Firebase y OpenAI**
