import Link from 'next/link';
import Image from 'next/image';
import { FileWarning, Home, LifeBuoy, Heart, Droplet, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center">
      <div className="container-app py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 rounded-2xl bg-red-100 dark:bg-red-900/30 animate-pulse" />
            <div className="relative z-10 w-full h-full rounded-2xl flex items-center justify-center shadow-sm border border-red-200/60 dark:border-red-800/60 bg-white/70 dark:bg-gray-800/70 backdrop-blur">
              <FileWarning className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">404</h1>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">Page Not Found</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            We couldn&apos;t find the page you&apos;re looking for. It may have been moved, deleted, or never existed.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/" variant="primary" size="md" className="inline-flex items-center justify-center">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
            <Button href="/support" variant="ghost" size="md" className="inline-flex items-center justify-center">
              <LifeBuoy className="h-5 w-5 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <Link href="/donate" className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-2 mr-3">
                <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Become a Donor</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Schedule your next donation</div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
            </div>
          </Link>

          <Link href="/request" className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2 mr-3">
                <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Request Blood</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Submit a blood request</div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
            </div>
          </Link>

          <Link href="/blood-availability" className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-2 mr-3">
                <Droplet className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Blood Availability</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">View current stock levels</div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
            </div>
          </Link>
        </div>

        <div className="mt-10 flex justify-center opacity-80">
          <div className="relative w-64 h-16">
            <Image src="/globe.svg" alt="BloodBridge" fill className="object-contain animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
