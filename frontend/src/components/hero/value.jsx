import { UserCircleIcon, CalendarIcon, BoltIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Personalized Guidance',
    description: 'GradPath AI provides users with tailored career support, from job updates to resume improvements and mentorship connections.',
    icon: UserCircleIcon,
  },
  {
    name: 'Convenience',
    description: 'The platform automates many tasks, such as job notifications and resume feedback, saving users time and effort.',
    icon: CalendarIcon,
  },
  {
    name: 'Comprehensive Support',
    description: 'By combining job search assistance, resume analysis, and mentorship, GradPath AI offers end-to-end career development tools in one place.',
    icon: BoltIcon,
  },
  {
    name: 'AI-Powered',
    description: 'Leveraging AI for personalized recommendations and chatbot interactions adds a modern touch to traditional career services.',
    icon: UserCircleIcon, 
  },
]

export default function Example() {
  return (
    <div className="relative overflow-hidden py-12  bg-[#F9FAFB]">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
            
              <p className="mt-2 text-4xl  tracking-tight text-gray-900 sm:text-4xl">Why Choose GradPath AI</p>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Discover why GradPath AI stands out in providing career development support and tools.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9  font-bold">
                    <dt className="inline  text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline gap-4 font-light ">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="/value.svg"
            className="w-full max-w-[37rem] rounded-2xl object-cover mt-24"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 flex justify-center overflow-hidden"
        >
          <div
            style={{
              clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
            className="absolute inset-0 bg-gradient-to-r from-[#80cafe] to-[#4f46e5] opacity-25"
          />
        </div>
      </div>
    </div>
  )
}
