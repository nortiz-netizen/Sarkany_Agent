'use client'

import { useEffect } from 'react'

// =======================
//   FIX DE TYPESCRIPT
// =======================
declare global {
  interface Window {
    __SARKANY_ESW_LOADED__?: boolean
    embeddedservice_bootstrap?: {
      settings?: {
        language?: string
        hideChatButtonOnLoad?: boolean
        chatButtonPosition?: string
      }
      init?: (
        orgId: string,
        depName: string,
        url: string,
        options: { scrt2URL: string }
      ) => void
      utilAPI?: {
        launchChat?: () => void
      }
    }
  }
}

export default function AgentforceChat() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Evitar cargas duplicadas
    if (window.__SARKANY_ESW_LOADED__) return
    window.__SARKANY_ESW_LOADED__ = true

    const bootstrapScript = document.createElement('script')
    // 1. NUEVA URL DEL SCRIPT
    bootstrapScript.src =
      'https://sarkany.my.site.com/ESWAgentforceSarkany1768332702039/assets/js/bootstrap.min.js'
    bootstrapScript.type = 'text/javascript'

    bootstrapScript.onload = () => {
      try {
        const esw = window.embeddedservice_bootstrap
        if (!esw) {
          console.error('No se encontró embeddedservice_bootstrap')
          return
        }

        // Configuración (Mantenemos esto para que funcione tu Sidebar)
        esw.settings = esw.settings || {}
        esw.settings.language = 'es_MX'
        esw.settings.hideChatButtonOnLoad = true
        esw.settings.chatButtonPosition = '25px,-9999px' // esconder launcher original

        // 2. INICIALIZAR CON LAS NUEVAS CREDENCIALES
        esw.init?.(
          '00Da500001QRvxI', // Nuevo Org ID
          'Agentforce_Sarkany', // Nombre del Deployment
          'https://sarkany.my.site.com/ESWAgentforceSarkany1768332702039', // Nueva URL Base
          {
            scrt2URL: 'https://sarkany.my.salesforce-scrt.com' // Nueva URL SCRT2
          }
        )
      } catch (err) {
        console.error('Error inicializando ESW:', err)
      }
    }

    document.body.appendChild(bootstrapScript)
  }, [])

  // Sidebar donde se montará el chat (UI Mantenida)
  return (
    <>
      <div id="agentforce-sidebar"></div>

      <style jsx global>{`
        /* ==== SIDEBAR ==== */
        #agentforce-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 380px;
          height: 100vh;
          background: #fff;
          border-left: 1px solid #ddd;
          z-index: 9999;
          overflow: hidden;

          transform: translateX(100%);
          opacity: 0;
          transition: all 0.45s ease;
        }

        /* Sidebar abierto */
        body.esw-open #agentforce-sidebar {
          transform: translateX(0%);
          opacity: 1;
        }

        /* Ajustar iframe del chat */
        #agentforce-sidebar iframe,
        #agentforce-sidebar .embeddedMessagingFrame {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
        }

        /* Ocultar launcher original */
        #embeddedMessagingLauncher {
          display: none !important;
        }
      `}</style>
    </>
  )
}