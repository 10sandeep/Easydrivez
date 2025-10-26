export interface Car {
  name: string;
  type: string;
  image: string;
  price12: string;
  price24: string;
  features: string[];
}

export interface Bike {
  name: string;
  type: string;
  image: string;
  price12: string;
  price24: string;
  features: string[];
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const backgroundImages: string[] = [
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&q=80",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
];

export const featuredCars: Car[] = [
  {
    name: "BMW 5 Series",
    type: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    price12: "₹2,500",
    price24: "₹4,500",
    features: ["Automatic", "AC", "5 Seats"],
  },
  {
    name: "Toyota Fortuner",
    type: "SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    price12: "₹2,000",
    price24: "₹3,500",
    features: ["Automatic", "AC", "7 Seats"],
  },
  {
    name: "Honda City",
    type: "Sedan",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
    price12: "₹800",
    price24: "₹1,500",
    features: ["Manual", "AC", "5 Seats"],
  },
  {
    name: "Maruti Swift",
    type: "Sedan",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    price12: "₹600",
    price24: "₹1,000",
    features: ["Manual", "AC", "5 Seats"],
  },
  {
    name: "BMW 5 Series",
    type: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    price12: "₹2,500",
    price24: "₹4,500",
    features: ["Automatic", "AC", "5 Seats"],
  },
  {
    name: "Toyota Fortuner",
    type: "SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    price12: "₹2,000",
    price24: "₹3,500",
    features: ["Automatic", "AC", "7 Seats"],
  },
  {
    name: "Honda City",
    type: "Sedan",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
    price12: "₹800",
    price24: "₹1,500",
    features: ["Manual", "AC", "5 Seats"],
  },
  {
    name: "Maruti Swift",
    type: "Sedan",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    price12: "₹600",
    price24: "₹1,000",
    features: ["Manual", "AC", "5 Seats"],
  },
];

export const featuredBikes: Bike[] = [
  {
    name: "Harley Davidson",
    type: "Cruiser",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
    price12: "₹1,500",
    price24: "₹2,500",
    features: ["1200cc", "Cruiser", "Premium"],
  },
  {
    name: "Kawasaki Ninja",
    type: "Sports",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    price12: "₹1,200",
    price24: "₹2,000",
    features: ["650cc", "Sports", "High Speed"],
  },
  {
    name: "Royal Enfield",
    type: "Adventure",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80",
    price12: "₹500",
    price24: "₹900",
    features: ["350cc", "Adventure", "Classic"],
  },
  {
    name: "Honda Activa",
    type: "Scooter",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80",
    price12: "₹300",
    price24: "₹500",
    features: ["110cc", "Scooter", "Economy"],
  },
  {
    name: "Harley Davidson",
    type: "Cruiser",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
    price12: "₹1,500",
    price24: "₹2,500",
    features: ["1200cc", "Cruiser", "Premium"],
  },
  {
    name: "Kawasaki Ninja",
    type: "Sports",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    price12: "₹1,200",
    price24: "₹2,000",
    features: ["650cc", "Sports", "High Speed"],
  },
  {
    name: "Royal Enfield",
    type: "Adventure",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80",
    price12: "₹500",
    price24: "₹900",
    features: ["350cc", "Adventure", "Classic"],
  },
  {
    name: "Honda Activa",
    type: "Scooter",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80",
    price12: "₹300",
    price24: "₹500",
    features: ["110cc", "Scooter", "Economy"],
  },
];

export const galleryImages: string[] = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80",
  "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&q=80",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  "https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&q=80",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&q=80",
  "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&q=80",
];

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    text: "Amazing service! The car was in perfect condition and the staff was very helpful. Will definitely rent again.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    text: "Great experience renting a bike for my weekend trip. Smooth process and affordable rates!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    name: "Amit Patel",
    rating: 4,
    text: "Professional service and well-maintained vehicles. Customer support was excellent throughout.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
  },
];

export const termsAndConditionsData = {
  header: {
    title: 'Terms & Conditions',
    subtitle: 'easydrivez Rental Services - Bhubaneswar'
  },

  sections: [
    {
      id: 'rental-period',
      title: '1. RENTAL PERIOD & DROP-OFF POLICY',
      content: [
        'Provisional Drop-off Time: Will be specified at the time of booking.',
        'Final Drop-off: Will be confirmed upon vehicle return to Mo Car.',
        'Late Return Penalty: Any delay exceeding 30 minutes without prior notification will attract hourly charges.',
        'Trip Extension: Must be requested at least 6 hours before the provisional drop-off time. Standard rates will apply for extensions.'
      ]
    },
    {
      id: 'damage',
      title: '2. VEHICLE DAMAGE & ACCIDENT LIABILITY',
      content: [
        'The customer is responsible for all penalties, fines, and damages incurred during the rental period.',
        'Repair Cost: Customer must pay 100% of the accidental repair cost (as estimated by authorized service center) plus daily tariff until the vehicle is ready for rental again.',
        'Notification: Customer must inform Mo Car within 2 hours and file a police report within 48 hours.',
        'Theft: In case of vehicle theft, the customer is liable to pay the full market rate of the vehicle.'
      ]
    },
    {
      id: 'return',
      title: '3. VEHICLE RETURN REQUIREMENTS',
      content: [
        'Vehicles must be returned on the specified provisional date and time as per the rental agreement.',
        'Vehicle must be in the same condition as at pick-up (excluding normal wear and tear).',
        'Fuel level must match the pick-up level. Extra fuel is non-refundable; shortage will be charged.',
        'All pre-existing damages must be documented and acknowledged at the time of pick-up.'
      ]
    },
    {
      id: 'documents',
      title: '4. MANDATORY DOCUMENTS',
      content: [
        'Valid Driving License issued by the Government of India',
        'Photo ID (Aadhaar Card, Voter ID, or Passport)',
        'College/Company ID (for verification)'
      ]
    },
    {
      id: 'usage',
      title: '5. VEHICLE USAGE RULES',
      content: [
        'Speed Limit: Maximum 80 km/hr. Customers must adhere to speed limit boards.',
        'KM Limit: Will be informed at the time of pick-up.',
        'Proper Handling: Vehicle must be used skillfully and properly by a valid license holder only.',
        'Helmet/Seatbelt: Mandatory during entire rental period.',
        'Fuel: Rental fare does not include fuel costs or toll taxes (to be paid separately by customer).'
      ]
    },
    {
      id: 'prohibited',
      title: '6. PROHIBITED ACTIVITIES',
      content: [
        'Any illegal purpose or activity',
        'Reckless, negligent, or unreasonable driving',
        'Commercial purposes (unless explicitly agreed)',
        'Selling, renting, or transferring the vehicle or its parts',
        'Attempting to give legal rights over the vehicle to any third party',
        'Any unauthorized modifications or removal of components'
      ]
    },
    {
      id: 'modifications',
      title: '7. VEHICLE MODIFICATIONS & MAINTENANCE',
      content: [
        'No alterations or component removal are permitted unless immediately replaced with the same or equivalent/improved version.',
        'Any concerns regarding vehicle condition must be reported immediately and documented with photos.'
      ]
    },
    {
      id: 'bikes',
      title: '8. SPECIAL PROVISIONS FOR BIKES & SCOOTERS',
      content: [
        'Complimentary Helmet: One helmet is provided free with every motorcycle rental and must be returned undamaged.',
        'Additional Helmets: Rs. 50/- per extra helmet will be charged.',
        'Minor Damage: Rs. 200/- per helmet',
        'Major Damage/Loss: Market value of the helmet'
      ]
    },
    {
      id: 'legal',
      title: '9. LEGAL JURISDICTION & LIABILITY',
      content: [
        'All legal disputes or conflicts arising from Mo Car rental services shall be subject to the exclusive jurisdiction of courts in Bhubaneswar, Odisha, India.',
        'Customer is liable to pay Mo Car\'s reasonable attorney fees and bear all legal proceeding costs, including appeals.',
        'Mo Car may immediately terminate the rental agreement upon suspicion or discovery of breach of these terms and conditions.'
      ]
    },
    {
      id: 'third-party',
      title: '10. THIRD-PARTY RIGHTS',
      content: [
        'Only parties to the Rental Agreement can enforce responsibilities outlined herein.',
        'No third party can enforce any of Mo Car\'s obligations under this agreement.'
      ]
    },
    {
      id: 'inspection',
      title: '11. PRE-RENTAL INSPECTION',
      content: [
        'Prior to vehicle pick-up, the customer must document any pre-existing damage.',
        'Photographs of the vehicle\'s condition at the start of rental must be taken and emailed to Mo Car for record.',
        'Failure to document pre-existing damage may result in the customer being held liable for any damage reported after the reservation.'
      ]
    }
  ],

  contact: {
    phone: '+91 98765 43210',
    email: 'info@rentalservice.in',
    address: 'Bhubaneswar, Odisha 751001, India',
    hours: '24/7 Service Available'
  },

  acknowledgment: 'By renting a vehicle from Mo Car, you acknowledge that you have read, understood, and agree to comply with all terms and conditions outlined in this agreement.',
  lastUpdated: 'October 2025'
};

 export const services = [
    {
      id: 'car',
      title: 'Rent A Car',
      description:
        'Booking a self-driving car with us is simple and easy. You can browse our selection of vehicles online, choose the car that best fits your needs, and book it for the duration of your choice. Our user-friendly platform allows you to manage your bookings and view your trip history with ease.',
      image: 'https://images.pexels.com/photos/8673535/pexels-photo-8673535.jpeg',
      route: '/allcars',
      features: ['LUXURY', 'COMFORT', 'PROTECTION']
    },
    {
      id: 'bike',
      title: 'Rent A Bike',
      description:
        'Booking a self-driving bike with us is simple and easy. You can browse our selection of vehicles online, choose the bike that best fits your needs, and book it for the duration of your choice. Our user-friendly platform allows you to manage your bookings and view your trip history with ease.',
      image: 'https://images.pexels.com/photos/17944591/pexels-photo-17944591.jpeg',
      route: '/allbikes',
      features: ['LUXURY', 'COMFORT', 'PROTECTION']
    }
  ];

  export  const reasons = [
    {
      id: 1,
      icon: "🚗",
      title: "Wide Fleet Selection",
      description: "Choose from a variety of well-maintained cars and bikes to suit your needs and budget"
    },
    {
      id: 2,
      icon: "💰",
      title: "Affordable Pricing",
      description: "Competitive rates with no hidden charges. Transparent pricing for every rental"
    },
    {
      id: 3,
      icon: "⚡",
      title: "Easy Booking",
      description: "Simple and quick booking process. Reserve your vehicle in just a few clicks"
    },
    {
      id: 4,
      icon: "🛡️",
      title: "Safe & Secure",
      description: "All vehicles are insured and regularly maintained for your safety and peace of mind"
    },
    {
      id: 5,
      icon: "🤝",
      title: "24/7 Customer Support",
      description: "Our dedicated team is always ready to help you at any time, day or night"
    },
    {
      id: 6,
      icon: "📍",
      title: "Multiple Locations",
      description: "Pick up and drop off at convenient locations across the city"
    }
  ];


export const faqs: FAQItem[] = [
    {
      question: "What documents do I need to rent?",
      answer:
        "You need a valid driver's license, government ID, and a credit/debit card.",
    },
    {
      question: "What is the minimum age to rent?",
      answer: "21 years for cars and 18 years for bikes.",
    },
    {
      question: "Are vehicles insured?",
      answer:
        "Yes, all vehicles come with basic insurance. Additional coverage is available.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and digital payments.",
    },
    {
      question: "What is your fuel policy?",
      answer:
        "Full-to-full policy. Return the vehicle with a full tank as you received it.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, free cancellation up to 24 hours before rental. After that, 50% charge applies.",
    },
    {
      question: "What if the vehicle breaks down?",
      answer:
        "Contact our 24/7 support immediately. We'll provide assistance or a replacement.",
    },
    {
      question: "Do I get a helmet with bike rentals?",
      answer: "Yes, complimentary helmets are provided with all bike rentals.",
    },
  ];
