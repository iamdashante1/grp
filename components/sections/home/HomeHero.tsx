"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/layout/Section";
import { Heart, ArrowRight } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";

export default function HomeHero() {
  const { t } = useI18n();
  return (
    <Section container={false} className="text-white relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 dark:from-red-700 dark:via-red-800 dark:to-red-900">
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
      <div className="container-app relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('home.hero.title1')}
              <span className="block text-red-200">{t('home.hero.title2')}</span>
            </h1>
            <p className="text-xl text-red-100 leading-relaxed max-w-lg">
              {t('home.hero.description')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/auth/register" variant="secondary" size="lg">
              {t('home.hero.ctaDonate')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button href="/request" variant="outline" size="lg">
              {t('home.hero.ctaRequest')}
            </Button>
          </div>
          <div className="flex items-center space-x-6 pt-2">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 bg-red-200 rounded-full border-2 border-white flex items-center justify-center">
                  <Heart className="h-4 w-4 text-red-700" fill="currentColor" />
                </div>
              ))}
            </div>
            <div className="text-red-100">
              <div className="font-semibold">{t('home.stats.monthDonors')}</div>
              <div className="text-sm">{t('home.stats.joinCommunity')}</div>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-8 border border-white/10 animate-fade-in-up hidden lg:block">
          <h3 className="text-2xl font-bold mb-6 text-center">{t('home.stats.title')}</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="bg-white/20 dark:bg-white/10 rounded-full p-3 w-fit mx-auto mb-3"><Heart className="h-6 w-6" /></div>
              <div className="text-2xl font-bold">12,547</div>
              <div className="text-red-100 text-sm">{t('home.stats.activeDonors')}</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 dark:bg-white/10 rounded-full p-3 w-fit mx-auto mb-3"><Heart className="h-6 w-6" /></div>
              <div className="text-2xl font-bold">8,932</div>
              <div className="text-red-100 text-sm">{t('home.stats.livesSaved')}</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 dark:bg-white/10 rounded-full p-3 w-fit mx-auto mb-3"><Heart className="h-6 w-6" /></div>
              <div className="text-2xl font-bold">23,651</div>
              <div className="text-red-100 text-sm">{t('home.stats.bloodUnits')}</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 dark:bg-white/10 rounded-full p-3 w-fit mx-auto mb-3"><Heart className="h-6 w-6" /></div>
              <div className="text-2xl font-bold">&lt; 2 hrs</div>
              <div className="text-red-100 text-sm">{t('home.stats.responseTime')}</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
