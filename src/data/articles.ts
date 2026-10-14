export interface Author {
  name: string;
  role: string;
  institution: string;
  location: string;
  avatar: string;
  bio: string;
}

export interface ArticleSection {
  id: string;
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  pullQuote?: {
    text: string;
    author?: string;
  };
  callout?: {
    label: string;
    text: string;
  };
  figure?: {
    imageUrl?: string;
    caption: string;
    type?: 'photo' | 'diagram' | 'specimen';
  };
}

export interface Article {
  id: string;
  title: string;
  deck: string;
  volume: string;
  edition: string;
  category: 'Architecture' | 'Cartography' | 'Horology' | 'Typography' | 'Craft & Design' | 'Philosophy' | 'Urbanism' | 'Speculative Design';
  publishedAt: string;
  readTime: string;
  readMinutes: number;
  featured?: boolean;
  coverImage: string;
  coverImageCaption: string;
  author: Author;
  tableOfContents: { id: string; title: string }[];
  sections: ArticleSection[];
  keyInsights: string[];
  citations: string[];
  initialClaps: number;
  initialComments: {
    id: string;
    author: string;
    location: string;
    date: string;
    content: string;
    likes: number;
  }[];
}

export const ARTICLES: Article[] = [
  {
    id: 'silence-of-nordic-brick',
    title: 'The Silence of Nordic Brick: Alvar Aalto and the Poetics of Red Clay',
    deck: 'How experimental masonry at Muuratsalo revived the tactile soul of European modernism amid the cold rationalism of steel.',
    volume: 'Vol. XVIII',
    edition: 'Autumn Journal',
    category: 'Architecture',
    publishedAt: 'October 10, 2026',
    readTime: '7 min read',
    readMinutes: 7,
    featured: true,
    coverImage: '/src/assets/images/hero_nordic_brick_1791968762445.jpg',
    coverImageCaption: 'The stepped brick courtyard and forest envelope at the Muuratsalo Experimental House, photographed under morning mist.',
    author: {
      name: 'Elin Lindqvist',
      role: 'Senior Fellow in Architectural Conservation',
      institution: 'Nordic Institute of Structural Heritage',
      location: 'Helsinki, Finland',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Elin Lindqvist writes on organic modernism, vernacular masonry, and post-war Scandinavian territorial planning.'
    },
    tableOfContents: [
      { id: 'the-solitary-clearing', title: '1. The Solitary Clearing' },
      { id: 'fifty-bonds-of-clay', title: '2. Fifty Bonds of Clay' },
      { id: 'thermal-inertia-and-memory', title: '3. Thermal Inertia & Memory' },
      { id: 'the-humanist-imperative', title: '4. The Humanist Imperative' }
    ],
    sections: [
      {
        id: 'the-solitary-clearing',
        heading: '1. The Solitary Clearing',
        paragraphs: [
          'In the summer of 1952, when the architects of Western Europe were assembling glassy steel curtain walls and celebrant prefabricated slab towers, Alvar Aalto retreated to an uninhabited rocky point on the island of Muuratsalo in Lake Päijänne. He brought with him neither blueprints nor concrete pumps, but a master mason and five barges laden with over fifty discrete varieties of Finnish clinker brick.',
          'Aalto understood something fundamental that his contemporaries were eager to discard: architecture begins in the hand before it ever arrives at the eye. Glass was infinite, unyielding, and specular; steel was industrial and detached. Red clay, dug from the riverbeds of southern Karelia and baked in wood-fired kilns, possessed the geological memory of Scandinavian soil. It carried thermal inertia, acoustic absorption, and an unmistakable physical weight that grounded the human dweller in an otherwise inhospitable landscape.'
        ],
        pullQuote: {
          text: 'Architecture is not a mathematical equation of modules. It is an instrument designed to receive the passing sun and cradle human frailty.',
          author: 'Alvar Aalto, Lecture at the Swedish Association of Architects, 1955'
        }
      },
      {
        id: 'fifty-bonds-of-clay',
        heading: '2. Fifty Bonds of Clay',
        paragraphs: [
          'Walking through the courtyard at Muuratsalo reveals what appears at first glance to be madness, yet resolves into profound empirical science. The inner courtyard walls are partitioned into more than fifty distinct rectangular patches. Here, Flemish bond confronts English cross bond; nearby, glazed ceramic tiles of cobalt blue interrupt rust-colored Roman pavers; further along, hand-struck bricks are laid diagonally like basketweave textile.',
          'This was not ornamental whimsy. Aalto was testing how different bond geometries, firing temperatures, and joint profiles weathered against the ferocious freeze-thaw cycles of central Finland. In winter, snow drifts against the uneven brick coursing, catching in the mortar joints and insulating the interior perimeter. When the spring melt arrives, the subtle projecting headers cast delicate rhythmic shadows that break the harsh low sun.'
        ],
        callout: {
          label: 'Curatorial Note',
          text: 'The masonry testing at Muuratsalo spanned 1952 through 1974. Aalto recorded the weathering index of each brick panel in handwritten field journals that remain preserved in the Jyväskylä archives.'
        }
      },
      {
        id: 'thermal-inertia-and-memory',
        heading: '3. Thermal Inertia & Memory',
        paragraphs: [
          'Contemporary architecture has largely severed itself from the physics of mass. Modern lightweight envelope assemblies rely on polyisocyanurate foam, vapor-permeable membranes, and mechanical air handlers operating at continuous load. When power fails, the lightweight interior chills in hours.',
          'A solid double-wythe brick wall, by contrast, operates like a slow battery. During the short Nordic summer afternoon, the bricks absorb incident solar radiation. Long after the northern dusk settles at midnight, the mass continues radiating quiet warmth into the hearth room. There is an auditory component as well: the soft, porous surface of unglazed brick captures the high frequencies of human speech, muting the harsh flutter echoes that plague contemporary glass-and-drywall residences.'
        ]
      },
      {
        id: 'the-humanist-imperative',
        heading: '4. The Humanist Imperative',
        paragraphs: [
          'As our cities drown in identical glazed facades and smooth non-descript aluminum panels, Aalto’s masonry offers a quiet rebuke. To build with brick is to accept human scale: a single brick is always sized to fit inside a stonemason’s palm. It cannot be poured from an automated hopper or extruded by an algorithm. Each unit requires a human touch, a trowel of lime, and a plumb line.',
          'To run one’s fingers over the damp, rough face of a Nordic brick wall is to remember that shelter is not merely climate-controlled volume. It is our oldest physical communion with the earth beneath our feet.'
        ]
      }
    ],
    keyInsights: [
      'Brick size is intrinsically linked to the ergonomic span of the human hand and mason’s grip.',
      'Thermal inertia acts as an analog battery, balancing interior microclimates without mechanical noise.',
      'Surface texture fundamentally shapes acoustic intimacy and psychological dwelling.'
    ],
    citations: [
      'Schildt, Göran. Alvar Aalto: The Decisive Years. Rizzoli International, 1986.',
      'Pallasmaa, Juhani. The Eyes of the Skin: Architecture and Sensory Perception. Wiley, 2005.',
      'Aalto, Alvar. Synopsis: Painting, Architecture, Sculpture. Birkhäuser, 1970.'
    ],
    initialClaps: 342,
    initialComments: [
      {
        id: 'c1',
        author: 'Marcus Lindholm',
        location: 'Stockholm, Sweden',
        date: 'October 11, 2026',
        content: 'The comparison between glass curtain walls and brick thermal inertia is dead-on. Having stayed near Lake Päijänne in late October, the auditory difference inside unglazed masonry is extraordinary.',
        likes: 24
      },
      {
        id: 'c2',
        author: 'Dr. Anne Hathaway-Kaye',
        location: 'Edinburgh, UK',
        date: 'October 12, 2026',
        content: 'Muuratsalo remains one of the finest empirical experiments in European modernism. Thank you for avoiding the usual glossy architectural tropes and focusing on the tactile science.',
        likes: 19
      }
    ]
  },
  {
    id: 'cartographies-of-the-unseen',
    title: 'Cartographies of the Unseen: Why Hand-Drawn Maps Still Tell the Truest Stories',
    deck: 'In an era of frictionless satellite navigation, the deliberate omissions and poetic distortions of ink cartography reveal our inner topography.',
    volume: 'Vol. XVIII',
    edition: 'Autumn Journal',
    category: 'Cartography',
    publishedAt: 'October 04, 2026',
    readTime: '6 min read',
    readMinutes: 6,
    coverImage: '/src/assets/images/cartography_hand_map_1791968763152.jpg',
    coverImageCaption: 'Detailed view of hand-ruled topographical contours and elevation hatchings drafted on antique rag parchment.',
    author: {
      name: 'Julian Vance',
      role: 'Cartographic Historian & Calligrapher',
      institution: 'Fellow of the Royal Geographical Society',
      location: 'Oxford, United Kingdom',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Julian Vance investigates pre-satellite navigation, celestial charts, and the philosophy of spatial representation.'
    },
    tableOfContents: [
      { id: 'the-satellite-panopticon', title: '1. The Satellite Panopticon' },
      { id: 'the-art-of-omission', title: '2. The Art of Omission' },
      { id: 'topography-as-choreography', title: '3. Topography as Choreography' },
      { id: 'the-wayfarers-compass', title: '4. The Wayfarer’s Compass' }
    ],
    sections: [
      {
        id: 'the-satellite-panopticon',
        heading: '1. The Satellite Panopticon',
        paragraphs: [
          'Look down at your phone screen: a blue pulsing dot centers you in a Euclidean lattice, recalculating your orientation at ten-hertz intervals. Every roofline is vectorized, every one-way street registered, every traffic delay quantified in amber ribbons. Modern digital cartography claims to be total and objective. It promises that no human being can ever again be lost.',
          'Yet in achieving total geographic surveillance, satellite navigation has stripped the world of wonder and experiential depth. We no longer inhabit landscapes; we execute turn-by-turn vectors. We do not look at the ridge line to gauge distance or note the sudden scent of damp pine needles marking a ravine; we obey an synthesized voice telling us to make a slight right in three hundred meters.'
        ],
        pullQuote: {
          text: 'A map does not reproduce a country; it suggests how one might dream of passing through it.',
          author: 'Julian Vance, Notes from the Ordnance Survey Archives'
        }
      },
      {
        id: 'the-art-of-omission',
        heading: '2. The Art of Omission',
        paragraphs: [
          'The fundamental genius of historical cartography was never precision; it was curation. When an 18th-century surveyor laid pen to rag vellum, their primary artistic decision was what to exclude. By omitting the noise—the millions of unremarkable pebbles, fence lines, and minor hedgerows—the cartographer amplified what mattered to the walker: the lone oak tree that struck lightning forty years prior, the cold mountain spring where pack mules could drink, the bog that swallowed wagon axles in November.',
          'Every line drawn by hand is an interpretive judgment. The width of an ink stroke conveys the ferocity of a river; the density of hachure marks communicates the steepness of a scree slope to the calf muscles of the mountaineer.'
        ],
        callout: {
          label: 'Cartographic Specimen',
          text: 'The Cassini Map of France, commissioned by Louis XV and executed over four generations, was the first topographic survey based on geodesic triangulation. Yet its beauty lies in hand-engraved copperplate symbols for every parish windmill and gibbet.'
        }
      },
      {
        id: 'topography-as-choreography',
        heading: '3. Topography as Choreography',
        paragraphs: [
          'When we unfold an archival paper map across a wooden table, our fingers trace journeys before our boots ever leave the porch. The eye wanders freely between contour intervals, reading the landscape like a musical score. You notice the saddle between two peaks, the sudden drop-off of an escarpment, the gentle oxbow bend of an ancient trout stream.',
          'This spatial choreography engages our cognitive mapping faculty in ways a six-inch glass screen cannot. Neurologists have documented that human hippocampal place cells fire far more vigorously when navigating through tactile, holistic paper maps than when tracking a self-centering GPS blip.'
        ]
      },
      {
        id: 'the-wayfarers-compass',
        heading: '4. The Wayfarer’s Compass',
        paragraphs: [
          'To hold a hand-drawn map is to recognize that geography is always human geography. It is the record of someone who walked the ridgeline in morning fog, who counted their paces against the wind, and who chose to remember that a meadow was rich with wild garlic in May.',
          'In our headlong rush toward algorithmic efficiency, let us preserve the quiet compass of ink and paper. Without it, we may know our exact geographic coordinates, yet remain utterly lost.'
        ]
      }
    ],
    keyInsights: [
      'Digital navigation creates route obedience; analog cartography cultivates spatial comprehension.',
      'Cartographic curation is defined by deliberate omission rather than exhaustive capture.',
      'Paper maps engage the brain’s hippocampal place cells through whole-field orientation.'
    ],
    citations: [
      'Harley, J.B. The New Nature of Maps: Essays in the History of Cartography. Johns Hopkins University Press, 2002.',
      'Macfarlane, Robert. The Old Ways: A Journey on Foot. Penguin Books, 2012.',
      'Turchi, Peter. Maps of the Imagination: The Writer as Cartographer. Trinity University Press, 2004.'
    ],
    initialClaps: 288,
    initialComments: [
      {
        id: 'c3',
        author: 'Siobhan Thorne',
        location: 'Connemara, Ireland',
        date: 'October 6, 2026',
        content: 'Tim Robinson’s maps of the Burren and Connemara embody everything you write here. He spent thirty years listening to oral place names before drawing a single contour line.',
        likes: 31
      }
    ]
  },
  {
    id: 'solitary-watchmaker-escapement',
    title: 'The Solitary Watchmaker: Micro-Mechanics and Temporal Escapements in the Swiss Jura',
    deck: 'Inside the silent workshops of the Vallée de Joux, where masters file balance springs by hand to tame seconds in forty-year arcs.',
    volume: 'Vol. XVIII',
    edition: 'Autumn Journal',
    category: 'Horology',
    publishedAt: 'September 28, 2026',
    readTime: '8 min read',
    readMinutes: 8,
    coverImage: '/src/assets/images/swiss_watchmaker_craft_1791968763412.jpg',
    coverImageCaption: 'Master horologist assembling a tourbillon carriage under natural north light in the high mountain valleys of Le Brassus.',
    author: {
      name: 'Marc-André Reymond',
      role: 'Master Horologist & Independent Restorer',
      institution: 'Atelier de Chronométrie Jura',
      location: 'Le Brassus, Switzerland',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      bio: 'Marc-André Reymond has spent thirty-five years restoring grand complications, marine chronometers, and astronomical clocks.'
    },
    tableOfContents: [
      { id: 'the-winter-cabin', title: '1. The Winter Cabin' },
      { id: 'the-heartbeat-of-steel', title: '2. The Heartbeat of Steel' },
      { id: 'anglage-and-the-black-polish', title: '3. Anglage & The Black Polish' },
      { id: 'time-outside-the-grid', title: '4. Time Outside the Grid' }
    ],
    sections: [
      {
        id: 'the-winter-cabin',
        heading: '1. The Winter Cabin',
        paragraphs: [
          'For six months of the year, the Vallée de Joux in the Swiss Jura is buried beneath three meters of crystalline snow. The winds howl down from the Mont Tendre ridge, freezing the mountain pines into white spears. Centuries ago, when the harsh winter severed the valley farmers from agriculture, they lit candles, sat beneath double-glazed north-facing windows, and took up tiny steel files.',
          'They were called cabinotiers—watchmakers who worked in the attic spaces where daylight was clearest and dust was minimal. From these high, freezing rooms emerged an extraordinary tradition: the mechanical partitioning of infinity into equal, audible increments of three hertz.'
        ],
        pullQuote: {
          text: 'A mechanical watch does not measure time. It creates time out of tension, friction, and human balance.',
          author: 'Philippe Dufour, Horological Monograph, 2011'
        }
      },
      {
        id: 'the-heartbeat-of-steel',
        heading: '2. The Heartbeat of Steel',
        paragraphs: [
          'At the center of every traditional mechanical movement beats the Swiss lever escapement. A coiled hairspring, thinner than a strand of silk and fashioned from an alloy of nickel, chromium, and iron, expands and breathes precisely 21,600 times each hour.',
          'With every oscillation, a synthetic ruby pallet jewel arrests the escape wheel for a fraction of a millisecond, then releases it with a quiet metallic chime: tick. Then the opposing jewel catches it: tock. The energy stored within a tightly wound mainspring barrel is released not in an uncontrolled spasm, but in a disciplined cadence that can endure for half a century without a single transistor, battery, or satellite synchronization pulse.'
        ]
      },
      {
        id: 'anglage-and-the-black-polish',
        heading: '3. Anglage & The Black Polish',
        paragraphs: [
          'What distinguishes artisanal haute horlogerie from industrial manufacture is not merely accuracy, but finishing that no optical scanner can ever replicate. Consider the art of anglage—the hand-bevelling of steel bridge edges to a precise forty-five-degree chamfer using gentian wood pegs smeared with diamond paste.',
          'Or contemplate *poli noir*—black polish. The watchmaker rubs a minute steel pinion on a zinc plate with micro-fine zinc oxide paste until the surface is so optically flat that it reflects light only along a single vector. Tilted one way, it gleams with mirror brilliance; tilted another degree, it swallows all light and turns as dark as obsidian. This finish serves no utilitarian purpose: it is hidden beneath a solid caseback, visible only to the watchmaker and the restorer who will service it a century later.'
        ],
        callout: {
          label: 'Craftsmanship Metric',
          text: 'A single hand-finished grand complication contains up to 600 individual components and requires over 2,000 hours of manual filing, bevelling, and adjustment before its initial timing trial.'
        }
      },
      {
        id: 'time-outside-the-grid',
        heading: '4. Time Outside the Grid',
        paragraphs: [
          'In an epoch dominated by atomic clocks disciplined via GPS constellations, why does an intelligent person still wear a mechanical watch on their wrist? Because a smartwatch is a leash connected to the servers of a multinational corporation. When the battery drains in thirty-six hours, it becomes inert silicon waste.',
          'A mechanical watch is self-contained. It is powered by the kinetic swing of your own arm as you walk to market or the deliberate ritual of winding its crown over your morning coffee. It will outlive you, your children, and the servers that beam notifications to our screens.'
        ]
      }
    ],
    keyInsights: [
      'Mechanical horology operates as autonomous analog computing without electricity or external signals.',
      'Hand-finishing (anglage, black polish) prevents surface oxidation and preserves microscopic tolerances across centuries.',
      'The tactile ritual of hand-winding reaffirms our conscious ownership of temporal experience.'
    ],
    citations: [
      'Daniels, George. Watchmaking. Philip Wilson Publishers, 1981.',
      'Fried, Henry B. The Watch Repairer’s Manual. Skyhorse, 2018.',
      'Chapiro, Adolphe. Jean-Antoine Lépine: Horloger (1720–1814). Éditions Scriptar, 1988.'
    ],
    initialClaps: 412,
    initialComments: [
      {
        id: 'c4',
        author: 'Bernhard Weber',
        location: 'Zürich, Switzerland',
        date: 'September 30, 2026',
        content: 'The passage on black polish (poli noir) captured something that few journalists understand: true craftsmanship is what you do when no one will ever look inside.',
        likes: 47
      }
    ]
  },
  {
    id: 'brutalist-sanctuaries-concrete-void',
    title: 'Brutalist Sanctuaries: Concrete, Monastic Light, and the Sacred Void',
    deck: 'From Le Corbusier’s Ronchamp to Gottfried Böhm’s Neviges, how raw aggregate and deep shadow rescued religious architecture from nostalgia.',
    volume: 'Vol. XVIII',
    edition: 'Autumn Journal',
    category: 'Architecture',
    publishedAt: 'September 20, 2026',
    readTime: '9 min read',
    readMinutes: 9,
    coverImage: '/src/assets/images/brutalist_sacred_void_1791968763358.jpg',
    coverImageCaption: 'Shafts of morning light piercing the board-formed concrete nave at the pilgrimage cathedral of Neviges.',
    author: {
      name: 'Dr. Soraya Morales',
      role: 'Professor of Sacred Spatial Typologies',
      institution: 'Universidad Politécnica de Madrid',
      location: 'Madrid, Spain',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      bio: 'Dr. Morales studies post-war ecclesiastical structures, concrete curing chemistry, and the phenomenology of liturgical space.'
    },
    tableOfContents: [
      { id: 'the-ash-of-modernity', title: '1. The Ash of Modernity' },
      { id: 'board-formed-timbre', title: '2. Board-Formed Timbre' },
      { id: 'the-aperture-of-grace', title: '3. The Aperture of Grace' },
      { id: 'silence-in-the-megacity', title: '4. Silence in the Megacity' }
    ],
    sections: [
      {
        id: 'the-ash-of-modernity',
        heading: '1. The Ash of Modernity',
        paragraphs: [
          'After the devastation of the Second World War, European architects faced a spiritual crisis that could not be repaired with Neo-Gothic arches or gilded Renaissance cornices. Millions of stone churches lay in rubble across the Rhineland, northern France, and southern England. To rebuild them in ornamental plaster would have been an act of hollow historical denial.',
          'Instead, a courageous cadre of architects turned to the humblest, most unforgiving material of modern reconstruction: *béton brut*—raw, unadorned concrete. In doing so, they stripped religious architecture of sentimental decoration and returned to the primal essence of the sanctuary: weight, silence, and the miraculous entry of light.'
        ],
        pullQuote: {
          text: 'Light and shadow are the real materials of architecture; stone and concrete are merely the instruments that make them tangible.',
          author: 'Gottfried Böhm, Pritzker Acceptance Discourse, 1986'
        }
      },
      {
        id: 'board-formed-timbre',
        heading: '2. Board-Formed Timbre',
        paragraphs: [
          'Stand inside Gottfried Böhm’s Mariendom in Neviges or Le Corbusier’s convent of Sainte Marie de La Tourette. The walls are not smooth, sterile surfaces. They bear the exact wood-grain relief of the rough pine planks used in the formwork. Every knot, nail hole, and seam in the timber is fossilized permanently in the stone.',
          'This fossilization creates an extraordinary tactile presence. The cold industrial cement is warmed by the organic texture of the fallen trees that held it while curing. The wall becomes an archive of the human labor that erected it: you can see where the mason vibrated the wet slurry, where the slurry seeped between gaps, and where the morning sun dried the lower lift faster than the upper.'
        ]
      },
      {
        id: 'the-aperture-of-grace',
        heading: '3. The Aperture of Grace',
        paragraphs: [
          'In a conventional cathedral, giant stained glass windows flood the nave with multi-colored light. In a brutalist sanctuary, light is rationed with monastic discipline. At La Tourette, Le Corbusier cut deep splayed light cannons into the bunker roof, painting the ceiling planes in intense cadmium red and ultramarine that bounce down into the crypt.',
          'The darkness is not gloomy; it is protective. The massive concrete walls shut out the sirens, traffic, and frantic commercial noise of the twentieth century. Within this raw geological womb, a single beam of dust-mote sunlight cutting across the alter feels like an authentic cosmic revelation.'
        ],
        callout: {
          label: 'Acoustic Architecture',
          text: 'The heavy mass of 40cm unpainted concrete walls attenuates low-frequency ambient city rumble by over 54 decibels, creating an interior reverberation chamber ideal for unamplified Gregorian chant.'
        }
      },
      {
        id: 'silence-in-the-megacity',
        heading: '4. Silence in the Megacity',
        paragraphs: [
          'Today, our cities are saturated with glass, flashing billboards, and synthetic LED screens designed to command involuntary eye movement. We are perpetually stimulated, perpetually accessible, and spiritually exhausted.',
          'Brutalist sanctuaries offer something that commercial modernism cannot: permission to sit in the dark, to face the weight of our own mortal existence, and to touch stone that does not demand our attention or sell us our own desires.'
        ]
      }
    ],
    keyInsights: [
      'Béton brut preserves the organic imprint of timber formwork, uniting vegetal and mineral memory.',
      'Controlled dark interior mass amplifies the emotional resonance of minimal natural daylight.',
      'Heavy concrete assemblies create critical acoustic isolation from urban ambient distraction.'
    ],
    citations: [
      'Curtis, William J.R. Le Corbusier: Ideas and Forms. Phaidon Press, 1986.',
      'Böhm, Gottfried. Bauten und Projekte: 1950–1980. Wasmuth, 1982.',
      'Frampton, Kenneth. Studies in Tectonic Culture. MIT Press, 1995.'
    ],
    initialClaps: 519,
    initialComments: [
      {
        id: 'c5',
        author: 'Father Dominic Chen',
        location: 'Kyoto, Japan',
        date: 'September 22, 2026',
        content: 'Tadao Ando’s Church of the Light in Ibaraki speaks the exact same liturgical language. The cross is not hung on the wall; the cross is the void in the wall where light pierces the concrete.',
        likes: 52
      }
    ]
  },
  {
    id: 'tactile-resistance-mechanical-keyboards',
    title: 'Tactile Resistance: Why We Long for Weight and Spring in an Era of Glass',
    deck: 'From buckling springs to leaf-switch copper: the quiet philosophical rebellion against capacitive glass screens and haptic illusions.',
    volume: 'Vol. XVIII',
    edition: 'Autumn Journal',
    category: 'Craft & Design',
    publishedAt: 'September 14, 2026',
    readTime: '5 min read',
    readMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
    coverImageCaption: 'Custom milled anodized aluminum keyboard case with individual lubricated leaf springs and dye-sublimated PBT keycaps.',
    author: {
      name: 'Kenji Takahashi',
      role: 'Industrial Ergonomist & Design Critic',
      institution: 'Institute for Material Interface Studies',
      location: 'Kyoto, Japan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Kenji Takahashi analyzes tactile feedback systems, tool phenomenology, and the history of personal computing ergonomics.'
    },
    tableOfContents: [
      { id: 'the-tyranny-of-the-glass-pane', title: '1. The Tyranny of the Glass Pane' },
      { id: 'physics-of-the-spring', title: '2. Physics of the Spring' },
      { id: 'acoustic-rhythm-as-thought', title: '3. Acoustic Rhythm as Thought' },
      { id: 'reclaiming-the-workbench', title: '4. Reclaiming the Workbench' }
    ],
    sections: [
      {
        id: 'the-tyranny-of-the-glass-pane',
        heading: '1. The Tyranny of the Glass Pane',
        paragraphs: [
          'For nearly two decades, industrial designers had one collective dream: eliminate all physical buttons. Every phone, tablet, car dashboard, and elevator control panel was converted into a sheet of smooth, chemically hardened Gorilla Glass. We were promised a clean, uncluttered future where software could morph into any interface on demand.',
          'Yet something vital was lost in the transition. A glass pane gives nothing back. It offers zero physical resistance, zero proprioceptive confirmation, and zero tactile boundary. To type an essay on a touchscreen requires the constant visual surveillance of your own thumbs. You cannot rest your fingertips on the home row; you cannot feel the subtle concave scooped profile of an F or J homing bump.'
        ],
        pullQuote: {
          text: 'Fingertips are not optical pointers; they are sensory organs packed with four thousand mechanoreceptors per square centimeter.',
          author: 'Kenji Takahashi, The Resistance of Tools, 2024'
        }
      },
      {
        id: 'physics-of-the-spring',
        heading: '2. Physics of the Spring',
        paragraphs: [
          'Enter the mechanical keyboard renaissance. Far from a nostalgic affectation of retro hobbyists, the explosive growth of custom mechanical keyboards represents a rational human reclamation of tactile physical craft. Writers, programmers, and engineers are willingly spending hundreds of hours assembling brass plates, lubricating individual stem rails with Krytox grease, and soldering gold-plated leaf springs.',
          'When you depress a mechanical switch, you are participating in a miniature mechanical ballet. As your finger applies forty-five grams of downward force, the stem slides past a copper leaf. At exactly two millimeters of travel, the spring yields with a distinct tactile bump: the electrical contact closes, and your neural system receives instantaneous physical feedback before the key bottom out.'
        ]
      },
      {
        id: 'acoustic-rhythm-as-thought',
        heading: '3. Acoustic Rhythm as Thought',
        paragraphs: [
          'There is also an auditory cadence to physical typing that mirrors the rhythm of prose. The deep, muffled *thock* of thick PBT plastic bottoming out against a gasket-mounted polycarbonate plate provides a continuous auditory soundtrack to composition. In the cadence of the keys, an author hears their own pace: the hesitation before a semicolon, the rapid cascade of adjectives, the resolute punctuation of the carriage return.'
        ]
      },
      {
        id: 'reclaiming-the-workbench',
        heading: '4. Reclaiming the Workbench',
        paragraphs: [
          'In a world where software is rented via monthly subscription and hardware is glued shut with proprietary adhesives, a mechanical keyboard is an heirloom tool. It can be opened with an Allen wrench. A burnt switch can be de-soldered and replaced in three minutes. It is a machine that honors the intelligence of your hands.'
        ]
      }
    ],
    keyInsights: [
      'Touchscreen interfaces require visual policing because they lack proprioceptive haptic boundaries.',
      'The force-curve of a mechanical switch provides cognitive confirmation prior to bottoming out.',
      'Repairable, modular hardware cultivates psychological agency in an era of disposable electronics.'
    ],
    citations: [
      'Norman, Don. The Design of Everyday Things. Basic Books, 2013.',
      'Crawford, Matthew B. Shop Class as Soulcraft. Penguin, 2009.',
      'McCullough, Malcolm. Abstracting Craft: The Practiced Digital Hand. MIT Press, 1996.'
    ],
    initialClaps: 367,
    initialComments: [
      {
        id: 'c6',
        author: 'Elena Rostova',
        location: 'Berlin, Germany',
        date: 'September 16, 2026',
        content: 'I switched from an ultra-thin laptop keyboard to a custom 65% board with lubed Boba U4T switches last year. My chronic wrist tendonitis vanished in two months.',
        likes: 28
      }
    ]
  },
  {
    id: 'in-praise-of-slow-fermentation',
    title: 'In Praise of Slow Fermentation: Heritage Grains and Ancient Leaven',
    deck: 'How the slow biological alchemy of wild yeast and stone-ground heritage flour restores flavor, ecology, and gut health.',
    volume: 'Vol. XVIII',
    edition: 'Autumn Journal',
    category: 'Craft & Design',
    publishedAt: 'September 06, 2026',
    readTime: '6 min read',
    readMinutes: 6,
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    coverImageCaption: 'Artisan sourdough batards cooling on wooden racks, displaying deep blistered caramelization and wild fermentation ear.',
    author: {
      name: 'Clara Beauchamp',
      role: 'Agronomist & Master Artisan Miller',
      institution: 'Conservatoire des Grains Anciens',
      location: 'Provence, France',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Clara Beauchamp researches landrace cereals, stone-mill grist dynamics, and ancestral bread-making ecosystems.'
    },
    tableOfContents: [
      { id: 'the-industrial-loaf', title: '1. The Industrial Loaf' },
      { id: 'landraces-and-living-soil', title: '2. Landraces & Living Soil' },
      { id: 'the-thirty-six-hour-clock', title: '3. The Thirty-Six-Hour Clock' },
      { id: 'the-breaking-of-bread', title: '4. The Breaking of Bread' }
    ],
    sections: [
      {
        id: 'the-industrial-loaf',
        heading: '1. The Industrial Loaf',
        paragraphs: [
          'In 1961, at a research facility in Chorleywood, England, food scientists unveiled a breakthrough that would conquer the grocery shelves of the industrialized world: a method to produce sliced white sandwich bread from grain to packaged bag in less than three hours. It required high-speed mechanical dough mixers, chemical oxidizing agents, potassium bromate, and massive doses of isolated monoculture baker’s yeast.',
          'The result was uniform, sponge-soft, and utterly dead. By eliminating fermentation time, the Chorleywood Bread Process severed human nutrition from the biological preprocessing that humanity had relied upon for ten thousand years. Grains were no longer fermented; they were merely inflated.'
        ],
        pullQuote: {
          text: 'Bread is not a manufactured commodity. It is an edible ecosystem of wild microorganisms captured in grass seed.',
          author: 'Clara Beauchamp, Heritage Grain Symposium, 2025'
        }
      },
      {
        id: 'landraces-and-living-soil',
        heading: '2. Landraces & Living Soil',
        paragraphs: [
          'To understand true bread, one must begin in the field with landrace grains: Rouge de Bordeaux, Einkorn, Emmer, and Khorasan. Modern industrial wheat has been dwarf-bred for chemical nitrogen uptake and mechanical combine harvesting. Heritage landraces, by contrast, grow two meters tall, sending deep root networks three meters into the subsoil to mine micronutrients and mycorrhizal fungi.',
          'When these grains are ground between rotating granite millstones at cool temperatures, the living germ and aleurone layers remain intact with their natural oils, carotenoids, and wild microbial flora.'
        ]
      },
      {
        id: 'the-thirty-six-hour-clock',
        heading: '3. The Thirty-Six-Hour Clock',
        paragraphs: [
          'When an artisan baker mixes stone-ground heritage flour with spring water and a mature levain culture, time becomes the primary ingredient. Over a thirty-six-hour cold fermentation at twelve degrees Celsius, billions of wild lactobacilli and saccharomyces yeasts engage in complex biochemical digestion.',
          'Lactic and acetic acids break down complex gluten chains into digestible peptides. Phytates, which bind vital minerals in unfermented grains, are degraded by phytase enzymes, releasing bioavailable zinc, magnesium, and iron. What emerges from the oven is a dark, caramelized loaf with blistered crust, rich nutty crumb, and complex aromatic depths.'
        ]
      },
      {
        id: 'the-breaking-of-bread',
        heading: '4. The Breaking of Bread',
        paragraphs: [
          'There is a quiet, radical politics in baking sourdough bread. It refuses the frantic acceleration of modern capitalism. You cannot make a wild levain ferment twice as fast by raising the price or doubling the compute. It demands patience, respect for natural biology, and the humility to wait.'
        ]
      }
    ],
    keyInsights: [
      'Fast industrial bread bypasses enzymatic breakdown of gluten and phytates, creating digestive inflammation.',
      'Heritage landrace cereals possess deep root architectures that concentrate minerals from biological soil.',
      'Slow lactic fermentation is an analog biotechnology that preserves bread naturally without preservatives.'
    ],
    citations: [
      'David, Elizabeth. English Bread and Yeast Cookery. Penguin, 1977.',
      'Pollan, Michael. Cooked: A Natural History of Transformation. Penguin, 2013.',
      'Tartine Bread by Chad Robertson. Chronicle Books, 2010.'
    ],
    initialClaps: 295,
    initialComments: [
      {
        id: 'c7',
        author: 'Guillaume Mercier',
        location: 'Lyon, France',
        date: 'September 8, 2026',
        content: 'Baking with Rouge de Bordeaux was a revelation. The natural aromas of hazelnut and dry meadow grass are impossible to find in supermarket flour.',
        likes: 21
      }
    ]
  },
  {
    id: 'the-typographic-spine',
    title: 'The Typographic Spine: How Century-Old Book Cloth and Lead Rule Modern Screens',
    deck: 'The enduring proportion of the Renaissance page, counter-spaces, and why letterpress aesthetics continue to anchor digital clarity.',
    volume: 'Vol. XVIII',
    edition: 'Autumn Journal',
    category: 'Typography',
    publishedAt: 'August 29, 2026',
    readTime: '7 min read',
    readMinutes: 7,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    coverImageCaption: 'Antique metal type sorts arranged in a wooden composing stick at an Edinburgh letterpress printshop.',
    author: {
      name: 'Thomas Sterling',
      role: 'Type Historian & Letterpress Printer',
      institution: 'St. Bride Foundation Typographic Archive',
      location: 'Edinburgh, Scotland',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      bio: 'Thomas Sterling has cast foundry type in lead and advised contemporary type foundries on digital variable font proportions.'
    },
    tableOfContents: [
      { id: 'lead-and-ink-memory', title: '1. Lead & Ink Memory' },
      { id: 'the-geometry-of-the-white-page', title: '2. The Geometry of the White Page' },
      { id: 'counter-spaces-and-air', title: '3. Counter-Spaces & Air' },
      { id: 'reading-as-sacred-act', title: '4. Reading as Sacred Act' }
    ],
    sections: [
      {
        id: 'lead-and-ink-memory',
        heading: '1. Lead & Ink Memory',
        paragraphs: [
          'Every time you adjust the tracking on a website or glance at an italicized subhead, you are interacting with physical physics invented in Mainz and Venice five hundred years ago. When Aldus Manutius commissioned Francesco Griffo to cut the first italic type in 1501, it was not an arbitrary visual flourish: it was an engineering solution to compress text onto smaller pocket-sized paper leaves so scholars could read while walking the canals of Venice.',
          'Type was physical lead. It had height-to-paper, body width, and shoulder clearance. You could not make a line of text overlap another without cutting into the metal with a hacksaw. The constraints of the material forged the discipline of the craft.'
        ],
        pullQuote: {
          text: 'Typography exists to honor content. A typeface should be like a crystal goblet: transparent to the vintage it holds.',
          author: 'Beatrice Warde, The Crystal Goblet, 1932'
        }
      },
      {
        id: 'the-geometry-of-the-white-page',
        heading: '2. The Geometry of the White Page',
        paragraphs: [
          'In 1953, Jan Tschichold published his seminal analysis of medieval and Renaissance page canons, demonstrating that masters like Gutenberg and Schoeffer proportioned their text blocks according to the Golden Canon (2:3 page ratio with 1:1 text block diagonals). The inner margin was always half the width of the outer margin, providing space for thumb holding and scholarly marginalia.',
          'Modern web design often forgets this spatial arithmetic. Web pages routinely stretch text lines across 120 characters, forcing reader eyes to jump violently back across the screen to locate the next line. The human fovea cannot track lines comfortably beyond sixty to seventy-five characters without cognitive fatigue.'
        ]
      },
      {
        id: 'counter-spaces-and-air',
        heading: '3. Counter-Spaces & Air',
        paragraphs: [
          'A master type designer does not draw black letters; they sculpt white space. The counter—the interior white void inside the ‘o’, the ‘e’, or the ‘p’—is what determines legibility. If the counter-space is too cramped, the letter fills in at small reading sizes; if too expansive, the glyph loses tension and collapses into a wireframe.',
          'This balance between solid black stroke and luminous white air is what gives a great editorial typeface its voice. Set correctly, text hums with quiet vitality.'
        ]
      },
      {
        id: 'reading-as-sacred-act',
        heading: '4. Reading as Sacred Act',
        paragraphs: [
          'As software developers increasingly treat text as raw data blobs to be sliced into cards and badges, we must defend the dignity of long-form typography. Good typography does not shout. It invites the mind into an undisturbed sanctuary of sustained thought.'
        ]
      }
    ],
    keyInsights: [
      'Line length must be capped at 65–75 characters to honor human saccadic eye tracking limits.',
      'Letter legibility is governed by the volume and rhythm of negative counter-space.',
      'Margins are functional buffers that cradle the reading eye and establish curatorial hierarchy.'
    ],
    citations: [
      'Tschichold, Jan. The Form of the Book. Hartley & Marks, 1991.',
      'Bringhurst, Robert. The Elements of Typographic Style. Hartley & Marks, 2012.',
      'Morison, Stanley. First Principles of Typography. Cambridge University Press, 1936.'
    ],
    initialClaps: 384,
    initialComments: [
      {
        id: 'c8',
        author: 'Fiona MacIntyre',
        location: 'Glasgow, UK',
        date: 'August 31, 2026',
        content: 'Robert Bringhurst’s principles remain the gold standard. So refreshing to see a modern journal respect reading measure instead of full-screen fluid text dumps.',
        likes: 33
      }
    ]
  },
  {
    id: 'deep-time-observatories',
    title: 'Deep Time Observatories: Designing Megastructures to Last Ten Millennia',
    deck: 'From the Clock of the Long Now to Finnish nuclear repositories: how engineers architect monuments that outlive civilizations, languages, and regimes.',
    volume: 'Vol. XVIII',
    edition: 'Autumn Journal',
    category: 'Speculative Design',
    publishedAt: 'August 18, 2026',
    readTime: '10 min read',
    readMinutes: 10,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    coverImageCaption: 'Monolithic granite markers designed to communicate hazardous containment across ten thousand years of geological drift.',
    author: {
      name: 'Dr. Helena Zhang',
      role: 'Senior Scholar of Astromaterials & Futurity',
      institution: 'Center for Long-Horizon Engineering',
      location: 'Pasadena, California',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      bio: 'Dr. Zhang works on deep-time semiotics, structural geology, and long-baseline planetary engineering projects.'
    },
    tableOfContents: [
      { id: 'the-ephemerality-of-our-epoch', title: '1. The Ephemerality of Our Epoch' },
      { id: 'materials-beyond-the-millennium', title: '2. Materials Beyond the Millennium' },
      { id: 'semiotics-without-language', title: '3. Semiotics Without Language' },
      { id: 'the-curators-of-tomorrow', title: '4. The Curators of Tomorrow' }
    ],
    sections: [
      {
        id: 'the-ephemerality-of-our-epoch',
        heading: '1. The Ephemerality of Our Epoch',
        paragraphs: [
          'Our civilization is simultaneously the most prolific producer of records in human history and the most fragile. We store our treaties, poetry, and scientific papers on magnetic hard drives with a mean time between failures of five years, or in cloud server farms that require a continuous grid supply of cold water and diesel backup generators.',
          'If our electrical grid suffered a sustained catastrophic collapse, ninety-nine percent of human knowledge generated since 1990 would vaporize in a decade. Compare this to the Sumerian clay tablets of Uruk: baked in the Mesopotamian sun five millennia ago, they can still be picked up and read with a desk lamp today.'
        ],
        pullQuote: {
          text: 'To design for ten thousand years is to accept that every tool, flag, and faith we cherish today will have transformed into myth.',
          author: 'Stewart Brand, The Clock of the Long Now, 1999'
        }
      },
      {
        id: 'materials-beyond-the-millennium',
        heading: '2. Materials Beyond the Millennium',
        paragraphs: [
          'How do you construct a machine or sanctuary meant to run for 10,000 years without human lubrication or replacement parts? Steel rusts; bronze corrodes; plastics degrade under ultraviolet radiation; electronics succumb to cosmic ray bit-flip.',
          'The engineers building the 10,000-Year Clock inside the limestone cliffs of Sierra Diablo in West Texas turned to ancient materials: monolithic granite plates, high-purity tungsten carbide bearings, and sapphire escapements. The clock’s pendulum swings once every ten seconds, powered by thermal differences between day and night air channeled through vertical convection shafts.'
        ]
      },
      {
        id: 'semiotics-without-language',
        heading: '3. Semiotics Without Language',
        paragraphs: [
          'An even more harrowing challenge is the Onkalo nuclear repository in Olkiluoto, Finland. Deep within the Baltic granite shield, spent fuel rods will remain lethally radioactive for one hundred thousand years. In that expanse of time, English, Finnish, and all contemporary language families will have ceased to exist.',
          'How do you warn a post-human explorer not to dig? If you build a giant pyramid or stone monument, human curiosity will interpret it as a Pharaoh’s tomb containing treasure. Deep-time semioticians have proposed "landscapes of thorns"—enormous jagged granite spikes jutting from the earth at disturbing angles—designed to communicate dread through visceral bodily instinct alone.'
        ]
      },
      {
        id: 'the-curators-of-tomorrow',
        heading: '4. The Curators of Tomorrow',
        paragraphs: [
          'Thinking in deep time is the ultimate antidote to quarterly-earnings myopia. It forces us to ask: what are we leaving behind that is worthy of ten thousand years of planetary stewardship?'
        ]
      }
    ],
    keyInsights: [
      'Digital storage media are ephemeral; physical ceramic and stone inscription remain the only proven multi-millennium archives.',
      'Active mechanical systems in deep time must rely on ambient energy harvesting (thermal expansion, gravity).',
      'Communication across deep time requires universal somatosensory semiotics rather than linguistic text.'
    ],
    citations: [
      'Brand, Stewart. The Clock of the Long Now: Time and Responsibility. Basic Books, 1999.',
      'Sebeok, Thomas A. Communication Measures to Bridge Ten Millennia. Office of Nuclear Waste Isolation, 1984.',
      'Morton, Timothy. Hyperobjects: Philosophy and Ecology After the End of the World. University of Minnesota Press, 2013.'
    ],
    initialClaps: 602,
    initialComments: [
      {
        id: 'c9',
        author: 'Kaelen Miller',
        location: 'Melbourne, Australia',
        date: 'August 21, 2026',
        content: 'The Onkalo semiotics dilemma is one of the most chilling and poetic problems in modern design. The documentary Into Eternity captured this beautifully.',
        likes: 42
      }
    ]
  },
  {
    id: 'urban-soundscape-acoustic-ecology',
    title: 'The Urban Soundscape: Acoustic Ecology and the Geometry of City Echoes',
    deck: 'Why the canyon streets of modern glass metropolises assault the nervous system, and how acoustic architecture can restore sonic sanity.',
    volume: 'Vol. XVIII',
    edition: 'Autumn Journal',
    category: 'Urbanism',
    publishedAt: 'August 11, 2026',
    readTime: '6 min read',
    readMinutes: 6,
    coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    coverImageCaption: 'Misty dusk falls over the dense stone courtyards and terracotta colonnades of historic Bologna.',
    author: {
      name: 'Matias Rossi',
      role: 'Acoustic Architect & Sound Field Archivist',
      institution: 'Laboratorio di Acustica Urbana',
      location: 'Milan, Italy',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      bio: 'Matias Rossi maps city soundscapes, designs public sound parks, and advises municipal planners on noise mitigation.'
    },
    tableOfContents: [
      { id: 'the-din-of-progress', title: '1. The Din of Progress' },
      { id: 'the-glass-canyon-trap', title: '2. The Glass Canyon Trap' },
      { id: 'sound-absorbing-colonnades', title: '3. Sound-Absorbing Colonnades' },
      { id: 'the-soundmark-repertoire', title: '4. The Soundmark Repertoire' }
    ],
    sections: [
      {
        id: 'the-din-of-progress',
        heading: '1. The Din of Progress',
        paragraphs: [
          'In 1977, Canadian composer R. Murray Schafer published *The Soundscape: Our Sonic Environment and the Tuning of the World*. In it, he coined the distinction between "hi-fi" and "lo-fi" soundscapes. In a hi-fi soundscape—such as a pre-industrial village or a mountain valley—subtle, discrete sounds can be heard clearly: church bells three miles away, horse hooves on wet cobblestones, water splashing against a fountain basin.',
          'In our contemporary lo-fi metropolis, all distinct soundmarks are buried beneath an unrelenting carpet of low-frequency acoustic sludge: HVAC compressors, diesel bus engines, and tire friction on asphalt. The nervous system lives in perpetual sub-conscious alarm.'
        ],
        pullQuote: {
          text: 'We have treated the city as an eye-only sculpture, forgetting that our ears never sleep and cannot blink.',
          author: 'Matias Rossi, Acoustic Manifesto for Dense Cities, 2025'
        }
      },
      {
        id: 'the-glass-canyon-trap',
        heading: '2. The Glass Canyon Trap',
        paragraphs: [
          'The crisis of urban noise is fundamentally an architectural geometry problem. When skyscraper developers wrap fifty-story towers in smooth, flat glass curtain walls, they create vertical sound mirrors. A delivery truck accelerating down Manhattan’s Sixth Avenue does not merely produce seventy-five decibels of noise at street level; its sound waves bounce between opposite glass facades, reverberating up the canyon and multiplying in acoustic intensity.'
        ]
      },
      {
        id: 'sound-absorbing-colonnades',
        heading: '3. Sound-Absorbing Colonnades',
        paragraphs: [
          'Contrast this with historical cities like Bologna, where forty kilometers of vaulted porticoes line the streets. The colonnade is an exquisite acoustic trap: sound waves enter the arched ceiling spaces, bounce through irregular terracotta capitals, and are diffused and scattered before they can echo back into the public thoroughfare.',
          'By reintroducing porous masonry, vegetated vertical pocket gardens, and micro-perforated acoustic panels to lower building facades, modern cities could reduce perceived ambient noise levels by eight to twelve decibels without banning a single vehicle.'
        ]
      },
      {
        id: 'the-soundmark-repertoire',
        heading: '4. The Soundmark Repertoire',
        paragraphs: [
          'A healthy city is not silent. Silence is sterile and dead. A humane city is one where water fountain jets mask traffic rumble, where wind whispers through birch leaves in public plazas, and where human voices can be heard without screaming. Let us design for the ear as tenderly as we design for the eye.'
        ]
      }
    ],
    keyInsights: [
      'Glass skyscraper facades act as acoustic mirrors that amplify vehicle noise into canyon reverberation.',
      'Historic architectural forms like vaulted porticoes serve as natural sonic diffusers.',
      'Urban wellness depends on preserving distinct localized soundmarks rather than blanket acoustic sludge.'
    ],
    citations: [
      'Schafer, R. Murray. The Soundscape: Our Sonic Environment. Destiny Books, 1994.',
      'Blesser, Barry and Salter, Linda-Ruth. Spaces Speak, Are You Listening? MIT Press, 2007.',
      'LaBelle, Brandon. Acoustic Territories: Sound Culture and Everyday Life. Bloomsbury, 2019.'
    ],
    initialClaps: 310,
    initialComments: [
      {
        id: 'c10',
        author: 'Chiara Bellini',
        location: 'Bologna, Italy',
        date: 'August 14, 2026',
        content: 'Walking under the Portico di San Luca during a heavy rain is an auditory experience like no other. You hear the rain on the tiles above, but your conversation remains as clear as in a private study.',
        likes: 29
      }
    ]
  },
  {
    id: 'the-analog-refuge-paper-notebooks',
    title: 'The Analog Refuge: Why We Yearn for Paper Notebooks in a Digital Orbit',
    deck: 'Blank vellum, fountain pen nibs, and the psychological solace of unmonitored thought free from telemetry and notification chimes.',
    volume: 'Vol. XVIII',
    edition: 'Autumn Journal',
    category: 'Philosophy',
    publishedAt: 'July 31, 2026',
    readTime: '5 min read',
    readMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    coverImageCaption: 'A hand-bound linen journal lying open beside a brass fountain pen on an antique oak writing desk.',
    author: {
      name: 'Astrid Dahl',
      role: 'Cultural Anthropologist & Essayist',
      institution: 'Nordic Centre for Digital Humanities',
      location: 'Copenhagen, Denmark',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Astrid Dahl explores contemplative practices, attention economics, and everyday rituals of slow living.'
    },
    tableOfContents: [
      { id: 'the-panopticon-of-the-cloud', title: '1. The Panopticon of the Cloud' },
      { id: 'the-weight-of-the-nib', title: '2. The Weight of the Nib' },
      { id: 'the-sacredness-of-bad-drafts', title: '3. The Sacredness of Bad Drafts' },
      { id: 'quiet-sovereignty', title: '4. Quiet Sovereignty' }
    ],
    sections: [
      {
        id: 'the-panopticon-of-the-cloud',
        heading: '1. The Panopticon of the Cloud',
        paragraphs: [
          'Open a modern word processor or note-taking application. In the top right corner, a subtle icon informs you: *Synced to Cloud 2 seconds ago*. AI suggestion popups hover over your incomplete sentences, trying to finish your clauses before you have discovered what you actually think. At any moment, an email alert, a team chat ping, or a calendar reminder can shatter the delicate fragile meniscus of your contemplation.',
          'In the cloud, writing is no longer a private act of self-discovery; it is a tracked digital workflow, subject to analytics, version tracking, and algorithmic surveillance.'
        ],
        pullQuote: {
          text: 'A notebook is an asylum for the unformed self. Here, you are not performing for an audience; you are listening to your own pulse.',
          author: 'Astrid Dahl, Solitude and the Page, 2026'
        }
      },
      {
        id: 'the-weight-of-the-nib',
        heading: '2. The Weight of the Nib',
        paragraphs: [
          'Now close the laptop and lay open a stitched notebook made of eighty-gram cream Tomoe River paper. Take a fountain pen filled with deep walnut-gall ink. The nib touches the paper with a tiny, delicious friction. There is no backspace key; there is no cut-and-paste. If you change your mind, you draw a single, quiet line through the error and keep walking.',
          'The hand moves at the exact speed of thoughtful reflection—roughly twenty words per minute. On a mechanical keyboard, we can type eighty words a minute, which often means we type four times faster than we think. The notebook forces a deceleration that restores philosophical weight to language.'
        ]
      },
      {
        id: 'the-sacredness-of-bad-drafts',
        heading: '3. The Sacredness of Bad Drafts',
        paragraphs: [
          'Digital screens tempt us into premature perfection. Because digital fonts look finished from the first keystroke, we trick ourselves into believing that our messy early thoughts should look polished. On paper, messy handwriting mirrors the honest, chaotic infancy of an idea: arrows loop across margins, contradictory sentences sit peacefully side by side, and marginal sketches explore tangents that no outline algorithm would permit.'
        ]
      },
      {
        id: 'quiet-sovereignty',
        heading: '4. Quiet Sovereignty',
        paragraphs: [
          'A paper notebook does not run out of battery. It cannot be hacked remotely. It will not demand that you accept updated privacy terms of service before opening its covers. It sits quietly on your nightstand, waiting patiently for your next thought.',
          'In an era that seeks to turn every waking human minute into a monetizable telemetry stream, closing the screen and opening a paper notebook is nothing short of an act of quiet sovereignty.'
        ]
      }
    ],
    keyInsights: [
      'Physical paper removes the threat of algorithmic prediction, allowing genuine cognitive gestation.',
      'Manual writing speed synchronizes with deep reflective pacing rather than reactive velocity.',
      'Analog notebooks provide permanent privacy without third-party terms of service.'
    ],
    citations: [
      'Carr, Nicholas. The Shallows: What the Internet Is Doing to Our Brains. W.W. Norton, 2010.',
      'Newport, Cal. Deep Work: Rules for Focused Success. Grand Central Publishing, 2016.',
      'Benjamin, Walter. The Arcades Project. Belknap Press, 1999.'
    ],
    initialClaps: 478,
    initialComments: [
      {
        id: 'c11',
        author: 'Lukas Meyer',
        location: 'Vienna, Austria',
        date: 'August 2, 2026',
        content: '“A notebook is an asylum for the unformed self.” That phrase hit me right between the eyes. I have kept a Midori traveler’s notebook for twelve years; it is my most prized possession.',
        likes: 38
      }
    ]
  }
];

export const EDITORIAL_COLLECTIONS = [
  { id: 'all', name: 'All Essays' },
  { id: 'Architecture', name: 'Architecture & Stone' },
  { id: 'Cartography', name: 'Cartography & Maps' },
  { id: 'Horology', name: 'Horology & Mechanics' },
  { id: 'Typography', name: 'Typography & Print' },
  { id: 'Craft & Design', name: 'Craft & Design' },
  { id: 'Speculative Design', name: 'Speculative Design' },
  { id: 'Philosophy', name: 'Philosophy' },
  { id: 'Urbanism', name: 'Urbanism' }
];
