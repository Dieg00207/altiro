"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Shield, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  function handleCTA() {
    router.push(user ? "/dashboard" : "/auth")
  }

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 md:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[hsl(var(--primary))] opacity-[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
            <span className="text-sm text-[hsl(var(--muted-foreground))]">
              Plataforma regulada con licencia de Curazao
            </span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="mx-auto max-w-4xl text-balance text-center font-display text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-6xl lg:text-7xl">
          Apuestas deportivas{" "}
          <span className="text-[hsl(var(--primary))]">entre personas</span>,
          no contra la casa
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg leading-relaxed text-[hsl(var(--muted-foreground))] md:text-xl">
          La primera plataforma P2P donde tu apuestas contra otros usuarios reales.
          Sin cuotas artificiales. Sin intermediarios. Solo tu prediccion contra la de alguien mas.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="h-14 bg-[hsl(var(--primary))] px-8 font-display text-lg text-[hsl(var(--primary-foreground))] hover:bg-[hsl(150,80%,38%)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCTA}
          >
            {user ? "Ir al Dashboard" : "Crear cuenta gratis"}
            <ArrowRight className={`ml-2 h-5 w-5 transition-transform ${isHovered ? "translate-x-1" : ""}`} />
          </Button>
          {!user && (
            <Button
              size="lg"
              variant="outline"
              className="h-14 border-[hsl(var(--border))] bg-transparent px-8 font-display text-lg text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]"
              onClick={() => router.push("/auth")}
            >
              Iniciar sesion
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl">5%</span>
            <span className="text-center text-sm text-[hsl(var(--muted-foreground))]">Comision transparente</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl">6</span>
            <span className="text-center text-sm text-[hsl(var(--muted-foreground))]">Ligas disponibles</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-display text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl">P2P</span>
            <span className="text-center text-sm text-[hsl(var(--muted-foreground))]">Apuestas directas</span>
          </div>
        </div>

        {/* Feature pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2">
            <Shield className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span className="text-sm text-[hsl(var(--secondary-foreground))]">Anti-colusion</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2">
            <Users className="h-4 w-4 text-[hsl(var(--accent))]" />
            <span className="text-sm text-[hsl(var(--secondary-foreground))]">KYC Verificado</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2">
            <Zap className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span className="text-sm text-[hsl(var(--secondary-foreground))]">Matching inteligente</span>
          </div>
        </div>
      </div>
    </section>
  )
}
