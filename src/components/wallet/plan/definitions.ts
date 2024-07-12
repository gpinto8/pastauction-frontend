export type Plan = {
  name: string
  type: 'monthly' | 'annual' | 'perpetual' | 'bolts'
}

export const plans: Record<Plan['type'], Plan> = {
  monthly: {
    name: 'Monthly Plan',
    type: 'monthly',
  },
  annual: {
    name: 'Annual Plan',
    type: 'annual',
  },
  perpetual: {
    name: 'Perpetual Plan',
    type: 'perpetual',
  },
  bolts: {
    name: 'Bolts required',
    type: 'bolts',
  },
} as const

const [blue, yellow, green] = [
  'rgba(13, 110, 253, 0.25)',
  'rgba(255, 218, 68, 0.25)',
  'rgba(109, 165, 68, 0.25)',
] as const

export const families: {
  [key: number]: {
    plan: Plan
    color: string
  }
} = {
  1: {
    plan: plans.monthly,
    color: yellow,
  },
  2: {
    plan: plans.monthly,
    color: yellow,
  },
  3: {
    plan: plans.annual,
    color: green,
  },
  4: {
    plan: plans.annual,
    color: green,
  },
  5: {
    plan: plans.bolts,
    color: blue,
  },
  6: {
    plan: plans.perpetual,
    color: blue,
  },
} as const