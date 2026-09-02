export interface ProductSpec {
  shutterDepth: string;
  lockingType: string;
  cornerDetails: string;
  sealingOverlap?: string;
  glassRange: string;
  sightline?: string;
  twoTrackDepth: string;
  threeTrackDepth?: string;
  maxWindowHeight: string;
  finishes: string;
  hardware: string;
}

export interface ProductItem {
  id: string;
  name: string;
  series: string;
  category: 'sliding' | 'casement' | 'folding' | 'hardware';
  tagline: string;
  description: string;
  badge?: string;
  applications: string[];
  keyFeatures: string[];
  specs: ProductSpec;
  image: string;
  crossSectionImage?: string;
  popular?: boolean;
}

export interface TrackConfiguration {
  id: string;
  name: string;
  type: string;
  tracks: number;
  shutters: number;
  hasMesh?: boolean;
  meshCount?: number;
  description: string;
  diagramCode: string;
}

export interface HardwareItem {
  id: string;
  code: string;
  category: 'cleat' | 'lock' | 'handle' | 'roller';
  name: string;
  compatibleSeries: string;
  features: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'villas' | 'residential' | 'commercial' | 'doors' | 'interiors';
  categoryLabel: string;
  location: string;
  systemUsed: string;
  imageUrl: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
  iconName: string;
}

export interface SiteContent {
  brand: {
    name: string;
    subtagline: string;
    cursiveTagline: string;
    established: string;
    websiteUrl: string;
    logoText: string;
    phones: string[];
    email: string;
    officeAddress: string;
    city: string;
    pincode: string;
    workingHours: string;
    socialLinks: {
      linkedin: string;
      facebook: string;
      twitter: string;
      instagram: string;
      youtube: string;
    };
  };
  hero: {
    badge: string;
    headlineStart: string;
    headlineHighlight: string;
    headlineEnd: string;
    subheading: string;
    primaryCta: string;
    secondaryCta: string;
    heroImage: string;
    stats: Array<{
      value: string;
      label: string;
      subtext?: string;
    }>;
  };
  about: {
    sectionTag: string;
    heading: string;
    introParagraph: string;
    secondaryParagraph: string;
    engineeringParagraph: string;
    aboutImage?: string;
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    values: ValueItem[];
    experienceYears: string;
    warrantyYears: string;
  };
  whyChooseUs: {
    sectionTag: string;
    heading: string;
    subheading: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  products: ProductItem[];
  configurations: TrackConfiguration[];
  hardwareItems: HardwareItem[];
  gallery: GalleryItem[];
}

export interface QuoteBooking {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  projectType: string;
  systemPreference?: string;
  trackPreference?: string;
  approximateAreaSqFt?: string;
  projectStage: string;
  message: string;
  status: 'new' | 'in-review' | 'contacted' | 'completed';
}
