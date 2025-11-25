'use client';

import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { Stethoscope, ClipboardHeart, ShieldCheck, UsersRound, CalendarCheck, MessageCircle, Activity, FileText, PhoneCall, AlertTriangle, FolderCheck, BrainCircuit } from 'lucide-react';

const services = [
  {
    title: 'Unified Patient Dashboard',
    description: 'Track pending blood requests, monitor fulfillment progress, and view donor matches in real time.',
    icon: ClipboardHeart,
  },
  {
    title: 'Clinical Compatibility Tools',
    description: 'Instantly review compatibility guidance for rare blood types and high-risk procedures.',
    icon: ShieldCheck,
  },
  {
    title: 'Collaborative Messaging',
    description: 'Securely coordinate with BloodBridge coordinators, hospital admins, and caregivers.',
    icon: MessageCircle,
  },
];

const workflows = [
  {
    title: 'Surgical Teams',
    detail: 'Schedule transfusion-ready packs ahead of elective procedures and receive automated inventory checks.',
  },
  {
    title: 'Emergency Physicians',
    detail: 'Submit rapid requests, flag critical cases, and trigger hospital-wide alerts within minutes.',
  },
  {
    title: 'Oncology & Chronic Care',
    detail: 'Manage recurring transfusion needs with templates and priority queues for long-term patients.',
  },
];

const doctorModules = [
  {
    title: 'Request Command Center',
    description: 'Approve, escalate, or duplicate active requests in one place with full audit trails.',
    icon: FolderCheck,
    href: '/request',
  },
  {
    title: 'Clinical Insights',
    description: 'Predictive allocation powered by historical usage and current donor pipeline.',
    icon: BrainCircuit,
    href: '/dashboard',
  },
  {
    title: 'Direct Concierge',
    description: 'Reach BloodBridge clinicians instantly for complex transfusion planning.',
    icon: PhoneCall,
    href: '/support',
  },
];

export default function DoctorPortalPage() {
  const { isAuthenticated, hasRole } = useAuth();
  const isDoctor = hasRole('doctor', 'hospital', 'admin');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-br from-red-700 to-red-500 text-white py-16">
        <div className="container-app flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="uppercase tracking-[0.3em] text-sm text-white/80 mb-3">BloodBridge for Physicians</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Coordinate lifesaving care with confidence.</h1>
            <p className="text-lg text-white/90 mb-6">
              Submit prioritized blood requests, collaborate with our coordination team, and keep every patient?s transfusion plan on track.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/request" variant="secondary">Create Blood Request</Button>
              <Button href="/support" variant="outline">Talk to Support</Button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[
              { title: 'Avg. response time', value: '45 min', icon: Activity },
              { title: 'Partner hospitals', value: '50+', icon: UsersRound },
              { title: 'Fulfillments this month', value: '320', icon: CalendarCheck },
              { title: 'Urgent cases resolved', value: '92%', icon: ShieldCheck },
            ].map((stat) => (
              <div key={stat.title} className="bg-white/10 rounded-xl p-4 border border-white/20">
                <stat.icon className="h-6 w-6 text-white mb-3" />
                <p className="text-sm uppercase tracking-wide text-white/80">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-app">
          <div className="flex items-center gap-3 mb-8">
            <Stethoscope className="h-6 w-6 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Purpose-built tools for clinical teams</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <service.icon className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Tailored workflows</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Every department handles transfusion planning differently. BloodBridge adapts to your reporting cadence and escalation protocol.
            </p>
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <div key={workflow.title} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{workflow.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{workflow.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ready to streamline your transfusion pipeline?</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-red-600" />HIPAA-ready audit trails for every action.</li>
              <li className="flex items-center gap-3"><FileText className="h-5 w-5 text-red-600" />Customizable templates for recurring orders.</li>
              <li className="flex items-center gap-3"><PhoneCall className="h-5 w-5 text-red-600" />24/7 clinician support with live escalation.</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button href="/support">Schedule onboarding</Button>
              <Button href="/request" variant="outline">Submit request</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-app">
          {isDoctor ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctorModules.map((module) => (
                <div key={module.title} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
                  <module.icon className="h-8 w-8 text-red-600 mb-3" />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{module.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{module.description}</p>
                  <Button href={module.href} size="sm">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-dashed border-red-400 rounded-2xl p-8 text-center shadow-sm">
              <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Clinician access required</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
                Advanced scheduling, escalations, and multi-patient workflows are reserved for verified hospital or doctor accounts.
                Sign in with your clinical email or contact support to request access.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button href={isAuthenticated ? '/support' : '/auth/login'}>
                  {isAuthenticated ? 'Contact Support' : 'Sign in as Doctor'}
                </Button>
                <Button href="/support" variant="outline">
                  Request clinical access
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
