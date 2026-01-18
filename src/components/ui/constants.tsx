
import type { Feature, Testimonial, PricingPlan, FAQItem } from '../../types/types';

export const FEATURES: Feature[] = [
  {
    title: "Fast Deployment",
    description: "Deploy your dashboard in minutes with our pre-built templates and CI/CD integrations.",
    icon: "bolt"
  },
  {
    title: "Universal Data",
    description: "Connect to any database seamlessly. SQL, NoSQL, or Graph - we support them all out of the box.",
    icon: "dataset"
  },
  {
    title: "Themable",
    description: "Fully customizable UI. Switch between themes or create your own design tokens with ease.",
    icon: "palette"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex Johnson",
    role: "Frontend Lead",
    content: "The component library is incredibly robust. It saved our team weeks of development time and the dark theme is simply stunning.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_zvm5UeDhwUpGIZR-THpMLOSO4r-ifkFYQLq8KVK708JCLotiBQRTgIrtBlo7a68QiKuDi6QSWviIQOO896rv8taAUMWlD4ojSw-Qim6Ty2wEwt81Vf5zmsGb7XkMnh7fzjkWro3rl1jqROE51HqJ8c_yhAVHFXTMQFB_vUhulyLaVG_RzQAlep01IgaSu9RHwwxbT7sl8OlB4a6Q7p98QT7OFKk8YcsVVcsDjC5xfIoWEOXEj6ZtCA2IlP7cMaMGdiTz6NSN7Hs0"
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    content: "I've tried many dashboard templates, but this one stands out for its code quality and attention to detail. Highly recommended.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnK3G_mlPB5YQ1NhJz-bcSUDjaU21msSYMnrRUiCOMriwXAXDx7ZPGPBAboHmQLVKydZa-Gq9DUvnj8CXXSj-4BmeLzO1wh74LVMdgL11r-rhfBRJ3E8zw1kcds0tANz63nXWxpozoSPg7OwdscM3Ftn0OlOIKA0QcVRx3xkkDrE8PC-RprzY-DnE6pgBBnENmc6tAeVVcrt43XVfH06TPILsnsEC1rtVuzr0LR5BfLltWwvO5koRiXx-Y2g5mr57jyW4BGzhHfNHR"
  },
  {
    name: "Michael Davis",
    role: "CTO, TechFlow",
    content: "The flexibility to switch between themes and the ease of customization is unmatched. A game changer for our SaaS product.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw2BLLB4a9e8ccfm4ti-LzGJDwGOMauV0YKZbOx3ffC-MCOL6TMcJCSEH50ZCLzqKt6lLXjZMhYdpkarXDF6cHXMeqJOhJyd6AnATwLM66bPsBo1COlE2iPsnQHyaO_dTTpThoxCG5hQGIZmEyHblVfVXB9IFAMtnZw9R69BtYKMjeOVQNH2SxfNQL0dCZrnf71LlGDuxYR6eTAOdqIca6WlGPdQvbo-roBr3LVHYgYHj9SzmE-4tmz251Ncw_F8r46izug0RGOEh2"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    description: "For hobby projects",
    price: "$0",
    features: ["Up to 3 projects", "Basic analytics", "Community support"],
    buttonText: "Get Started"
  },
  {
    name: "Pro",
    description: "For growing teams",
    price: "$29",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domains"],
    isPopular: true,
    buttonText: "Subscribe"
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "$99",
    features: ["Everything in Pro", "Dedicated support", "SLA Guarantee", "SSO Authentication"],
    buttonText: "Contact Sales"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "How does the pricing work?",
    answer: "Our pricing is tiered based on your needs. The Free plan is perfect for hobbyists, while the Pro plan offers advanced features for growing teams. Enterprise plans are tailored for large organizations."
  },
  {
    question: "How secure is my data?",
    answer: "Security is our top priority. We use industry-standard encryption for data at rest and in transit. Our infrastructure is hosted on secure cloud providers with 24/7 monitoring."
  },
  {
    question: "What are the limits on the Free plan?",
    answer: "The Free plan includes up to 3 projects and basic analytics. It's designed for individuals or small experiments. You can upgrade to Pro at any time."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. Your access to paid features will continue until the end of your current billing cycle."
  }
];
