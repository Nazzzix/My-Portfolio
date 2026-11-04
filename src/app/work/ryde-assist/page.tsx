import { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/content/projects';
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader';
import { StickyIndex } from '@/components/case-study/StickyIndex';
import { DecisionModule } from '@/components/case-study/DecisionModule';
import { FlowDiagram } from '@/components/case-study/FlowDiagram';
import { AssetPlaceholder } from '@/components/ui/AssetPlaceholder';
import { Tag } from '@/components/ui/Tag';
import { TodoPlaceholder } from '@/components/ui/TodoPlaceholder';

export const metadata: Metadata = {
  title: 'RydeAssist Case Study — Accessibility-First Mobility',
  description:
    'A process-first product design case study exploring accessibility-first ride booking for vulnerable riders, families, and specialised drivers.',
};

const RYDE_SECTIONS = [
  { id: 'context', label: '1. Project & Scope', number: '01' },
  { id: 'problem', label: '2. Understanding the Problem', number: '02' },
  { id: 'challenge', label: '3. The Design Challenge', number: '03' },
  { id: 'exploration', label: '4. Baseline Exploration', number: '04' },
  { id: 'decisions', label: '5. The Key Decisions', number: '05' },
  { id: 'structure', label: '6. Information Architecture', number: '06' },
  { id: 'iteration', label: '7. Feedback & Iteration', number: '07' },
  { id: 'experience', label: '8. The Resulting Flow', number: '08' },
  { id: 'reflection', label: '9. Reflections & Honest Next Steps', number: '09' },
];

const FIVE_SCREEN_STEPS = [
  {
    step: '01',
    title: 'Rider Sign-Up',
    actor: 'Rider App' as const,
    description: 'Only 3 inputs with high touch targets (52px). Voice Assist and Accessibility Mode switch visible before submitting an email.',
    keyFeature: 'Pre-auth Voice Assist',
  },
  {
    step: '02',
    title: 'Rider Home',
    actor: 'Rider App' as const,
    description: 'Clean headline ("Let\'s plan your ride"), arrival estimate badge, and single primary booking action with persistent Voice Assist trigger.',
    keyFeature: 'Persistent Mic Button',
  },
  {
    step: '03',
    title: 'Where-To Routing',
    actor: 'Rider App' as const,
    description: 'Current pickup auto-detected and pre-filled. Accessible choice between voice input, text search, high-contrast map, or saved places.',
    keyFeature: 'Multi-Modal Destination',
  },
  {
    step: '04',
    title: 'Driver Ride Details',
    actor: 'Driver App' as const,
    description: 'Displays rider accessibility requirements (e.g. transfer assistance, service animal), pickup timer countdown, route, and fare.',
    keyFeature: 'Rider Needs Card',
  },
  {
    step: '05',
    title: 'End of Ride Handover',
    actor: 'Driver App' as const,
    description: 'Drop-off confirmation, optional rider rating, and an essential "Note for Next Driver" field to maintain care continuity.',
    keyFeature: 'Continuity Care Notes',
  },
];

export default function RydeAssistPage() {
  const project = PROJECTS.find((p) => p.slug === 'ryde-assist')!;

  return (
    <div className="max-w-container mx-auto px-5 sm:px-10 lg:px-20 py-10 space-y-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-stone flex items-center gap-2">
        <Link href="/work" className="editorial-link">Work</Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink font-medium">RydeAssist</span>
      </nav>

      {/* Case Study Header */}
      <CaseStudyHeader project={project}>
        <div className="w-full max-w-2xl py-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-paper px-3 py-1.5 rounded-full border border-line">
            <span className="w-2 h-2 rounded-full bg-vermilion" />
            <span className="font-mono text-xs uppercase tracking-label text-ink font-semibold">
              Rider App & Driver App Ecosystem
            </span>
          </div>
          <p className="font-serif italic text-2xl sm:text-3xl text-ink">
            &ldquo;Accessibility works best as the starting point of the flow, not a tucked-away setting.&rdquo;
          </p>
          <p className="font-mono text-xs text-stone max-w-md mx-auto">
            Note: The platform ecosystem also includes an internal Admin Dashboard, which exists as a third product outside the scope of this case study.
          </p>
        </div>
      </CaseStudyHeader>

      {/* Main 2-Column Content Grid with Sticky Index */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Sticky Section Navigator (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3">
          <StickyIndex items={RYDE_SECTIONS} title="RydeAssist Narrative" />
        </aside>

        {/* Right: Narrative Sections (9 cols) */}
        <div className="lg:col-span-9 space-y-24">
          
          {/* Section 1: Project & Context */}
          <section id="context" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">01 / Scope</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              The Project and Context
            </h2>
            <div className="prose prose-stone font-sans text-base leading-relaxed space-y-4 text-stone max-w-none">
              <p>
                I was engaged as the <strong>sole Product Designer</strong> on a freelance basis in early 2026, working directly with the project owner. My responsibility spanned end-to-end design: defining UX strategy, mapping user journeys across rider and driver apps, crafting the high-fidelity UI system, ensuring strict WCAG 2.2 AA accessibility, and preparing developer specifications.
              </p>
              <p>
                RydeAssist addresses an acute gap in current urban transportation: mobility for seniors, power wheelchair users, visually or hearing impaired passengers, and vulnerable riders who require specialized care. The full platform concept brings together on-demand ride-hailing, scheduled paratransit, concierge assistance, and family oversight.
              </p>
              <div className="p-4 bg-sand/30 border border-line rounded-md text-xs font-mono text-stone space-y-1">
                <p><strong className="text-ink">Scope Boundaries:</strong> This case study covers only the <strong>Rider App</strong> (including its built-in family oversight view) and the <strong>Driver App</strong> (spanning 4 driver training tiers). The third platform component—the internal admin dispatch console—operated outside my design scope.</p>
              </div>
            </div>
          </section>

          {/* Section 2: Understanding the Problem */}
          <section id="problem" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">02 / Problem Analysis</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Understanding the Breakdown of Standard Ride-Hailing
            </h2>
            <div className="font-sans text-base leading-relaxed space-y-4 text-stone">
              <p>
                Mass-market ride-hailing apps assume several conditions that are frequently untrue for vulnerable passengers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-5 bg-paper border border-line rounded-card">
                  <span className="font-mono text-xs text-vermilion-deep font-semibold block mb-1">Assumption #1</span>
                  <h4 className="font-sans text-sm font-bold text-ink mb-1">Visual & Motor Fluency</h4>
                  <p className="text-xs text-stone">
                    Apps expect riders to visually interpret moving map pins, read low-contrast labels, and complete rapid multi-tap flows.
                  </p>
                </div>
                <div className="p-5 bg-paper border border-line rounded-card">
                  <span className="font-mono text-xs text-vermilion-deep font-semibold block mb-1">Assumption #2</span>
                  <h4 className="font-sans text-sm font-bold text-ink mb-1">Generic Vehicle & Driver Readiness</h4>
                  <p className="text-xs text-stone">
                    Standard dispatch pairs any nearby compact sedan. Wheelchair users frequently experience drivers cancelling upon physical arrival.
                  </p>
                </div>
                <div className="p-5 bg-paper border border-line rounded-card">
                  <span className="font-mono text-xs text-vermilion-deep font-semibold block mb-1">Assumption #3</span>
                  <h4 className="font-sans text-sm font-bold text-ink mb-1">Repeated Burden of Proof</h4>
                  <p className="text-xs text-stone">
                    Riders must repeatedly call or message drivers to explain their service animal, foldable walker, or transfer assistance requirements.
                  </p>
                </div>
                <div className="p-5 bg-paper border border-line rounded-card">
                  <span className="font-mono text-xs text-vermilion-deep font-semibold block mb-1">Assumption #4</span>
                  <h4 className="font-sans text-sm font-bold text-ink mb-1">Solo Agency Without Guardians</h4>
                  <p className="text-xs text-stone">
                    Family members managing rides for elderly parents have zero native visibility without sharing personal credentials.
                  </p>
                </div>
              </div>
              <p className="text-xs font-mono text-stone-muted">
                Note on Research: Findings reflect documented competitive baseline reviews of Uber, Bolt, and Lyft. No direct user interviews or clinical tests were commissioned for this phase.
              </p>
            </div>
          </section>

          {/* Section 3: The Design Challenge */}
          <section id="challenge" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">03 / Strategic Questions</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              The Three Guiding Questions
            </h2>
            <p className="font-sans text-base text-stone">
              To keep the design disciplined and avoid feature sprawl, I translated the problem space into three central architectural questions:
            </p>
            <div className="space-y-4">
              <div className="p-5 bg-sand/30 border-l-2 border-vermilion rounded-r">
                <span className="font-mono text-xs text-vermilion-deep font-bold block mb-1">Question 1</span>
                <p className="font-serif text-xl text-ink">
                  How can someone with a visual impairment or severe motor limitation sign up without needing sighted help?
                </p>
              </div>
              <div className="p-5 bg-sand/30 border-l-2 border-vermilion rounded-r">
                <span className="font-mono text-xs text-vermilion-deep font-bold block mb-1">Question 2</span>
                <p className="font-serif text-xl text-ink">
                  How does the platform capture what a rider needs once, matching the right vehicle without requiring the rider to re-explain it on every booking?
                </p>
              </div>
              <div className="p-5 bg-sand/30 border-l-2 border-vermilion rounded-r">
                <span className="font-mono text-xs text-vermilion-deep font-bold block mb-1">Question 3</span>
                <p className="font-serif text-xl text-ink">
                  How can family members stay informed in real time without calling, texting, or distracting the driver during transit?
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Exploring Baseline & Service Model */}
          <section id="exploration" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">04 / Baseline Exploration</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Benchmarking and Service Role Mapping
            </h2>
            <div className="font-sans text-base text-stone space-y-4">
              <p>
                I reviewed Uber WAV, Bolt, and Lyft as the cognitive baseline riders and drivers are already familiar with. The key insight was that standard ride-hailing buries accessibility options five layers deep in profile settings.
              </p>
              <p>
                In response, I mapped a tripartite role model:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-paper border border-line rounded">
                  <Tag variant="vermilion">Rider</Tag>
                  <p className="mt-2 text-xs font-sans text-stone">
                    Requires upfront voice guidance, high contrast, predictable booking, and zero repetitive explanations of their disability.
                  </p>
                </div>
                <div className="p-4 bg-paper border border-line rounded">
                  <Tag variant="sand">Family / Caregiver</Tag>
                  <p className="mt-2 text-xs font-sans text-stone">
                    Part of the rider app experience. Monitors live trips, receives milestone alerts (booking, pickup, arrival), and verifies driver credentials.
                  </p>
                </div>
                <div className="p-4 bg-paper border border-line rounded">
                  <Tag variant="paper">Driver (4 Tiers)</Tag>
                  <p className="mt-2 text-xs font-sans text-stone">
                    Tiered by accessibility certifications (ramp operation, transfer assist). Receives rider accommodation notes prior to arrival.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: The Important Decisions (Core) */}
          <section id="decisions" className="space-y-10 scroll-mt-28">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">05 / The Core Decisions</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
                Four Strategic Design Decisions
              </h2>
              <p className="mt-2 font-sans text-base text-stone">
                Here is the reasoning, trade-offs, and screen evidence behind the primary architectural choices.
              </p>
            </div>

            {/* Decision 1 */}
            <DecisionModule
              number="01"
              question="How can someone with a visual impairment sign up without sighted help?"
              approach="Placed Voice Assist and an Accessibility Mode toggle directly on the first launch screen—before registration or credential creation."
              reasoning="If accessibility settings require an active account to configure, you exclude the very users who cannot navigate account creation in the first place."
              userNeedOrConstraint="Screen readers and voice guidance must be offered at step zero, not after authentication."
              howItShapedExperience="Sign-up was reduced to 3 high-contrast fields with 52px touch targets and full auditory feedback."
              consideredAlternativesPrompt="Evaluate multi-step onboarding vs single-page sign-up for screen readers."
            />

            {/* Decision 2 */}
            <DecisionModule
              number="02"
              question="How do we prevent riders from re-explaining accessibility needs every time they book?"
              approach="Created a 'Single-Capture Needs Profile' where riders check specific accommodations once (ramp, transfer assist, guide dog), which automatically carry into dispatch matching and the driver's interface."
              reasoning="Needing to explain your disability repeatedly creates fatigue and anxiety. The software must carry the cognitive burden, not the passenger."
              userNeedOrConstraint="Drivers need advance notice to ensure equipment (e.g. lift ramps) is deployed before stopping on busy streets."
              howItShapedExperience="The driver's acceptance screen explicitly highlights 'Passenger Needs: Transfer Assistance' so there are zero surprises at curbside."
              consideredAlternativesPrompt="Investigate modal prompt on every booking vs permanent persistent profile toggles."
            />

            {/* Decision 3 */}
            <DecisionModule
              number="03"
              question="How do family members stay assured without disturbing the driver during transit?"
              approach="Engineered a native Family Oversight view embedded directly into the Rider App, providing milestone push updates at booking, pickup, route progress, and arrival."
              reasoning="Calling a driver while they are assisting an elderly passenger or navigating traffic is dangerous. Silent, real-time telemetry satisfies caregiver concern without operational disruption."
              userNeedOrConstraint="Caregivers need trip progress confirmation but should not need a separate dedicated app or complex logins."
              howItShapedExperience="Family members receive a single link or in-app view displaying the driver's verified photo, vehicle license, and GPS route status."
            />

            {/* Decision 4 */}
            <DecisionModule
              number="04"
              question="How do we adapt the driver onboarding flow to distinct local municipal requirements?"
              approach="Redesigned the driver accessibility sign-up flow to capture local regulatory certificates and added a dedicated in-app module for training guides."
              reasoning="Initial assumptions based on US/UK paratransit regulations did not align with the client's local market requirements. The driver app had to educate and certify, not just vet."
              userNeedOrConstraint="Local regulations required documentation of specific manual transfer protocols before drivers could be assigned Tier 3 and 4 trips."
              howItShapedExperience="Introduced micro-learning modules in the driver app and structured clear document upload validation."
            />
          </section>

          {/* Section 6: Translating Decisions into Structure */}
          <section id="structure" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">06 / Architecture</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Information Architecture & Role Relationships
            </h2>
            <div className="font-sans text-base text-stone space-y-4">
              <p>
                To avoid confusion across user roles, I structured a clean relationship model where the rider and family experiences coexist inside the Rider App, while the Driver App remains strictly focused on task clarity and navigation.
              </p>
              <div className="p-6 bg-sand/30 border border-line rounded-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                  <div className="p-4 bg-paper rounded border border-line">
                    <p className="text-sm font-bold font-sans text-ink mb-2">Rider App Shell</p>
                    <ul className="space-y-1.5 text-stone list-disc list-inside">
                      <li>Pre-auth: Accessibility toggle & Voice Assist</li>
                      <li>Home: &ldquo;Let&apos;s plan your ride&rdquo; + large single action</li>
                      <li>Where-to: Multi-modal entry (Voice/Map/Address)</li>
                      <li>My Needs: Persistent accommodation toggles</li>
                      <li>Family Circle: Add trusted contacts & notification preferences</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-paper rounded border border-line">
                    <p className="text-sm font-bold font-sans text-ink mb-2">Driver App Shell</p>
                    <ul className="space-y-1.5 text-stone list-disc list-inside">
                      <li>Onboarding: Local regulatory uploads & tiers</li>
                      <li>Training Guides: In-app accessibility certification</li>
                      <li>Dispatch: Pre-acceptance passenger needs breakdown</li>
                      <li>Active Ride: Visual countdown & transfer guidance</li>
                      <li>End of Ride: Drop-off note for next driver</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Feedback & Iteration */}
          <section id="iteration" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">07 / Iteration</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Client Feedback & Alignment
            </h2>
            <div className="font-sans text-base text-stone space-y-4">
              <p>
                During the mid-phase design presentation, the project owner flagged that the driver onboarding flow relied on generic assumptions about disability support. In reality, drivers required formal onboarding around the physical securement of mobility devices.
              </p>
              <p>
                In response, I carried two significant architectural adjustments through both applications:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone text-sm">
                <li>
                  <strong>Introduced In-App Training Guides:</strong> Created dedicated step-by-step guides inside the driver interface, ensuring drivers can refresh their knowledge on securing specific wheelchair models before arrival.
                </li>
                <li>
                  <strong>Restructured Driver Tiers:</strong> Grouped dispatch matching into 4 explicit driver qualification tiers, ensuring non-certified drivers are never dispatched to power-lift requests.
                </li>
              </ul>
              <div className="p-4 bg-cream border border-line rounded text-xs font-mono text-stone">
                Transparency note: Formal usability tests with riders using assistive screen readers were not commissioned by the client during this contract phase.
              </div>
            </div>
          </section>

          {/* Section 8: The Resulting Experience (5-Screen Flow) */}
          <section id="experience" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">08 / The Shipped Flow</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              The Five-Screen User Journey
            </h2>
            <p className="font-sans text-base text-stone">
              The resulting screens serve as direct evidence of the decisions outlined above:
            </p>

            <FlowDiagram
              title="End-to-End Accessible Journey"
              description="A cohesive flow connecting pre-signup accommodation capture to driver handover."
              steps={FIVE_SCREEN_STEPS}
            />

            <figure className="space-y-3">
              <div className="aspect-[16/10] w-full">
                <AssetPlaceholder
                  label="RydeAssist core rider experience screens"
                  description="Real app screens are needed here; the previous Voice Assist illustration was a placeholder, not delivered work."
                />
              </div>
              <figcaption className="font-mono text-xs leading-relaxed text-stone">
                Evidence: the Rider Home screen with a single booking action, high-contrast typography
                and the persistent Voice Assist entry point.
              </figcaption>
            </figure>
          </section>

          {/* Section 9: Reflection & Next Steps */}
          <section id="reflection" className="space-y-6 scroll-mt-28 pb-12">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-vermilion-deep font-bold">09 / Retrospective</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Reflections & What I Would Improve
            </h2>
            <div className="font-sans text-base text-stone space-y-4">
              <p>
                Designing RydeAssist reinforced two foundational product design lessons:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                <div className="p-5 bg-paper border border-line rounded-card">
                  <h4 className="font-sans text-sm font-bold text-ink mb-1">
                    1. Accessibility Is An Architectural Choice
                  </h4>
                  <p className="text-xs text-stone leading-relaxed">
                    Accessibility cannot be added as a &ldquo;setting&rdquo; or secondary toggle. When you design for screen readers and high contrast from the database and sign-up flow upwards, the overall product becomes clearer and easier for everyone.
                  </p>
                </div>
                <div className="p-5 bg-paper border border-line rounded-card">
                  <h4 className="font-sans text-sm font-bold text-ink mb-1">
                    2. Two-Sided Empathy
                  </h4>
                  <p className="text-xs text-stone leading-relaxed">
                    Designing rider and driver experiences concurrently revealed that every decision made on the rider side (e.g. specifying transfer support) changes what the driver must see and do to feel confident and safe.
                  </p>
                </div>
              </div>
              <p>
                With additional development time or research budget, here are the proposals I would advocate for:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-stone text-sm">
                <li><strong>Moderated Assistive Testing:</strong> Conduct usability sessions with actual VoiceOver and TalkBack users to test edge cases in noisy outdoor transit environments.</li>
                <li><strong>Driver Haptic Alerts:</strong> Introduce custom vibration rhythms so drivers receive accommodation reminders without having to look down at their mounted phone while driving.</li>
              </ul>
              
              <div className="pt-4">
                <TodoPlaceholder
                  label="Handover artefacts documentation needed"
                  description="Add specific details regarding component naming, Figma token handoff, and developer specs delivered."
                />
              </div>
            </div>

            {/* Next Case Study Link */}
            <div className="pt-12 border-t border-line flex justify-between items-center">
              <Link href="/work" className="editorial-link font-sans text-sm font-medium">
                &larr; Back to all work
              </Link>
              <Link href="/work/pilotspan" className="editorial-link font-sans text-sm font-bold">
                Next: Pilotspan (Home Health System) &rarr;
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

