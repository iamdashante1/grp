"use client";

import React from "react";
import Section from "@/components/ui/layout/Section";
import Card from "@/components/ui/surface/Card";
import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/providers/I18nProvider";

export default function UrgentNeeds() {
  const { t } = useI18n();
  const urgent = ['O+', 'O-', 'A+', 'AB-'];
  return (
    <Section>
      <Card className="overflow-hidden animate-fade-in-up">
        <div className="bg-red-50 dark:bg-red-900/20 px-6 py-4 border-b border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('home.urgent.title')}</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {urgent.map((type, i) => (
              <div key={type} className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-4 text-center animate-fade-in-up" style={{ animationDelay: `${(i+1)*80}ms` }}>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">{type}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{t('home.urgent.needed')}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/blood-availability" className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium">
              {t('home.urgent.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>
    </Section>
  );
}
