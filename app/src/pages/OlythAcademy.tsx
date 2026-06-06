import { BookOpen, Play, Award, Users } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'
import Button from '@/components/Button'
import { useScrollToTop } from '@/hooks/useScrollToTop'

const courses = [
  {
    title: 'Customer Support Fundamentals',
    description: 'Master the basics of modern customer support and best practices for emerging markets.',
    duration: '4 weeks',
    icon: BookOpen,
  },
  {
    title: 'AI-Powered Support Strategies',
    description: 'Learn how to leverage AI and automation to scale your support operations efficiently.',
    duration: '3 weeks',
    icon: Play,
  },
  {
    title: 'Omnichannel Communication',
    description: 'Understand how to manage customer interactions across WhatsApp, email, chat, and social.',
    duration: '2 weeks',
    icon: Users,
  },
  {
    title: 'Advanced Analytics & Reporting',
    description: 'Unlock insights from your customer support data to drive business decisions.',
    duration: '2 weeks',
    icon: Award,
  },
]

export default function OlythAcademy() {
  useScrollToTop()

  return (
    <main className="pt-24 md:pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-content mx-auto px-5">
        {/* Header */}
        <ScrollFadeIn className="text-center mb-16">
          <SectionLabel text="OLYTH ACADEMY" />
          <h1 className="font-archivo text-[28px] sm:text-[36px] md:text-[60px] font-light text-charcoal tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.4px] leading-[1.07] mt-4">
            Learn Customer Support Excellence
          </h1>
          <p className="font-inter text-base text-clay mt-4 max-w-lg mx-auto">
            Master modern customer support strategies and AI-powered solutions with our comprehensive learning platform.
          </p>
        </ScrollFadeIn>

        {/* Courses Grid */}
        <ScrollFadeIn stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {courses.map((course) => {
              const Icon = course.icon
              return (
                <div
                  key={course.title}
                  className="bg-white rounded-card p-8 border border-gray-200 hover:border-orange/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center">
                      <Icon size={24} className="text-orange" />
                    </div>
                    <span className="font-inter text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="font-archivo text-lg font-medium text-charcoal mb-3">
                    {course.title}
                  </h3>
                  <p className="font-inter text-sm text-clay leading-relaxed">
                    {course.description}
                  </p>
                </div>
              )
            })}
          </div>
        </ScrollFadeIn>

        {/* CTA Section */}
        <ScrollFadeIn className="bg-gradient-to-br from-orange/5 to-orange/10 rounded-card p-6 sm:p-12 border border-orange/20 text-center">
          <h2 className="font-archivo text-2xl sm:text-3xl font-light text-charcoal mb-4">
            Ready to Master Customer Support?
          </h2>
          <p className="font-inter text-base text-clay max-w-lg mx-auto mb-8">
            Join thousands of support professionals learning modern strategies to deliver exceptional customer experiences.
          </p>
          <Button className="mx-auto">
            Access Olyth Academy
          </Button>
        </ScrollFadeIn>

        {/* Features */}
        <ScrollFadeIn className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                number: '100+',
                label: 'Video Lessons',
              },
              {
                number: '15+',
                label: 'Expert Courses',
              },
              {
                number: '∞',
                label: 'Lifetime Access',
              },
            ].map((item, i) => (
              <div key={i}>
                <p className="font-archivo text-4xl font-light text-orange mb-2">
                  {item.number}
                </p>
                <p className="font-inter text-sm text-clay">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollFadeIn>
      </div>
    </main>
  )
}
