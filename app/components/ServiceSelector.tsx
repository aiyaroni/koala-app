'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MaterialSymbol } from './MaterialSymbol';

const services = [
  {
    id: 'pension',
    title: 'הפנסיה שלי',
    description: 'גלה כמה קצבה תקבל ואיפה אתה מפסיד',
    icon: 'wallet',
    color: '#06b6d4', // cyan
    colorClass: 'cyan',
  },
  {
    id: 'insurance',
    title: 'הביטוחים שלי',
    description: 'זהה כפילויות וחורים בכיסוי שלך',
    icon: 'shield',
    color: '#7c3aed', // purple
    colorClass: 'purple',
  },
  {
    id: 'car-insurance',
    title: 'ביטוח רכב',
    description: 'השווה מחירים ותוזיל את הפוליסה',
    icon: 'directions_car',
    color: '#f59e0b', // orange
    colorClass: 'orange',
  },
  {
    id: 'net-salary',
    title: 'שכר נטו',
    description: 'חשב כמה תקבל ביד ומה מגיע לך',
    icon: 'trending_up',
    color: '#10b981', // green
    colorClass: 'green',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ServiceSelector() {
  const router = useRouter();

  return (
    <div className="dark min-h-screen flex flex-col bg-surface text-on-surface">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#0e0e0e]/70 backdrop-blur-md">
        <div className="flex flex-row-reverse justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                alt="KOALA STUDIO"
                className="h-10 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/ADBb0ujXdUtl-PPfTBitnylbn45XJo_WBibBxI7ghqAMORdazRCcowJWNTJynABvjY0e_PMuGfhseRdZFIZIoHELYYfy-tgXoLoFRxB6_OQp_5OpBtvyp16ijCypJSGzVjIoQqBKuYOsrE8mONEOd8iq3Ulc7ZzoMX1keA-EmjJDw1Xsr9vW2KhShyu3YG_Ohdmk5IQF4_dDbN2gZ5n31nT6cnyRjNlU-iapHPnnOfgXgeFII22Of8Pr-q-ghKvtjrWw6WXE2ArK8H2KG6g"
              />
            </div>
            <motion.button whileHover={{ scale: 1.1 }} className="text-zinc-200 hover:text-primary transition-colors">
              <MaterialSymbol icon="account_circle" />
            </motion.button>
          </div>

          <nav className="hidden md:flex flex-row gap-8 items-center">
            <button onClick={() => router.push('/')} className="text-primary font-bold border-b-2 border-primary font-headline transition-colors hover:text-primary-dim">
              בית
            </button>
            <a className="text-zinc-200 hover:text-primary-dim transition-colors font-headline" href="#">
              השירותים שלנו
            </a>
            <a className="text-zinc-200 hover:text-primary-dim transition-colors font-headline" href="#">
              עלינו
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl w-full text-center mb-16"
        >
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-on-surface">
            מה תרצה לבדוק היום?
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl font-body max-w-2xl mx-auto">
            5 דקות שיגלו לך איפה הכסף נעלם — בחר מאיפה להתחיל
          </p>
        </motion.div>

        {/* 2x2 Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl"
        >
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => router.push(`/services/${service.id}`)}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: `0px 10px 40px ${service.color}40` }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-surface-container-low p-8 rounded-xl text-right transition-all duration-300 hover:bg-surface-container-high border border-outline-variant/10 hover:border-opacity-30"
              style={{
                '--service-color': service.color,
                '--service-color-light': `${service.color}15`,
              } as React.CSSProperties & { '--service-color': string; '--service-color-light': string }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] rounded-full opacity-20" style={{ backgroundColor: service.color }}></div>

              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex p-3 rounded-lg mb-6 transition-colors"
                    style={{
                      backgroundColor: `${service.color}20`,
                    }}
                  >
                    <MaterialSymbol icon={service.icon} className="text-4xl" style={{ color: service.color }} filled />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-on-surface mb-2 font-headline">{service.title}</h3>
                  <p className="text-zinc-200 font-body leading-relaxed">{service.description}</p>
                </div>

                <div className="flex items-center gap-2 text-primary font-semibold group-hover:-translate-x-2 transition-transform">
                  <span>התחל בבדיקה</span>
                  <MaterialSymbol icon="arrow_back" className="text-sm" />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Decorative background element */}
        <div className="fixed bottom-0 left-0 w-full h-[512px] bg-gradient-to-t from-primary/5 to-transparent pointer-events-none z-[-1]"></div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-zinc-800/20 bg-surface">
        <div className="flex flex-col md:flex-row-reverse justify-between items-center px-8 w-full max-w-7xl mx-auto gap-6">
          <div className="text-lg font-bold text-primary font-body">KOALA STUDIO</div>

          <nav className="flex flex-row gap-6 text-zinc-300 font-body text-sm">
            <a className="hover:text-primary transition-colors opacity-90 hover:opacity-100" href="#">
              איך זה עובד
            </a>
            <a className="hover:text-primary transition-colors opacity-90 hover:opacity-100" href="#">
              מדיניות פרטיות
            </a>
            <a className="hover:text-primary transition-colors opacity-90 hover:opacity-100" href="#">
              צור קשר
            </a>
          </nav>

          <div className="text-zinc-300 font-body text-sm text-right">© 2024 קואלה - ייעוץ פיננסי אישי</div>
        </div>
      </footer>

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </div>
  );
}
