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
  {
    background: 'rgba(13, 110, 253, 0.25)',
    active: '#0D6EFD',
  },
  {
    background: 'rgba(255, 218, 68, 0.25)',
    active: '#E8C142',
  },
  {
    background: 'rgba(109, 165, 68, 0.25)',
    active: '#6DA544',
  },
] as const

export const families: {
  [key: number]: {
    name: string
    plan: Plan
    color: {
      background: string
      active: string
    }
  }
} = {
  1: {
    name: 'Ready',
    plan: plans.monthly,
    color: yellow,
  },
  2: {
    name: 'Start',
    plan: plans.monthly,
    color: yellow,
  },
  3: {
    name: 'Go',
    plan: plans.annual,
    color: green,
  },
  4: {
    name: 'Pro',
    plan: plans.annual,
    color: green,
  },
  5: {
    name: 'PayPerUse',
    plan: plans.bolts,
    color: blue,
  },
  6: {
    name: 'Free',
    plan: plans.perpetual,
    color: blue,
  },
} as const