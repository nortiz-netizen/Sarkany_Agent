'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import AgentforceChat from "@/components/ui/AgentforceChat"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <button className="flex items-center gap-2 text-sm text-muted-foreground lg:hidden">
            <Menu className="h-5 w-5" />
            <span>MENÚ</span>
          </button>

          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Sofía Sarkany
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Shop Worldwide
            </Link>
          </nav>

          <Link href="/" className="text-3xl font-bold tracking-wider">
            SARKANY
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Nuestros Locales
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] mt-16 overflow-hidden">
        <img
          src="/beach-summer-platform-sandals-fashion-photography.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold text-white mb-4 text-balance">HOY!</h1>
              <div className="bg-white/95 backdrop-blur p-6 rounded-lg inline-block">
                <div className="flex items-center gap-4">
                  <span className="text-7xl font-bold text-red-600">6</span>
                  <div>
                    <p className="text-2xl font-bold">CUOTAS</p>
                    <p className="text-xl font-bold">SIN INTERÉS</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      EN TODOS LOS PRODUCTOS SELECCIONADOS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "SANDALIAS",
              image: "/beige-leather-sandals-product-photography.jpg",
            },
            {
              title: "PLATAFORMAS",
              image: "/brown-leather-platform-sandals-with-straps.jpg",
            },
            {
              title: "CONFORT",
              image: "/snake-print-comfortable-sandals.jpg",
            },
            {
              title: "NUEVAS",
              image: "/black-platform-chunky-sandals.jpg",
            },
          ].map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center font-medium">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="container py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <img
              src="/fashion-model-wearing-platform-sandals-editorial-p.jpg"
              alt="Featured"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-balance">NUEVA COLECCIÓN</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Descubrí los diseños más innovadores de la temporada. Calzado artesanal con estilo único que combina
              comodidad y tendencia.
            </p>
            <Button size="lg" className="text-base">
              VER COLECCIÓN
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">CATEGORÍAS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "BOTAS",
                link: "#",
                image: "/leather-boots-fashion.jpg",
              },
              {
                title: "ZAPATILLAS",
                link: "#",
                image: "/stylish-fashion-sneakers.png",
              },
              {
                title: "ACCESORIOS",
                link: "#",
                image: "/leather-bags-accessories.jpg",
              },
              {
                title: "ARTESANALES",
                link: "#",
                image: "/artisan-handmade-shoes.jpg",
              },
            ].map((category) => (
              <Link
                key={category.title}
                href={category.link}
                className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <span className="text-sm text-white/90 underline">SHOP NOW</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 container">
        <h2 className="text-3xl font-bold mb-8 text-center">DESCUBRÍ LOS MÁS BUSCADOS</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              name: "Sandalia Trof",
              price: "$85.000",
              sale: "$42.500",
              discount: "50% OFF",
              image: "/leather-sandal-beige.jpg",
            },
            {
              name: "Sandalia Tradu",
              price: "$238.000",
              sale: "$119.000",
              discount: "50% OFF",
              image: "/platform-sandal-brown.jpg",
            },
            {
              name: "Plataforma Ring",
              price: "$128.000",
              sale: "$64.000",
              discount: "50% OFF",
              image: "/black-platform-sandal.jpg",
            },
            {
              name: "Sandalia Lumna",
              price: "$185.000",
              sale: "$92.500",
              discount: "50% OFF",
              image: "/white-platform-sandal.jpg",
            },
            {
              name: "Sandalia Chio",
              price: "$185.000",
              sale: "$92.500",
              discount: "50% OFF",
              image: "/tan-leather-sandal.jpg",
            },
          ].map((product, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3">
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    {product.discount}
                  </span>
                )}
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-sm mb-1">{product.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground line-through">{product.price}</span>
                <span className="font-bold">{product.sale}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SARKANY</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Calzado de diseño argentino con más de 40 años de trayectoria.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-4">AYUDA</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Encontrá tu local
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contactanos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-4">COMPAÑÍAS</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Sarkany International
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Sofia Sarkany
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-4">NEWSLETTER</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Suscribite y recibí ofertas exclusivas
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background"
                />
                <Button size="sm">Enviar</Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Sarkany. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* 👇 Botón + script del agente */}
      <AgentforceChat />
    </div>
  )
}
