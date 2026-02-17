"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Bet } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"

type BetsContextType = {
  bets: Bet[]
  placeBet: (bet: Omit<Bet, "id" | "date" | "status">) => void
  simulateResults: () => void
}

const BetsContext = createContext<BetsContextType | null>(null)

const opponents = [
  "Usuario #8472",
  "Usuario #3291",
  "Usuario #1847",
  "Usuario #5632",
  "Usuario #9104",
  "Usuario #6753",
  "Carlos M.",
  "Maria L.",
  "Pedro R.",
  "Ana S.",
]

export function BetsProvider({ children }: { children: ReactNode }) {
  const { user, updateBalance } = useAuth()
  const [bets, setBets] = useState<Bet[]>([])

  // Load bets from localStorage
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`peerbet_bets_${user.id}`)
      if (stored) {
        try {
          setBets(JSON.parse(stored))
        } catch {
          setBets([])
        }
      } else {
        setBets([])
      }
    } else {
      setBets([])
    }
  }, [user])

  // Save bets to localStorage
  const saveBets = useCallback(
    (newBets: Bet[]) => {
      setBets(newBets)
      if (user) {
        localStorage.setItem(`peerbet_bets_${user.id}`, JSON.stringify(newBets))
      }
    },
    [user]
  )

  const placeBet = useCallback(
    (betData: Omit<Bet, "id" | "date" | "status">) => {
      if (!user) return

      const newBet: Bet = {
        ...betData,
        id: `b-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
      }

      // Simulate matching after 2 seconds
      setTimeout(() => {
        setBets((prev) => {
          const updated = prev.map((b) =>
            b.id === newBet.id
              ? {
                  ...b,
                  status: "matched" as const,
                  opponent:
                    b.mode === "direct"
                      ? b.opponent
                      : opponents[Math.floor(Math.random() * opponents.length)],
                }
              : b
          )
          if (user) localStorage.setItem(`peerbet_bets_${user.id}`, JSON.stringify(updated))
          return updated
        })
      }, 2000)

      // Deduct the amount from balance
      updateBalance(-betData.amount)

      const updated = [...bets, newBet]
      saveBets(updated)
    },
    [user, bets, saveBets, updateBalance]
  )

  const simulateResults = useCallback(() => {
    if (!user) return

    const updated = bets.map((bet) => {
      if (bet.status === "matched") {
        const won = Math.random() > 0.45 // ~55% win rate to keep it fun
        if (won) {
          const payout = bet.amount * 2 * 0.95 // 2x minus 5% commission
          updateBalance(payout)
        }
        return { ...bet, status: won ? ("won" as const) : ("lost" as const) }
      }
      return bet
    })

    saveBets(updated)
  }, [user, bets, saveBets, updateBalance])

  return (
    <BetsContext.Provider value={{ bets, placeBet, simulateResults }}>
      {children}
    </BetsContext.Provider>
  )
}

export function useBets() {
  const ctx = useContext(BetsContext)
  if (!ctx) throw new Error("useBets must be used within BetsProvider")
  return ctx
}
