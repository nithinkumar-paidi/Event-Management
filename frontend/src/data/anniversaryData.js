// enhancedAnniversaryData.js
export const anniversaryData = {
  heroCarousel: [
    {
      image: "/assets/photography1.jpg",
      quote: "Love grows more tremendously full, swift, poignant, as the years multiply."
    },
    {
      image: "/assets/photography2.jpg",
      quote: "The best thing to hold onto in life is each other."
    },
    {
      image: "/assets/photography3.jpg",
      quote: "In all the world, there is no heart for me like yours."
    },
    {
      image: "/assets/photography4.jpg",
      quote: "Real love stories never have endings."
    }
  ],
  
  packages: [
    {
      id: 1,
      title: "Silver Package",
      description: "Perfect for intimate celebrations",
      price: 599,
      rating: 4.7,
      reviewCount: 128,
      popular: false,
      duration: "1 Night Stay",
      features: [
        "3-course dinner with wine pairings",
        "Champagne toast on arrival",
        "Romantic room decoration with rose petals",
        "Breakfast in bed",
        "Late checkout until 2 PM",
        "Commemorative photo frame"
      ],
      includes: [
        "Luxury accommodation",
        "Welcome drink",
        "Anniversary cake",
        "Couple spa treatment (60 min)"
      ],
      image: "/assets/silver-package.jpg",
      photography: [
        "/assets/silver-room.jpg",
        "/assets/silver-dining.jpg",
        "/assets/silver-spa.jpg"
      ]
    },
    {
      id: 2,
      title: "Gold Package",
      description: "Our most popular anniversary package",
      price: 999,
      rating: 4.9,
      reviewCount: 256,
      popular: true,
      duration: "2 Nights Stay",
      features: [
        "5-course fine dining experience",
        "Premium wine selection",
        "Luxury suite with ocean view",
        "Couples spa treatment (90 min)",
        "Private beach dinner setup",
        "Professional photoshoot"
      ],
      includes: [
        "VIP check-in experience",
        "Daily breakfast",
        "Anniversary gift basket",
        "Private butler service",
        "Romantic turndown service"
      ],
      image: "/assets/gold-package.jpg",
      photography: [
        "/assets/gold-suite.jpg",
        "/assets/gold-dining.jpg",
        "/assets/gold-beach.jpg"
      ]
    },
    {
      id: 3,
      title: "Platinum Package",
      description: "The ultimate anniversary experience",
      price: 1499,
      rating: 5.0,
      reviewCount: 184,
      popular: false,
      duration: "3 Nights Stay",
      features: [
        "7-course dining with wine pairing",
        "Luxury suite with private pool",
        "Couples spa journey (120 min)",
        "Sunset yacht cruise",
        "Helicopter tour",
        "Private beach dinner"
      ],
      includes: [
        "Airport limousine transfer",
        "24/7 personal concierge",
        "Daily champagne breakfast",
        "Luxury gift hamper",
        "Romantic bath ritual"
      ],
      image: "/assets/platinum-package.jpg",
      photography: [
        "/assets/platinum-suite.jpg",
        "/assets/platinum-pool.jpg",
        "/assets/platinum-yacht.jpg"
      ]
    }
  ],

  resortFeatures: [
    {
      title: "Luxury Accommodations",
      description: "Elegant rooms and suites with stunning views",
      image: "/assets/photography3.jpg",
      amenities: [
        "Ocean view balconies",
        "Premium bedding",
        "Smart room controls",
        "Luxury bathroom amenities"
      ]
    },
    {
      title: "Fine Dining",
      description: "World-class restaurants and private dining options",
      image: "/assets/dining.jpg",
      amenities: [
        "Multiple restaurants",
        "Private dining venues",
        "Expert sommeliers",
        "24-hour room service"
      ]
    },
    {
      title: "Spa & Wellness",
      description: "Rejuvenating treatments and couples massages",
      image: "/assets/spa.jpg",
      amenities: [
        "Couples treatment rooms",
        "Hydrotherapy pools",
        "Relaxation lounges",
        "Wellness programs"
      ]
    },
    {
      title: "Activities & Recreation",
      description: "Romantic experiences and adventures for two",
      image: "/assets/activities.jpg",
      amenities: [
        "Private beach access",
        "Water sports",
        "Cooking classes",
        "Fitness center"
      ]
    }
  ],

  timeline: [
    {
      time: "14:00",
      title: "VIP Check-in",
      description: "Welcome champagne and resort orientation",
      icon: "glass"
    },
    {
      time: "15:00",
      title: "Spa Journey",
      description: "Relaxing couples massage and treatments",
      icon: "spa"
    },
    {
      time: "18:00",
      title: "Sunset Experience",
      description: "Private beach cocktails and canapes",
      icon: "sun"
    },
    {
      time: "19:30",
      title: "Anniversary Dinner",
      description: "Romantic candlelit dining experience",
      icon: "utensils"
    }
  ],

  testimonials: [
    {
      couple: "John & Sarah",
      image: "/assets/testimonial1.jpg",
      package: "Gold Package",
      rating: 5,
      review: "The most magical anniversary celebration we could have imagined.",
      date: "January 2024"
    },
    {
      couple: "Michael & Emma",
      image: "/assets/testimonial2.jpg",
      package: "Platinum Package",
      rating: 5,
      review: "Every detail was perfect. The private beach dinner was unforgettable.",
      date: "December 2023"
    },
    {
      couple: "David & Lisa",
      image: "/assets/testimonial3.jpg",
      package: "Silver Package",
      rating: 4.8,
      review: "Beautiful experience that made our anniversary truly special.",
      date: "February 2024"
    }
  ],

  addons: [
    {
      id: "photo",
      title: "Professional Photography",
      price: 299,
      description: "2-hour photoshoot with edited digital images",
      image: "/assets/addon-photo.jpg"
    },
    {
      id: "spa",
      title: "Extended Spa Package",
      price: 199,
      description: "Additional 60-min treatment with private jacuzzi",
      image: "/assets/addon-spa.jpg"
    },
    {
      id: "decoration",
      title: "Premium Decoration",
      price: 149,
      description: "Extra room decorations with flowers and candles",
      image: "/assets/addon-decoration.jpg"
    },
    {
      id: "music",
      title: "Live Music",
      price: 299,
      description: "Private musician for 2 hours during dinner",
      image: "/assets/addon-music.jpg"
    }
  ],

  faqs: [
    {
      question: "What's the best time to book?",
      answer: "We recommend booking at least 30 days in advance to ensure availability of your preferred package and date."
    },
    {
      question: "Can packages be customized?",
      answer: "Yes, all packages can be customized with additional services and experiences from our add-ons menu."
    },
    {
      question: "What's the cancellation policy?",
      answer: "Free cancellation up to 7 days before your scheduled arrival. Within 7 days, a 50% charge applies."
    },
    {
      question: "Are special dietary requirements accommodated?",
      answer: "Yes, we cater to all dietary requirements. Please specify your needs during booking."
    }
  ],

  contactInfo: {
    phone: "+1 (555) 123-4567",
    email: "celebrations@luxuryresort.com",
    address: "123 Paradise Beach Road, Tropical Island",
    hours: "24/7 Concierge Service",
    socials: {
      facebook: "luxuryresort",
      instagram: "@luxuryresort",
      twitter: "@luxuryresort"
    }
  },

  photography: [
    {
      url: "/assets/photography1.jpg",
      caption: "Romantic Sunset"
    },
    {
      url: "/assets/photography2.jpg",
      caption: "Elegant Celebration"
    },
    {
      url: "/assets/photography3.jpg",
      caption: "Couple's Getaway"
    },
    {
      url: "/assets/photography4.jpg",
      caption: "Memorable Moments"
    }
  ],

};