import { CheckCircle2, ShieldCheck, AlertTriangle, Info } from "lucide-react"

const riskFactors = [
  { label: "Verificacion KYC", status: "ok", detail: "DNI y biometria verificados" },
  { label: "Cuenta bancaria", status: "ok", detail: "Banco Atlantida - verificado" },
  { label: "Patron de apuestas", status: "ok", detail: "Sin patrones sospechosos detectados" },
  { label: "Repeticion de oponentes", status: "ok", detail: "0 coincidencias repetidas en los ultimos 30 dias" },
  { label: "Dispositivos registrados", status: "warning", detail: "2 dispositivos activos (maximo 3)" },
  { label: "Direcciones IP", status: "ok", detail: "IPs consistentes con ubicacion declarada" },
]

export function RiskView() {
  const riskScore = 92

  return (
    <div>
      {/* Risk score card */}
      <div className="mb-8 rounded-2xl border border-[hsl(var(--primary))]/20 bg-[hsl(var(--card))] p-6 md:p-8">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          {/* Score circle */}
          <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <title>Score de confianza</title>
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeDasharray={`${(riskScore / 100) * 339} 339`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-display text-3xl font-bold text-[hsl(var(--foreground))]">{riskScore}</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">/ 100</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[hsl(var(--primary))]" />
              <h2 className="font-display text-xl font-bold text-[hsl(var(--foreground))]">
                Nivel de confianza: Alto
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              Tu score de confianza se calcula automaticamente basado en tu comportamiento, verificacion
              de identidad y patrones de apuesta. Un score alto desbloquea limites mas altos y beneficios.
            </p>
          </div>
        </div>
      </div>

      {/* Risk factors */}
      <h2 className="mb-4 font-display text-lg font-semibold text-[hsl(var(--foreground))]">
        Factores de riesgo
      </h2>
      <div className="space-y-2">
        {riskFactors.map((factor) => (
          <div
            key={factor.label}
            className="flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
          >
            {factor.status === "ok" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[hsl(var(--primary))]" />
            ) : (
              <AlertTriangle className="h-5 w-5 shrink-0 text-[hsl(var(--accent))]" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-[hsl(var(--foreground))]">{factor.label}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{factor.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info box */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--muted-foreground))]" />
        <p className="text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
          Nuestro motor anti-colusion analiza continuamente tu actividad para proteger la integridad
          de la plataforma. Si detectamos actividad sospechosa, tu limite se ajustara automaticamente.
          Esto protege a todos los usuarios.
        </p>
      </div>
    </div>
  )
}
