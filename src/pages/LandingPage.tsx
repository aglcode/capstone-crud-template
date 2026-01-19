import React from 'react'
import Icon from '../components/ui/Icon';
import Navbar from '../components/layout/Navbar';
import AlertDemo from '../components/layout/Alert';import { FEATURES, TESTIMONIALS, PRICING_PLANS, FAQS } from '../components/ui/constants'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <div className="fixed bottom-4 left-4 z-40 max-w-sm">
        <AlertDemo />
      </div>

      <main>
        {/* Hero Section */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4">
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              v2.0 is now available
            </div>
            <h1 className="font-bold tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Build your next project faster
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              An open source CRUD dashboard built using the new components. 
              Accessible, customizable, and designed for the modern web.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">
                Get Started
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8">
                GitHub
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container space-y-6 py-8 md:py-12 lg:py-24 mx-auto px-4" id="features">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              This project is an experiment to see how a modern app, with features like auth, subscriptions, API routes, and static pages would work.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2">
                    <Icon name={feature.icon} className="text-foreground" />
                  </div>
                  <h3 className="font-semibold leading-none tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground pt-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container space-y-8 py-8 md:py-12 lg:py-24 mx-auto px-4">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Trusted by developers worldwide</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              See what our community has to say about using DashSystem for their products.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="rounded-xl border bg-card text-card-foreground shadow flex flex-col justify-between">
                <div className="p-6">
                  <p className="text-sm italic text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="p-6 pt-0 flex items-center gap-4">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                    <img alt={testimonial.name} className="aspect-square h-full w-full object-cover" src={testimonial.avatar} />
                  </span>
                  <div className="grid gap-0.5">
                    <p className="text-sm font-semibold leading-none">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="container space-y-8 py-8 md:py-12 lg:py-24 mx-auto px-4" id="pricing">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Simple, transparent pricing</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose the perfect plan for your project. No hidden fees.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8">
            {PRICING_PLANS.map((plan, idx) => (
              <div key={idx} className={`relative rounded-xl border flex flex-col p-6 shadow-lg ${plan.isPopular ? 'border-primary/50 bg-card ring-1 ring-primary/20' : 'bg-card'}`}>
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <div className="flex flex-col gap-1 mb-4">
                  <h3 className="font-semibold text-xl leading-none tracking-tight">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Icon name="check" className="text-primary text-lg" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 w-full px-4 py-2 ${plan.isPopular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground'}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container max-w-[58rem] py-8 md:py-12 lg:py-24 mx-auto px-4" id="faq">
          <div className="mx-auto flex flex-col items-center space-y-4 text-center mb-10">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Frequently Asked Questions</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Common questions about billing, security, and account management.
            </p>
          </div>
          <div className="w-full">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group border-b border-border">
                <summary className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline cursor-pointer list-none">
                  {faq.question}
                  <Icon name="ChevronDown" className="transition-transform duration-200 text-muted-foreground group-open:rotate-180" />
                </summary>
                <div className="pb-4 pt-0 text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 md:py-16 lg:py-20 border-t border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4 mb-12">
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground">Product</h3>
              <nav className="flex flex-col gap-3">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Features</a>
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Pricing</a>
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Documentation</a>
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground">Company</h3>
              <nav className="flex flex-col gap-3">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">About</a>
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Blog</a>
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Careers</a>
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground">Legal</h3>
              <nav className="flex flex-col gap-3">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Privacy</a>
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Terms</a>
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Cookie Policy</a>
              </nav>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground">Social</h3>
              <nav className="flex flex-col gap-3">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Twitter</a>
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">GitHub</a>
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" href="#">Discord</a>
              </nav>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground rounded-md p-1 h-8 w-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" className="w-4.5 h-4.5" viewBox="0 0 256 256">
                  <path d="M 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 128 C 256 198.692 198.692 256 128 256 L 128 192 C 163.346 192 192 163.346 192 128 Z M 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z M 256 0 C 256 70.692 198.692 128 128 128 L 128 64 C 163.346 64 192 35.346 192 0 Z" fill="currentColor"></path>
                </svg>
              </div>
              <span className="font-bold text-lg">DashSystem</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 DashSystem Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage