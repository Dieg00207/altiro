const leagues = [
  { name: "La Liga", country: "Espana", flag: "ES", teams: 20 },
  { name: "Premier League", country: "Inglaterra", flag: "GB", teams: 20 },
  { name: "Serie A", country: "Italia", flag: "IT", teams: 20 },
  { name: "Bundesliga", country: "Alemania", flag: "DE", teams: 18 },
  { name: "Ligue 1", country: "Francia", flag: "FR", teams: 18 },
  { name: "Liga Nacional", country: "Honduras", flag: "HN", teams: 10 },
]

export function Leagues() {
  return (
    <section id="ligas" className="border-y border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold text-[hsl(var(--foreground))] md:text-4xl">
            Las mejores ligas del mundo
          </h2>
          <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
            Las 5 grandes ligas europeas mas la Liga Nacional de Honduras
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leagues.map((league) => (
            <div
              key={league.name}
              className="flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-5 transition-all hover:border-[hsl(var(--primary))]/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--secondary))] font-display text-lg font-bold text-[hsl(var(--foreground))]">
                {league.flag}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-[hsl(var(--foreground))]">{league.name}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {league.country} &middot; {league.teams} equipos
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
