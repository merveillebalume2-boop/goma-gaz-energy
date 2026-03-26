import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en' | 'sw';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Navigation
  nav_home: { fr: 'Accueil', en: 'Home', sw: 'Nyumbani' },
  nav_vision: { fr: 'Vision 2030', en: 'Vision 2030', sw: 'Maono 2030' },
  nav_shop: { fr: 'Boutique', en: 'Shop', sw: 'Duka' },
  nav_orders: { fr: 'Suivi', en: 'Track', sw: 'Kufuatilia' },
  nav_dashboard: { fr: 'Admin', en: 'Admin', sw: 'Utawala' },

  // Home Page
  hero_title: { fr: 'L\'Énergie de Demain pour Goma', en: 'Tomorrow\'s Energy for Goma', sw: 'Nishati ya Kesho kwa Goma' },
  hero_subtitle: { fr: 'Transition énergétique sûre et durable au Nord-Kivu.', en: 'Safe and sustainable energy transition in North Kivu.', sw: 'Mabadiliko ya nishati salama na endelevu huko Kivu Kaskazini.' },
  hero_cta: { fr: 'Commander du Gaz', en: 'Order Gas', sw: 'Agiza Gesi' },
  hero_vision: { fr: 'Notre Vision', en: 'Our Vision', sw: 'Maono Yetu' },

  // Shop Page
  shop_title: { fr: 'Notre Boutique', en: 'Our Shop', sw: 'Duka Letu' },
  shop_subtitle: { fr: 'Gaz de qualité livré chez vous en un clic.', en: 'Quality gas delivered to your door in one click.', sw: 'Gesi bora inayoletwa nyumbani kwako kwa kubofya mara moja.' },
  btn_add_to_cart: { fr: 'Ajouter', en: 'Add to Cart', sw: 'Ongeza' },
  order_summary: { fr: 'Résumé de commande', en: 'Order Summary', sw: 'Muhtasari wa Maagizo' },
  
  // Shared
  btn_confirm: { fr: 'Confirmer', en: 'Confirm', sw: 'Thibitisha' },
  status_pending: { fr: 'En attente', en: 'Pending', sw: 'Inasubiri' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('goma_lang') as Language) || 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('goma_lang', lang);
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
