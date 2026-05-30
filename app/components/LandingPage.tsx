'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MaterialSymbol } from './MaterialSymbol';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export function LandingPage() {
  const router = useRouter();

  return (
    <div className="bg-canvas text-on-surface font-body selection:bg-primary selection:text-on-primary">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 glass-nav border-b border-black/5">
        <div className="flex flex-row-reverse justify-between items-center px-6 py-3 w-full max-w-7xl mx-auto">
          <div className="flex items-center">
            <img
              alt="KOALA Logo"
              className="h-10 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/ADBb0ujXdUtl-PPfTBitnylbn45XJo_WBibBxI7ghqAMORdazRCcowJWNTJynABvjY0e_PMuGfhseRdZFIZIoHELYYfy-tgXoLoFRxB6_OQp_5OpBtvyp16ijCypJSGzVjIoQqBKuYOsrE8mONEOd8iq3Ulc7ZzoMX1keA-EmjJDw1Xsr9vW2KhShyu3YG_Ohdmk5IQF4_dDbN2gZ5n31nT6cnyRjNlU-iapHPnnOfgXgeFII22Of8Pr-q-ghKvtjrWw6WXE2ArK8H2KG6g"
            />
          </div>
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-[#242424] hover:text-primary transition-colors text-sm font-medium"
            >
              <MaterialSymbol icon="account_circle" />
            </motion.button>
          </div>
        </div>
      </header>

      <main className="pt-24 overflow-x-hidden">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative min-h-[640px] py-20 flex flex-col justify-center items-center text-center px-6 hero-gradient"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-xs font-semibold tracking-wider text-[#555555] uppercase">AI Financial Intelligence</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black font-headline tracking-tight text-[#242424] mb-8 leading-[1.1]">
              הכסף שלך <span className="highlight-marker">עובד נגדך.</span> <span className="highlight-marker">קואלה מגלה איפה</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#555555] max-w-2xl mx-auto mb-12 leading-relaxed">
              שואלים, עונים, מבינים. קואלה הופכת שיחה קצרה לתמונה פיננסית שלמה. בלי גיליונות אקסל, בלי יועץ ב-800 שקל לשעה.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                onClick={() => router.push('/services')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 rounded-full bg-[#A85838] text-white font-bold text-lg shadow-card hover:bg-[#8E472B] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-3"
              >
                <span>התחל ניתוח</span>
                <motion.span
                  whileHover={{ x: -4 }}
                  className="material-symbols-outlined transition-transform"
                >
                  arrow_back
                </motion.span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-5 rounded-full bg-surface-bright text-primary font-bold text-lg hover:bg-surface-container-highest transition-colors"
              >
                איך זה עובד?
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { icon: 'timer', text: '5 דקות' },
                { icon: 'lock', text: 'ללא שמירת מידע' },
                { icon: 'auto_awesome', text: 'חינם לחלוטין' },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-surface border border-outline-variant/40 shadow-soft"
                >
                  <MaterialSymbol icon={badge.icon} className="text-primary" />
                  <span className="font-bold text-[#242424]">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Feature Bento Grid */}
        <motion.section
          id="features"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 px-6 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Card */}
            <motion.div
              whileHover={{ y: -8 }}
              className="md:col-span-8 p-10 rounded-[2.5rem] bg-surface shadow-card relative overflow-hidden group"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-3xl font-bold font-headline mb-4 text-[#242424]">תובנות בזמן אמת</h3>
                  <p className="text-[#555555] max-w-md">קואלה בודקת לאן הכסף הולך ומצביעה על מה שמשלמים עליו בלי לשים לב.</p>
                </div>
                <div className="mt-12 flex gap-4">
                  <div className="h-32 w-full bg-surface-container-highest rounded-2xl flex items-end p-4 gap-2">
                    {[0.5, 0.75, 1, 0.66, 0.5].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="w-full bg-primary rounded-t-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Small Card */}
            <motion.div
              whileHover={{ y: -8 }}
              className="md:col-span-4 p-10 rounded-[2.5rem] bg-surface-container-highest shadow-card flex flex-col justify-between border border-outline-variant/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                <MaterialSymbol icon="chat_bubble" className="text-primary text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headline mb-4 text-[#242424]">אנחנו שואלים, אתם עונים</h3>
                <p className="text-[#555555]">בלי טפסים, בלי אקסל. שואלים, עונים, וקואלה עושה את שאר העבודה.</p>
              </div>
            </motion.div>

            {/* Three Columns Section */}
            <motion.div
              whileHover={{ y: -8 }}
              className="md:col-span-4 p-10 rounded-[2.5rem] bg-surface-bright shadow-card flex flex-col gap-6"
            >
              <MaterialSymbol icon="security" className="text-secondary text-4xl" />
              <h3 className="text-xl font-bold text-[#242424]">אבטחה מקצה לקצה</h3>
              <p className="text-sm text-[#555555]">הנתונים נמחקים בסוף הניתוח. לא שומרים, לא מוכרים.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="md:col-span-8 p-1 rounded-[2.5rem] bg-gradient-to-l from-primary/20 to-transparent"
            >
              <div className="bg-surface h-full w-full rounded-[2.4rem] p-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold font-headline mb-4 text-[#242424]">רוב האנשים משלמים יותר מדי על הפנסיה</h3>
                  <p className="text-[#555555]">דמי ניהול גבוהים, פנסיה ישנה ששכחת, כיסויים כפולים בביטוח. קואלה מוצאת את זה תוך דקות.</p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="flex-shrink-0 w-32 h-32 rounded-full border-2 border-[#A85838] border-t-transparent flex items-center justify-center"
                >
                  <span className="text-2xl font-bold text-primary">85%</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Social Proof / Quotes */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 bg-surface-container"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-headline mb-4 text-[#242424]">מה אומרים אלו שניסו אותנו</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: '"שנים חשבתי שהפנסיה שלי בסדר. קואלה גילתה שאני מפסיד 1,200 שקל בשנה על דמי ניהול גבוהים. עברתי קרן תוך שבוע."',
                  author: 'איתי ל.',
                  initials: 'א',
                  borderColor: 'border-primary',
                },
                {
                  quote: '"סוף סוף הבנתי כמה אני מרוויח ביד לפני שחתמתי על חוזה. חישוב שכר נטו שלוקח 2 דקות."',
                  author: 'מיכל כ.',
                  initials: 'מ',
                  borderColor: 'border-secondary',
                },
                {
                  quote: '"גיליתי שיש לי שני ביטוחי חיים שחופפים אחד את השני. ביטלתי אחד, חסכתי 180 שקל בחודש."',
                  author: 'דניאל ר.',
                  initials: 'ד',
                  borderColor: 'border-primary',
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className={`p-8 rounded-3xl bg-surface-container-high ${testimonial.borderColor} border-r-4 relative`}
                >
                  <span className="material-symbols-outlined absolute top-4 left-6 text-primary/10 text-6xl">format_quote</span>
                  <p className="text-lg mb-6 leading-relaxed text-[#242424]">{testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center text-primary font-bold">
                      {testimonial.initials}
                    </div>
                    <span className="font-bold text-sm text-[#242424]">{testimonial.author}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Final Call to Action */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-32 px-6"
        >
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-primary/10 to-secondary/10 border border-black/5 p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold font-headline mb-8 text-[#242424]">מוכנים להשתלט על הכסף שלכם?</h2>
              <p className="text-xl text-[#555555] mb-12 max-w-2xl mx-auto">ישראלים שמשתמשים בקואלה מוצאים בממוצע 200–400 שקל בחודש שהם מוציאים בלי לשים לב.</p>
              <motion.button
                onClick={() => router.push('/services')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-16 py-6 rounded-full bg-[#A85838] text-white font-black text-xl hover:bg-[#8E472B] hover:-translate-y-0.5 transition-all shadow-card"
              >
                בואו נתחיל
              </motion.button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-dim border-t border-black/5 py-12">
        {/* Legal disclaimer */}
        <div className="max-w-7xl mx-auto px-8 pb-6 border-b border-black/5">
          <p className="text-[#888888] text-xs leading-relaxed text-center">
            קואלה אינו יועץ מורשה על פי חוק. המידע המוצג הוא לצורכי מידע כללי בלבד ואינו מהווה ייעוץ פיננסי, ייעוץ השקעות, ייעוץ פנסיוני, או ייעוץ ביטוח מוסדר. לפני קבלת החלטות פיננסיות מהותיות, יש להתייעץ עם יועץ מורשה.
          </p>
        </div>
        <div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center px-8 pt-6 w-full max-w-7xl mx-auto gap-6">
          <div className="flex items-center">
            <img
              alt="KOALA Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/ADBb0ujXdUtl-PPfTBitnylbn45XJo_WBibBxI7ghqAMORdazRCcowJWNTJynABvjY0e_PMuGfhseRdZFIZIoHELYYfy-tgXoLoFRxB6_OQp_5OpBtvyp16ijCypJSGzVjIoQqBKuYOsrE8mONEOd8iq3Ulc7ZzoMX1keA-EmjJDw1Xsr9vW2KhShyu3YG_Ohdmk5IQF4_dDbN2gZ5n31nT6cnyRjNlU-iapHPnnOfgXgeFII22Of8Pr-q-ghKvtjrWw6WXE2ArK8H2KG6g"
            />
          </div>
          <nav className="flex flex-row gap-8 font-['Inter'] text-sm text-right">
            <a className="text-[#555555] hover:text-primary transition-colors" href="#features">איך זה עובד</a>
            <a className="text-[#555555] hover:text-primary transition-colors" href="#">מדיניות פרטיות</a>
            <a className="text-[#555555] hover:text-primary transition-colors" href="#">צור קשר</a>
          </nav>
          <div className="text-[#555555] text-sm font-['Inter'] text-right">
            © {new Date().getFullYear()} קואלה - ניתוח פיננסי אישי
          </div>
        </div>
      </footer>

      <style>{`
        .hero-gradient {
          background: radial-gradient(circle at 50% -20%, rgba(168, 88, 56, 0.05) 0%, transparent 70%);
        }
        .glass-nav {
          background: rgba(251, 249, 246, 0.8);
          backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
