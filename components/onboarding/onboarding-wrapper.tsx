"use client"

import type React from "react"

export function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  // ポップアップ形式のオンボーディングを削除し、子要素をそのまま表示
  return <>{children}</>
}

