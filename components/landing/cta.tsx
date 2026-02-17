"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function CTA() {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <section className="px-4 py-20 md:px-6 lg:px-8">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[hsl(var(--primary))]/20 bg-[hsl(var(--card))] p-12 text-center md:p-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary))] opacity-[0.04] blur-[100px]" />
        </div>
        <div className="relative">
          <h2 className="font-display text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl">
            Listo para apostar de verdad?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
            Unete a la primera plataforma P2P de apuestas deportivas en Centroamerica.
            Tu prediccion, tu dinero, tu juego.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 bg-[hsl(var(--primary))] px-8 font-display text-lg text-[hsl(var(--primary-foreground))] hover:bg-[hsl(150,80%,38%)]"
              onClick={() => router.push(user ? "/dashboard" : "/auth")}
            >
              {user ? "Ir al Dashboard" : "Crear cuenta gratis"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
            Sin costos ocultos. Solo 5% de comision por apuesta.
          </p>
        </div>
      </div>
    </section>
  )
}
