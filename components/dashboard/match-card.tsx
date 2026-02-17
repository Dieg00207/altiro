"use client"

import type { Match } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Users } from "lucide-react"

type MatchCardProps = {
  match: Match
  onSelect: (match: Match) => void
}

export function MatchCard({ match, onSelect }: MatchCardProps) {
  const isLive = match.status === "live"

  return (
    <button
      type="button"
      onClick={() => onSelect(match)}
      className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-left transition-all hover:border-[hsl(var(--primary))]/40"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">
            {match.leagueCountry}
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{match.league}</span>
        </div>
        {isLive ? (
          <div className="flex items-center gap-1.5 rounded-full bg-[hsl(var(--live))]/10 px-2.5 py-1">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--live))]" />
            <span className="text-xs font-semibold text-[hsl(var(--live))]">
              {match.minute}{"'"}
            </span>
          </div>
        ) : (
          <span className="text-xs text-[hsl(var(--muted-foreground))]">{match.time}</span>
        )}
      </div>

      {/* Teams */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className={cn(
            "font-display text-sm font-semibold",
            isLive && match.score && match.score.home > match.score.away
              ? "text-[hsl(var(--primary))]"
              : "text-[hsl(var(--foreground))]"
          )}>
            {match.homeTeam}
          </p>
        </div>

        {isLive && match.score ? (
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-[hsl(var(--foreground))]">
              {match.score.home}
            </span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">-</span>
            <span className="font-display text-xl font-bold text-[hsl(var(--foreground))]">
              {match.score.away}
            </span>
          </div>
        ) : (
          <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">vs</span>
        )}

        <div className="flex-1 text-right">
          <p className={cn(
            "font-display text-sm font-semibold",
            isLive && match.score && match.score.away > match.score.home
              ? "text-[hsl(var(--primary))]"
              : "text-[hsl(var(--foreground))]"
          )}>
            {match.awayTeam}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-[hsl(var(--border))] pt-3">
        <div className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))]">
          <Users className="h-3.5 w-3.5" />
          <span className="text-xs">{match.activeBets} apuestas activas</span>
        </div>
        <span className="text-xs font-medium text-[hsl(var(--primary))]">Apostar</span>
      </div>
    </button>
  )
}
