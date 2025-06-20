import { Toy, CreateToyRequest, UpdateToyRequest } from '../types/toy';

// In-memory toy data storage
let toysData: Toy[] = [
  {
    id: 1,
    name: 'LEGO Classic Creative Building Box',
    description: 'Contains 484 pieces, suitable for ages 4-99, sparks unlimited creativity',
    detailDescription: 'This LEGO Classic Creative Building Box is the perfect choice for fostering imagination and creativity. Contains 484 high-quality building blocks in classic bright colors like red, yellow, blue, and green. Suitable for ages 4-99, can build houses, vehicles, animals and various shapes. Blocks are made from eco-friendly ABS material, safe and non-toxic, with rounded corners that won\'t hurt hands. Comes with detailed building instructions while encouraging free creation.',
    price: 299.99,
    toyTypeId: 1
  },
  {
    id: 2,
    name: '1000-Piece Puzzle - World Famous Paintings',
    description: 'High-quality paper puzzle, can be framed for decoration when completed',
    detailDescription: '1000-piece puzzle featuring world-famous paintings, made from high-quality thick cardboard with excellent color reproduction. Each piece is precision-cut for tight, seamless fitting. Completed size is 70×50cm, perfect for framing as artwork when finished. The puzzle process effectively exercises observation, patience and concentration, making it an excellent choice for relaxation. Package includes reference image and puzzle solving tips.',
    price: 89.99,
    toyTypeId: 1
  },
  {
    id: 3,
    name: 'Remote Control 4WD Off-Road Vehicle',
    description: '1:14 scale, waterproof design, top speed 25km/h',
    detailDescription: 'Professional remote control 4WD off-road vehicle with realistic 1:14 scale design. Equipped with powerful brushless motor, top speed reaches 25km/h. Vehicle features waterproof design, can drive in rain or through puddles. Four-wheel independent suspension system easily handles various complex terrains. 2.4GHz remote controller with 100-meter control range, supports multiple simultaneous operation without interference. Battery life 25 minutes, charging time 2 hours.',
    price: 459.99,
    toyTypeId: 2
  },
  {
    id: 4,
    name: 'Aerial Photography Drone',
    description: '4K HD camera, 30-minute battery life, suitable for beginners',
    detailDescription: 'Entry-level aerial photography drone equipped with 4K ultra-high-definition camera, supports real-time image transmission and recording. Features GPS positioning system with one-key return, fixed-point hovering and other intelligent functions. 30-minute super long battery life meets various shooting needs. Lightweight and portable body, folds to palm size. Equipped with intelligent obstacle avoidance system for greatly improved safety. Simple operation, suitable for beginners.',
    price: 899.99,
    toyTypeId: 2
  },
  {
    id: 5,
    name: 'Children\'s Scooter',
    description: 'Three-wheel design, LED wheels, suitable for ages 3-8',
    detailDescription: 'Safety scooter designed specifically for children ages 3-8, featuring a stable two-front-one-rear three-wheel structure. Wheels have built-in LED lights that automatically illuminate when riding, adding fun and nighttime safety. Handle height adjustable in three levels (65-85cm), grows with the child. Deck features anti-slip design, wide and comfortable. Body made from high-quality aluminum alloy, lightweight yet durable. Equipped with rear wheel brake system for safety. Weight capacity up to 50kg.',
    price: 189.99,
    toyTypeId: 3
  },
  {
    id: 6,
    name: 'Outdoor Swing Set',
    description: 'Weight capacity 100kg, safety rope, suitable for garden installation',
    detailDescription: 'Professional outdoor swing set with high-quality oak seat, smooth and splinter-free surface. Equipped with high-strength nylon rope that has passed strict safety testing, weight capacity up to 100kg. Rope length adjustable (1.5-2.5 meters), suitable for different installation heights. Seat design follows ergonomic principles, comfortable and safe. Easy installation with detailed instructions and installation tools included. Suitable for gardens, parks and other outdoor environments.',
    price: 329.99,
    toyTypeId: 3
  },
  {
    id: 7,
    name: 'Plush Teddy Bear',
    description: 'Ultra-soft material, 35cm height, suitable for all ages',
    detailDescription: 'Classic teddy bear plush toy made from premium ultra-soft short pile fur with delicate, warm texture. Internal filling of high-quality PP cotton, full and elastic with comfortable hugging feel. Perfect 35cm size, suitable for hugging and carrying. Facial features use embroidery craftsmanship with no risk of detachment. Passes international toy safety standards, suitable for all ages. Classic brown design, the best companion for growing up. Machine washable for easy daily care.',
    price: 79.99,
    toyTypeId: 4
  },
  {
    id: 8,
    name: 'Barbie Doll Set',
    description: 'Includes doll and accessories, changeable outfits, fosters imagination',
    detailDescription: 'Fashion Barbie doll set includes one 29cm tall Barbie doll and rich accessories. Comes with 5 different style outfits (casual, formal, evening gown, sportswear, pajamas), 10 pairs of exquisite shoes, and various jewelry accessories. Doll joints are movable, supporting multiple poses for photography. Hair can be styled and arranged, fostering children\'s aesthetic sense and creativity. All accessories made from eco-friendly materials, safe and non-toxic. Perfect choice for role-playing and imagination games.',
    price: 129.99,
    toyTypeId: 4
  },  // toyTypeId: 1
  {
    id: 9,
    name: 'Magnetic Building Tiles Set',
    description: '120 magnetic tiles, develop spatial imagination',
    detailDescription: 'Innovative magnetic building tiles set with 120 different shaped magnetic blocks. Features strong neodymium iron boron magnets for powerful attraction and stable connections. Includes squares, triangles, semicircles and other geometric shapes to help children learn geometry. Rich colors including red, blue, green, yellow and 4 other colors. Can build castles, cars, animals and other 3D structures, fully exercising spatial imagination and creativity. Rounded corners, safe and harmless.',
    price: 159.99,
    toyTypeId: 1
  },
  {
    id: 10,
    name: 'Colorful Wooden Puzzle',
    description: 'Eco-friendly wood, safe and non-toxic, suitable for toddlers',
    detailDescription: 'Children\'s puzzle made from premium beech wood with smooth, splinter-free surface and rounded safe corners. Uses eco-friendly water-based paint coating, non-toxic and odorless, meets children\'s toy safety standards. Rich puzzle designs including animals, plants, vehicles and other themes. Bright colors help develop color recognition abilities. Puzzle pieces sized for small hands to grasp, exercising hand-eye coordination. Each set includes 6 puzzles of different difficulty levels for progressive learning.',
    price: 49.99,
    toyTypeId: 1
  },
  {
    id: 11,
    name: 'Number Recognition Building Blocks',
    description: 'Help children learn numbers and colors',
    detailDescription: 'Number recognition blocks designed for preschoolers, containing 2 sets each of numbers 0-9, totaling 20 blocks. Each number uses a different color to help establish number-color correspondence. Block surfaces feature corresponding quantity patterns for intuitive number understanding. Made from eco-friendly solid wood with warm texture, safe and durable. Can play number sequencing, simple addition and subtraction games for math enlightenment. Includes learning guide manual for scientific early education.',
    price: 39.99,
    toyTypeId: 1
  },
  {
    id: 12,
    name: 'Animal Building Block Set',
    description: 'Various animal shapes, spark creativity',
    detailDescription: 'Colorful animal-themed building blocks with 20 different animal assembly models. Each animal consists of 6-15 blocks with moderate difficulty. Ingenious block design creates lifelike animal images when assembled. Includes land animals (lions, elephants, giraffes), marine animals (whales, dolphins, octopus) and flying animals (eagles, butterflies, bees). Through assembly process, children learn about animals while developing observation and hands-on skills.',
    price: 69.99,
    toyTypeId: 1
  },
  {
    id: 13,
    name: 'Transportation Vehicle Puzzles',
    description: 'Learn about various vehicles, enhance cognition',
    detailDescription: 'Professionally designed transportation-themed puzzle set with 12 different vehicle puzzles. Covers land, sea and air transportation: cars, trains, ships, airplanes, bicycles, motorcycles, etc. Each puzzle consists of 12-20 pieces, suitable for children ages 3-6. After completing puzzles, children can learn about different vehicles\' characteristics and uses. Made from thick cardboard, resistant to deformation and reusable. Includes transportation knowledge booklet for educational fun.',
    price: 59.99,
    toyTypeId: 1
  },
  {
    id: 14,
    name: '3D Maze Ball',
    description: 'Exercise hand-eye coordination',
    detailDescription: 'Innovative 3D maze ball design with 100 levels of 3D maze inside a 15cm diameter transparent sphere. Control steel ball along tracks by rotating the sphere, avoiding obstacles to reach the finish. Clever maze design with increasing difficulty from simple to complex, constantly upgrading challenges. Effectively exercises hand-eye coordination, spatial perception and concentration. Sphere made from high-strength transparent material, safe and drop-resistant. Suitable for children 8+ and adults, excellent choice for educational entertainment.',
    price: 89.99,
    toyTypeId: 1
  },  // toyTypeId: 2
  {
    id: 15,
    name: 'Remote Control Tank',
    description: 'Realistic design, 360-degree rotation',
    detailDescription: '1:24 scale realistic military tank with authentic detailed appearance, featuring rotatable turret and elevating cannon. Uses track-based movement system suitable for various terrains. 2.4GHz remote control system with 50-meter control range, supports forward, backward, left turn, right turn, turret rotation and other actions. Built-in LED lights and sound effects system for enhanced realism. Sturdy engineering plastic shell, impact-resistant and durable. Battery life 20 minutes.',
    price: 299.99,
    toyTypeId: 2
  },
  {
    id: 16,
    name: 'Remote Control Helicopter',
    description: 'Lightweight body, easy to control',
    detailDescription: 'Entry-level remote control helicopter with 25cm body length and lightweight design for easy control. Equipped with gyroscope stabilization system for smoother flight, suitable for beginners. 2.4GHz remote controller with 30-meter operating distance, supports basic flight actions: ascent, descent, forward, backward, left and right turns. Built-in rechargeable battery with 8-10 minute flight time, 45-minute charging time. Body made from crash-resistant material with spare propellers included.',
    price: 199.99,
    toyTypeId: 2
  },
  {
    id: 17,
    name: 'Remote Control Speedboat',
    description: 'High-speed sailing, suitable for water entertainment',
    detailDescription: 'High-performance remote control speedboat with 35cm streamlined hull design to reduce water resistance. Equipped with powerful water-cooled motor, top speed reaches 15km/h. IPX6 waterproof rating, suitable for use in swimming pools, lakes and other water areas. 2.4GHz remote control system with 60-meter control range, supports forward, backward, left and right steering. Features automatic righting function, can automatically recover even if capsized. Battery life 25 minutes with low voltage protection.',
    price: 249.99,
    toyTypeId: 2
  },
  {
    id: 18,
    name: 'Remote Control Robot',
    description: 'Programmable, interactive entertainment',
    detailDescription: 'Intelligent remote control robot, 30cm height with humanoid appearance design. Supports voice control and smartphone app programming, can learn simple commands and movements. Equipped with LED expression display showing different emotions. Features walking, dancing, storytelling, singing and other functions. Built-in sensors for obstacle avoidance and tracking, can engage in simple conversations. Rechargeable lithium battery with 2-hour runtime. Suitable for children 8+, educational and entertaining.',
    price: 399.99,
    toyTypeId: 2
  },
  {
    id: 19,
    name: 'Remote Control Dinosaur',
    description: 'Realistic movements, sound and light effects',
    detailDescription: 'Lifelike remote control T-Rex, 40cm length with realistic skin texture design. Features authentic movements: walking, roaring, tail wagging, mouth opening, with LED eye light effects. Built-in various dinosaur sounds and background sound effects for enhanced immersion. Infrared remote control system with 20-meter control range, simple operation. Can perform demonstration mode for automatic shows. Safe non-toxic materials, suitable for children 3+. Battery life 30 minutes, helps children learn about dinosaurs.',
    price: 179.99,
    toyTypeId: 2
  },
  {
    id: 20,
    name: 'Remote Control Racing Car',
    description: 'High-speed drifting, crash-resistant design',
    detailDescription: 'Professional remote control drift racing car in 1:18 scale with sports car appearance. Equipped with high-performance motor, top speed 20km/h, supports 360-degree drifting. Four-wheel independent shock absorption system adapts to various road surfaces. 2.4GHz remote controller with precise control and sensitive response, 80-meter control range. Body made from high-strength ABS material with impact-resistant design. Features front and rear LED lights for cool nighttime driving. Battery life 30 minutes, charging time 90 minutes.',
    price: 159.99,
    toyTypeId: 2
  },  // toyTypeId: 3
  {
    id: 21,
    name: 'Children\'s Basketball Hoop',
    description: 'Adjustable height, suitable for indoor and outdoor use',
    detailDescription: 'Professional children\'s basketball hoop set with adjustable rim height from 1.2-2.1 meters, suitable for different age groups. Made from high-quality PE material with water-fillable base for stability. Includes standard-size children\'s basketball and air pump. Rim made from solid steel with all-weather durable net. Foldable design for easy storage and transport. Suitable for indoor and outdoor use, helps children exercise body coordination and shooting skills. Safe and reliable weight-bearing design.',
    price: 129.99,
    toyTypeId: 3
  },
  {
    id: 22,
    name: 'Children\'s Tent',
    description: 'Foldable, suitable for outdoor camping',
    detailDescription: 'Multi-functional children\'s play tent, 120×120×135cm size with spacious and comfortable interior. Made from high-quality polyester fabric, waterproof and moisture-resistant, suitable for outdoor use. Frame uses high-strength fiberglass poles, lightweight yet sturdy. Tent features two windows and one door with good ventilation and external visibility. Quick setup design, can be assembled in 5 minutes. Includes storage bag for easy carrying. Suitable for gardens, beaches, parks and other outdoor locations, can also be used as indoor playhouse.',
    price: 99.99,
    toyTypeId: 3
  },
  {
    id: 23,
    name: 'Beach Toy Set',
    description: 'Various tools, suitable for beach games',
    detailDescription: 'Complete beach toy set with 12 different tools: large and small buckets, 2 shovels, 1 rake, 1 sieve, 4 castle molds, 2 car molds. All tools made from high-quality ABS plastic with rounded safe edges and bright fade-resistant colors. Shovel handles designed for children\'s grip, comfortable to use. Castle molds beautifully designed for creating different shaped sand sculptures. Includes mesh storage bag for easy cleaning and carrying. Suitable for beaches, sandboxes, parks and other locations.',
    price: 49.99,
    toyTypeId: 3
  },
  {
    id: 24,
    name: 'Children\'s Frisbee',
    description: 'Soft material, safe and easy to throw',
    detailDescription: 'Children\'s safety frisbee designed specifically for kids, 23cm diameter made from soft TPU material that won\'t cause injury even on impact. Weighs only 85 grams, suitable for children to throw and catch. Surface features anti-slip texture for enhanced grip and flight stability. Bright rainbow color design, easy to track in the air. Flight distance up to 20 meters, suitable for use in parks, beaches, lawns and other open spaces. Helps exercise hand-eye coordination and reaction speed, enhances parent-child interaction.',
    price: 19.99,
    toyTypeId: 3
  },
  {
    id: 25,
    name: 'Children\'s Jump Rope',
    description: 'Anti-slip handles, adjustable length',
    detailDescription: 'Professional children\'s jump rope with adjustable length from 2-3 meters, suitable for children of different heights. Handles made from anti-slip rubber material for comfortable grip without slipping. Rope body made from high-quality PVC material, wear-resistant with smooth rotation. Handles feature internal bearing design for smoother jumping. Includes jump counter to record jump count, adding fun to exercise. Bright color combination stimulates children\'s interest in sports. Excellent exercise equipment for cardiopulmonary function and body coordination.',
    price: 15.99,
    toyTypeId: 3
  },
  {
    id: 26,
    name: 'Children\'s Soccer Ball',
    description: 'Lightweight material, suitable for beginners',
    detailDescription: 'Size 3 soccer ball designed for children, 58-60cm circumference, weighs only 280 grams, suitable for children ages 3-8. Made from high-quality PVC material with soft surface for comfortable foot feel when kicking. Classic black and white design following traditional soccer appearance. Valve made from butyl rubber with good sealing and long air retention. Ball surface features cartoon patterns for added fun. Suitable for use on grass, artificial turf and other soft surfaces, helps children learn basic soccer skills and develop teamwork spirit.',
    price: 29.99,
    toyTypeId: 3
  },  // toyTypeId: 4
  {
    id: 27,
    name: 'Plush Bunny',
    description: 'Soft and cute, suitable for bedtime companionship',
    detailDescription: 'Super cute plush bunny, 25cm height made from premium ultra-soft short pile fur with silk-smooth texture. Internal filling of high-quality PP cotton, full and elastic with excellent hugging feel. Adorable bunny design with especially endearing long ears. Eyes made from safe plastic material, secure attachment. Pink and white color scheme, warm and romantic. Suitable as sleep companion, providing children with sense of security. Passes strict safety testing, machine washable, easy to clean and maintain.',
    price: 59.99,
    toyTypeId: 4
  },
  {
    id: 28,
    name: 'Plush Puppy',
    description: 'Realistic design, delicate texture',
    detailDescription: 'Realistic plush puppy toy made in 1:2 scale of real Labrador, 30cm length. Uses realistic fur technology with texture close to real dog hair. Bright expressive eyes, nose made from safe rubber material. Movable limbs support various pose arrangements. Internal skeleton design allows sitting posture. Natural fur color with realistic brown gradient effect. Ideal companion for fostering children\'s love and responsibility, also suitable for adult collection.',
    price: 69.99,
    toyTypeId: 4
  },
  {
    id: 29,
    name: 'Plush Unicorn',
    description: 'Magical design, bright colors',
    detailDescription: 'Magical unicorn plush toy, 28cm height with rainbow gradient design. Horn made from safe soft gel with pearl finish effect. Mane crafted with special technique, soft and flowing with excellent texture. Wings can gently sway, adding interactivity. Body features snow-white ultra-soft fur with starry decorations adding magical feel. Little girls\' favorite, sparks imagination and appreciation for beautiful things. Meets international toy safety standards.',
    price: 89.99,
    toyTypeId: 4
  },
  {
    id: 30,
    name: 'Plush Panda',
    description: 'Adorably cute, suitable for collection',
    detailDescription: 'Adorable panda plush toy strictly scaled down from real pandas, 22cm height. Classic black and white coloring with eye rings, ears, and limbs in deep black fur, body in snow white. Soft fine fur quality that doesn\'t shed. Endearingly cute expression that\'s irresistible. Internal eco-friendly PP cotton filling, bouncy texture. Suitable for all ages, both children\'s companion and adult stress reliever. Chinese national treasure image with special cultural significance and collectible value.',
    price: 79.99,
    toyTypeId: 4
  },
  {
    id: 31,
    name: 'Princess Doll',
    description: 'Multiple outfits, rich accessories',
    detailDescription: 'Exquisite princess doll set with 32cm tall doll made from eco-friendly PVC material. Hair can be styled and arranged, supports braiding, ponytails and other hairstyles. Delicate facial makeup with bright expressive eyes. Includes 5 different themed outfits: evening gown, casual wear, dance costume, pajamas, party dress. Comes with 20+ exquisite accessories: shoes, bags, jewelry, hair accessories, etc. Movable doll joints support various poses. Perfect prop for role-playing games, fostering girls\' fashion sense and creativity.',
    price: 139.99,
    toyTypeId: 4
  },
  {
    id: 32,
    name: 'Doctor Doll Set',
    description: 'Role-playing, foster caring',
    detailDescription: 'Professional doctor role-playing doll set including doctor doll and complete medical equipment. Doll is 30cm tall wearing white coat and stethoscope with professional appearance. Comes with 18 realistic medical instruments: stethoscope, thermometer, syringe, blood pressure monitor, scalpel, medicine bottles, etc. All instruments made from safe materials with rounded edges. Through role-playing games, can eliminate children\'s fear of doctors, foster caring for others, inspire career dreams. Suitable for children 3+.',
    price: 119.99,
    toyTypeId: 4
  }
];

let nextId = 33;

export class MemoryToyRepository {
  /**
   * Get all toys
   */
  static async findAll(): Promise<Toy[]> {
    return [...toysData];
  }

  /**
   * Get toys by toy type ID
   */
  static async findByToyTypeId(toyTypeId: number): Promise<Toy[]> {
    return toysData.filter(toy => toy.toyTypeId === toyTypeId);
  }

  /**
   * Get toy by ID
   */
  static async findById(id: number): Promise<Toy | null> {
    const toy = toysData.find(t => t.id === id);
    return toy ? { ...toy } : null;
  }
}
