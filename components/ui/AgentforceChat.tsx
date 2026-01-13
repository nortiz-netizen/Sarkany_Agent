'use client'

import { useEffect, useRef } from 'react'

export default function AgentforceChat() {
  const loadedRef = useRef(false)

  useEffect(() => {
    // 1. Evitar que se ejecute en el servidor (SSR)
    if (typeof window === 'undefined') return

    // 2. Evitar carga doble si el componente se remonta
    if (loadedRef.current) return
    loadedRef.current = true

    // 3. Crear y cargar el script de Salesforce
    const script = document.createElement('script')
    script.src = 'https://sarkany.my.site.com/ESWAgentforceSarkany1768332702039/assets/js/bootstrap.min.js'
    script.type = 'text/javascript'
    script.async = true

    script.onload = () => {
      try {
        // Asegurarnos que el objeto existe
        if (!window.embeddedservice_bootstrap) {
          console.error('Error: embeddedservice_bootstrap no encontrado')
          return
        }

        // 4. Configuración (Igual a tu snippet)
        window.embeddedservice_bootstrap.settings.language = 'es_MX'

        // 5. Inicialización (Tus nuevas credenciales)
        window.embeddedservice_bootstrap.init(
          '00Da500001QRvxI',
          'Agentforce_Sarkany',
          'https://sarkany.my.site.com/ESWAgentforceSarkany1768332702039',
          {
            scrt2URL: 'https://sarkany.my.salesforce-scrt.com'
          }
        )
      } catch (err) {
        console.error('Error loading Embedded Messaging: ', err)
      }
    }

    document.body.appendChild(script)
  }, [])

  // No renderizamos nada visual, Salesforce inyectará su propio botón flotante
  return null
}

// ==========================================
// DEFINICIÓN DE TIPOS (Para evitar errores TS)
// ==========================================
declare global {
  interface Window {
    embeddedservice_bootstrap?: {
      settings: {
        language?: string
      }
      init: (
        orgId: string,
        depName: string,
        url: string,
        options: { scrt2URL: string }
      ) => void
    }
  }
}