'use client'

import { useState } from 'react'

export function ContactApp() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  const socialLinks = [
    { name: 'GitHub', url: '#', icon: '💻' },
    { name: 'Twitter', url: '#', icon: '𝕏' },
    { name: 'LinkedIn', url: '#', icon: '💼' },
    { name: 'Email', url: 'mailto:hello@example.com', icon: '📧' },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border pb-2 mb-4">
        <div className="text-lg font-bold text-primary">Contact</div>
        <div className="text-xs text-muted-foreground">Get in touch</div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {/* Contact form */}
          <div className="border border-border/50 rounded-lg p-3 bg-muted/20">
            <h3 className="font-semibold text-foreground mb-3">Send me a message</h3>
            {submitted ? (
              <div className="bg-accent/20 border border-accent text-foreground p-3 rounded-lg text-center">
                Thanks for reaching out! I'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm"
                  required
                />
                <textarea
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary text-sm h-20 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Social links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Connect with me</h3>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  className="p-2.5 border border-border/50 rounded-lg hover:bg-primary/20 hover:border-primary/50 transition-colors text-center"
                >
                  <div className="text-xl mb-1">{link.icon}</div>
                  <div className="text-xs font-semibold text-foreground">{link.name}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Direct email */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-2">Or email me directly</p>
            <a href="mailto:hello@example.com" className="text-accent font-semibold hover:underline">
              hello@example.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
