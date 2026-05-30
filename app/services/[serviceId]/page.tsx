'use client';

import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { MaterialSymbol } from '../../components/MaterialSymbol';
import QuestionnaireWizard from '../../components/questionnaire/QuestionnaireWizard';

const serviceDetails = {
  pension: {
    title: 'הפנסיה שלי',
    description: 'גלה כמה קצבה תקבל ואיפה אתה מפסיד',
    icon: 'wallet',
    color: '#A85838',
  },
  insurance: {
    title: 'הביטוחים שלי',
    description: 'זהה כפילויות וחורים בכיסוי שלך',
    icon: 'shield',
    color: '#A85838',
  },
  'car-insurance': {
    title: 'ביטוח רכב',
    description: 'השווה מחירים ותוזיל את הפוליסה',
    icon: 'directions_car',
    color: '#A85838',
  },
  'net-salary': {
    title: 'שכר נטו',
    description: 'חשב כמה תקבל ביד ומה מגיע לך',
    icon: 'trending_up',
    color: '#A85838',
  },
  'tax-refund': {
    title: 'החזר מס',
    description: 'גלה כמה כסף מגיע לך חזרה מהמדינה',
    icon: 'request_quote',
    color: '#A85838',
  },
};

export default function ServicePage() {
  const router = useRouter();
  const params = useParams();
  const rawId = params.serviceId;
  const serviceId = Array.isArray(rawId) ? rawId[0] : rawId ?? '';
  const service = serviceDetails[serviceId as keyof typeof serviceDetails];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col bg-canvas text-on-surface items-center justify-center">
        <h1 className="text-4xl font-headline mb-8 text-[#242424]">שירות לא נמצא</h1>
        <motion.button
          onClick={() => router.push('/services')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-full bg-primary text-on-primary font-bold"
        >
          חזור לבחירת שירותים
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-on-surface">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-md border-b border-outline-variant">
        <div className="flex flex-row-reverse justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <motion.button
            onClick={() => router.push('/services')}
            whileHover={{ scale: 1.1 }}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            <MaterialSymbol icon="arrow_forward" />
          </motion.button>

          <h1 className="text-2xl font-bold font-headline">{service.title}</h1>

          <motion.button
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.1 }}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            <MaterialSymbol icon="home" />
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-12 px-6">
        <QuestionnaireWizard serviceId={serviceId} />

        {/* Decorative background element — service-colored */}
        <div className="fixed bottom-0 left-0 w-full h-[512px] pointer-events-none z-[-1]" style={{
          background: `linear-gradient(to top, ${service.color}08, transparent)`
        }}></div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-outline-variant bg-surface text-center">
        <div className="text-text-secondary font-body text-sm">© 2026 קואלה - ייעוץ פיננסי אישי</div>
      </footer>
    </div>
  );
}
