import { Design } from './types';

export const FALLBACK_DESIGNS: Design[] = [
  {
    id: '1',
    title: 'Emerald Silk Blouse',
    category: 'Blouse',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAFrDGh8a_FnzFUy9-1sJDQ90qLl8nzvhla4MivCQMm3O7VxoGkLVmiYP6UB_JOZqduSFhnad3I_8H97uB8jCjJPZsGD2xi7XVqA29tgzb-pTdoBgCKxegVk5qEUZn1H7qRXrSodr-X1noAuPLgnVvv40mCfbUZhNQjqUXY78XuySTonep1BxzV0T5CG7GNIbWw6Ug7ghM_w8ineMZDfuzkHcuhe7kTMFDVlH-xzh-e8oiUmQWudTWfKmscokJXBdpPRxuWOiQq4I',
    price: 18500,
    is_featured: true,
    description: 'A masterpiece of precision tailoring, this emerald silk blouse features intricate hand-embroidery and a structured yet fluid silhouette.'
  },
  {
    id: '2',
    title: 'Ivory Pearl Bridal',
    category: 'Bridal',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5XqFT0ZaW82T55rNLp90ygvOWW8DINEf2VqV-TSHWPXcKaE4-QxO3FJB8B5GVy2OOzcCz5yEdC174vuedzkk7XbK3hNkPH-XJnv5M-DVXGQXBG_8nhc1O5oRn5gNUCwpOLFHfmKnMRMPjIv1lgNk74C5yC6WROuCoIgNAqXV_26trAZccTMc7EwsgKm2JLJRGAlgfkbCjE004EIqoPParpV-r2f09Xksph2MBJg7lcgPZ1uvRVhdmMC62Lynllr6v0DZKMBuklTM',
    price: 125000,
    is_featured: true,
    description: 'The ultimate bridal statement. Adorned with hand-sewn pearls and precious crystals, this ivory silhouette is designed for the most memorable moments.'
  },
  {
    id: '3',
    title: 'Modern Kurti',
    category: 'Kurti',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBksF2U226_yPKAlIHnVCHFRp4NNJVAb4E1WUlqtiNg9kP9y2OpVd6L-ikF7DBM8Bi_5WKYGQ4cv1Okc_EBvVMwdMuEEQhgaaK5aBOtJa9vFUHOF6qjqy7LDBqVlljjQdb8Ld7ONkMnngLUIxTl5e24o1dhvy90eOCqQem8w5jp9TTC4DvuEenoZWQLApNUxj2nEUd10LwXxSzqPjcyhhD0a5QPY7V3mr0bJ5EbGQjKaK9dT20cLo90wr7P5XvPsbHhoy4FAKfKGs0',
    price: 12400,
    is_featured: true,
    description: 'Contemporary elegance for the modern woman. This kurti combines traditional craftsmanship with a sharp, architectural cut.'
  },
  {
    id: '4',
    title: 'Midnight Star Lehenga',
    category: 'Lehenga',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnQS43OlK2dmOdgil-HuZ6vgWEhpkVdU6nELvM8fkt7dl2aZbILttrCQxsAPUk32o9o_Sm41vaMhlddUkyFy20aRgDFHSvpGuH4VQDwPTMae2m64vP00fccECw1FvUW0KgxLP_JNA7QUI5_oJelSeBvbXykl2zL7UWqgslfCcGDPEQFh3mC0uRU07tMfmoP5zgxLze039U-1txvZQOmiEA5Yrlk7xMB3NV_xiG-oIKutTu_bCOCuXzAdfYOyy5YnyrVVRsHEcLNpw',
    price: 88500,
    is_featured: true,
    description: 'A celestial lehenga that captures the essence of a midnight sky. Features shimmering hand-work on deep navy silk.'
  },
  {
    id: '5',
    title: 'Architectural Blouse',
    category: 'Blouse',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFQ3lpqnuMoxTwUsqPw69LJgSFvVvZi7kGjFhoAvzUV_IaOPXwUY2E4TNO6xFDyrL6dIS3fjV3pfEVMzQwGoqX3cpWj_fx4PgDxCZQsP5Po2Us95mLx7hLaRiVPgFsXm9Mfi9WQw_jAlUnSpc0q3GQ5aTLIAj-a-sDNJcrssdZrjVDJRnMPsHKgq6lDGXXKMHb_HpthnkSPem260Irc1e6tLkUXJRRilkmEFcVEMBE5_UL3SY64z3t_zX-5qwKcQPMMrk3QpWjiYk',
    price: 22400,
    is_featured: false,
    description: 'Where geometry meets grace. This blouse is a study in form and structure, perfect for high-fashion pairings.'
  },
  {
    id: '6',
    title: 'Gold Dust Bridal Kurti',
    category: 'Bridal',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkmb2NNgZXA1Q36UUNABK25wecDhPQyj1Ooh45r2SNxc1vmuLiOIy5QOWqyrAXS2jEWzzJuseNRoKvoX1taDuN7jPh8giU8LzxsirH2wdoEcm6vYjgtU2gk8bKwQpotNylmv_QBS3F1-5Sp9k-ce2GyF6lDJ7ZjBHFYPOeRTgLFiWRnYGk3dg2NF1VlXDtHUtN4asibPXHCsgYbUTCKP8DzCot0584fFXZrh8yRzv5XBQtllZnuv_q-01IiHYL-PqYLHj48nNpUwc',
    price: 64200,
    is_featured: false,
    description: 'Woven with real zari and semi-precious stones, this kurti is a testament to timeless luxury.'
  }
];
