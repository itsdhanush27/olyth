import StatCounter from '@/components/StatCounter'

const stats = [
  { value: '1000000+', label: 'Conversations Automated', color: 'orange' as const },
  { value: '85%', label: 'First-Contact Resolution', color: 'teal' as const },
  { value: '10x', label: 'Support Volume Scaled', color: 'orange' as const },
  { value: '3min', label: 'Average Response Time', color: 'teal' as const },
]

export default function ImpactStatsSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-content mx-auto px-5">
        {/* Top border */}
        <div className="w-full h-px bg-gray-200 mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              color={stat.color}
              delay={i * 0.15}
            />
          ))}
        </div>

        {/* Bottom border */}
        <div className="w-full h-px bg-gray-200 mt-16" />
      </div>
    </section>
  )
}
