import Link from "next/link";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: "📱",
    title: "Phone",
    value: "+962787497945",
    href: "tel:+962787497945",
    action: "Tap to call",
  },
  {
    icon: "📧",
    title: "Email",
    value: "info@sport-amman.com",
    href: "mailto:info@sport-amman.com",
    action: "Tap to email",
  },
  {
    icon: "💬",
    title: "WhatsApp",
    value: "Message us directly!",
    href: "https://wa.me/962787497945",
    action: "Tap to chat",
  },
];

export function Contact() {
  return (
    <section id="contact" className="bg-dark-navy text-white py-16">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h2>
        <p className="text-xl text-center mb-12 opacity-95">
          Ready to join? Contact us for more information!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block"
            >
              <div className="rounded-xl bg-white/10 p-8 text-center backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-2 min-h-[160px] flex flex-col justify-center">
                <div className="text-4xl mb-3">{method.icon}</div>
                <h4 className="text-lg font-bold mb-2">{method.title}</h4>
                <p className="mb-2">{method.value}</p>
                <p className="text-sm opacity-80">{method.action}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-accent-orange hover:bg-accent-orange/90 text-white rounded-full px-10 py-6 text-lg font-bold"
          >
            <Link href="#contact">Send Message</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
