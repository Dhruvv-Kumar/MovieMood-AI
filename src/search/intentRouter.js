import resolveGenres from "../resolvers/genreResolver";
import resolveLanguage from "../resolvers/languageResolver";

const actorAliases = {  // ==========================
  // Bollywood
  // ==========================

  aamir: "Aamir Khan",
  "aamir khan": "Aamir Khan",

  hrithik: "Hrithik Roshan",
  "hrithik roshan": "Hrithik Roshan",

  amitabh: "Amitabh Bachchan",
  "amitabh bachchan": "Amitabh Bachchan",
  bigb: "Amitabh Bachchan",
  "big b": "Amitabh Bachchan",

  saif: "Saif Ali Khan",
  "saif ali khan": "Saif Ali Khan",

  shahid: "Shahid Kapoor",
  "shahid kapoor": "Shahid Kapoor",

  kartik: "Kartik Aaryan",
  "kartik aaryan": "Kartik Aaryan",

  tiger: "Tiger Shroff",
  "tiger shroff": "Tiger Shroff",

  vicky: "Vicky Kaushal",
  "vicky kaushal": "Vicky Kaushal",

  sidharth: "Sidharth Malhotra",
  siddharth: "Sidharth Malhotra",
  "sidharth malhotra": "Sidharth Malhotra",

  varun: "Varun Dhawan",
  "varun dhawan": "Varun Dhawan",

  john: "John Abraham",
  "john abraham": "John Abraham",

  emraan: "Emraan Hashmi",
  imran: "Emraan Hashmi",
  "emraan hashmi": "Emraan Hashmi",

  rajkummar: "Rajkummar Rao",
  rajkumar: "Rajkummar Rao",
  "rajkummar rao": "Rajkummar Rao",

  ayushmann: "Ayushmann Khurrana",
  "ayushmann khurrana": "Ayushmann Khurrana",

  sunny: "Sunny Deol",
  "sunny deol": "Sunny Deol",

  sanjay: "Sanjay Dutt",
  "sanjay dutt": "Sanjay Dutt",

  jackie: "Jackie Shroff",
  "jackie shroff": "Jackie Shroff",

  arjun: "Arjun Kapoor",
  "arjun kapoor": "Arjun Kapoor",

  bobby: "Bobby Deol",
  "bobby deol": "Bobby Deol",

  abhishek: "Abhishek Bachchan",
  "abhishek bachchan": "Abhishek Bachchan",

  madhavan: "R. Madhavan",
  "r madhavan": "R. Madhavan",
  "r. madhavan": "R. Madhavan",

  irrfan: "Irrfan Khan",
  irfan: "Irrfan Khan",
  "irrfan khan": "Irrfan Khan",

  manoj: "Manoj Bajpayee",
  "manoj bajpayee": "Manoj Bajpayee",

  pankaj: "Pankaj Tripathi",
  "pankaj tripathi": "Pankaj Tripathi",

  nawazuddin: "Nawazuddin Siddiqui",
  nawaz: "Nawazuddin Siddiqui",
  "nawazuddin siddiqui": "Nawazuddin Siddiqui",

  // ==========================
  // South Indian
  // ==========================

  "ram charan": "Ram Charan",

  mahesh: "Mahesh Babu",
  "mahesh babu": "Mahesh Babu",

  ajith: "Ajith Kumar",
  "ajith kumar": "Ajith Kumar",

  dhanush: "Dhanush",

  suriya: "Suriya",

  kamal: "Kamal Haasan",
  "kamal haasan": "Kamal Haasan",

  rajini: "Rajinikanth",
  rajinikanth: "Rajinikanth",
  superstar: "Rajinikanth",

  deverakonda: "Vijay Deverakonda",
  "vijay deverakonda": "Vijay Deverakonda",

  dulquer: "Dulquer Salmaan",
  "dulquer salmaan": "Dulquer Salmaan",

  fahadh: "Fahadh Faasil",
  fahad: "Fahadh Faasil",
  "fahadh faasil": "Fahadh Faasil",

  mammootty: "Mammootty",

  mohanlal: "Mohanlal",

  nani: "Nani",

  rishab: "Rishab Shetty",
  "rishab shetty": "Rishab Shetty",

    // ==========================
  // Hollywood
  // ==========================

  leo: "Leonardo DiCaprio",
  leonardo: "Leonardo DiCaprio",
  dicaprio: "Leonardo DiCaprio",
  "leonardo dicaprio": "Leonardo DiCaprio",

  cruise: "Tom Cruise",
  "tom cruise": "Tom Cruise",

  brad: "Brad Pitt",
  "brad pitt": "Brad Pitt",

  rdj: "Robert Downey Jr.",
  downey: "Robert Downey Jr.",
  "robert downey": "Robert Downey Jr.",
  "robert downey jr": "Robert Downey Jr.",
  "robert downey jr.": "Robert Downey Jr.",

  hemsworth: "Chris Hemsworth",
  "chris hemsworth": "Chris Hemsworth",

  evans: "Chris Evans",
  "chris evans": "Chris Evans",

  reynolds: "Ryan Reynolds",
  "ryan reynolds": "Ryan Reynolds",

  gosling: "Ryan Gosling",
  "ryan gosling": "Ryan Gosling",

  keanu: "Keanu Reeves",
  reeves: "Keanu Reeves",
  "keanu reeves": "Keanu Reeves",

  depp: "Johnny Depp",
  "johnny depp": "Johnny Depp",

  rock: "Dwayne Johnson",
  "the rock": "Dwayne Johnson",
  dwayne: "Dwayne Johnson",
  "dwayne johnson": "Dwayne Johnson",

  statham: "Jason Statham",
  "jason statham": "Jason Statham",

  "will smith": "Will Smith",

  hanks: "Tom Hanks",
  "tom hanks": "Tom Hanks",

  morgan: "Morgan Freeman",
  freeman: "Morgan Freeman",
  "morgan freeman": "Morgan Freeman",

  bale: "Christian Bale",
  "christian bale": "Christian Bale",

  cillian: "Cillian Murphy",
  murphy: "Cillian Murphy",
  "cillian murphy": "Cillian Murphy",

  joaquin: "Joaquin Phoenix",
  phoenix: "Joaquin Phoenix",
  "joaquin phoenix": "Joaquin Phoenix",

  hugh: "Hugh Jackman",
  jackman: "Hugh Jackman",
  "hugh jackman": "Hugh Jackman",

  benedict: "Benedict Cumberbatch",
  cumberbatch: "Benedict Cumberbatch",
  "benedict cumberbatch": "Benedict Cumberbatch",

  henry: "Henry Cavill",
  cavill: "Henry Cavill",
  "henry cavill": "Henry Cavill",

  timothee: "Timothée Chalamet",
  chalamet: "Timothée Chalamet",
  "timothée chalamet": "Timothée Chalamet",

  "michael b jordan": "Michael B. Jordan",
  "michael b. jordan": "Michael B. Jordan",

  sandler: "Adam Sandler",
  "adam sandler": "Adam Sandler",

  damon: "Matt Damon",
  "matt damon": "Matt Damon",

  mark: "Mark Wahlberg",
  wahlberg: "Mark Wahlberg",
  "mark wahlberg": "Mark Wahlberg",

  samuel: "Samuel L. Jackson",
  jackson: "Samuel L. Jackson",
  "samuel l jackson": "Samuel L. Jackson",

  deniro: "Robert De Niro",
  "de niro": "Robert De Niro",
  "robert de niro": "Robert De Niro",

  pacino: "Al Pacino",
  "al pacino": "Al Pacino",

  arnold: "Arnold Schwarzenegger",
  schwarzenegger: "Arnold Schwarzenegger",

  stallone: "Sylvester Stallone",
  "sylvester stallone": "Sylvester Stallone",

  diesel: "Vin Diesel",
  "vin diesel": "Vin Diesel",

  momoa: "Jason Momoa",
  "jason momoa": "Jason Momoa",

  andrew: "Andrew Garfield",
  garfield: "Andrew Garfield",
  "andrew garfield": "Andrew Garfield",

  tobey: "Tobey Maguire",
  maguire: "Tobey Maguire",
  "tobey maguire": "Tobey Maguire",

  holland: "Tom Holland",
  "tom holland": "Tom Holland",

  craig: "Daniel Craig",
  "daniel craig": "Daniel Craig",

  orlando: "Orlando Bloom",
  bloom: "Orlando Bloom",
  "orlando bloom": "Orlando Bloom",

  colin: "Colin Farrell",
  farrell: "Colin Farrell",
  "colin farrell": "Colin Farrell",

  liam: "Liam Neeson",
  neeson: "Liam Neeson",
  "liam neeson": "Liam Neeson",

  zac: "Zac Efron",
  efron: "Zac Efron",
  "zac efron": "Zac Efron",

  channing: "Channing Tatum",
  tatum: "Channing Tatum",
  "channing tatum": "Channing Tatum",

  jake: "Jake Gyllenhaal",
  gyllenhaal: "Jake Gyllenhaal",
  "jake gyllenhaal": "Jake Gyllenhaal",

  oscar: "Oscar Isaac",
  "oscar isaac": "Oscar Isaac",

  pedro: "Pedro Pascal",
  pascal: "Pedro Pascal",
  "pedro pascal": "Pedro Pascal",

  jeremy: "Jeremy Renner",
  renner: "Jeremy Renner",
  "jeremy renner": "Jeremy Renner",

  pratt: "Chris Pratt",
  "chris pratt": "Chris Pratt",

  "paul rudd": "Paul Rudd",
  "jude law": "Jude Law",
  "ben affleck": "Ben Affleck",

    // ==========================
  // Classic Bollywood
  // ==========================

  dilip: "Dilip Kumar",
  "dilip kumar": "Dilip Kumar",

  "raj kapoor": "Raj Kapoor",

  dev: "Dev Anand",
  "dev anand": "Dev Anand",

  "ashok kumar": "Ashok Kumar",

  "guru dutt": "Guru Dutt",

  shammi: "Shammi Kapoor",
  "shammi kapoor": "Shammi Kapoor",

  dharmendra: "Dharmendra",

  jeetendra: "Jeetendra",

  "vinod khanna": "Vinod Khanna",

  "shashi kapoor": "Shashi Kapoor",

  shatrughan: "Shatrughan Sinha",
  "shatrughan sinha": "Shatrughan Sinha",

  rajesh: "Rajesh Khanna",
  "rajesh khanna": "Rajesh Khanna",

  sanjeev: "Sanjeev Kumar",
  "sanjeev kumar": "Sanjeev Kumar",

  feroz: "Feroz Khan",
  "feroz khan": "Feroz Khan",

  pran: "Pran",

  amrish: "Amrish Puri",
  "amrish puri": "Amrish Puri",

  "om puri": "Om Puri",

  naseeruddin: "Naseeruddin Shah",
  naseer: "Naseeruddin Shah",

  anil: "Anil Kapoor",
  "anil kapoor": "Anil Kapoor",

  govinda: "Govinda",

  rishi: "Rishi Kapoor",
  "rishi kapoor": "Rishi Kapoor",

  mithun: "Mithun Chakraborty",
  "mithun chakraborty": "Mithun Chakraborty",

  "sunil dutt": "Sunil Dutt",

  "manoj kumar": "Manoj Kumar",

  "balraj sahni": "Balraj Sahni",

  mehmood: "Mehmood",

  "johnny walker": "Johnny Walker",

  "prem chopra": "Prem Chopra",

  "kader khan": "Kader Khan",

  paresh: "Paresh Rawal",
  "paresh rawal": "Paresh Rawal",

  "amjad khan": "Amjad Khan",

  "raj babbar": "Raj Babbar",

  "farooq sheikh": "Farooq Sheikh",

  "vinod mehra": "Vinod Mehra",

  danny: "Danny Denzongpa",
  "danny denzongpa": "Danny Denzongpa",

  rekha: "Rekha",

  hema: "Hema Malini",
  "hema malini": "Hema Malini",

  sridevi: "Sridevi",

  madhubala: "Madhubala",

  nargis: "Nargis",

  "meena kumari": "Meena Kumari",

  waheeda: "Waheeda Rehman",
  "waheeda rehman": "Waheeda Rehman",

  nutan: "Nutan",

  mumtaz: "Mumtaz",

  zeenat: "Zeenat Aman",
  "zeenat aman": "Zeenat Aman",

  // ==========================
  // Classic Hollywood
  // ==========================

  marlon: "Marlon Brando",
  brando: "Marlon Brando",

  chaplin: "Charlie Chaplin",
  charlie: "Charlie Chaplin",

  "cary grant": "Cary Grant",

  gregory: "Gregory Peck",
  "gregory peck": "Gregory Peck",

  "james stewart": "James Stewart",

  bogart: "Humphrey Bogart",

  "clark gable": "Clark Gable",

  connery: "Sean Connery",

  eastwood: "Clint Eastwood",

  "paul newman": "Paul Newman",

  "steve mcqueen": "Steve McQueen",

  hopkins: "Anthony Hopkins",

  "jack nicholson": "Jack Nicholson",

  hoffman: "Dustin Hoffman",

  hackman: "Gene Hackman",

  "kirk douglas": "Kirk Douglas",

  caine: "Michael Caine",

  "christopher lee": "Christopher Lee",

  robin: "Robin Williams",
  "robin williams": "Robin Williams",

  "richard burton": "Richard Burton",

  olivier: "Laurence Olivier",

  "peter o'toole": "Peter O'Toole",

  poitier: "Sidney Poitier",

  audrey: "Audrey Hepburn",
  hepburn: "Audrey Hepburn",

  marilyn: "Marilyn Monroe",
  monroe: "Marilyn Monroe",

  "elizabeth taylor": "Elizabeth Taylor",

  "grace kelly": "Grace Kelly",

  "sophia loren": "Sophia Loren",

  bergman: "Ingrid Bergman",

  "vivien leigh": "Vivien Leigh",

  "katharine hepburn": "Katharine Hepburn",

  "bette davis": "Bette Davis",

  "joan crawford": "Joan Crawford",

  meryl: "Meryl Streep",
  streep: "Meryl Streep",

  jodie: "Jodie Foster",
  foster: "Jodie Foster",

  julia: "Julia Roberts",
  roberts: "Julia Roberts",

  michelle: "Michelle Pfeiffer",
  pfeiffer: "Michelle Pfeiffer",

  "sharon stone": "Sharon Stone",

  meg: "Meg Ryan",

  sandra: "Sandra Bullock",
  bullock: "Sandra Bullock",

  nicole: "Nicole Kidman",
  kidman: "Nicole Kidman",

  "glenn close": "Glenn Close",

  sigourney: "Sigourney Weaver",
  weaver: "Sigourney Weaver",

  emma: "Emma Thompson",
  thompson: "Emma Thompson",

  diane: "Diane Keaton",

  susan: "Susan Sarandon",

  goldie: "Goldie Hawn",

  sally: "Sally Field",
  
};

const franchiseAliases = {
  marvel: "Marvel",
  mcu: "Marvel",
  avengers: "Avengers",

  dc: "DC",

  batman: "Batman",
  superman: "Superman",
  joker: "Joker",

  spiderman: "Spider-Man",
  "spider man": "Spider-Man",
  spider: "Spider-Man",

  venom: "Venom",
  electro: "Electro",
  thanos: "Thanos",

  ironman: "Iron Man",
  "iron man": "Iron Man",

  thor: "Thor",
  loki: "Loki",

  harry: "Harry Potter",
  "harry potter": "Harry Potter",

  conjuring: "The Conjuring",

  fast: "Fast & Furious",
  furious: "Fast & Furious",

  mission: "Mission Impossible",

  anime: "Anime",
};

const aiKeywords = [
  "feel",
  "feeling",
  "mood",
  "office",
  "recommend",
  "suggest",
  "similar",
  "like",
  "similar to",
  "based on",
  "mind bending",
  "mind blowing",
  "plot twist",
  "ending",
  "villain",
  "hero",
  "psychological",
  "underrated",
  "masterpiece",
  "relationship",
  "revenge",
  "survival",
  "time travel",
  "space",
  "dream",
  "multiverse",
  "serial killer",
  "zombie",
  "alien",
  "detective",
  "love story",
  "college",
  "school",
  "after work",
  "weekend",
  "sad",
  "happy",
  "lonely",
  "emotional",
  "scary",
  "dark",
  "best",
];

export default function resolveIntent(_, prompt) {
  if (!prompt?.trim()) return null;

  const text = prompt.trim().toLowerCase();

  const words = text.split(/\s+/);

  const isSimpleSearch =
    words.length <= 3 &&
    !aiKeywords.some((keyword) => text.includes(keyword));

  // TV / Web Series
  if (/\b(web\s*series|series|tv\s*series|tv\s*show|show)\b/.test(text)) {
    return {
      type: "tv",
      query: prompt,
    };
  }

  // Actor Search
  for (const key of Object.keys(actorAliases)) {
    if (text.includes(key)) {
      return {
        type: "actor",
        person: actorAliases[key],
      };
    }
  }

  // Franchise / Character Search
  for (const key of Object.keys(franchiseAliases)) {
    if (text.includes(key)) {
      return {
        type: "franchise",
        query: franchiseAliases[key],
      };
    }
  }

  // Simple Genre Search
  const genres = resolveGenres(text);

  if (genres.length && isSimpleSearch) {
    return {
      type: "discover",
      genres,
      ...resolveLanguage(text),
      query: prompt,
    };
  }

  // Natural Language → AI
  if (!isSimpleSearch) {
    return {
      type: "ai",
      prompt,
    };
  }

  // Default Search
  return {
    type: "movie",
    query: prompt,
  };
}