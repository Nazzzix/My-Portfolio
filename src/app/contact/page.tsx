'use client';

import { useRef, useState, FormEvent, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Tag } from '@/components/ui/Tag';

const OPPORTUNITY_OPTIONS = [
  'Full-time Product Designer role',
  'Freelance or contract product design',
  'Graphic design project',
  'Branding project',
  'Social media design',
  'Other',
] as const;

type OpportunityType = (typeof OPPORTUNITY_OPTIONS)[number];
type Status = 'idle' | 'sending' | 'success' | 'error';

const SERVICE_TO_OPPORTUNITY: Record<string, OpportunityType> = {
  'product-design': 'Freelance or contract product design',
  branding: 'Branding project',
  'social-media-design': 'Social media design',
  'graphic-design': 'Graphic design project',
};

function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  const defaultOpportunity =
    (serviceParam && SERVICE_TO_OPPORTUNITY[serviceParam]) || OPPORTUNITY_OPTIONS[0];

  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<{ name: string; email: string } | null>(null);
  const lastAttempt = useRef<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    lastAttempt.current = data;

    // Honeypot: behave like a successful send without emailing anyone.
    if (data.website) {
      setSuccessData({ name: data.name ?? '', email: data.email ?? '' });
      setStatus('success');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Request failed');
      }

      setSuccessData({ name: data.name ?? '', email: data.email ?? '' });
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const sending = status === 'sending';
  const fallbackName = lastAttempt.current.name || 'New Client';
  const fallbackMessage = lastAttempt.current.message || '';

  return (
    <div className="bg-paper border border-line rounded-card p-6 sm:p-10 shadow-card">
      {successData ? (
        <div className="py-10 text-center space-y-4" role="status" aria-live="polite">
          <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mx-auto text-vermilion-deep text-xl font-bold">
            ✓
          </div>
          <h3 className="font-serif text-2xl text-ink font-normal">
            Thank you, {successData.name}.
          </h3>
          <p className="font-sans text-sm text-stone max-w-md mx-auto leading-relaxed">
            Your inquiry has been sent to Chinazor Blessing Umeakuka. A copy of the details has been registered for{' '}
            <strong className="text-ink">{successData.email}</strong>.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setSuccessData(null);
                setStatus('idle');
                setErrorMessage('');
              }}
              className="font-mono text-xs text-vermilion-deep underline uppercase tracking-label font-bold"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot: hidden from people and screen readers */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px' }}
          />

          {/* Server Alert */}
          {status === 'error' && (
            <div
              role="alert"
              className="p-4 rounded-field bg-red-50 border border-red-200 text-left space-y-2"
            >
              <div className="flex items-center gap-2 text-vermilion-deep font-sans text-xs font-bold">
                <span>⚠ Submission Failed</span>
              </div>
              <p className="font-sans text-xs text-ink">{errorMessage}</p>
              <p className="font-sans text-xs text-stone">
                You can email me directly at{' '}
                <a
                  href={`mailto:umeakukachinazor@gmail.com?subject=${encodeURIComponent(
                    `[Portfolio Enquiry - ${fallbackName}]`
                  )}&body=${encodeURIComponent(fallbackMessage)}`}
                  className="font-semibold text-vermilion-deep underline"
                >
                  umeakukachinazor@gmail.com
                </a>
              </p>
            </div>
          )}

          {/* Name field */}
          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono text-xs uppercase tracking-label text-ink font-semibold mb-2"
            >
              Full Name <span className="text-vermilion">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={100}
              placeholder="e.g. Alex Morgan"
              className="w-full h-12 px-4 rounded-field bg-paper border border-line font-sans text-sm text-ink transition-colors focus:outline-none focus:border-ink"
            />
          </div>

          {/* Work Email field */}
          <div>
            <label
              htmlFor="contact-email"
              className="block font-mono text-xs uppercase tracking-label text-ink font-semibold mb-2"
            >
              Work Email <span className="text-vermilion">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              maxLength={200}
              placeholder="alex@company.com"
              className="w-full h-12 px-4 rounded-field bg-paper border border-line font-sans text-sm text-ink transition-colors focus:outline-none focus:border-ink"
            />
          </div>

          {/* Organisation field */}
          <div>
            <label
              htmlFor="contact-org"
              className="block font-mono text-xs uppercase tracking-label text-ink font-semibold mb-2"
            >
              Company / Organisation <span className="text-vermilion">*</span>
            </label>
            <input
              id="contact-org"
              name="company"
              type="text"
              required
              maxLength={150}
              placeholder="e.g. Acme Health"
              className="w-full h-12 px-4 rounded-field bg-paper border border-line font-sans text-sm text-ink transition-colors focus:outline-none focus:border-ink"
            />
          </div>

          {/* Opportunity Type Dropdown */}
          <div>
            <label
              htmlFor="contact-type"
              className="block font-mono text-xs uppercase tracking-label text-ink font-semibold mb-2"
            >
              Opportunity Type <span className="text-vermilion">*</span>
            </label>
            <select
              id="contact-type"
              name="opportunity"
              required
              key={defaultOpportunity}
              defaultValue={defaultOpportunity}
              className="w-full h-12 px-4 rounded-field bg-paper border border-line font-sans text-sm text-ink transition-colors focus:outline-none focus:border-ink"
            >
              {OPPORTUNITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Message field */}
          <div>
            <label
              htmlFor="contact-msg"
              className="block font-mono text-xs uppercase tracking-label text-ink font-semibold mb-2"
            >
              Brief Message <span className="text-vermilion">*</span>
            </label>
            <textarea
              id="contact-msg"
              name="message"
              required
              minLength={15}
              maxLength={3000}
              rows={4}
              placeholder="Share a short summary of the product challenge, scope, or timeline..."
              className="w-full p-4 rounded-field bg-paper border border-line font-sans text-sm text-ink transition-colors focus:outline-none focus:border-ink"
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={sending}
              className="w-full h-12 bg-ink text-cream rounded-button font-sans text-sm font-semibold hover:bg-vermilion-deep transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="border-b border-line pb-10">
        <SectionHeader
          label="Inquiry"
          title="Let’s Discuss Your Next Product"
          italicWord="Discuss"
          description="Tell me about the role, product or brand you're building. I'll reply with a clear next step."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
        {/* Left Column: Direct Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <Tag variant="vermilion">Product Designer (UI/UX)</Tag>
            <h2 className="font-serif text-3xl text-ink font-normal mt-4">
              Direct Communication
            </h2>
            <p className="font-sans text-sm text-stone mt-2 leading-relaxed">
              Prefer to send an email directly or connect on LinkedIn? Feel free to reach out through your preferred channel.
            </p>
          </div>

          <div className="space-y-6 border-y border-line py-8 font-sans text-sm">
            <div>
              <p className="font-mono text-xs uppercase tracking-label text-stone">Direct Email</p>
              <a
                href="mailto:umeakukachinazor@gmail.com"
                className="editorial-link font-semibold text-ink text-base block mt-1"
              >
                umeakukachinazor@gmail.com
              </a>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-label text-stone">Professional Network</p>
              <a
                href="http://www.linkedin.com/in/chinazor-umeakuka-a87a1413a"
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link font-semibold text-ink text-base block mt-1"
              >
                LinkedIn: Chinazor Blessing Umeakuka &rarr;
              </a>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-label text-stone">Location & Timezone</p>
              <p className="text-ink font-medium mt-1">West Africa Time (WAT / UTC+1)</p>
            </div>
          </div>

          <div className="p-5 bg-sand/30 border border-line rounded-card text-xs font-mono text-stone space-y-1">
            <p className="text-ink font-bold">Privacy Note:</p>
            <p>
              Direct telephone numbers are kept private to prevent spam. Official references and phone consultations are provided following initial email exchange.
            </p>
          </div>
        </div>

        {/* Right Column: Validated Contact Form (7 cols) with Suspense boundary */}
        <div className="lg:col-span-7">
          <Suspense fallback={<div className="p-10 bg-paper border border-line rounded-card text-center font-mono text-xs">Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
