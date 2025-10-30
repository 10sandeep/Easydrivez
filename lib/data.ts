export interface Car {
  id: number;
  name: string;
  type: string;
  image: string;
  price12: string;
  price24: string;
  features: string[];
}

export interface Bike {
  id: number;
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

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
  content: string;
}

// export const backgroundImages: string[] = [
//   "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&q=80",
//   "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80",
//   "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=80",
//   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
// ];

export const featuredCars: Car[] = [
  {
    id: 1,
    name: "BMW 5 Series",
    type: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    price12: "₹2,500",
    price24: "₹4,500",
    features: ["Automatic", "AC", "5 Seats"],
  },
  {
    id: 2,
    name: "Toyota Fortuner",
    type: "SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    price12: "₹2,000",
    price24: "₹3,500",
    features: ["Automatic", "AC", "7 Seats"],
  },
  {
    id: 3,
    name: "Honda City",
    type: "Sedan",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
    price12: "₹800",
    price24: "₹1,500",
    features: ["Manual", "AC", "5 Seats"],
  },
  {
    id: 4,
    name: "Maruti Swift",
    type: "Sedan",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    price12: "₹600",
    price24: "₹1,000",
    features: ["Manual", "AC", "5 Seats"],
  },
  {
    id: 5,
    name: "BMW 5 Series",
    type: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    price12: "₹2,500",
    price24: "₹4,500",
    features: ["Automatic", "AC", "5 Seats"],
  },
  {
    id: 6,
    name: "Toyota Fortuner",
    type: "SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    price12: "₹2,000",
    price24: "₹3,500",
    features: ["Automatic", "AC", "7 Seats"],
  },
  {
    id: 7,
    name: "Honda City",
    type: "Sedan",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
    price12: "₹800",
    price24: "₹1,500",
    features: ["Manual", "AC", "5 Seats"],
  },
  {
    id: 8,
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
    id: 1,
    name: "Harley Davidson",
    type: "Cruiser",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
    price12: "₹1,500",
    price24: "₹2,500",
    features: ["1200cc", "Cruiser", "Premium"],
  },
  {
    id: 2,
    name: "Kawasaki Ninja",
    type: "Sports",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    price12: "₹1,200",
    price24: "₹2,000",
    features: ["650cc", "Sports", "High Speed"],
  },
  {
    id: 3,
    name: "Royal Enfield",
    type: "Adventure",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80",
    price12: "₹500",
    price24: "₹900",
    features: ["350cc", "Adventure", "Classic"],
  },
  {
    id: 4,
    name: "Honda Activa",
    type: "Scooter",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80",
    price12: "₹300",
    price24: "₹500",
    features: ["110cc", "Scooter", "Economy"],
  },
  {
    id: 5,
    name: "Harley Davidson",
    type: "Cruiser",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80",
    price12: "₹1,500",
    price24: "₹2,500",
    features: ["1200cc", "Cruiser", "Premium"],
  },
  {
    id: 6,
    name: "Kawasaki Ninja",
    type: "Sports",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    price12: "₹1,200",
    price24: "₹2,000",
    features: ["650cc", "Sports", "High Speed"],
  },
  {
    id: 7,
    name: "Royal Enfield",
    type: "Adventure",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80",
    price12: "₹500",
    price24: "₹900",
    features: ["350cc", "Adventure", "Classic"],
  },
  {
    id: 8,
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

export const reasons = [
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



// Mock blog data
export const blogs: Blog[] = [
  {
    id: 1,
    title: "Explore Odisha with Eazydrivez: Your Ultimate Self-Drive Car Rental",
    excerpt: "A self-drive car from Eazydrivez is your ticket to exploring more than just the city. Plan your trip and take control of your travel!",
    author: "Eazydrivez Team",
    date: "Oct 29, 2025",
    category: "Travel",
    tags: ["Self Drive", "Odisha", "Car Rental"],
    image: "https://images.unsplash.com/photo-1709809996082-331327662f16?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1971",
    featured: true,
    content: `
      <p>A self-drive car from Eazydrivez is your ticket to exploring more than just the city. Plan your trip to discover the beautiful destinations across Odisha. For any journey—be it a short trip or a long-distance adventure—Eazydrivez has the right self-driving car for rent for you. Book your ride with us today and take control of your travel!</p>

      <p><strong>Eazydrivez: The Freedom to Drive, Your Way.</strong></p>

      <h2>Beaches & Coastlines</h2>

      <h3>Puri Beach</h3>
      <p>A popular spot with golden sands and clear waters, perfect for a relaxing day by the sea.</p>

      <h3>Chandrabhaga Beach</h3>
      <p>Known for its beautiful shorelines and connection to the Sun Temple, this beach offers stunning views and cultural significance.</p>

      <h3>Gopalpur-on-Sea</h3>
      <p>A charming beach with a calm ambiance and historical significance, ideal for those seeking tranquility.</p>

      <h3>Talasari Beach</h3>
      <p>Offers a serene and picturesque coastal experience away from the crowded tourist spots.</p>

      <h3>Chandipur Beach</h3>
      <p>Famous for its "vanishing" sandbanks, where the sea recedes up to 5 kilometers during low tide, creating a unique phenomenon.</p>

      <h2>Natural Attractions & Waterfalls</h2>

      <h3>Bhitarkanika National Park</h3>
      <p>A vast wildlife sanctuary with rich biodiversity, ideal for nature lovers who want to experience mangrove forests and spot crocodiles and migratory birds.</p>

      <h3>Chilika Lake</h3>
      <p>The largest coastal lagoon in India, known for its vastness and beauty. A paradise for bird watchers, especially during winter months.</p>

      <h3>Deojhar Waterfall</h3>
      <p>A scenic waterfall located in Cuttack's Narasinghpur region, perfect for a day trip with family and friends.</p>

      <h3>Barehipani Falls</h3>
      <p>One of the highest waterfalls in the country, featuring a multi-tiered cascade that offers breathtaking views.</p>

      <h3>Duduma Waterfalls</h3>
      <p>A picturesque location for nature and adventure enthusiasts, surrounded by lush greenery.</p>

      <h3>Gudguda Waterfall</h3>
      <p>A hidden getaway located amidst rocky terrains, offering a peaceful retreat.</p>

      <h3>Deras Dam</h3>
      <p>A serene picnic destination near Bhubaneswar, perfect for spending quality time with loved ones.</p>

      <h2>Historical & Cultural Sites</h2>

      <h3>Barabati Fort</h3>
      <p>An ancient fort in Cuttack offering historical insights into the region's rich past.</p>

      <h3>Sun Temple, Konark</h3>
      <p>A UNESCO World Heritage site, known for its architectural marvel. The temple is designed in the shape of a colossal chariot with intricately carved stone wheels.</p>

      <h3>Nandankanan Zoological Park</h3>
      <p>A well-known zoo with a white tiger safari, botanical garden, and diverse wildlife species.</p>

      <h3>Khandagiri Caves</h3>
      <p>Ancient caves with significant historical and spiritual importance, featuring Jain sculptures and inscriptions.</p>

      <h2>Lakes, Dams & Hills</h2>

      <h3>Hirakud Dam</h3>
      <p>A large dam and a popular picnic spot, one of the longest earthen dams in the world.</p>

      <h3>Rengali Dam</h3>
      <p>A picturesque reservoir known for its picnic facilities and beautiful surroundings.</p>

      <h3>Barunei Hill</h3>
      <p>A popular spot with a temple at the top, offering panoramic views of the surrounding landscape.</p>

      <h3>Olasuni Hill</h3>
      <p>A hill in Cuttack known for its natural beauty and historical significance.</p>

      <h2>Other Notable Spots</h2>

      <h3>Daringbadi</h3>
      <p>Known as the "Kashmir of Odisha" for its beautiful landscapes and pleasant climate. A perfect hill station getaway.</p>

      <h3>Raghurajpur Artist Village</h3>
      <p>A vibrant village celebrating Pattachitra paintings, where you can witness traditional art forms and interact with local artists.</p>

      <h2>Why Eazydrivez Car Rental is Your Best Choice for 24-Hour Rental?</h2>

      <p>When it comes to 24-hour car rental in Bhubaneswar, Eazydrivez Car Rental is the best for many reasons:</p>

      <h3>Customer Satisfaction</h3>
      <p>Eazydrivez Car Rental has a strong reputation for customer satisfaction. Our team goes the extra mile to ensure a hassle-free experience.</p>

      <h3>Self Drive</h3>
      <p>For those who want complete control over their trip, Eazydrivez Car Rental offers self-drive options. No chauffeur and no schedules, just you and the open road.</p>

      <h3>Reliability</h3>
      <p>Our vehicles are well-maintained and fully sanitized to ensure your safety and comfort. With Eazydrivez Car Rental you can rely on a car that will perform well throughout your journey.</p>

      <h3>Variety of Cars</h3>
      <p>We have all the options from budget-friendly options like Swift ZXI and Ignis to luxurious options like KIA Carens and Mahindra Thar.</p>

      <h2>Conclusion</h2>

      <p>Briefly put, 24-hour car rental in Bhubaneswar is the best combination of flexibility, convenience, and affordability for business travelers, tourists, or anyone who needs a car for a day. Eazydrivez Car Rental is your one-stop solution for all your travel needs, with multiple options, transparent pricing, and customer-first service.</p>

      <p>So whether you are heading for a meeting, a weekend road trip, or just want to explore the city, book your 24-hour car rental in Bhubaneswar with Eazydrivez and have a stress-free trip.</p>
    `
  },
  {
    id: 2,
    title: "Driving Rules in Bhubaneswar – What You Need to Know",
    excerpt: "Understanding the traffic laws in Bhubaneswar is a must for all drivers whether you are behind the wheel of a car or a two-wheeler.",
    author: "Rideez Team",
    date: "Sep 18, 2025",
    category: "Safety",
    tags: ["Driving Rules", "Safety", "Bhubaneswar"],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
    content: `
      <h2>Basic Traffic Laws</h2>
      
      <p>Understanding the traffic laws in Bhubaneswar is a must for all drivers whether you are behind the wheel of a car or a two-wheeler. These regulations not only ensure safety but also reduce the number of accidents. Here are some of the basic rules you should be aware of:</p>
      
      <h3>Speed Limits</h3>
      
      <p>Adhering to the speed limit is mandatory. For Light Motor Vehicles (LMVs) exceeding speed limit can result in a fine of ₹2,000 for the first time and subsequent offenses. For Heavy Motor Vehicles (HMVs) the fine is ₹4,000.</p>
      
      <h3>Seat Belts</h3>
      
      <p>All passengers in a four-wheeler must wear seat belts. Not adhering to this rule will result in a fine of ₹1,000. Also, ensure that children below 14 years are properly seated in the back seat and are using child safety seats when applicable.</p>
      
      <h3>Mobile Phone Use</h3>
      
      <p>Using a mobile phone while driving is strictly prohibited and can result in a fine of ₹5,000 for the first time and ₹10,000 for subsequent offences.</p>
      
      <h3>Driving Under the Influence</h3>
      
      <p>Driving under the influence of alcohol or any intoxicating substance is a serious offence in Bhubaneswar. It can result in heavy fines which increase for repeat offenders.</p>
      
      <p>₹10,000 for the first time.</p>
      <p>₹15,000 for subsequent offences.</p>
      
      <p>If caught driving under the influence you may also face suspension of your driving license, legal actions or even jail time in extreme cases.</p>
      
      <h3>Documentation</h3>
      
      <p>As a driver always carry the necessary documents:</p>
      
      <p>Driving License</p>
      <p>Vehicle Registration Certificate</p>
      <p>Insurance Documents</p>
      <p>Pollution Under Control (PUC) Certificate</p>
      
      <p>Failure to produce these documents when asked can result in fines. Driving without a valid driving license will cost you ₹5,000 and not producing the insurance policy can result in a fine of ₹2,000 to ₹4,000.</p>
      
      <h2>Navigating Through Bhubaneswar</h2>
      
      <p>Bhubaneswar's road network is well developed but like any growing city, it has its share of traffic issues. Here are some tips to help you navigate:</p>
      
      <h3>Peak Hours and Congested Areas</h3>
      
      <p>Traffic congestion is common during peak hours, typically between 9 AM to 11 AM and 5 PM to 8 PM. During these hours Janpath, Cuttack Road, Rasulgarh and Kharavel Nagar are the major roads that get jammed. If possible avoid these routes during peak hours.</p>
      
      <h3>Parking Rules</h3>
      
      <p>Bhubaneswar Municipal Corporation (BMC) has designated parking zones. Parking in no-parking zones is strictly prohibited and will attract a fine. In 2015, the Commissionerate Police identified 20 no-parking zones in Bhubaneswar and the fine is ₹500.</p>
      
      <h3>Road Signs</h3>
      
      <p>Be aware of speed limits, one-way streets and no entry zones. These signs are very important for safe driving and to follow traffic rules. Ignoring road signs can lead to fines and also put your life and other road users in danger.</p>
      
      <h2>Specific Regulations to Know</h2>
      
      <p>Bhubaneswar has some special rules that you should know:</p>
      
      <h3>Festival Restrictions</h3>
      
      <p>During big festivals like Durga Puja and Bali Yatra, the city imposes specific traffic restrictions to manage the crowd. These may include road closure, diversion and designated parking. For example during Bali Yatra traffic restrictions are imposed from 2 PM to the time the crowd disperses to ensure public safety.</p>
      
      <h3>Vending Zones</h3>
      
      <p>The city has designated vending zones for street vendors to enhance aesthetics and traffic flow. These zones are part of Bhubaneswar Municipal Corporation's effort to integrate street vendors into the urban landscape. Parking or driving in these zones is restricted to avoid obstruction and to ensure the safety of pedestrians and vendors.</p>
      
      <h2>Safety Tips for Drivers</h2>
      
      <p>Road safety is everyone's responsibility. Here are some tips for drivers in Bhubaneswar:</p>
      
      <p>Don't Overtake in restricted Zones: Overtaking in no-overtaking zones is prohibited and the fine is ₹5,000 for first time offenders.</p>
      
      <p>Emergency: In case of breakdown move your vehicle to the side of the road and use hazard lights. For accidents, contact local authorities and wait for help.</p>
      
      <p>Maintain Safe Distance: Keep a reasonable distance from the vehicle ahead, especially in congested areas.</p>
      
      <p>Use Indicators: Always signal your intention whether you are turning or changing lanes to inform other drivers and pedestrians.</p>
      
      <p>Avoid Distractions: Don't use mobile or engage in any activity that takes your attention away from driving.</p>
      
      <p>Follow Lane Discipline: Stick to your lane and don't make sudden lane changes, especially in heavy traffic.</p>
      
      <h2>Conclusion</h2>
      
      <p>Understanding and complying with Bhubaneswar's rules and regulations to have a safe and pleasant journey. Follow traffic rules, know the no-parking zones and practice defensive driving to contribute towards the city's road safety and your journey will be enjoyable.</p>
      
      <p>For those looking for reliable and flexible self-drive car rental options, be it luxury car rentals or the usual hatchbacks, Rideez Car Rental has a diverse fleet to fit your requirements and have a comfortable and stress-free journey to Temple City.</p> `
  },
  {
  id: 3,
  title: "Looking for a Weekend Escape from Bhubaneswar?",
  excerpt: "Discover 5 must-do road trips from Bhubaneswar that are perfect for a weekend escape with self-drive car or bike rental.",
  author: "Eazydrivez Team",
  date: "Aug 15, 2018",
  category: "Travel",
  tags: ["Road Trips", "Weekend Getaway", "Bhubaneswar", "Self Drive"],
  image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
  content: `
    <h2>Introduction</h2>
    
    <p>Bhubaneswar, the "Temple City of India," is a fantastic hub for exploration. But the real magic of Odisha lies just a few hours' drive away, in its ancient temples, serene beaches, and lush green landscapes.</p>
    
    <p>Tired of expensive cabs and rigid tour schedules? With a best self-drive car or bike rental from Eazydrivez, you have the freedom to craft your own adventure. No deadlines, no strangers, just you, the open road, and the beauty of Odisha.</p>
    
    <p>Here are 5 must-do road trips from Bhubaneswar that are perfect for a weekend escape, all easily accessible with our affordable rentals.</p>
    
    <h2>1. The Golden Triangle: Puri-Konark-Bhubaneswar</h2>
    
    <p>This is the most famous tourist circuit in Odisha for a reason. It's a perfect blend of culture, history, and natural beauty.</p>
    
    <h3>The Route</h3>
    
    <p>Start from Bhubaneswar, head to Puri (around 60 km) to visit the majestic Jagannath Temple, and then take the scenic Marine Drive to Konark (about 35 km) to see the breathtaking Sun Temple.</p>
    
    <h3>Why Eazydrivez is Perfect</h3>
    
    <p>The Puri-Konark Marine Drive is a driver's paradise. Renting a car from us lets you stop for photos, a quick snack, or a moment to enjoy the sea breeze along this picturesque coastal road.</p>
    
    <h2>2. The Serene Escape: Chilika Lake</h2>
    
    <p>Asia's largest brackish water lagoon is a paradise for nature lovers and birdwatchers.</p>
    
    <h3>The Route</h3>
    
    <p>Drive south from Bhubaneswar for about 100 km to reach Barkul or Satapada.</p>
    
    <h3>Why Eazydrivez is Perfect</h3>
    
    <p>The drive is smooth and beautiful. Once you arrive, a self-drive car allows you to easily explore the different entry points and jetties around the lake to find the perfect spot for dolphin watching or a boat ride.</p>
    
    <h2>3. The Hidden Gem: Daringbadi</h2>
    
    <p>Known as the "Kashmir of Odisha," Daringbadi is a cool, misty hill station with coffee plantations and pine forests.</p>
    
    <h3>The Route</h3>
    
    <p>This is a longer but incredibly rewarding road trip, about 250 km from Bhubaneswar.</p>
    
    <h3>Why Eazydrivez is Perfect</h3>
    
    <p>This road trip is all about the journey. Our well-maintained cars are perfect for the winding, forested roads, allowing you to enjoy the cool weather and stunning scenery at your own pace.</p>
    
    <h2>4. The Coastal Retreat: Gopalpur-on-Sea</h2>
    
    <p>For a relaxing beach holiday away from the crowds, head to the tranquil town of Gopalpur.</p>
    
    <h3>The Route</h3>
    
    <p>A scenic 170 km drive south from Bhubaneswar.</p>
    
    <h3>Why Eazydrivez is Perfect</h3>
    
    <p>Your own vehicle gives you the flexibility to visit other nearby attractions like the beautiful lighthouse and the famous Chilika Lake on the way.</p>
    
    <h2>5. The Cultural Ride: Pipli & Raghurajpur</h2>
    
    <p>For art enthusiasts and cultural explorers, this route offers a glimpse into Odisha's vibrant handicraft traditions.</p>
    
    <h3>The Route</h3>
    
    <p>A short and sweet trip just 30-40 km from Bhubaneswar.</p>
    
    <h3>Why Eazydrivez is Perfect</h3>
    
    <p>A bike from Eazydrivez is the ideal way to navigate the smaller roads and charming lanes of these artisan villages, giving you a truly immersive and personal experience.</p>
    
    <h2>Book Your Adventure</h2>
    
    <p>With Eazydrivez, your next unforgettable adventure in Odisha is just a ride away. Stop planning and start driving!</p>
    
    <p>For the best self-drive car and bike rental experience in Bhubaneswar, choose Eazydrivez. Affordable rates, well-maintained vehicles, and complete freedom to explore Odisha at your own pace.</p>
  `
},
{
  id: 4,
  title: "The Ultimate Guide to the Best Road Trips from Bhubaneswar for Every Kind of Traveler",
  excerpt: "Discover the heart and soul of Odisha with our comprehensive guide to road trips from Bhubaneswar, tailored for every type of traveler.",
  author: "Eazydrivez Team",
  date: "Aug 15, 2018",
  category: "Motobike",
  tags: ["Road Trips", "Travel Guide", "Bhubaneswar", "Adventure"],
  image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
  content: `
    <h2>Introduction</h2>
    
    <p>There's no better way to discover the heart and soul of Odisha than by hitting the open road. As your journey begins in Bhubaneswar, the "Temple City," you're perfectly positioned to explore the state's diverse landscapes—from its sacred temples to its serene beaches and lush hills.</p>
    
    <p>At Eazydrivez, we believe the best adventures are the ones you create yourself. That's why we've put together this guide to the best road trips from Bhubaneswar, catering to every type of traveler.</p>
    
    <h2>For the Spiritual & Coastal Soul: The Puri-Konark Circuit</h2>
    
    <p><strong>Best for:</strong> First-time visitors, families, and culture enthusiasts.</p>
    
    <p><strong>Ideal Vehicle:</strong> A comfortable car for the family or a reliable bike for a solo rider.</p>
    
    <h3>The Route</h3>
    
    <p><strong>Bhubaneswar to Puri (Approx. 60 km):</strong> A smooth drive on NH-316 brings you to the holy city of Puri. Visit the world-famous Jagannath Temple, and spend time strolling along the Golden Beach.</p>
    
    <p><strong>Puri to Konark (Approx. 35 km):</strong> The Puri-Konark Marine Drive is the highlight of this trip. This scenic road with the Bay of Bengal on one side is an experience in itself. Stop at Chandrabhaga Beach before reaching the UNESCO World Heritage Site of Konark Sun Temple.</p>
    
    <h3>Why Eazydrivez?</h3>
    
    <p>Our well-maintained cars provide a comfortable ride, and our bikes are perfect for navigating local traffic and stopping at every scenic viewpoint on the Marine Drive.</p>
    
    <h2>For the Nature & Wildlife Lover: A Trip to Chilika Lake</h2>
    
    <p><strong>Best for:</strong> Birdwatchers, photographers, and those seeking a peaceful escape.</p>
    
    <p><strong>Ideal Vehicle:</strong> A fuel-efficient car for a smooth and uninterrupted journey.</p>
    
    <h3>The Route</h3>
    
    <p>Head south from Bhubaneswar for about 100 km to reach the shores of Chilika Lake at Barkul or Satapada.</p>
    
    <h3>Highlights</h3>
    
    <p><strong>Nalbana Bird Sanctuary:</strong> During the winter, this place is a temporary home to thousands of migratory birds.</p>
    
    <p><strong>Dolphin Spotting:</strong> Take a boat ride to catch a glimpse of the playful Irrawaddy dolphins.</p>
    
    <h3>Why Eazydrivez?</h3>
    
    <p>With a rental from us, you're not tied to tour bus schedules. You can arrive early to beat the crowds and enjoy the tranquil beauty of the lake at your own pace.</p>
    
    <h2>For the Offbeat Explorer: The Hills of Daringbadi</h2>
    
    <p><strong>Best for:</strong> Adventure seekers, trekkers, and people who love cool weather.</p>
    
    <p><strong>Ideal Vehicle:</strong> A car with good ground clearance, or a powerful bike for the winding mountain roads.</p>
    
    <h3> <strong>The Route</strong></h3>
    
    <p>This is a longer but very rewarding trip, approximately 250 km from Bhubaneswar, leading you to the "Kashmir of Odisha."</p>
    
    <h3><strong>Highlights</strong></h3>
    
    <p>Enjoy the lush green valleys, sprawling coffee plantations, and the cool, misty climate.</p>
    
    <h3> <strong>Why Eazydrivez?</strong></h3>
    
    <p>Our diverse fleet ensures you have the right vehicle for this terrain, giving you the confidence to explore this beautiful hill station and its waterfalls.</p>
    
    <h2>  <strong>For a Quick City Break:</strong> Cuttack & Dhauli Shanti Stupa</h2>
    
    <p><strong>Best for:</strong> Short trips, history buffs, and those with a few hours to spare.</p>
    
    <p><strong>Ideal Vehicle:</strong> A nimble bike or a compact car for easy city navigation.</p>
    
    <h3>The Route</h3>
    
    <p><strong>Bhubaneswar to Cuttack (Approx. 30 km):</strong> Drive to the "Silver City" of Cuttack. Explore the ancient Barabati Fort and visit the Odisha State Maritime Museum.</p>
    
    <p><strong>Dhauli Shanti Stupa:</strong> On your way back, stop at the Dhauli hills to visit the stunning white peace pagoda, offering a panoramic view of the city.</p>
    
    <h3>Why Eazydrivez?</h3>
    
    <p>Our easy-to-rent bikes and cars are perfect for spontaneous trips. Just book and go, whether it's for a few hours or a whole day.</p>
  `
}
];