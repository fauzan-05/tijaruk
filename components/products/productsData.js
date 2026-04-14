export const productsHero = {
  title: "Products",
  description:
    "Explore export-ready essentials and industrial goods sourced through TIJARUK's trusted supplier network.",
  image: "/products/hero.jpg",
};

export const productCategories = [
  "All",
  "Food & Agriculture",
  "Industrial Materials",
  "Electrical",
  "Textiles",
  "Chemicals",
  "Automotive",
];

export const productCards = [
  {
    name: "Rice",
    slug: "rice",
    image: "/products/rice.jpg",
    hoverImage: "/products/rice02.png?v=3",
    galleryImages: ["/products/rice02.png?v=3", "/oredrnow/rice03.png"],
    category: "Food & Agriculture",
    description:
      "Premium long-grain rice sourced for wholesale buyers who need consistency, export-grade packing, and dependable supply planning.",
    price: "3.44 USD",
    reviews: 146,
    detailPrice: "14.36 USD",
    minimumOrder: 10,
    units: ["Kg", "Ton", "Bag"],
    categoriesLabel: "Sourcing",
    sourceModes: ["Domestic Sourcing", "International Sourcing"],
    infoText:
      "This rice line is sourced for wholesale programs that need stable grain quality, competitive packing formats, and practical import or domestic movement support.",
    descriptionText:
      "Our rice sourcing support combines supplier validation, order coordination, documentation guidance, and delivery planning so buyers can move with less friction and more confidence.",
    features: ["Fast shipping", "Secure payments"],
    relatedSlugs: ["spices", "vegetable-oil", "steel-rods"],
  },
  {
    name: "Spices",
    slug: "spices",
    image: "/products/spices.jpg",
    hoverImage: "/products/spices02.png?v=3",
    galleryImages: ["/products/spices02.png?v=3", "/oredrnow/spices03.png"],
    category: "Food & Agriculture",
    description:
      "Aromatic spice selections prepared for retail, foodservice, and bulk trade with traceable sourcing and competitive pricing.",
    price: "5.34 USD",
    reviews: 146,
    detailPrice: "5.34 USD",
    minimumOrder: 25,
    units: ["Kg", "Bag", "Ton"],
    categoriesLabel: "Sourcing",
    sourceModes: ["Domestic Sourcing", "International Sourcing"],
    infoText:
      "Wholesale spice assortments for distributors, packaged brands, and food businesses looking for freshness, consistency, and traceable sourcing.",
    descriptionText:
      "TIJARUK helps compare supplier quality, pack sizes, and shipping options so spice sourcing becomes easier to scale across markets.",
    features: ["Fast shipping", "Secure payments"],
    relatedSlugs: ["rice", "vegetable-oil", "cleaning-chemicals"],
  },
  {
    name: "Switches",
    slug: "switches",
    image: "/products/switches.jpg",
    hoverImage: "/products/switces02.png?v=3",
    galleryImages: ["/products/switces02.png?v=3", "/oredrnow/switces03.png"],
    category: "Electrical",
    description:
      "Durable electrical switches and related components for project supply, distribution channels, and repeat procurement cycles.",
    price: "3.44 USD",
    reviews: 146,
    detailPrice: "16.44 USD",
    minimumOrder: 100,
    units: ["Units", "Box", "Carton"],
    categoriesLabel: "Electrical",
    sourceModes: ["Domestic Sourcing", "International Sourcing"],
    infoText:
      "Electrical switch options suited for project procurement, dealer stock, and repeat inventory planning with quality-focused supplier checks.",
    descriptionText:
      "We support sourcing with better supplier comparison, specification clarity, and coordination across samples, timelines, and shipping.",
    features: ["Fast shipping", "Secure payments"],
    relatedSlugs: ["steel-rods", "pipes", "spare-parts"],
  },
  {
    name: "Vegetable Oil",
    slug: "vegetable-oil",
    image: "/products/vegitableoil.jpg",
    hoverImage: "/products/vegitableoil02.png?v=3",
    galleryImages: ["/products/vegitableoil02.png?v=3", "/oredrnow/vegitableoil03.png"],
    category: "Food & Agriculture",
    description:
      "Wholesale vegetable oil options with strong shelf presence, scalable volumes, and supplier coordination for import or local trade.",
    price: "3.44 USD",
    reviews: 146,
    detailPrice: "11.24 USD",
    minimumOrder: 50,
    units: ["L", "Carton", "Pallet"],
    categoriesLabel: "Sourcing",
    sourceModes: ["Domestic Sourcing", "International Sourcing"],
    infoText:
      "Commercial vegetable oil supply for wholesale buyers needing stable stock, reliable packaging standards, and scalable replenishment.",
    descriptionText:
      "From sourcing discussions to delivery planning, TIJARUK helps keep edible oil procurement clearer, faster, and easier to manage.",
    features: ["Fast shipping", "Secure payments"],
    relatedSlugs: ["rice", "spices", "fabrics"],
  },
  {
    name: "Steel Rods",
    slug: "steel-rods",
    image: "/products/steel-rods.jpg",
    hoverImage: "/products/steel02.png?v=3",
    galleryImages: ["/products/steel02.png?v=3", "/oredrnow/steel03.png"],
    category: "Industrial Materials",
    description:
      "Construction and fabrication-grade steel rods supplied with practical sourcing support, clearer specifications, and faster follow-up.",
    price: "8.44 USD",
    reviews: 146,
    detailPrice: "8.44 USD",
    minimumOrder: 2,
    units: ["Ton", "Bundle", "Truckload"],
    categoriesLabel: "Industrial Materials",
    sourceModes: ["Domestic Sourcing", "International Sourcing"],
    infoText:
      "Steel rod sourcing designed for industrial buyers that need dependable material quality, supplier responsiveness, and better quotation clarity.",
    descriptionText:
      "We help evaluate production capacity, quality assurance, and logistics so bulk steel buying becomes more straightforward and lower-risk.",
    features: ["Fast shipping", "Secure payments"],
    relatedSlugs: ["switches", "pipes", "spare-parts"],
  },
  {
    name: "Fabrics",
    slug: "fabrics",
    image: "/products/fabrics.jpg",
    hoverImage: "/products/fabrics02.png?v=3",
    galleryImages: ["/products/fabrics02.png?v=3", "/oredrnow/fabrics03.png"],
    category: "Textiles",
    description:
      "Commercial fabric selections suitable for apparel, interiors, and private-label sourcing with flexible order planning.",
    price: "3.44 USD",
    reviews: 146,
    detailPrice: "6.84 USD",
    minimumOrder: 500,
    units: ["Meters", "Roll", "Bale"],
    categoriesLabel: "Textiles",
    sourceModes: ["Domestic Sourcing", "International Sourcing"],
    infoText:
      "Fabric sourcing for private-label programs, interior supply, and bulk textile orders that need consistent look, feel, and color matching.",
    descriptionText:
      "TIJARUK supports supplier shortlisting, sample review, and order planning so textile buying decisions feel more structured and dependable.",
    features: ["Fast shipping", "Secure payments"],
    relatedSlugs: ["rice", "vegetable-oil", "cleaning-chemicals"],
  },
  {
    name: "Pipes",
    slug: "pipes",
    image: "/products/pipe.jpg",
    hoverImage: "/products/pipe02.png?v=3",
    galleryImages: ["/products/pipe02.png?v=3", "/oredrnow/pipe03.png"],
    category: "Industrial Materials",
    description:
      "Pipe and tubing products sourced for infrastructure, maintenance, and industrial demand with quality-focused supplier vetting.",
    price: "3.44 USD",
    reviews: 146,
    detailPrice: "7.92 USD",
    minimumOrder: 40,
    units: ["Units", "Bundle", "Truckload"],
    categoriesLabel: "Industrial Materials",
    sourceModes: ["Domestic Sourcing", "International Sourcing"],
    infoText:
      "Pipe and tubing supply support for infrastructure and industrial projects where sizing accuracy and supplier reliability matter.",
    descriptionText:
      "We help buyers compare technical fit, production timelines, and shipping routes so supply decisions stay aligned with project needs.",
    features: ["Fast shipping", "Secure payments"],
    relatedSlugs: ["steel-rods", "switches", "spare-parts"],
  },
  {
    name: "Spare Parts",
    slug: "spare-parts",
    image: "/products/spare-parts.jpg",
    hoverImage: "/products/spare02.png?v=3",
    galleryImages: ["/products/spare02.png?v=3", "/oredrnow/spare03.png"],
    category: "Automotive",
    description:
      "Machined and replacement spare parts for ongoing operations, resale, and procurement programs that require reliable repeat supply.",
    price: "3.54 USD",
    reviews: 146,
    detailPrice: "3.54 USD",
    minimumOrder: 30,
    units: ["Units", "Box", "Carton"],
    categoriesLabel: "Automotive",
    sourceModes: ["Domestic Sourcing", "International Sourcing"],
    infoText:
      "Replacement and spare parts sourcing for operational continuity, dealer supply, and repeat reorder programs.",
    descriptionText:
      "Our sourcing process helps clarify specifications, supplier readiness, and freight timing so procurement teams can move faster with fewer surprises.",
    features: ["Fast shipping", "Secure payments"],
    relatedSlugs: ["pipes", "switches", "steel-rods"],
  },
  {
    name: "Cleaning Chemicals",
    slug: "cleaning-chemicals",
    image: "/products/cleaning-chemicals.jpg",
    hoverImage: "/products/chemicals02.png?v=3",
    galleryImages: ["/products/chemicals02.png?v=3", "/oredrnow/chemicals03.png"],
    category: "Chemicals",
    description:
      "Commercial cleaning and maintenance chemical lines prepared for wholesale distribution, facilities use, and market rollout.",
    price: "3.44 USD",
    reviews: 146,
    detailPrice: "4.72 USD",
    minimumOrder: 100,
    units: ["L", "Carton", "Pallet"],
    categoriesLabel: "Chemicals",
    sourceModes: ["Domestic Sourcing", "International Sourcing"],
    infoText:
      "Cleaning chemical sourcing for wholesale, facilities, and commercial maintenance programs with packaging and compliance considerations built in.",
    descriptionText:
      "TIJARUK helps structure supplier comparison, packaging choices, and delivery planning so chemical procurement feels more manageable.",
    features: ["Fast shipping", "Secure payments"],
    relatedSlugs: ["fabrics", "spices", "vegetable-oil"],
  },
];

export function getProductBySlug(slug) {
  return productCards.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug) {
  const product = getProductBySlug(slug);

  if (!product) {
    return [];
  }

  const relatedFromList = product.relatedSlugs
    .map((relatedSlug) => getProductBySlug(relatedSlug))
    .filter(Boolean);

  if (relatedFromList.length >= 3) {
    return relatedFromList.slice(0, 3);
  }

  return productCards
    .filter((item) => item.slug !== slug)
    .slice(0, 3);
}
