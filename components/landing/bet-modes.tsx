import { Shuffle, UserPlus } from "lucide-react"

export function BetModes() {
  return (
    <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl">
            Dos formas de apostar
          </h2>
          <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
            Elige como quieres jugar. Cada modo tiene sus propias reglas de seguridad.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Random Matching */}
          <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--background))] p-8">
            <div className="absolute right-0 top-0 h-32 w-32 bg-[hsl(var(--primary))] opacity-[0.05] blur-[60px]" />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))]/10">
                <Shuffle className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="mb-2 font-display text-2xl font-bold text-[hsl(var(--foreground))]">
                Matching Aleatorio
              </h3>
              <div className="mb-4 inline-block rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1">
                <span className="text-xs font-semibold text-[hsl(var(--primary))]">SIN LIMITE MENSUAL</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--primary))]" />
                  <span className="text-sm leading-relaxed">El algoritmo te empareja con un usuario aleatorio que aposto en contra</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--primary))]" />
                  <span className="text-sm leading-relaxed">No puedes elegir con quien juegas</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--primary))]" />
                  <span className="text-sm leading-relaxed">Anti-repeticion: no volveras a coincidir con la misma persona en un periodo</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--primary))]" />
                  <span className="text-sm leading-relaxed">Se excluyen partidos con pocos apostadores para prevenir lavado</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Direct Challenge */}
          <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--accent))]/30 bg-[hsl(var(--background))] p-8">
            <div className="absolute right-0 top-0 h-32 w-32 bg-[hsl(var(--accent))] opacity-[0.05] blur-[60px]" />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--accent))]/10">
                <UserPlus className="h-6 w-6 text-[hsl(var(--accent))]" />
              </div>
              <h3 className="mb-2 font-display text-2xl font-bold text-[hsl(var(--foreground))]">
                Reto Directo
              </h3>
              <div className="mb-4 inline-block rounded-full bg-[hsl(var(--accent))]/10 px-3 py-1">
                <span className="text-xs font-semibold text-[hsl(var(--accent))]">CON LIMITE MENSUAL</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                  <span className="text-sm leading-relaxed">Reta a un amigo o conocido directamente</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                  <span className="text-sm leading-relaxed">Limite de gasto mensual por usuario para controlar riesgo</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                  <span className="text-sm leading-relaxed">Nosotros custodiamos el dinero: no mas apuestas de palabra</span>
                </li>
                <li className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                  <span className="text-sm leading-relaxed">Monitoreo de patrones entre usuarios frecuentes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
