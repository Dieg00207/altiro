import { Fingerprint, Shuffle, Trophy, Wallet } from "lucide-react"

const steps = [
  {
    icon: Fingerprint,
    title: "Verificacion KYC",
    description: "Registrate con tu DNI y verificacion biometrica. Una cuenta por persona, seguridad bancaria.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Wallet,
    title: "Deposita desde tu banco",
    description: "Solo aceptamos depositos bancarios. El filtro del banco garantiza dinero limpio.",
    color: "hsl(var(--accent))",
  },
  {
    icon: Shuffle,
    title: "Matching inteligente",
    description: "Nuestro algoritmo te empareja aleatoriamente con otro usuario. Sin repeticiones sospechosas.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Trophy,
    title: "Gana y retira",
    description: "Si tu prediccion es correcta, ganas. Cobramos solo el 5% de comision. Transparente.",
    color: "hsl(var(--accent))",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl">
            Como funciona
          </h2>
          <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
            Cuatro pasos simples para empezar a apostar de persona a persona
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all hover:border-[hsl(var(--primary))]/30"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${step.color}`, opacity: 0.15 }}
                >
                  <step.icon className="h-5 w-5" style={{ color: step.color }} />
                </div>
                <span className="font-display text-sm font-semibold text-[hsl(var(--muted-foreground))]">
                  Paso {i + 1}
                </span>
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-[hsl(var(--foreground))]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
