"use client"

import { useState } from "react"
import { matches, type Match } from "@/lib/mock-data"
import { MatchCard } from "./match-card"
import { BetModal } from "./bet-modal"
import { cn } from "@/lib/utils"

const leagues = ["Todas", "La Liga", "Premier League", "Serie A", "Bundesliga", "Ligue 1", "Liga Nacional"]

export function MatchesView() {
  const [selectedLeague, setSelectedLeague] = useState("Todas")
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

  const liveMatches = matches.filter((m) => m.status === "live")
  const upcomingMatches = matches.filter((m) => m.status === "upcoming")

  const filteredLive =
    selectedLeague === "Todas"
      ? liveMatches
      : liveMatches.filter((m) => m.league === selectedLeague)

  const filteredUpcoming =
    selectedLeague === "Todas"
      ? upcomingMatches
      : upcomingMatches.filter((m) => m.league === selectedLeague)

  return (
    <>
      <div>
        {/* League filter */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {leagues.map((league) => (
            <button
              key={league}
              type="button"
              onClick={() => setSelectedLeague(league)}
              className={cn(
                "shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                selectedLeague === league
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                  : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]/30"
              )}
            >
              {league}
            </button>
          ))}
        </div>

        {/* Live matches */}
        {filteredLive.length > 0 && (
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[hsl(var(--live))]" />
              <h2 className="font-display text-lg font-semibold text-[hsl(var(--foreground))]">En vivo</h2>
              <span className="rounded-full bg-[hsl(var(--live))]/10 px-2 py-0.5 text-xs font-semibold text-[hsl(var(--live))]">
                {filteredLive.length}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredLive.map((match) => (
                <MatchCard key={match.id} match={match} onSelect={setSelectedMatch} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming matches */}
        {filteredUpcoming.length > 0 && (
          <div>
            <h2 className="mb-4 font-display text-lg font-semibold text-[hsl(var(--foreground))]">
              Proximos partidos
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredUpcoming.map((match) => (
                <MatchCard key={match.id} match={match} onSelect={setSelectedMatch} />
              ))}
            </div>
          </div>
        )}

        {filteredLive.length === 0 && filteredUpcoming.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-[hsl(var(--muted-foreground))]">No hay partidos disponibles para esta liga</p>
          </div>
        )}
      </div>

      {selectedMatch && (
        <BetModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </>
  )
}
