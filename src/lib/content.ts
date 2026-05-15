import {
  BookOpenText,
  CalendarDays,
  Camera,
  Coffee,
  ExternalLink,
  Flame,
  MapPin,
  Package,
  ShoppingBag,
  Sprout,
  Utensils,
} from "lucide-react";

export type OrbitItem = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  copy: string;
  href: string;
  external?: boolean;
  video: string;
  poster: string;
  icon: typeof Coffee;
};

export const designerEmail = "ajmi.198599@gmail.com";

export const designerMailto =
  "mailto:ajmi.198599@gmail.com?subject=Landing%20Page%20Inquiry%20-%20Aurelian%20Coffee%20Atelier";

export const conceptLine = "A cinematic UI/UX and frontend concept for a luxury coffee experience.";

export const orbitItems: OrbitItem[] = [
  {
    id: "menu",
    label: "Our Menu",
    eyebrow: "Seasonal composition",
    title: "A menu tuned like a tasting score.",
    copy: "Milk, espresso, botanicals, and pastry pairings move through four quiet acts, morning clarity, afternoon silk, evening depth, and reserve pours.",
    href: "#menu",
    video: "/assets/videos/ritual-pour.mp4",
    poster: "/assets/images/ritual-pour.jpg",
    icon: Utensils,
  },
  {
    id: "origins",
    label: "Coffee Origins",
    eyebrow: "Traceable altitude",
    title: "Rare lots with a visible journey.",
    copy: "Every roast is attached to a valley, producer, harvest window, and sensory intention, so origin becomes a story you can taste.",
    href: "#origins",
    video: "/assets/videos/cafe-light.mp4",
    poster: "/assets/images/cafe-light.jpg",
    icon: Sprout,
  },
  {
    id: "brewing",
    label: "Brewing Experience",
    eyebrow: "Precision ritual",
    title: "Slow brewing, choreographed for presence.",
    copy: "Water, grind, pressure, bloom, and temperature are treated as a tactile performance with timing that feels ceremonial, never theatrical.",
    href: "#brewing",
    video: "/assets/videos/stirred-latte.mp4",
    poster: "/assets/images/stirred-latte.jpg",
    icon: Flame,
  },
  {
    id: "story",
    label: "Our Story",
    eyebrow: "The atelier",
    title: "Designed for quiet attention.",
    copy: "Aurelian was built as a bright refuge for people who want coffee to slow the room down and sharpen the senses.",
    href: "#story",
    video: "/assets/videos/steam-table.mp4",
    poster: "/assets/images/steam-table.jpg",
    icon: BookOpenText,
  },
  {
    id: "reserve",
    label: "Reserve Table",
    eyebrow: "Private service",
    title: "Reserve a seat at the pour bar.",
    copy: "Book a timed tasting, a private cupping, or an after-hours dessert pairing with a host who guides the full ritual.",
    href: "#reserve",
    video: "/assets/videos/hero-espresso.mp4",
    poster: "/assets/images/hero-espresso.jpg",
    icon: CalendarDays,
  },
  {
    id: "shop",
    label: "Shop Products",
    eyebrow: "At-home ceremony",
    title: "Bring the atelier home.",
    copy: "Reserve bags, ceramic brewers, mineral water capsules, and limited gift sets are packed with the same restraint as the bar.",
    href: "#shop",
    video: "/assets/videos/ritual-pour.mp4",
    poster: "/assets/images/ritual-pour.jpg",
    icon: ShoppingBag,
  },
  {
    id: "instagram",
    label: "Visit Instagram",
    eyebrow: "Visual journal",
    title: "Watch the daily ritual unfold.",
    copy: "Soft launches, reserve drops, guest roasters, and behind-the-bar details live in the social journal.",
    href: "https://www.instagram.com/",
    external: true,
    video: "/assets/videos/cafe-light.mp4",
    poster: "/assets/images/cafe-light.jpg",
    icon: Camera,
  },
  {
    id: "partner",
    label: "Contact Designer",
    eyebrow: "Custom adaptation",
    title: "Commission this concept.",
    copy: "For cafés, restaurants, and premium businesses that want a cinematic landing page with scroll storytelling and refined motion.",
    href: designerMailto,
    external: true,
    video: "/assets/videos/steam-table.mp4",
    poster: "/assets/images/steam-table.jpg",
    icon: ExternalLink,
  },
];

export const menuItems = [
  {
    name: "Silk Espresso",
    note: "Tangerine crema, cacao nib, velvet finish",
    price: "18 SAR",
    accent: "Single origin",
  },
  {
    name: "Caramel Bloom",
    note: "Oat milk, burnt sugar, amber foam",
    price: "24 SAR",
    accent: "Signature",
  },
  {
    name: "Cloud Filter",
    note: "White peach, jasmine, clean mineral body",
    price: "22 SAR",
    accent: "Slow bar",
  },
  {
    name: "Reserve Tasting",
    note: "Three rare lots, sensory card, paired petit four",
    price: "68 SAR",
    accent: "Guided",
  },
];

export const originCards = [
  {
    region: "Huila, Colombia",
    altitude: "1,920m",
    profile: "Red plum, honeyed cocoa, polished acidity",
  },
  {
    region: "Yirgacheffe, Ethiopia",
    altitude: "2,050m",
    profile: "Bergamot, wildflower, tea-like clarity",
  },
  {
    region: "Volcan, Panama",
    altitude: "1,740m",
    profile: "Apricot, vanilla, slow caramel finish",
  },
];

export const brewSteps = [
  {
    step: "01",
    title: "Grind",
    copy: "Burr calibration is tuned to the bean's density and the room's humidity.",
  },
  {
    step: "02",
    title: "Bloom",
    copy: "A restrained first pour releases aroma before extraction begins.",
  },
  {
    step: "03",
    title: "Pressure",
    copy: "Flow rate is adjusted in real time for texture, sweetness, and crema.",
  },
  {
    step: "04",
    title: "Finish",
    copy: "The final cup is served at a temperature that lets the profile open slowly.",
  },
];

export const products = [
  {
    name: "Aurelian Reserve 01",
    type: "Washed Gesha",
    price: "42 SAR",
    detail: "Rose, mandarin, white honey",
    icon: Package,
  },
  {
    name: "Atelier Dripper",
    type: "Porcelain brewer",
    price: "86 SAR",
    detail: "Low-profile ribs, quiet flow",
    icon: Coffee,
  },
  {
    name: "Mineral Water Set",
    type: "Brew chemistry",
    price: "28 SAR",
    detail: "Balanced capsules for clarity",
    icon: MapPin,
  },
];
