@AGENTS.md

# סטטוס הפרויקט - KOALA

## ✅ סטטוס עדכני (14/04/2026)

### תכונות שהושלמו
- [x] **דף הבית (Landing Page)** - חיי עם גראפים, תרשימים, וסטטיסטיקות
- [x] **בחירת שירותים (Service Selector)** - 4 כרטיסי שירות עם ניווט
- [x] **צבעים חדשים** - ירוק זהוב (#84cc16) וסגול (#d946ef) עם צבעים משלימים
- [x] **ניווט בין דפים** - כפתורים עובדים מעל לדפים השונים
- [x] **Alert Component** - קומפוננטה להודעות success/warning
- [x] **Design System** - צבעים, פונטים, וטיפוגרפיה מובנה

### בעיות שתוקנו (14/04/2026)
- ✅ **כפתורים לא פעילים** - תוקן: הוספנו onClick handlers ל-Landing Page buttons
- ✅ **אין ניווט בין דפים** - תוקן: עדכון LandingPage עם router.push

### ניתוחים וחישובים (צפויים)
- [ ] Pension Calculator
- [ ] Insurance Analyzer  
- [ ] Car Insurance Comparison
- [ ] Net Salary Calculator

### טכנולוגיות
- Next.js 16.2.3 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Framer Motion (אנימציות)
- Material Symbols Icons

### הנתיב הנוכחי
```
/ (Landing Page + Graphs)
  ↓ click "התחל ניתוח"
/services (Service Selector - 4 שירותים)
  ↓ click service card
/services/[serviceId] (Questionnaire Wizard)
```

### הערות פיתוח
- Dev server רץ ב-localhost:3000
- כל הצבעים מוגדרים ב-tailwind.config.ts
- פונטים: Plus Jakarta Sans (headline), Inter (body)
