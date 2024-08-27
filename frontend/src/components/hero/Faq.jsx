import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What is GradPath AI?",
    answer: "GradPath AI is an AI-driven platform that helps with job searches, resume analysis, and connecting with mentors.",
  },
  {
    question: "How does the Job Update Agent work?",
    answer: "The Job Update Agent sends personalized job notifications based on new postings, keeping you informed without manual searches.",
  },
  {
    question: "What is DishaBot?",
    answer: "DishaBot is an AI-powered chatbot that provides job-related guidance, tips, and resources.",
  },
  {
    question: "How does the Resume Analysis Agent improve my resume?",
    answer: "It analyzes your resume and provides suggestions for improvement.",
  },
  {
    question: "What is the Mentor Agent?",
    answer: "The Mentor Agent connects you with mentors based on experience and skills, allowing you to book calls for personalized career guidance.",
  },
  {
    question: "How do I book a call with a mentor?",
    answer: "Browse mentor profiles, select one, and book a call at a convenient time. You’ll receive email confirmation.",
  },
  {
    question: "Are all services on GradPath AI free?",
    answer: "Yes, all services on GradPath AI are free to use.",
  },
  {
    question: "How do I get started with GradPath AI?",
    answer: "Sign up and start using our tools for job updates, resume analysis, and mentorship.",
  },
]

export default function Faq() {
  return (
    <div className="relative overflow-hidden py-12 bg-[#F9FAFB] px-4 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
          className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80cafe] to-[#4f46e5] opacity-25"
        />
      </div>
     
      {/* FAQ Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-gray-900/10">
        <h2 className="text-3xl font-bold leading-10 tracking-tight text-primary text-center sm:text-left">Frequently asked questions</h2>
        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
          {faqs.map((faq) => (
            <Disclosure key={faq.question} as="div" className="pt-6">
              {({ open }) => (
                <>
                  <dt>
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <MinusSmallIcon aria-hidden="true" className="h-6 w-6" />
                        ) : (
                          <PlusSmallIcon aria-hidden="true" className="h-6 w-6" />
                        )}
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-0 sm:pr-12">
                    <p className="text-base text-secondary leading-7 text-gray-600">{faq.answer}</p>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  )
}
