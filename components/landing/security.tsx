import { Eye, Fingerprint, RefreshCw, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: ShieldCheck,
    title: "Motor Anti-Colusion",
    description:
      "Nuestro algoritmo evita que dos usuarios coincidan repetidamente. Detectamos patrones de perdida intencional, IPs compartidas y dispositivos duplicados.",
  },
  {
    icon: Fingerprint,
    title: "Biometria + DNI",
    description:
      "Una cuenta por persona. Verificacion biometrica facial y documento de identidad para evitar cuentas multiples.",
  },
  {
    icon: Eye,
    title: "Monitoreo en tiempo real",
    description:
      "Sistema de scoring de riesgo por usuario. Limites dinamicos que se ajustan segun el comportamiento. Deteccion estadistica de anomalias.",
  },
  {
    icon: RefreshCw,
    title: "Matching aleatorio",
    description:
      "Las apuestas de matching abierto se emparejan aleatoriamente. Imposible elegir contra quien juegas. Esto previene arreglos y lavado.",
  },
]

export function Security() {
  return (
    <section id="seguridad" className="px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl">
            Seguridad de nivel bancario
          </h2>
          <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
            Disenado desde cero para prevenir lavado de dinero, colusion y apuestas arregladas
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 transition-all hover:border-[hsl(var(--primary))]/30"
            >
              <feature.icon className="mb-4 h-8 w-8 text-[hsl(var(--primary))]" />
              <h3 className="mb-3 font-display text-xl font-semibold text-[hsl(var(--foreground))]">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-[hsl(var(--muted-foreground))]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
