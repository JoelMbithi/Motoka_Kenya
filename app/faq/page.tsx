import { ChevronDown, Search, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const faqCategories = [
  {
    title: "For Buyers",
    faqs: [
      {
        question: "How do I know if a dealer is verified?",
        answer:
          "All verified dealers have a green 'Verified' badge on their profiles. We verify business licenses, KRA PIN certificates, and conduct background checks before approval.",
      },
      {
        question: "Are the vehicle prices negotiable?",
        answer:
          "Many dealers offer negotiable prices. Look for the 'Negotiable' tag on listings. You can contact dealers directly to discuss pricing.",
      },
      {
        question: "Can I get financing for a vehicle?",
        answer:
          "Yes, many of our dealers offer financing options. You can also explore third-party financing through banks and SACCOs. Contact dealers for specific financing arrangements.",
      },
      {
        question: "What should I check before buying a vehicle?",
        answer:
          "Always inspect the vehicle physically, check all documents (logbook, insurance), verify the VIN number, and consider getting a professional inspection. Our platform provides inspection reports for many vehicles.",
      },
      {
        question: "How do I contact a dealer?",
        answer:
          "You can call, WhatsApp, or email dealers directly through their listing pages. Contact information is provided for each verified dealer.",
      },
    ],
  },
  {
    title: "For Dealers",
    faqs: [
      {
        question: "How do I become a verified dealer?",
        answer:
          "Complete our dealer registration form with your business documents (business license, KRA PIN, ID copy). Our team will review and verify your application within 2-3 business days.",
      },
      {
        question: "What documents do I need to register?",
        answer:
          "You need a valid business license, KRA PIN certificate, and ID copy of the contact person. All documents should be current and valid.",
      },
      {
        question: "How much does it cost to list vehicles?",
        answer:
          "We offer various pricing plans. Basic listings start from KES 500 per month per vehicle. Premium features and featured listings have additional costs.",
      },
      {
        question: "How long does it take for listings to go live?",
        answer:
          "New listings are reviewed within 24 hours. Once approved, they immediately appear on our platform and are searchable by buyers.",
      },
      {
        question: "Can I edit my listings after they're published?",
        answer:
          "Yes, you can edit your listings anytime through your dealer dashboard. Changes may require re-approval if they involve major details like price or vehicle specifications.",
      },
    ],
  },
  {
    title: "Technical Support",
    faqs: [
      {
        question: "I'm having trouble uploading images",
        answer:
          "Ensure your images are in JPG or PNG format and under 5MB each. Clear your browser cache and try again. If issues persist, contact our support team.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Password' on the login page and enter your email. You'll receive a password reset link within a few minutes.",
      },
      {
        question: "The website is loading slowly",
        answer:
          "Try clearing your browser cache and cookies. Ensure you have a stable internet connection. The site works best on updated browsers.",
      },
      {
        question: "I can't receive notifications",
        answer:
          "Check your email spam folder and ensure notifications are enabled in your account settings. Add our email to your contacts to avoid spam filtering.",
      },
    ],
  },
  {
    title: "Policies & Safety",
    faqs: [
      {
        question: "What is your refund policy?",
        answer:
          "Refunds are handled between buyers and dealers directly. We recommend thorough inspection before purchase. For listing fees, refunds are available within 7 days of payment.",
      },
      {
        question: "How do you handle fraudulent listings?",
        answer:
          "We have strict verification processes and monitor listings continuously. Report suspicious activity immediately. Fraudulent dealers are permanently banned.",
      },
      {
        question: "What if I have a dispute with a dealer?",
        answer:
          "Contact our support team immediately. We'll mediate between parties and take appropriate action. Serious violations may result in dealer suspension.",
      },
      {
        question: "Is my personal information safe?",
        answer:
          "Yes, we use industry-standard encryption and never share personal information without consent. Read our Privacy Policy for detailed information.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MK</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Motoka Kenya</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/browse" className="text-gray-600 hover:text-gray-900">
                Browse Cars
              </Link>
              <Link href="/dealers" className="text-gray-600 hover:text-gray-900">
                Dealers
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Button variant="outline" asChild>
                <Link href="/dealer/login">Dealer Login</Link>
              </Button>
              <Button asChild>
                <Link href="/dealer/register">List Your Cars</Link>
              </Button>
            </nav>
            <Button variant="outline" size="sm" className="md:hidden bg-transparent">
              Menu
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions about buying and selling vehicles on Motoka Kenya
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search FAQs..." className="pl-10 h-12" />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <Card key={faqIndex}>
                    <Collapsible>
                      <CollapsibleTrigger className="w-full">
                        <CardContent className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-left">{faq.question}</h3>
                            <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                          </div>
                        </CardContent>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0 pb-4 px-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="max-w-2xl mx-auto mt-12">
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call +254 700 000 000
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
