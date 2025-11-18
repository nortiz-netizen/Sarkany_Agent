'use client'

import { useEffect } from 'react'

export default function AgentforceChat() {
  useEffect(() => {
    // Evita recargar el script más de una vez
    if (document.getElementById('agentforce-script')) return

    // Crea el script que inicializa el chat
    const script = document.createElement('script')
    script.id = 'agentforce-script'
    script.type = 'text/javascript'
    script.innerHTML = `
      function initEmbeddedMessaging() {
        try {
          embeddedservice_bootstrap.settings.language = 'es_MX'; // Cambia a 'es_CL' si prefieres
          embeddedservice_bootstrap.init(
            '00DWC000008ZdMr', // ID de tu organización
            'Agentforce_Sarkany', // Nombre del deployment
            'https://sarkany--vtex.sandbox.my.site.com/ESWAgentforceSarkany1761595746093', // URL del deployment
            {
              scrt2URL: 'https://sarkany--vtex.sandbox.my.salesforce-scrt.com'
            }
          );
        } catch (err) {
          console.error('Error loading Embedded Messaging:', err);
        }
      }

      const s = document.createElement('script');
      s.src = 'https://sarkany--vtex.sandbox.my.site.com/ESWAgentforceSarkany1761595746093/assets/js/bootstrap.min.js';
      s.onload = initEmbeddedMessaging;
      document.body.appendChild(s);
    `

    document.body.appendChild(script)
  }, [])

  return null
}
