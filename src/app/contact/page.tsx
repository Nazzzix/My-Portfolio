'use client';

import { useState, useEffect, FormEvent, Suspense } from 'react';
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

interface FormData {
  name: string;
  email: string;
  organisation: string;
  opportunityType: OpportunityType;
  message: string;
  honeypot: string; // Anti-spam hidden trap
}

interface FormErrors {
  name?: string;
  email?: string;
  organisation?: string;
  opportunityType?: string;
  message?: string;
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organisation: '',
    opportunityType: 'Full-time Product Designer role',
    message: '',
    honeypot: '',
  });

  const [timeMounted, setTimeMounted] = useState<number>(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ name: string; email: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Record mount timestamp for minimum time-to-submit verification
  useEffect(() => {
    setTimeMounted(Date.now());
  }, []);

  // Pre-select opportunity type if query parameter is provided
  useEffect(() => {
    if (serviceParam) {
      if (serviceParam === 'product-design') {
        setFormData((prev) => ({ ...prev, opportunityType: 'Freelance or contract product design' }));
      } else if (serviceParam === 'branding') {
        setFormData((prev) => ({ ...prev, opportunityType: 'Branding project' }));
      } else if (serviceParam === 'social-media-design') {
        setFormData((prev) => ({ ...prev, opportunityType: 'Social media design' }));
      } else if (serviceParam === 'graphic-design') {
        setFormData((prev) => ({ ...prev, opportunityType: 'Graphic design project' }));
      }
    }
  }, [serviceParam]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.organisation.trim()) {
      newErrors.organisation = 'Please provide your company or organisation.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = 'Please share a brief note about the project or role (min 15 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Spam honeypot trap
    if (formData.honeypot) {
      setSuccessData({ name: formData.name, email: formData.email });
      return;
    }

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timeMounted,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(
          data.error || 'Unable to submit your message. Please reach out directly via email.'
        );
      } else {
        setSuccessData({ name: formData.name, email: formData.email });
      }
    } catch {
      setServerError(
        'A network connection error occurred while submitting. Please send your enquiry directly via email.'
      );
    } finally {
      setSubmitting(false);
    }
  };

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
                setFormData({
                  name: '',
                  email: '',
                  organisation: '',
                  opportunityType: 'Full-time Product Designer role',
                  message: '',
                  honeypot: '',
                });
                setTimeMounted(Date.now());
              }}
              className="font-mono text-xs text-vermilion-deep underline uppercase tracking-label font-bold"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot hidden input */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Server / Service Alert */}
          {serverError && (
            <div
              role="alert"
              className="p-4 rounded-field bg-red-50 border border-red-200 text-left space-y-2"
            >
              <div className="flex items-center gap-2 text-vermilion-deep font-sans text-xs font-bold">
                <span>⚠ Submission Failed</span>
              </div>
              <p className="font-sans text-xs text-ink">{serverError}</p>
              <p className="font-sans text-xs text-stone">
                You can email me directly at{' '}
                <a
                  href={`mailto:umeakukachinazor@gmail.com?subject=${encodeURIComponent(
                    `[Portfolio Enquiry - ${formData.name || 'New Client'}]`
                  )}&body=${encodeURIComponent(formData.message)}`}
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
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full h-12 px-4 rounded-field bg-paper border font-sans text-sm text-ink transition-colors focus:outline-none focus:border-ink ${
                errors.name ? 'border-vermilion bg-red-50/20' : 'border-line'
              }`}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs font-sans text-vermilion-deep flex items-center gap-1">
                <span>⚠</span> {errors.name}
              </p>
            )}
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
              type="email"
              required
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full h-12 px-4 rounded-field bg-paper border font-sans text-sm text-ink transition-colors focus:outline-none focus:border-ink ${
                errors.email ? 'border-vermilion bg-red-50/20' : 'border-line'
              }`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs font-sans text-vermilion-deep flex items-center gap-1">
                <span>⚠</span> {errors.email}
              </p>
            )}
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
              type="text"
              required
              placeholder="e.g. Acme Health"
              value={formData.organisation}
              onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
              className={`w-full h-12 px-4 rounded-field bg-paper border font-sans text-sm text-ink transition-colors focus:outline-none focus:border-ink ${
                errors.organisation ? 'border-vermilion bg-red-50/20' : 'border-line'
              }`}
              aria-invalid={errors.organisation ? 'true' : 'false'}
              aria-describedby={errors.organisation ? 'org-error' : undefined}
            />
            {errors.organisation && (
              <p id="org-error" className="mt-1 text-xs font-sans text-vermilion-deep flex items-center gap-1">
                <span>⚠</span> {errors.organisation}
              </p>
            )}
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
              value={formData.opportunityType}
              onChange={(e) =>
                setFormData({ ...formData, opportunityType: e.target.value as OpportunityType })
              }
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
              required
              rows={4}
              maxLength={3000}
              placeholder="Share a short summary of the product challenge, scope, or timeline..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full p-4 rounded-field bg-paper border font-sans text-sm text-ink transition-colors focus:outline-none focus:border-ink ${
                errors.message ? 'border-vermilion bg-red-50/20' : 'border-line'
              }`}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'msg-error' : undefined}
            />
            {errors.message && (
              <p id="msg-error" className="mt-1 text-xs font-sans text-vermilion-deep flex items-center gap-1">
                <span>⚠</span> {errors.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 bg-ink text-cream rounded-button font-sans text-sm font-semibold hover:bg-vermilion-deep transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending…' : 'Send Message'}
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
            <ContactFormInner />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
