# Telepatía - Medical AI Assistant

Sistema de inteligencia artificial médica que procesa consultas de voz para generar transcripciones, extraer información médica relevante y proporcionar diagnósticos preliminares.

## Breve Descripción Técnica

**Telepatía** es una aplicación full-stack que combina:

- **Backend**: Firebase Cloud Functions con Node.js 20 y APIs de OpenAI
- **Frontend**: React 19.1.0 con TypeScript, Vite y Tailwind CSS
- **AI/ML**: Integración con OpenAI Whisper (transcripción) y GPT-3.5-turbo (análisis médico)

### Arquitectura del Sistema

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

## Decisiones de Diseño Relevantes

### Backend (Firebase Functions)

- **Firebase Functions v2**: Mayor rendimiento y escalabilidad
- **OpenAI SDK**: Integración directa con Whisper y GPT APIs
- **CORS configurado**: Permite llamadas desde el frontend
- **Variables de entorno**: Configuración segura de API keys
- **TypeScript**: Tipado fuerte para confiabilidad del código

### Frontend (React + TypeScript)

- **Arquitectura de componentes**: 15+ componentes modulares y reutilizables
- **Custom hooks**: Lógica de estado y efectos encapsulada
- **Service layer**: Abstracción de llamadas API
- **Tailwind CSS**: Diseño responsive y consistente
- **TypeScript interfaces**: Tipado completo para datos médicos

### Configuración Dinámica

- **Variables de entorno**: Configuración flexible para desarrollo/producción
- **Detección automática**: Cambia entre APIs local y remota según el entorno
- **URLs configurables**: Soporte para emuladores locales y Cloud Functions

## Estructura del Proyecto

```
telepatia/
├── back/                           # Backend Firebase
│   ├── firebase.json              # Configuración Firebase
│   └── functions/                 # Cloud Functions
│       ├── package.json          # Dependencias Node.js
│       ├── tsconfig.json         # TypeScript config
│       └── src/
│           └── index.ts          # Funciones principales
│
└── front/                          # Frontend React
    ├── package.json              # Dependencias React
    ├── vite.config.ts           # Configuración Vite
    ├── .env                     # Variables de entorno
    ├── .env.example             # Plantilla de variables
    └── src/
        ├── App.tsx              # Componente principal
        ├── main.tsx             # Entry point
        ├── components/          # Componentes React
        ├── config/              # Configuración API
        ├── services/            # Llamadas API
        ├── types/               # Interfaces TypeScript
        └── hooks/               # Custom hooks
```

## Configuración del Proyecto

### Prerrequisitos

- Node.js 20+
- npm o yarn
- Firebase CLI
- Cuenta de OpenAI con créditos
- Cuenta de Firebase

### Instalación Inicial

1. **Clonar el repositorio**

```bash
cd /path/to/telepatia
```

2. **Instalar Firebase CLI** (si no está instalado)

```bash
npm install -g firebase-tools
```

3. **Autenticarse en Firebase**

```bash
firebase login
```

### Configuración del Backend

1. **Ir al directorio de funciones**

```bash
cd back/functions
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno de Firebase**

```bash
# Configurar la API key de OpenAI
firebase functions:config:set openai.api_key="tu-openai-api-key-aqui"

# Verificar configuración
firebase functions:config:get
```

4. **Compilar TypeScript**

```bash
npm run build
```

### Configuración del Frontend

1. **Ir al directorio del frontend**

```bash
cd front
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env según tu configuración:
# VITE_USE_LOCAL_BACKEND=true    # Para desarrollo local
# VITE_USE_PRODUCTION_API=false  # Para usar Firebase local
```

## APIs Utilizadas

### OpenAI APIs

1. **Whisper API** (Speech-to-Text)

   - **Propósito**: Transcripción de audio médico
   - **Modelo**: `whisper-1`
   - **Input**: Archivos de audio (mp3, wav, etc.)
   - **Output**: Texto transcrito

2. **GPT-3.5-turbo** (Análisis médico)
   - **Propósito**: Extracción de información y diagnóstico
   - **Configuración**: Temperature 0.3 para respuestas consistentes
   - **Prompts especializados**: Contexto médico específico

### Configuración de OpenAI

1. **Obtener API Key**

   - Ir a [OpenAI Platform](https://platform.openai.com/api-keys)
   - Crear nueva API key
   - Asegurar créditos suficientes en la cuenta

2. **Configurar en Firebase**

```bash
firebase functions:config:set openai.api_key="sk-tu-clave-aqui"
```

## Ejecutar el Proyecto Localmente

### Opción 1: Backend Local + Frontend Local

1. **Terminal 1: Emuladores Firebase**

```bash
cd back
firebase emulators:start --only functions
```

2. **Terminal 2: Frontend React**

```bash
cd front
npm run dev
```

3. **Configurar variables de entorno en `.env`:**

```env
VITE_USE_LOCAL_BACKEND=true
VITE_USE_PRODUCTION_API=false
```

### Opción 2: Backend Producción + Frontend Local

1. **Terminal: Frontend React**

```bash
cd front
npm run dev
```

2. **Configurar variables de entorno en `.env`:**

```env
VITE_USE_LOCAL_BACKEND=false
VITE_USE_PRODUCTION_API=true
```

## Despliegue en Producción

### Desplegar Backend

1. **Compilar y desplegar funciones**

```bash
cd back/functions
npm run build
cd ..
firebase deploy --only functions
```

2. **Verificar despliegue**

```bash
firebase functions:log
```

### Desplegar Frontend

1. **Construir para producción**

```bash
cd front
npm run build
```

2. **Opción A: Desplegar en Firebase Hosting**

```bash
# Configurar hosting en firebase.json
firebase deploy --only hosting
```

2. **Opción B: Desplegar en otro servicio**

```bash
# Los archivos están en /front/dist
# Subir contenido de dist/ a tu servicio de hosting
```

## Testing y Desarrollo

### Probar con Audio

1. **Subir archivo a Google Drive** (temporal)
2. **Obtener link público** con `id` del archivo
3. **Usar formato**: `https://drive.google.com/uc?id=FILE_ID`
4. **Probar en la aplicación** con el link

### Monitoreo y Logs

```bash
# Ver logs de funciones en tiempo real
firebase functions:log --only=processCompleteConsultation

# Ver logs específicos
firebase functions:log --only=transcribeAudio
```

### Debugging

1. **Frontend**: Usar DevTools del navegador
2. **Backend**: Logs de Firebase Functions
3. **APIs**: Monitor en OpenAI dashboard

## Variables de Entorno

### Frontend (.env)

```env
# Configuración de API
VITE_USE_LOCAL_BACKEND=true|false      # Forzar backend local
VITE_USE_PRODUCTION_API=true|false     # Forzar API de producción
```

### Backend (Firebase Config)

```bash
# OpenAI API Key
openai.api_key: "sk-..."

# Verificar configuración
firebase functions:config:get
```

## Comandos Útiles

### Desarrollo

```bash
# Backend: Emuladores
cd back && firebase emulators:start

# Frontend: Servidor de desarrollo
cd front && npm run dev

# Frontend: Build
cd front && npm run build

# Backend: Deploy
cd back && firebase deploy --only functions
```

### Debugging

```bash
# Logs en tiempo real
firebase functions:log

# Estado de Firebase
firebase projects:list

# Información del proyecto
firebase use
```

## Solución de Problemas Comunes

### Error: OpenAI API Quota Exceeded (429)

**Problema**: Sin créditos en OpenAI
**Solución**: Agregar créditos en [OpenAI Billing](https://platform.openai.com/account/billing)

### Error: CORS

**Problema**: Frontend no puede conectar al backend
**Solución**: Verificar configuración de CORS en las funciones

### Error: Firebase Functions not found

**Problema**: URLs incorrectas o funciones no desplegadas
**Solución**:

1. Verificar despliegue: `firebase deploy --only functions`
2. Verificar URLs en configuración API

### Error: Environment variables

**Problema**: Variables de entorno no definidas
**Solución**:

1. Frontend: Verificar archivo `.env`
2. Backend: `firebase functions:config:set`

## Contribuir

1. Hacer fork del proyecto
2. Crear feature branch
3. Hacer commit de cambios
4. Push a la branch
5. Crear Pull Request

## Licencia

[Especificar licencia del proyecto]

---

**Desarrollado con ❤️ usando React, Firebase y OpenAI**
