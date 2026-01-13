'use client'

import { useEffect } from 'react'

// =======================
// FIX TYPESCRIPT
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
    }
  }
}

export default function AgentforceChat() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // 🔒 Evitar doble carga
    if (window.__SARKANY_ESW_LOADED__) return
    window.__SARKANY_ESW_LOADED__ = true

    const script = document.createElement('script')
    script.src =
      'https://sarkany.my.site.com/ESWAgentforceSarkany1768332702039/assets/js/bootstrap.min.js'
    script.type = 'text/javascript'
    script.async = true

    script.onload = () => {
      try {
        const esw = window.embeddedservice_bootstrap
        if (!esw) {
          console.error('embeddedservice_bootstrap no disponible')
          return
        }

        // Configuración
        esw.settings = esw.settings || {}
        esw.settings.language = 'es_MX'
        esw.settings.hideChatButtonOnLoad = true
        esw.settings.chatButtonPosition = '25px,-9999px'

        // Init PROD
        esw.init?.(
          '00Da500001QRvxI',
          'Agentforce_Sarkany',
          'https://sarkany.my.site.com/ESWAgentforceSarkany1768332702039',
          {
            scrt2URL: 'https://sarkany.my.salesforce-scrt.com'
          }
        )
      } catch (err) {
        console.error('Error inicializando Embedded Messaging:', err)
      }
    }

    document.body.appendChild(script)
  }, [])

  return (
    <>
      <div id="agentforce-sidebar"></div>

      <style jsx global>{`
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

        body.esw-open #agentforce-sidebar {
          transform: translateX(0);
          opacity: 1;
        }

        #agentforce-sidebar iframe,
        #agentforce-sidebar .embeddedMessagingFrame {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
        }

        #embeddedMessagingLauncher {
          display: none !important;
        }
      `}</style>
    </>
  )
}
