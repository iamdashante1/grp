'use client';

import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { HeartPulse, CalendarDays, Droplet, CheckCircle2, Shield, MessageCircle, Award, Compass, PhoneCall, AlertCircle, Bell } from 'lucide-react';

const milestones = [
  {
    label: 'Step 1 ? Register a Request',
    detail: 'Tell us about the patient, hospital, and urgency. The form takes less than 5 minutes.',
  },
  {
    label: 'Step 2 ? Match & Updates',
    detail: 'We notify you when compatible donors or inventory is located. Track progress in real time.',
  },
  {
    label: 'Step 3 ? Confirmation',
    detail: 'Receive instructions on collection, transfusion, and coordination with your care team.',
  },
];

const benefits = [
  {
    title: 'Personalized status alerts',
    description: 'SMS and email updates keep families informed about every milestone.',
    icon: MessageCircle,
  },
  {
    title: 'Priority matching',
    description: 'Our patient advocates flag urgent cases to the coordination team instantly.',
    icon: Shield,
  },
  {
    title: 'Caregiver resources',
    description: 'Guides for preparing patients, post-transfusion care, and financial support referrals.',
    icon: Award,
  },
];

const trackerEvents = [
  { label: 'Request submitted', time: 'Today, 9:42 AM', status: 'completed' },
  { label: 'Matching donors notified', time: 'Pending', status: 'pending' },
  { label: 'Hospital coordination', time: 'Awaiting update', status: 'pending' },
];

export default function PatientPortalPage() {
  const { isAuthenticated, hasRole } = useAuth();
  const isPatient = hasRole('patient', 'recipient', 'caregiver');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-app py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold text-red-600 uppercase tracking-[0.2em] mb-3">BloodBridge for Patients</p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">One place to request, track, and receive lifesaving blood.</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Whether you are a caregiver or patient, we make it simple to request blood, stay updated, and connect with support 24/7.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/request">Request Blood</Button>
              <Button href="/support" variant="outline">Chat with an Advocate</Button>
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border border-red-100 dark:border-red-800">
            <div className="flex items-center gap-3 mb-6">
              <HeartPulse className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-red-600">Active Patients</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,840+</p>
              </div>
            </div>
            <ul className="space-y-4 text-gray-800 dark:text-gray-100">
              {milestones.map((step) => (
                <li key={step.label} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold">{step.label}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-app">
          <div className="flex items-center gap-3 mb-8">
            <Droplet className="h-6 w-6 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Resources built for families</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
                <benefit.icon className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Plan every appointment with confidence</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get reminders for donor availability, prep instructions, and post-transfusion checklists tailored to your case.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CalendarDays className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Automated reminders</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stay informed about upcoming appointments, donor arrivals, and required paperwork.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Compass className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Guided checklists</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step support for hydration, nutrition, and after-care.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PhoneCall className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">24/7 advocate hotline</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Connect with patient advocates ready to troubleshoot logistics at any hour.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Next steps</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Before your next transfusion, complete these quick tasks to accelerate matching.</p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-green-500" />Upload recent labs or physician notes.</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-green-500" />Confirm hospital drop-off instructions.</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-green-500" />Invite caregivers to receive notifications.</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button href="/request">Start a request</Button>
              <Button href="/support" variant="outline">Contact support</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-app">
          {isPatient ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">My transfusion plan</h3>
                </div>
                <ul className="space-y-3">
                  {trackerEvents.map((event) => (
                    <li key={event.label} className="flex justify-between items-start border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{event.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{event.time}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${event.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'}`}>
                        {event.status === 'completed' ? 'Done' : 'In progress'}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-3">
                  <Button href="/request" size="sm">View full request</Button>
                  <Button href="/support" size="sm" variant="outline">Contact advocate</Button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Caregiver tools</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />Share status updates with up to 5 loved ones.</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />Upload medical letters securely for coordinators.</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />Get reminders for hydration, nutrition, and rest.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-dashed border-red-400 rounded-2xl p-8 text-center shadow-sm">
              <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Patient access required</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
                Track requests, receive notifications, and message advocates when you sign in with a patient or caregiver account.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button href={isAuthenticated ? '/support' : '/auth/login'}>
                  {isAuthenticated ? 'Contact Support' : 'Sign in as Patient'}
                </Button>
                <Button href="/support" variant="outline">
                  Request caregiver access
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
