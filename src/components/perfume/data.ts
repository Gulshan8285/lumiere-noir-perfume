export type Product = {
  id: string;
  name: string;
  tagline: string;
  family: "Oriental" | "Floral" | "Woody" | "Aquatic";
  familyLabel: string;
  price: number;
  image: string;
  accent: string; // hex for glow
  size: string;
  notes: { top: string; heart: string; base: string };
  description: string;
  longDescription: string;
  intensity: number; // 1-5
  longevity: number; // hours
  bestFor: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "noir-amber",
    name: "Noir d'Ambre",
    tagline: "The Signature",
    family: "Oriental",
    familyLabel: "Oriental Amber",
    price: 245,
    image: "/perfumes/hero-amber.png",
    accent: "#d4a24e",
    size: "100ml",
    notes: {
      top: "Bergamot, Saffron",
      heart: "Amber, Labdanum",
      base: "Oud, Vanilla, Tonka",
    },
    description:
      "A molten amber flacon wrapped in smoke and spice. Warm, resinous and unapologetically opulent.",
    longDescription:
      "Noir d'Ambre is the beating heart of the Maison — a composition built around a rare amber accord aged for one hundred days in oak. Saffron lifts the opening, labdanum gives it breath, and a quiet bed of oud and tonka leaves a trail that lingers for hours. Worn close to the skin, it becomes uniquely yours.",
    intensity: 5,
    longevity: 10,
    bestFor: "Evening · Winter",
    featured: true,
  },
  {
    id: "rose-eternelle",
    name: "Rose Éternelle",
    tagline: "The Romantic",
    family: "Floral",
    familyLabel: "Floral Chypre",
    price: 220,
    image: "/perfumes/product-rose.png",
    accent: "#e08a9e",
    size: "100ml",
    notes: {
      top: "Pink Pepper, Lychee",
      heart: "Turkish Rose, Peony",
      base: "Patchouli, White Musk",
    },
    description:
      "A thousand petals crushed into crystal. Velvety rose with a flirt of spice and musk.",
    longDescription:
      "Built around the May rose of Grasse, Rose Éternelle is a modern chypre with a romantic soul. Lychee brightens the petals, patchouli grounds them, and white musk leaves a soft, second-skin finish. It is a love letter, folded into glass.",
    intensity: 3,
    longevity: 8,
    bestFor: "Day · Spring",
    featured: true,
  },
  {
    id: "emerald-vert",
    name: "Émeraude Verte",
    tagline: "The Verdant",
    family: "Woody",
    familyLabel: "Green Woody",
    price: 235,
    image: "/perfumes/product-emerald.png",
    accent: "#5fae7a",
    size: "100ml",
    notes: {
      top: "Galbanum, Mint",
      heart: "Fig, Vetiver",
      base: "Cedar, Oakmoss",
    },
    description:
      "Crushed leaves after rain. An aromatic green sillage laced with damp forest floor.",
    longDescription:
      "Émeraude Verte opens like a garden after rain — galbanum and mint, sharp and alive. Fig lends a milky green heart, while vetiver, cedar and oakmoss settle into the scent of cool earth and bark. Unmistakably verdant, quietly addictive.",
    intensity: 3,
    longevity: 7,
    bestFor: "Day · All seasons",
    featured: true,
  },
  {
    id: "sapphire-nuit",
    name: "Saphir de Nuit",
    tagline: "The Nocturnal",
    family: "Aquatic",
    familyLabel: "Aquatic Fougère",
    price: 250,
    image: "/perfumes/product-sapphire.png",
    accent: "#6f8fd6",
    size: "100ml",
    notes: {
      top: "Sea Salt, Cardamom",
      heart: "Lavender, Iris",
      base: "Ambergris, Sandalwood",
    },
    description:
      "Moonlight on cold water. A mineral, midnight-blue composition of salt and shadow.",
    longDescription:
      "Saphir de Nuit captures the moment the sea turns silver under a full moon. Sea salt and cardamom open cold and luminous; lavender and iris bring a powdered hush; ambergris and sandalwood warm the finish. Mineral, midnight, unforgettable.",
    intensity: 4,
    longevity: 9,
    bestFor: "Evening · Summer",
    featured: true,
  },
  {
    id: "onyx-noir",
    name: "Onyx Absolu",
    tagline: "The Enigma",
    family: "Oriental",
    familyLabel: "Smoky Leather",
    price: 270,
    image: "/perfumes/product-onyx.png",
    accent: "#9a9a9a",
    size: "100ml",
    notes: {
      top: "Black Pepper, Grapefruit",
      heart: "Leather, Incense",
      base: "Birch, Vetiver, Musk",
    },
    description:
      "Smoke and saddle leather folded into night. A bold, magnetic signature.",
    longDescription:
      "Onyx Absolu is the Maison's most audacious composition — a smoky leather built around birch tar and incense. Black pepper and grapefruit sharpen the opening; vetiver and musk extend the trail. Worn by those who do not need to be seen to be felt.",
    intensity: 5,
    longevity: 12,
    bestFor: "Evening · Autumn",
  },
  {
    id: "iris-poudre",
    name: "Iris Poudré",
    tagline: "The Ethereal",
    family: "Floral",
    familyLabel: "Powdery Iris",
    price: 260,
    image: "/perfumes/product-iris.png",
    accent: "#b9a6d6",
    size: "100ml",
    notes: {
      top: "Aldehydes, Carrot Seed",
      heart: "Iris, Violet, Heliotrope",
      base: "Sandalwood, Vanilla, Musk",
    },
    description:
      "Powdered iris and violet — a whispered, second-skin veil of quiet luxury.",
    longDescription:
      "Iris Poudré is composed around one of perfumery's most costly materials — iris butter, aged three years. Aldehydes lift it to a shimmer; violet and heliotrope deepen the powder; sandalwood and musk hold it close. Restrained, refined, ravishing.",
    intensity: 2,
    longevity: 8,
    bestFor: "Day · All seasons",
  },
  {
    id: "cuir-noble",
    name: "Cuir Noble",
    tagline: "The Aristocrat",
    family: "Woody",
    familyLabel: "Leather Wood",
    price: 265,
    image: "/perfumes/product-cuir.png",
    accent: "#c08442",
    size: "100ml",
    notes: {
      top: "Bergamot, Cinnamon",
      heart: "Cognac, Tobacco, Suede",
      base: "Cedar, Tonka, Styrax",
    },
    description:
      "Aged cognac and suede by a library fire. Warm, barrel-aged, deeply civilised.",
    longDescription:
      "Cuir Noble evokes a gentleman's library — leather-bound books, a glass of cognac, pipe tobacco in the air. Cinnamon and bergamot open warmly; suede and tobacco form the heart; cedar, tonka and styrax leave a resinous, barrel-aged finish.",
    intensity: 4,
    longevity: 11,
    bestFor: "Evening · Winter",
  },
  {
    id: "jardin-secret",
    name: "Jardin Secret",
    tagline: "The Daydream",
    family: "Floral",
    familyLabel: "Luminous Floral",
    price: 230,
    image: "/perfumes/product-emerald.png",
    accent: "#86c07a",
    size: "100ml",
    notes: {
      top: "Neroli, Pear",
      heart: "Jasmine, Orange Blossom",
      base: "White Musk, Cedar",
    },
    description:
      "A sunlit walled garden — neroli and jasmine in full, luminous bloom.",
    longDescription:
      "Jardin Secret is a sunlit walled garden at golden hour. Neroli and pear open sparkling and bright; jasmine and orange blossom bloom at the heart; white musk and cedar give it a clean, luminous finish. A daydream, bottled.",
    intensity: 2,
    longevity: 7,
    bestFor: "Day · Spring",
  },
];

export const discoverySet = {
  id: "discovery-set",
  name: "Le Coffret Découverte",
  tagline: "The Discovery Set",
  price: 95,
  image: "/perfumes/giftset.png",
  accent: "#d4a24e",
  description:
    "Seven 2ml flacons of our signature scents in a hand-finished black coffret — with the price redeemable against a full-size bottle.",
  includes: [
    "Noir d'Ambre",
    "Rose Éternelle",
    "Émeraude Verte",
    "Saphir de Nuit",
    "Onyx Absolu",
    "Iris Poudré",
    "Cuir Noble",
  ],
};

export type Collection = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;
  count: string;
  family: Product["family"];
};

export const collections: Collection[] = [
  {
    id: "floral",
    title: "Les Florales",
    subtitle: "Blooms in crystal",
    description:
      "Tender bouquets of rare blossoms — rose, jasmine, peony, iris — gathered at first light.",
    image: "/perfumes/product-rose.png",
    accent: "#e08a9e",
    count: "Fragrances of bloom",
    family: "Floral",
  },
  {
    id: "oriental",
    title: "Les Orientales",
    subtitle: "Resin, spice & smoke",
    description:
      "Amber, oud, saffron and leather woven into warm, enveloping compositions of the East.",
    image: "/perfumes/hero-amber.png",
    accent: "#d4a24e",
    count: "Resinous warmth",
    family: "Oriental",
  },
  {
    id: "woody",
    title: "Les Boisées",
    subtitle: "Forests & smoke",
    description:
      "Cedar, vetiver and oakmoss — the quiet strength of ancient woodlands and green shade.",
    image: "/perfumes/product-emerald.png",
    accent: "#5fae7a",
    count: "Green & arboreal",
    family: "Woody",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Noir d'Ambre doesn't announce itself — it unfurls. Strangers stop me in lifts to ask what I'm wearing.",
    author: "Isabelle Moreau",
    role: "Creative Director, Paris",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The most beautiful flacon I own. Émeraude Verte smells like a private garden after rain.",
    author: "Adrian Vale",
    role: "Architect, Milan",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Saphir de Nuit is midnight in a bottle. Cool, mineral, unforgettable.",
    author: "Mei Lin",
    role: "Gallerist, Tokyo",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "Iris Poudré is the most elegant thing in my dressing table. Quiet luxury, distilled.",
    author: "Sofia Castellano",
    role: "Editor-in-Chief, Madrid",
    rating: 5,
  },
];

export const families = [
  { id: "all", label: "All" },
  { id: "Oriental", label: "Oriental" },
  { id: "Floral", label: "Floral" },
  { id: "Woody", label: "Woody" },
  { id: "Aquatic", label: "Aquatic" },
] as const;
