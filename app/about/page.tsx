import { Shield, Users, MapPin, Award, CheckCircle, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Verified Dealers", value: "150+", icon: Shield },
  { label: "Happy Customers", value: "15,000+", icon: Users },
  { label: "Counties Covered", value: "47", icon: MapPin },
  { label: "Years of Service", value: "5+", icon: Award },
]

const features = [
  {
    title: "Verified Dealers Only",
    description: "Every dealer on our platform is thoroughly verified with proper licensing and documentation.",
    icon: Shield,
  },
  {
    title: "Comprehensive Inspections",
    description: "All vehicles undergo detailed mechanical inspections with transparent reporting.",
    icon: CheckCircle,
  },
  {
    title: "Nationwide Coverage",
    description: "Find quality vehicles across all 47 counties in Kenya with local dealer support.",
    icon: MapPin,
  },
  {
    title: "Trusted Community",
    description: "Join thousands of satisfied customers who have found their perfect vehicles through us.",
    icon: Users,
  },
]

const team = [
  {
    name: "James Mwangi",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200",
    description: "Former automotive industry executive with 15+ years of experience in the Kenyan market.",
  },
  {
    name: "Sarah Wanjiku",
    role: "Head of Operations",
    image: "/placeholder.svg?height=200&width=200",
    description: "Operations expert ensuring smooth dealer onboarding and customer experience.",
  },
  {
    name: "David Kiprotich",
    role: "Technology Lead",
    image: "/placeholder.svg?height=200&width=200",
    description: "Tech innovator building cutting-edge solutions for the automotive marketplace.",
  },
]

export default function AboutPage() {
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
              <Link href="/about" className="text-green-600 font-medium">
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
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Motoka Kenya</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We&apos;re revolutionizing the way Kenyans buy and sell vehicles by connecting trusted dealers with genuine
            buyers through our comprehensive digital marketplace.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/browse">Browse Vehicles</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dealer/register">Become a Dealer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 2019, Motoka Kenya was born from a simple observation: buying and selling vehicles in Kenya
                  was unnecessarily complicated, risky, and time-consuming. Traditional methods lacked transparency,
                  verification, and convenience.
                </p>
                <p>
                  We set out to change this by creating Kenya&apos;s first comprehensive digital vehicle marketplace that
                  prioritizes trust, transparency, and user experience. Our platform connects verified dealers with
                  genuine buyers, ensuring every transaction is safe and satisfactory.
                </p>
                <p>
                  Today, we&apos;re proud to serve customers across all 47 counties, working with over 150 verified dealers
                  and helping thousands of Kenyans find their perfect vehicles.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Motoka Kenya team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To democratize vehicle ownership in Kenya by providing a trusted, transparent, and efficient
                  marketplace that connects verified dealers with genuine buyers nationwide.
                </p>
              </CardContent>
            </Card>
            <Card className="p-8">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To become East Africa&apos;s leading automotive marketplace, setting the standard for trust, innovation,
                  and customer satisfaction in vehicle transactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Motoka Kenya?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;ve built our platform with features that matter most to Kenyan car buyers and sellers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to transforming Kenya&apos;s automotive marketplace
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <div className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl mb-8 opacity-90">
            Have questions or want to learn more about Motoka Kenya? We&apos;d love to hear from you.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+254 700 000 000</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@motokakenya.com</span>
            </div>
          </div>
          <div className="mt-8">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
