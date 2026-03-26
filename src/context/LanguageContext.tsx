import React, { createContext, useContext, useState } from 'react';

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
  nav_menu: { fr: 'Menu', en: 'Menu', sw: 'Menyu' },

  // Home Page
  hero_title_1: { fr: 'L\'Énergie de Demain', en: 'Tomorrow\'s Energy', sw: 'Nishati ya Kesho' },
  hero_title_2: { fr: 'pour Goma', en: 'for Goma', sw: 'kwa Goma' },
  hero_subtitle: { fr: 'Transition énergétique sûre, propre et durable au Nord-Kivu.', en: 'Safe, clean and sustainable energy transition in North Kivu.', sw: 'Mabadiliko ya nishati salama, safi na endelevu huko Kivu Kaskazini.' },
  hero_cta: { fr: 'Commander du Gaz', en: 'Order Gas', sw: 'Agiza Gesi' },
  hero_vision: { fr: 'Notre Vision', en: 'Our Vision', sw: 'Maono Yetu' },
  hero_badge: { fr: 'Innovation au Nord-Kivu', en: 'Innovation in North Kivu', sw: 'Ubunifu Kivu Kaskazini' },

  // Features
  feat_safe_title: { fr: 'Sûr & Certifié', en: 'Safe & Certified', sw: 'Salama na Iliyoidhinishwa' },
  feat_safe_desc: { fr: 'Toutes nos bouteilles passent un contrôle de sécurité avant livraison.', en: 'All our bottles pass a security check before delivery.', sw: 'Chupa zetu zote hupitia ukaguzi wa usalama kabla ya kujifungua.' },
  feat_fast_title: { fr: 'Livraison Express', en: 'Express Delivery', sw: 'Usafirishaji wa Haraka' },
  feat_fast_desc: { fr: 'Suivez votre commande en temps réel sur la carte jusqu\'à votre porte.', en: 'Track your order in real time on the map to your door.', sw: 'Fuatilia agizo lako kwa wakati halisi kwenye ramani hadi mlangoni pako.' },
  feat_eco_title: { fr: 'Énergie Propre', en: 'Clean Energy', sw: 'Nishati Safi' },
  feat_eco_desc: { fr: 'Engagement pour la transition énergétique durable de la RDC.', en: 'Commitment to the sustainable energy transition of the DRC.', sw: 'Kujitolea kwa mabadiliko endelevu ya nishati ya DRC.' },

  // Vision 2030 Page
  vision_title: { fr: 'Plan Stratégique 2030', en: 'Strategic Plan 2030', sw: 'Mpango wa Kimkakati 2030' },
  vision_subtitle: { fr: 'Bâtir un avenir énergétique durable pour Goma et le Nord-Kivu.', en: 'Building a sustainable energy future for Goma and North Kivu.', sw: 'Kujenga mustakabali endelevu wa nishati kwa Goma na Kivu Kaskazini.' },
  phase_1_title: { fr: 'Expansion de la Distribution (2025)', en: 'Distribution Expansion (2025)', sw: 'Upanuzi wa Usambazaji (2025)' },
  phase_1_desc: { fr: 'Étendre notre réseau de points de vente dans tous les quartiers de Goma.', en: 'Extend our network of points of sale in all neighborhoods of Goma.', sw: 'Panua mtandao wetu wa sehemu za mauzo katika vitongoji vyote vya Goma.' },
  phase_2_title: { fr: 'Transition Écologique (2027)', en: 'Ecological Transition (2027)', sw: 'Mabadiliko ya Ikolojia (2027)' },
  phase_2_desc: { fr: 'Introduction de solutions de biogaz et réduction de l\'empreinte carbone.', en: 'Introduction of biogas solutions and reduction of the carbon footprint.', sw: 'Kuanzishwa kwa ufumbuzi wa biogas na kupunguza kiwango cha kaboni.' },
  phase_3_title: { fr: 'Énergie pour Tous (2030)', en: 'Energy for All (2030)', sw: 'Nishati kwa Wote (2030)' },
  phase_3_desc: { fr: 'Accès universel à une énergie propre et abordable pour toute la région.', en: 'Universal access to clean and affordable energy for the entire region.', sw: 'Upatikanaji wa nishati safi na ya bei nafuu kwa eneo lote.' },

  // Shop Page
  shop_title: { fr: 'Notre Boutique', en: 'Our Shop', sw: 'Duka Letu' },
  shop_subtitle: { fr: 'Commandez votre recharge de gaz en quelques secondes.', en: 'Order your gas refill in seconds.', sw: 'Agiza ujazo wako wa gesi kwa sekunde chache.' },
  shop_loading: { fr: 'Chargement des produits...', en: 'Loading products...', sw: 'Inapakia bidhaa...' },
  btn_add_to_cart: { fr: 'Ajouter au panier', en: 'Add to Cart', sw: 'Ongeza kwenye kikapu' },
  order_summary: { fr: 'Résumé de commande', en: 'Order Summary', sw: 'Muhtasari wa Maagizo' },
  cart_total: { fr: 'Total du panier', en: 'Cart Total', sw: 'Jumla ya kikapu' },
  checkout_desc: { fr: 'Confirmation de votre livraison à Goma.', en: 'Confirmation of your delivery to Goma.', sw: 'Uthibitisho wa uwasilishaji wako Goma.' },
  btn_confirm: { fr: 'Confirmer la commande', en: 'Confirm Order', sw: 'Thibitisha Agizo' },
  order_sent: { fr: 'Commande envoyée ! Redirection...', en: 'Order sent! Redirecting...', sw: 'Agizo limetumwa! Inaelemkeza...' },

  // Track Page (Orders)
  track_title: { fr: 'Suivi de Livraison', en: 'Delivery Tracking', sw: 'Ufuatiliaji wa Usafirishaji' },
  select_order: { fr: 'Sélectionnez une commande pour la tracer.', en: 'Select an order to track it.', sw: 'Chagua agizo ili kulifuatilia.' },
  dest_title: { fr: 'Destination', en: 'Destination', sw: 'Unakoenda' },
  status_title: { fr: 'Statut Livreur', en: 'Driver Status', sw: 'Hali ya Dereva' },
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
