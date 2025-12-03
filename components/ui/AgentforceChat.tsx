'use client'

import { useEffect, useState } from 'react'

// Para que TypeScript conozca la propiedad en window
declare global {
  interface Window {
    embeddedservice_bootstrap?: {
      settings?: {
        language?: string
        hideChatButtonOnLoad?: boolean
        chatButtonPosition?: string
      }
      utilAPI?: {
        launchChat?: () => void
      }
    }
  }
}

export default function AgentforceChat() {
  const [isReady, setIsReady] = useState(false)
  const [highlight, setHighlight] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [pingCount, setPingCount] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Evita inyectar el script más de una vez
    if (!document.getElementById('agentforce-script')) {
      const script = document.createElement('script')
      script.id = 'agentforce-script'
      script.type = 'text/javascript'
      script.innerHTML = `
        function initEmbeddedMessaging() {
          try {
            embeddedservice_bootstrap.settings.language = 'es_MX';
            embeddedservice_bootstrap.settings.hideChatButtonOnLoad = true;
            // Mover el launcher original fuera de pantalla
            embeddedservice_bootstrap.settings.chatButtonPosition = '25px,-9999px';

            embeddedservice_bootstrap.init(
              '00DWC000008ZdMr',
              'Agentforce_Sarkany',
              'https://sarkany--vtex.sandbox.my.site.com/ESWAgentforceSarkany1761595746093',
              {
                scrt2URL: 'https://sarkany--vtex.sandbox.my.salesforce-scrt.com'
              }
            );
          } catch (err) {
            console.error('Error loading Embedded Messaging:', err);
          }
        }

        var s = document.createElement('script');
        s.src = 'https://sarkany--vtex.sandbox.my.site.com/ESWAgentforceSarkany1761595746093/assets/js/bootstrap.min.js';
        s.onload = initEmbeddedMessaging;
        document.body.appendChild(s);
      `
      document.body.appendChild(script)
    }

    const handleReady = () => {
      setIsReady(true)
    }

    window.addEventListener('onEmbeddedMessagingReady', handleReady as EventListener)

    return () => {
      window.removeEventListener('onEmbeddedMessagingReady', handleReady as EventListener)
    }
  }, [])

  // Ping de atención: se enciende UNA VEZ y queda así hasta que abra el chat
  useEffect(() => {
    if (!isReady) return

    const firstTimeout = setTimeout(() => {
      setPingCount(prev => prev + 1)
      setHighlight(true)
      setShowTooltip(true)
    }, 5000) // 5s después de estar listo

    return () => clearTimeout(firstTimeout)
  }, [isReady])

  const handleOpenChat = () => {
    if (typeof window === 'undefined') return

    const bootstrap = window.embeddedservice_bootstrap
    if (bootstrap?.utilAPI?.launchChat) {
      bootstrap.utilAPI.launchChat()
      // Al abrir el chat, volvemos a estado “normal”
      setHighlight(false)
      setShowTooltip(false)
      setPingCount(0)
    } else {
      console.warn('Embedded Messaging aún no está listo')
    }
  }

  const hasBadge = highlight && pingCount > 0

  return (
    <>
      {/* Contenedor fijo esquina inferior derecha */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Wrapper relativo para alinear tooltip + botón */}
        <div className="relative inline-flex flex-col items-end">
          {/* Globito flotante + robot afuera */}
          {showTooltip && (
            <div className="agentforce-tooltip-wrapper">
              <div className="agentforce-tooltip-with-avatar">
                <div className="agentforce-tooltip">
                  <p className="agentforce-tooltip-text">
                    Soy tu personal shopper, hablame y armamos tu look
                  </p>
                  <span className="agentforce-tooltip-tail" />
                </div>

                <div className="agentforce-bot-avatar-outside">
                  <img
                    src="/Gemini_Generated_Image_hdxi2ehdxi2ehdxi.png"
                    alt="Personal shopper"
                    className="agentforce-bot-avatar-outside-img"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botón flotante custom */}
          <button
            type="button"
            onClick={handleOpenChat}
            disabled={!isReady}
            className={
              'agentforce-launcher inline-flex items-center gap-2 rounded-full px-4 py-3 shadow-xl text-sm font-medium transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed ' +
              (highlight ? 'agentforce-launcher--highlight' : 'agentforce-launcher--normal')
            }
          >
            {highlight ? (
              <img
                src="/Gemini_Generated_Image_hdxi2ehdxi2ehdxi.png"
                alt="Personal shopper"
                className="agentforce-bot-avatar-btn"
              />
            ) : (
              <span className="text-lg">💬</span>
            )}

            <span>Personal shopper</span>

            {hasBadge && (
              <span className="agentforce-badge">
                +1
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Estilos del botón + animaciones */}
      <style jsx>{`
        .agentforce-launcher {
          transform-origin: center;
          animation: agentforce-bounce 2.2s infinite;
        }

        .agentforce-launcher:disabled {
          animation: none;
        }

        .agentforce-launcher--normal {
          background: #000;
          color: #fff;
        }

        .agentforce-launcher--highlight {
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          color: #fff;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.35), 0 18px 35px rgba(0, 0, 0, 0.45);
        }

        .agentforce-launcher:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.04);
        }

        @keyframes agentforce-bounce {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.03);
          }
        }

        .agentforce-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          border-radius: 999px;
          background: #ec4899;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
          animation: agentforce-badge-pop 0.7s ease-out, agentforce-badge-float 3s ease-in-out infinite;
        }

        @keyframes agentforce-badge-pop {
          0% {
            transform: scale(0.4);
            opacity: 0;
          }
          60% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes agentforce-badge-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        /* Tooltip + robot afuera hablándole */
        .agentforce-tooltip-wrapper {
          position: absolute;
          bottom: 100%;
          right: 0;
          margin-bottom: 0.6rem;
          animation: agentforce-tooltip-enter 0.35s ease-out,
            agentforce-tooltip-float 4s ease-in-out infinite;
        }

        .agentforce-tooltip-with-avatar {
          position: relative;
          display: inline-block;
        }

        .agentforce-tooltip {
          position: relative;
          max-width: 260px;
          padding: 0.6rem 0.8rem;
          border-radius: 0.75rem;
          background: rgba(0, 0, 0, 0.92);
          color: #fff;
          font-size: 0.8rem;
          line-height: 1.3;
          margin-right: 46px; /* espacio para el robot grande */
        }

        .agentforce-tooltip-text {
          margin: 0;
        }

        /* colita del globo apuntando al robot */
        .agentforce-tooltip-tail {
          position: absolute;
          top: 50%;
          right: -6px;
          width: 12px;
          height: 12px;
          background: rgba(0, 0, 0, 0.92);
          transform: translateY(-50%) rotate(45deg);
        }

        .agentforce-bot-avatar-outside {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(50%, -50%);
          width: 48px;
          height: 48px;
          border-radius: 999px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
        }

        .agentforce-bot-avatar-outside-img {
          width: 42px;
          height: 42px;
          object-fit: cover;
          display: block;
        }

        .agentforce-bot-avatar-btn {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          object-fit: cover;
          display: block;
        }

        @keyframes agentforce-tooltip-enter {
          0% {
            transform: translateY(10px) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes agentforce-tooltip-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
      `}</style>

      {/* Ocultar launcher original por si acaso */}
      <style jsx global>{`
        #embeddedMessagingLauncher {
          display: none !important;
        }
      `}</style>
    </>
  )
}
