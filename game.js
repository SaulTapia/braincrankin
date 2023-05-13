var lang = {
    "en" : {
        "no_name_error" : "No name provided.",
        "name_must_be_string": "Name must be a string.",
        "name_too_long": "Name is too long.",
        "name_length_zero": "Name must have at least one character.",
        "full_players": "Party is full.",
        "game_already_started": "This party is currently in-game, please wait for them to finish before joining.",
        "classic" : "Classic",
        "classic_desc" : "Write prompts and then make drawings from those prompts!",
        "faceoff" : "Face off",
        "faceoff_desc" : "Come up with characters to beat one another!",
        "coming_soon" : "Coming soon...",
        "write_prompt": "Type an idea!",
        "draw_from_prompt": "Draw this!",
        "write_prompt_from_drawing": "What is this?",
        "show" : "show",
        "next": "next",
        "players": "players",
        'gamemodes' : "gamemodes",
        'lobby_guest_text': "waiting for the host to start the game...",
        'nickname': "choose a nickname",
        'start': "Start!",
        "empty_slot": "Empty slot",
        "game_results": "Game results",
        "invite": "Invite",
        "versus_first": "Make a character and name it!",
        "versus_fight": "Make a character to beat the opponent!",
        "done": "done",
        "edit": "edit",
        "extra_rounds": "Extra rounds",
        "writer_name": "drunk writer",
        "writer_desc": "Take turns finishing each other's sentences to write a crazy story!",
        "writer_first": "Write the start of the story!",
        "writer_round": "Continue the story!",
        "time_travel": "Time-traveling Troubles",
        "time_travel_desc": "Fix problems by going to the past!",
        "time_travel_first": "Describe and draw a problematic situation",
        "time_travel_solution": "Prevent this from happening by traveling to the past!",
        "time_travel_problem": "What future consequences will this have?"
    },
    "es": {
        "no_name_error" : "No se recibió un nombre.",
        "name_must_be_string": "El nombre debe ser un String",
        "name_too_long": "El nombre es demasiado largo.",
        "name_length_zero": "El nombre debe tener al menos un caracter.",
        "full_players": "La partida esta llena.",
        "game_already_started": "Esta partida ya inició. Por favor espera a que termine.",
        "classic" : "Clásico",
        "classic_desc" : "Escribe ideas y otros las dibujarán!",
        "faceoff" : "Batalla",
        "faceoff_desc" : "Crea personajes para vencer a los demás!",
        "coming_soon" : "Proximamente...",
        "write_prompt": "Escribe algo!",
        "draw_from_prompt": "Dibuja esto!",
        "write_prompt_from_drawing": "¿Qué es esto?",
        "show" : "Mostrar",
        "next": "Siguiente",
        "players": "Jugadores",
        'gamemodes' : "Modos de juego",
        'lobby_guest_text': "Esperando que el anfitrión inicie el juego..",
        'nickname': "Escoge un nombre",
        'start': "Iniciar!",
        "empty_slot": "Lugar vacío",
        "game_results": "resultados del juego",
        "invite": "Invitar",
        "versus_first": "Crea a un personaje y dale nombre!",
        "versus_fight": "Crea a un personaje para derrotar al oponente!",
        "done": "listo",
        "edit": "editar",
        "extra_rounds": "Rondas extra",
        "writer_name": "escritor borracho",
        "writer_desc": "Complementa las historias de otras personas para escribir juntos una historia loca!",
        "writer_first": "Escribe el inicio de la historia",
        "writer_round": "Continúa la historia!",
        "time_travel": "Tiempo Fuera",
        "time_travel_desc": "Arregla problemas yendo al pasado!",
        "time_travel_first": "Describe y dibuja una situación problemática",
        "time_travel_solution": "¡Evita que esto pase yendo al pasado!",
        "time_travel_problem": "¿Qué consecuencia tendrá esto?"
    }
}


const gameModes = [
    {
        "name" : "classic",
        "desc" : "classic_desc",
        "gameStyle" : "classic",
        "time-limit-secs" : 40
    },
    {
        "name" : "faceoff",
        "desc" : "faceoff_desc",
        "gameStyle" : "versus",
        "time-limit-secs": 40
    },
    {
        "name" : "time_travel",
        "desc" : "time_travel_desc",
        "gameStyle" : "time_travel",
        "time-limit-secs": 40
    },
    // {
    //     "name" : "news",
    //     "desc" : "news_desc",
    //     "gameStyle" : "news",
    //     "time-limit-secs": 40
    // },
    // {
    //     "name" : "writer_name",
    //     "desc" : "writer_desc",
    //     "gameStyle" : "writer",
    //     "time-limit-secs": 30,
    // }
]

const colors = [
    // grayscale
    "#000000",
    "#616569",
    "#FFFFFF",
    // blue-ish
    "#0000FF", //PURE BLUE
    "#0080FF", 
    "#00f2ff",
    // green
    "#00FF00", //PURE GREEN
    "#185E3F", //
    "#589F7E", //BLUEISH
    //red
    "#FF0000", //PURE RED
    "#80091B",
    "#C82F25",
    //yellow,
    "#FFDD00",
    "#D9C121",
    "#E6CB5F",
    //brown / orange
    "#5F331F",
    "#FF7722",
    "#FF9B49",
    // Purple
    "#663399",
    "#800080",
    "#A020F0",
    // Pink
    "#FF007F",
    "#F77FBE",
    "#FFDDF4"
]

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    }
  };
  

const widths = [
    2,
    5,
    10,
    20,
    25
]
function removeAllChildren(element_) {
    while(element_.firstElementChild) {
        element_.removeChild(element_.lastElementChild);
    }
}
    
const params = new URLSearchParams(window.location.search);

console.log(lang)
var language = navigator.language || navigator.userLanguage;
language = language.slice(0,2)
console.log("Language is: " + language)
if(!(lang[language])) {
    language = "en"
}
console.log("Language is: " + language)

class IdeaGenerator
{
    constructor() {
        this.ideaData = {
            "en": {            
                "idea": [
                    "%creature% at %place%",
                    "%creature% in %region%",
                    "%adjective% %creature% at %place%",
                    "%adjective% %creature% in %region%",
                    "%creature% %doing x% at %place%",
                    "%creature% %doing x% in %region%",
                    "%adjective% %creature% %doing x% at %place%",
                    "%adjective% %creature% %doing x% in %region%",
                ],
                "character": [
                    "%superlative% %creature% ever",
                    "the %single attribute% %creature%",
                    "the %item% %title%",
                ],
                "problem": [
                    "the downfall of every %creature%",
                    "%character% %aggression%",
                ],
                "solution": [
                    "%aggression_general% %region%",
                    "%aggression_general% %character%",
                    "%action% at %place%",
                    "%action% in %region%",
                    "%prohibition% %doing x%",
                    "%prohibition% %doing x% at %place%",
                    "%prohibition% %doing x% in %region%",
                ],
                "prohibition": [
                    "ban",
                    "encourage",
                    "outlaw",
                    "demonize",
                    "discourage",
                    "praise",                
                ],
                "action": [
                    "yell",
                    "talk",
                    "walk",
                    "jump",
                    "work",
                    "record",
                    "investigate",
                    "fight",
                    "draw",
                    "sit",
                    "dance",
                    "sing",
                ],
                "good_general": [
                    "restore",
                    "praise",
                    "thank",

                ],
                "aggression_general": [
                    "blow up",
                    "destroy",
                    "burn",
                    "flood",
                    "attack",                
                    "delete",
                ],
                "aggression": [
                    "attacks",
                    "invades",
                    "dies",
                    "explodes",
                    "snaps",
                ],
                "creature": [
                    "man",
                    "woman",
                    "person",
                    "goblin",
                    "human",
                    "demon",
                    "angel",
                    "ghost",
                    "robot",
                    "alien",
                    "zombie",
                    "wolf",
                    "dog",
                    "penguin",
                    "king",
                    "queen",
                    "tree",
                    "ogre",
                    "hamster",
                    "dragon",
                    "wizard",
                    "sorcerer",
                    "warrior",
                    "turtle",
                    // "god",
                    "fish",
                    "bird",
                    "duck",
                    "bug",
                    "spider",
                    "bear",
                    "plant",
                    "lady",
                    "businessman",
                    // "millionaire",
                    "mercenary",
                    "priest",
                    // "cultist",
                    // "tyrant",
                    "loser",
                    "bee",
                    "flower",
                    "snake",
                    "spy",
                    // "communist",
                    "chef",
                    "thief",
                    // "police officer",
                    "mushroom",
                    "bacteria",
                    // "parasite",
                    "werewolf",
                    "rat",
                    "fairy",
                    "cat",
                    "frog",
                    "witch",
                    // "lord",
                    "dwarf",
                    "shark",
                    "monkey",
                    "president",
                    "agent",
                    "monster",
                    "astronaut",
                    "scientist",
                    "programmer",
                    "explorer",
                    // "%element%bender",
                    "elf",
                    "cowboy",
                    "dinosaur",
                    "cow",
                    "cowboy",
                    "unicorn",
                    // "soldier",
                    "crow",
                    "skeleton",
                    "bandit",
                    "chicken",
                    "crab",
                    "mammoth",
                    "squid",
                    "cyclops",
                    "phoenix",
                    "dolphin",
                    "mermaid",
                    "cyborg",
                    // "%element% elemental",
                    "spirit",
                    // "%element% spirit",
                    "student",
                    "teacher",
                    "doctor",
                    "musician",
                    "dancer",
                    "singer",
                    "mother",
                    "poet",
                    "writer",                
                    "bug",
                    "insect",
                    "mathematician",
                    "ninja",
                    "samurai",
                    "physicist",
                    "pony",
                    "sheep",
                    "computer",
                    "vamipre",
                    "artist",
                    "rabbit",
                    "yeti",
                    "serpent",
                    "minotaur",
                    "golem",
                    "eagle",
                    "bat",
                    "beast",
                    "seal",
                    "beetle",
                    "alligator"
                ],
                "single attribute": [                
                    "%supreme attribute%",
                    "%superlative%",
                    "%adjective%",                
                ],
                "supreme attribute": [
                    "supreme",
                    "ultimate",
                    "incredible",                
                ],
                "superlative": [
                    "best",
                    "worst",
                    "saddest",
                    "angriest",
                    "happiest",
                    "most insane",
                    "maddest",
                    "most giant",
                    "most anxious",
                    "coolest",
                    "most awesome",
                    "craziest",
                    "wildest",
                    "most savage",
                    "most muscular",
                    "smartest",
                    "most intelligent",
                    "strongest",
                    "weakest",
                    "funniest",
                    "goofiest",
                    "scariest",
                    "tallest",
                    "shortest",
                    "greatest",
                    "holiest",
                    "most evil",
                ],
                "adjective": [
                    "sad",
                    "angry",
                    "happy",
                    "insane",
                    "mad",
                    "giant",
                    "anxious",
                    "cool",
                    "awesome",
                    "crazy",
                    "wild",
                    "savage",
                    "muscular",
                    "smart",
                    "intelligent",
                    "strong",
                    "weak",
                    "funny",
                    "goofy",
                    "scary",
                    "tall",
                    "short",
                    "great",
                    "holy",
                    "evil",
                ],
                "doing x": [
                    "yelling",
                    "talking",
                    "walking",
                    "jumping",
                    "working",
                    "recording",
                    "investigating",
                    "fighting",
                    "drawing",
                    "sitting",
                    "dancing",
                    "singing",
                    "gaming",
                    "dying",                
                ],
                "item": [
                    "fruit",
                    "computer",
                    "cup",
                    "broom",
                    "dumbbell",
                    "fork",
                    "spoon",
                    "table",
                    "chair",
                    "tree",
                    "pear",
                    "book",
                    "cable",
                    "peanut",
                    "knife",
                    "car",
                    "plane",
                    "train",
                    "egg",
                    "ladder",
                    "bottle",
                    "glass",
                    "ruler",
                    "shoe",
                    "shirt",
                    "plate",
                    "microphone",
                    "speaker",
                    "guitar",                
                ],
                "title": [
                    "dealer",
                    "maniac",
                    "enthusiast",
                    "enjoyer",
                    "fanatic",
                    "trafficker",                
                ],
                "place": [ // At [place]
                    "the park",
                    "the library",
                    "a golf club",
                    "work",
                    "school",
                ],
                "region": [ // In [region]
                    "space",
                    "the wild",
                    "the desert",
                    "the jungle",
                    "a cave",
                    "the office",
                ]
            },
            // "es": {
            //     "idea": [
            //         "%creature% en %place%",                    
            //         "%creaturePlusAdjective% en %place%",                    
            //         "%uncreature% %doing x% en %place%",                                        
            //         "%creaturePlusAdjective% %doing x% en %place%",                    
            //     ],
            //     "creaturePlusAdjective": [
            //         "%creatureMale% %adjectiveMale%",
            //         "%creatureFemale% %adjectiveFemale%",
            //     ],
            //     "uncreature": [
            //         "un %creatureMale%",
            //         "una %creatureFemale",
            //     ],
            //     "character": [
            //         "el %creatureMale% más %superlativeMale%",                    
            //         "el %creatureMale% %single attribute%",
            //         "el %titleMale% de %item%",
            //         "la %creatureFemale% más %superlativeFemale%",                    
            //         "la %creatureFemale% %single attribute%",
            //         "el %titleFemale% de %item%",
            //     ],
            //     "problem": [
            //         "La caída de cada %creature%",                    
            //         "%character% %aggression%",
            //     ],
            //     "solution": [
            //         "%aggression_general% %place%",
            //         "%aggression_general% %character%",
            //         "%action% en %place%",                    
            //         "%prohibition% %doing x%",
            //         "%prohibition% %doing x% at %place%",                    
            //     ],
            //     "prohibition": [
            //         "ban",
            //         "encourage",
            //         "outlaw",
            //         "demonize",
            //         "discourage",
            //         "praise",                
            //     ],
            //     "action": [
            //         "yell",
            //         "talk",
            //         "walk",
            //         "jump",
            //         "work",
            //         "record",
            //         "investigate",
            //         "fight",
            //         "draw",
            //         "sit",
            //         "dance",
            //         "sing",
            //     ],
            //     "good_general": [
            //         "restore",
            //         "praise",
            //         "thank",

            //     ],
            //     "aggression_general": [
            //         "blow up",
            //         "destroy",
            //         "burn",
            //         "flood",
            //         "attack",                
            //         "delete",
            //     ],
            //     "aggression": [
            //         "attacks",
            //         "invades",
            //         "dies",
            //         "explodes",
            //         "snaps",
            //     ],
            //     "creature": [
            //         "man",
            //         "woman",
            //         "person",
            //         "goblin",
            //         "human",
            //         "demon",
            //         "angel",
            //         "ghost",
            //         "robot",
            //         "alien",
            //         "zombie",
            //         "wolf",
            //         "dog",
            //         "penguin",
            //         "king",
            //         "queen",
            //         "tree",
            //         "ogre",
            //         "hamster",
            //         "dragon",
            //         "wizard",
            //         "sorcerer",
            //         "warrior",
            //         "turtle",
            //         // "god",
            //         "fish",
            //         "bird",
            //         "duck",
            //         "bug",
            //         "spider",
            //         "bear",
            //         "plant",
            //         "lady",
            //         "businessman",
            //         // "millionaire",
            //         "mercenary",
            //         "priest",
            //         // "cultist",
            //         // "tyrant",
            //         "loser",
            //         "bee",
            //         "flower",
            //         "snake",
            //         "spy",
            //         // "communist",
            //         "chef",
            //         "thief",
            //         // "police officer",
            //         "mushroom",
            //         "bacteria",
            //         // "parasite",
            //         "werewolf",
            //         "rat",
            //         "fairy",
            //         "cat",
            //         "frog",
            //         "witch",
            //         // "lord",
            //         "dwarf",
            //         "shark",
            //         "monkey",
            //         "president",
            //         "agent",
            //         "monster",
            //         "astronaut",
            //         "scientist",
            //         "programmer",
            //         "explorer",
            //         // "%element%bender",
            //         "elf",
            //         "cowboy",
            //         "dinosaur",
            //         "cow",
            //         "cowboy",
            //         "unicorn",
            //         // "soldier",
            //         "crow",
            //         "skeleton",
            //         "bandit",
            //         "chicken",
            //         "crab",
            //         "mammoth",
            //         "squid",
            //         "cyclops",
            //         "phoenix",
            //         "dolphin",
            //         "mermaid",
            //         "cyborg",
            //         // "%element% elemental",
            //         "spirit",
            //         // "%element% spirit",
            //         "student",
            //         "teacher",
            //         "doctor",
            //         "musician",
            //         "dancer",
            //         "singer",
            //         "mother",
            //         "poet",
            //         "writer",                
            //         "bug",
            //         "insect",
            //         "mathematician",
            //         "ninja",
            //         "samurai",
            //         "physicist",
            //         "pony",
            //         "sheep",
            //         "computer",
            //         "vamipre",
            //         "artist",
            //         "rabbit",
            //         "yeti",
            //         "serpent",
            //         "minotaur",
            //         "golem",
            //         "eagle",
            //         "bat",
            //         "beast",
            //         "seal",
            //         "beetle",
            //         "alligator"
            //     ],
            //     "single attribute": [                
            //         "%supreme attribute%",
            //         "%superlative%",
            //         "%adjective%",                
            //     ],
            //     "supreme attribute": [
            //         "supreme",
            //         "ultimate",
            //         "incredible",                
            //     ],
            //     "superlative": [
            //         "best",
            //         "worst",
            //         "saddest",
            //         "angriest",
            //         "happiest",
            //         "most insane",
            //         "maddest",
            //         "most giant",
            //         "most anxious",
            //         "coolest",
            //         "most awesome",
            //         "craziest",
            //         "wildest",
            //         "most savage",
            //         "most muscular",
            //         "smartest",
            //         "most intelligent",
            //         "strongest",
            //         "weakest",
            //         "funniest",
            //         "goofiest",
            //         "scariest",
            //         "tallest",
            //         "shortest",
            //         "greatest",
            //         "holiest",
            //         "most evil",
            //     ],
            //     "adjective": [
            //         "sad",
            //         "angry",
            //         "happy",
            //         "insane",
            //         "mad",
            //         "giant",
            //         "anxious",
            //         "cool",
            //         "awesome",
            //         "crazy",
            //         "wild",
            //         "savage",
            //         "muscular",
            //         "smart",
            //         "intelligent",
            //         "strong",
            //         "weak",
            //         "funny",
            //         "goofy",
            //         "scary",
            //         "tall",
            //         "short",
            //         "great",
            //         "holy",
            //         "evil",
            //     ],
            //     "doing x": [
            //         "yelling",
            //         "talking",
            //         "walking",
            //         "jumping",
            //         "working",
            //         "recording",
            //         "investigating",
            //         "fighting",
            //         "drawing",
            //         "sitting",
            //         "dancing",
            //         "singing",
            //         "gaming",
            //         "dying",                
            //     ],
            //     "item": [
            //         "fruit",
            //         "computer",
            //         "cup",
            //         "broom",
            //         "dumbbell",
            //         "fork",
            //         "spoon",
            //         "table",
            //         "chair",
            //         "tree",
            //         "pear",
            //         "book",
            //         "cable",
            //         "peanut",
            //         "knife",
            //         "car",
            //         "plane",
            //         "train",
            //         "egg",
            //         "ladder",
            //         "bottle",
            //         "glass",
            //         "ruler",
            //         "shoe",
            //         "shirt",
            //         "plate",
            //         "microphone",
            //         "speaker",
            //         "guitar",                
            //     ],
            //     "title": [
            //         "dealer",
            //         "maniac",
            //         "enthusiast",
            //         "enjoyer",
            //         "fanatic",
            //         "trafficker",                
            //     ],
            //     "place": [ // At [place]
            //         "the park",
            //         "the library",
            //         "a golf club",
            //         "work",
            //         "school",
            //     ],
            //     "region": [ // In [region]
            //         "space",
            //         "the wild",
            //         "the desert",
            //         "the jungle",
            //         "a cave",
            //         "the office",
            //     ]                
            // }
        }
    }
    processIdea(idea) {
        console.log("Processing: " + idea);
        let sample = "";
        // This function is meant to be called with a single symbol
        let ideaLimit = idea.length;
        let cntr = 0;
        let last = 0;
    
        for (let i = 0; i < ideaLimit; i++) {
            if (idea[i] == "%") {
                cntr++;
                if (cntr % 2 == 0) {
                    let samp = idea.slice(last + 1, i);
                    sample = this.ideaData["en"][samp][Math.floor(Math.random() * this.ideaData["en"][samp].length)];
                    idea = [
                        idea.slice(0, last),
                        this.processIdea(sample),
                        idea.slice(i + 1),
                    ].join("");
            
                    ideaLimit = idea.length;
                    i = last;
                }
                last = i;
            }
        }
        return idea;
    }    
}

class Player
{
    constructor(peerId, name, is_host) {
        this.peerId = peerId;
        this.name = name;
        this.is_host = is_host;
    }
}

class OrderedPeer
{
    constructor() {        
        this.peer = new Peer();        
        this.currently_expecting = 0;
        this.biggest_current = -1;
        this.present_object = {};                        
    }
    
    get id() {
        return this.peer.id
    }

    on(event, callback) {
        if(event == "connection") {
            this.peer.on(event, (conn) => {
                let wrappedConn = new ConnWrapper(conn)
                callback(wrappedConn)
            })
        } else {
            this.peer.on(event, callback)
        }
    }

    connect(id, metadata) {
        return new ConnWrapper(this.peer.connect(id, metadata))
    }

    destroy() {
        this.peer.destroy()
    }

    reconnect() {
        this.peer.reconnect()
    }
}

class ConnWrapper
{
    constructor(conn) {
        this.conn = conn
        this.next_send = 1
        this.currently_expecting = 1
        this.dataObject = {}
        this.dataCallback = () => {}
        this.metadata = conn.metadata
        this.peer = conn.peer

        this.conn.on("data", (data) => {
            console.log("RECEIVED DATA!")
            console.log(data)
            if(data.data_id) {
                this.dataObject[data.data_id] = data
                console.log("DataObject currently looks like: ")
                console.log(this.dataObject)
                while(this.dataObject[this.currently_expecting]) {
                    console.log("We have an ID " + this.currently_expecting)
                    this.dataCallback(this.dataObject[this.currently_expecting])
                    delete this.dataObject[this.currently_expecting++]
                }
            }
        })
    }

    get open() {
        return this.conn.open
    }

    send(data) {
        data["data_id"] = this.next_send++
        console.log("ALTERED DATA, IT'S NOW: ")
        console.log(data)
        this.conn.send(data)
    }

    close() {
        this.conn.close()
    }

    on(str, callback) {
        if(str == "data") {
            this.dataCallback = callback;
        } else {
            this.conn.on(str, callback)
        }
    }
}

class Game {
    constructor() {        
        this.remaining_rounds = 0
        this.chosen_game = -1;
        this.self_index = 0;
        this.self_match_index = 0;
        this.in_lobby = false;
        this.online = false;
        this.game_started = false;
        this.name = "";
        this.is_host = false;
        this.id = "";
        this.peer = new OrderedPeer();
        this.playerConns = []
        this.players = [];
        // this.roundList = [];
        this.roundsLeft = 0;
        this.roundPlayerList = [];
        this.roundPlayerConns = [];
        this.roundPlayerMatches = [];
        this.roundPlayerMatchesOriginalIndex = [];
        this.readySet = new Set();
        this.versusObject = new Set();
        this.current_gamemode = "";
        this.expected_output = "";
        this.waitingToJoin = false;
        this.canvasOnMouseDown = () => null;
        var conn_to_host;
        var game = this;
        var setup_peer = (id) => {
            game.id = id;
            game.online = true;
            // let idHolder = document.getElementById("id-holder");
            // idHolder.textContent = id
            if(game.game_interface) {
                console.log("Enable it!")
                game.game_interface.hostButton.disabled = false;
            }
        }
        this.peer.on('open', function(id) {
            setup_peer(id);
        });
    }

    assign_game_interface(game_interface) {
        this.game_interface = game_interface;
    }

    close_conn(conn) {
        if(conn.open) {
            conn.send({
                "error" : false,
                "type" : "close"
            })
            setTimeout(() => {
                if(conn.open) conn.close()
            }, 2000);
        }
    }

    find_id_index(id) {
        return this.players.findIndex((player) => player.peerId == id);
    }

    sendUpdatePlayers() {
        console.log("Sending updateplayers to all of em")
        for(var i = 0; i < this.playerConns.length; i++) {
            this.playerConns[i].send({
                "error" : false,
                "type" : "playerUpdate",
                "playerList" : this.players,
            })
        }
        this.game_interface.updatePlayers()
    }

    sendChooseGame(index) {
        for(var i = 0; i < this.playerConns.length; i++) {
            this.playerConns[i].send({
                "error" : false,
                "type" : "chooseGame",
                "game" : index,
            })
        }
    }

    /*join_game(id, name) {
        console.log("joining game with id " + id)
        var game = this;
        this.conn_to_host = this.peer.connect(id, {
            metadata : {
                "name" : game.name
            }
        })
        this.conn_to_host.on("close", () => {
            game.game_interface.mainMenu()
            game.in_lobby = false;
            game.is_host = false;
            game.game_started = false;
        })
        this.conn_to_host.on("error", () => {
            game.game_interface.mainMenu()
            game.in_lobby = false;
            game.is_host = false;
            game.game_started = false;
        })
        this.conn_to_host.on("data", (data) => {
            console.log(data)
            if('error' in data && data['error']) {
                console.log(lang[data['message']])
                game.conn_to_host.close();
                this.game_interface.mainMenu();
                console.log("error???")
            }
            console.log("ok before switch")
            switch (data["type"]) {
                case "close":
                    console.log("close connection")
                    this.game_interface.mainMenu()
                    break;
                
                case "playerUpdate":
                    console.log("update players")
                    game.in_lobby = true;
                    game.players = data["playerList"]  
                    game.game_interface.updatePlayers()
                    break;

                case "chooseGame":
                    console.log("hmm")
                    game.game_interface.changeGameListFocus(data['game'])
                    break;

                default:
                    console.log("nope")
                    break;
            }
                        
        })
    }*/

    async async_join_game(id, name) {
        return new Promise((resolve, reject) => {

            console.log("joining game with id " + id)
            var game = this;
            if(this.conn_to_host && this.conn_to_host.open) {
                this.close_conn(this.conn_to_host())
            }
            this.conn_to_host = this.peer.connect(id, {
                metadata : {
                    "name" : game.name
                }
            })
            game.waitingToJoin = true;    
            this.conn_to_host.on("open", (conn) => {
                console.log("Opened connection")                
                game.waitingToJoin = false;
                resolve()
            })
            this.conn_to_host.on("close", () => {
                console.log("Host closed connection")
                game.game_interface.mainMenu()
                game.leaveGame()
                game.in_lobby = false;
                game.is_host = false;
                game.game_started = false;
            })
            this.conn_to_host.on("error", (error) => {
                console.log("Host sent me a fuckin error")
                console.log(error)
                game.game_interface.mainMenu()
                game.leaveGame()
                game.in_lobby = false;
                game.is_host = false;
                game.game_started = false;
            })
            this.peer.on('disconnected', function(id) {
                game.peer.reconnect()
            })
            this.conn_to_host.on("data", (data) => {
                console.log("Got DATA!")
                console.log(data)
                if('error' in data && data.error) {
                    console.log(lang[data.message])
                    game.conn_to_host.close();
                    this.game_interface.mainMenu()
                }
                /*
                "type" : "roundStart",
                    "round" : round,
                    "roundData" : this.getRoundData(i),
                    "firstRound" : firstRound
                */
                switch (data.type) {
                    case "close":
                        this.game_interface.mainMenu()
                        break;
                        
                    case "playerUpdate":
                        game.in_lobby = true;
                        game.players = data.playerList
                        game.game_interface.updatePlayers()
                        break;

                    case "chooseGame":
                        console.log("hmm")
                        game.game_interface.changeGameListFocus(data.game)
                        break;
                    
                    case "startCountDown":
                        this.current_gamemode = data.gamemode;
                        game.game_interface.startCountDown();
                        console.log("start countdown!!")
                        break;                                        
                        
                    case "roundStart":
                        this.startRound(data.round, data.roundData, data.firstRound)
                        this.roundKey = data.roundKey
                        console.log("start rounddddd!!")
                        break;

                    case "backToLobby":
                        this.game_interface.gameLobby();
                        break;
                    
                    case "gameResults":
                        this.gameResults = data.gameResults;
                        this.game_interface.clearTimeline()
                        this.game_interface.timelineIndex = -1
                        this.game_interface.timelineElementIndex = -1
                        this.finishGame(data.style);
                        break;

                    case "doNextFinalElement":
                        if(data.resetTimeline) {
                            console.log("reset the timeline, child")
                            this.game_interface.timelineElementIndex = -1
                            this.game_interface.clearTimeline();                            
                        }
                        console.log("Calling doNextFinalElement from peer socket")
                        if(data.winner) {
                            this.game_interface.doNextFinalElement(false, data.winner);
                        } else {
                            this.game_interface.doNextFinalElement()
                        }
                        break;
                    
                    case "showContentDiv":
                        console.log("Called showContentDiv from peer socket")
                        this.game_interface.showContentDiv();
                        break;

                    default:
                        break;
                }
            })
        })
    }


                
    be_host() {
        this.is_host = true;
        this.in_lobby = true;
        var game = this;        
        this.players.length = 0;
        this.players.push(new Player(this.peer.id, this.name, true));
        this.game_interface.updatePlayers()
        console.log("Chose to be host!")
        this.peer.on('disconnected', function(id) {
            game.peer.reconnect()
        })
        this.peer.on('connection', function(conn) {            
            console.log("connection startedd")
            conn.on('open', () => {                            
                console.log("correct???")
                console.log(conn.metadata)
                if(!Object.hasOwn(conn.metadata, 'name')) {
                    conn.send({
                        "error": true,
                        "message": 'no_name_error'
                    })
                    game.close_conn(conn);
                }
                else if(!typeof conn.metadata.name === "string") {
                    conn.send({
                            "error": true,
                            "message": 'name_must_be_string'
                        });
                    game.close_conn(conn);
                }
                else if(conn.metadata.name.length > 30) {
                    conn.send(
                        {
                            "error": true,
                            "message": 'name_too_long'
                        }
                    )
                    game.close_conn(conn);
                }
                else if(conn.metadata.name.length <= 0) {
                    conn.send(
                        {
                            "error": true,
                            "message": 'name_length_zero'
                        }
                        )
                        game.close_conn(conn);
                    }
                    else if(game.players.length >= 7) {
                        conn.send(
                            {
                                "error": true,
                                "message": 'full_players'
                            }
                    )
                    game.close_conn(conn);
                }
                else if(game.game_started === true) {
                    conn.send({
                        "error": true,
                        "message": 'game_already_started'
                    })
                    game.close_conn(conn);
                }
            
                else {
                    var player = new Player(conn.peer, conn.metadata.name, false);
                    game.players.push(player);
                    game.playerConns.push(conn);
                    console.log("defined data thingy")
                    conn.on('data', (data) => {
                        // if(data.num - 1 == this.last_data) {
                        //     this.last_data = data.num
                        // } else {
                            
                        // }
                        console.log("GOT DATA")
                        console.log(data)
                        if('type' in data) {
                            switch (data.type) {
                                case 'close':
                                    console.log("YUP, YOU'RE FUCKING DEAD KIDDO")
                                    game.players = game.players.filter((element) => element.peerId != conn.peer)
                                    game.playerConns = game.playerConns.filter((element) => element.peer != conn.peer)
                                    game.readySet.delete(conn.peer)
                                    game.versusObject.delete(conn.peer)
                                    game.sendUpdatePlayers();
                                    if(game.game_started) {
                                        game.tryToStartNextRound()
                                    }
                                    break;
                                
                                case 'ready':
                                    console.log("CALLED HANDLEREADY FROM CONN")
                                    game.handleReady(conn.peer, data.outputData, false);
                                    break;

                                case 'unready':
                                    game.handleUnready(conn.peer, false, data.roundKey)

                                case 'versusVote':
                                    game.handleVersusReady(conn.peer, data.choice)
                                    break
                                                            
                                default:
                                    break;
                            }
                        }
                    })
                    conn.on('close', () => {
                        game.players = game.players.filter((element) => element.peerId != conn.peer)
                        game.playerConns = game.playerConns.filter((element) => element.peer != conn.peer)
                        game.readySet.delete(conn.peer)
                        game.versusObject.delete(conn.peer)
                        game.sendUpdatePlayers();
                        if(game.game_started) {
                            game.tryToStartNextRound()
                        }                        
                    })
                    conn.on('error', (error) => {
                        console.warn(error)
                        game.players = game.players.filter((element) => element.peerId != conn.peer)
                        game.playerConns = game.playerConns.filter((element) => element.peer != conn.peer)
                        game.readySet.delete(conn.peer)
                        game.versusObject.delete(conn.peer)
                        game.sendUpdatePlayers();                
                        if(game.game_started) {
                            game.tryToStartNextRound()
                        }
                    })

                    game.sendUpdatePlayers();
                    console.log("Game selection index is " + game.gameSelectionIndex);
                    if(game.gameSelectionIndex >= 0) {
                        console.log("GONNA SEND SEND SEND DA CHOOSEEEE")
                        conn.send({
                            "error" : false,
                            "type" : "chooseGame",
                            "game" : game.gameSelectionIndex
                        })
                    }

                }
            });
        });
    }

    sendCountDown(gamemode) {
        this.game_started = true;
        for(var i = 0; i < this.playerConns.length; i++) {
            this.playerConns[i].send({
                "error" : false,
                "type" : "startCountDown",
                "gamemode": gamemode.name,
            })
        }
        this.game_interface.startCountDown();
    }
    
    hostStartCountdown(gamemode) {
        if(this.is_host) {
            this.sendCountDown(gamemode)
            setTimeout(() => {
                //this.sendEndCountDown()
                this.hostPrepareGame(gamemode)
                this.hostNextRound(true)
                console.log("we doin this")
            }, 1000)
        }
    }


    hostPrepareGame(gamemode) {
        this.current_gamemode = gamemode.name
        // Prepare round list
        // this.roundList = []
        console.log(gamemode)
        this.roundsLeft = this.players.length + this.game_interface.extraRounds
        // switch(gamemode.name) {
        //     case "classic":
        //         this.roundList.push({
        //             "input" : "none",
        //             "output" : "write",
        //             "label" : "write_prompt"
        //         });
        //         for(var i = 1; i < (this.players.length + this.game_interface.extraRounds); i++) {
        //             if(i % 2 == 0) {
        //                 this.roundList.push({
        //                     "input" : "draw",
        //                     "output" : "write",
        //                     "label" : "write_prompt_from_drawing"
        //                 });
        //             } 
        //             else {
        //                 this.roundList.push({
        //                     "input" : "write",
        //                     "output" : "draw",
        //                     "label" : "draw_from_prompt"
        //                 });
        //             }
        //         }
        //         break;
        //     case "faceoff":
        //         console.log("VERSUS")
        //         this.roundList.push({
        //             "input" : "none",
        //             "output": "drawAndName",
        //             "label": "versus_first"
        //         });
        //         for(var i = 1; i < (this.players.length + this.game_interface.extraRounds); i++) {
        //             this.roundList.push({
        //                 "input" : "drawAndName",
        //                 "output": "drawAndName",
        //                 "label": "versus_fight"
        //             })
        //         }
        //         break;

        //     case "time_travel":
        //         console.log("TIME TRAVEL!!!")
        //         this.roundList.push({
        //             "input": "none",
        //             "output": "drawAndName",
        //             "label": "time_travel_first",
        //             "solution":
        //         })
        //         for(var i = 1; i < (this.players.length + this.game_interface.extraRounds); i++) {
        //             if(i % 2 == 0) {
        //                 this.roundList.push({
        //                     "input" : "drawAndName",
        //                     "output" : "drawAndName",
        //                     "label" : "time_travel_problem"
        //                 });
        //             } 
        //             else {
        //                 this.roundList.push({
        //                     "input" : "drawAndName",
        //                     "output" : "drawAndName",
        //                     "label" : "time_travel_solution"
        //                 });
        //             }
        //         }
        //         break;

        //     case "writer_name":                    
        //         this.roundList.push({
        //             "input" : "none",
        //             "output": "write",
        //             "label": "writer_first"
        //         });
        //         for(var i = 1; i < (this.players.length + this.game_interface.extraRounds); i++) {
        //             this.roundList.push({
        //                 "input" : "write",
        //                 "output": "write",
        //                 "label": "writer_round"
        //             })
        //         }
        //         break;
        //     default:
        //         break;        
        // }
        console.log("ROUND LIST IS:")
        // console.log(this.roundList)
        this.roundPlayerList = [...this.players]
        console.log(this.playerConns)
        this.roundPlayerConns = [false]
        for(let i = 0; i < this.playerConns.length; i++) {
            this.roundPlayerConns.push(this.playerConns[i]);
        }
        console.log(this.roundPlayerConns)
        // shuffle
        for(var i = 0; i < this.roundPlayerList.length; i++) {
            let ind = i + Math.floor(Math.random() * (this.roundPlayerList.length - i));
            console.log("Chose index " + ind);
            if(ind != i) {
                let x = this.roundPlayerList[i];
                this.roundPlayerList[i] = this.roundPlayerList[ind];
                this.roundPlayerList[ind] = x;
                x = this.roundPlayerConns[i];
                this.roundPlayerConns[i] = this.roundPlayerConns[ind];
                this.roundPlayerConns[ind] = x;
            }
        }
        for(let i = 0; i < this.roundPlayerList.length; i++) {
            if(this.roundPlayerList[i].is_host) {
                this.self_match_index = i;
            }
        }
        console.log("Host starts at " + i)
        this.roundPlayerMatches = [...this.roundPlayerList];
        this.roundPlayerMatchesOriginalIndex = [];
        this.gameResults = []
        for(var i = 0; i < this.roundPlayerList.length; i++) {
            this.gameResults.push([])
            this.roundPlayerMatchesOriginalIndex.push(i);
        }
    }

    rotateArrayRight(arr) {
        if(arr.length) {
            let last = arr.pop();
            arr.unshift(last);
        }
    }

    getFinalsStyle() {
        switch(this.current_gamemode) {
            case "classic":
                return "chat"
                break;
            case "faceoff":
                return "versus"
                break;
            
            case "time_travel":
                return "time_travel"
                break
            default:
                return "NOTHING???? Gamemode is " + this.current_gamemode
                break;
        }
    }

    cleatVotes() {
        this.versusObject.clear()
    }

    hostNextRound(firstRound) {
        console.log("hostNextRound")
        // console.log(this.roundList)
        console.log(this.gameResults)
        console.log(firstRound)
        if(this.roundsLeft > 0) {
            // console.log("roundlist length")
            // var round = this.roundList.shift();            
            this.readySet.clear();
            this.roundsLeft--;
            this.sendStartRound(firstRound)
        } else {
            console.log("Done!!")
            this.hostSendFinishGame(this.getFinalsStyle());
        }
    }

    async hostStartGame() {
        
    }

    getRoundData(playerIndex) {
        console.log("Getting index " + playerIndex)
        console.log(this.gameResults)
        if(this.gameResults[playerIndex].length) {
            return this.gameResults[playerIndex][this.gameResults[playerIndex].length - 1];
        }
        switch(this.current_gamemode) {
            case "classic":
                return {
                    "label" : "write_prompt"
                }
        }
        return null;
    }

    makeRoundFromRoundData(roundData) {
        switch(this.current_gamemode) {
            case "classic":
                if(!roundData) {
                    return {
                        "input" : "none",
                        "output" : "write",
                        "label" : "write_prompt"
                    }
                }
                if(roundData.draw) {
                    return {
                        "input" : "draw",
                        "output" : "write",
                        "label" : "write_prompt_from_drawing"
                    }
                }
                else if(roundData.write) {
                    return {
                        "input" : "write",
                        "output" : "draw",
                        "label" : "draw_from_prompt"
                    }
                } else {
                    return {
                        "input" : "none",
                        "output" : "write",
                        "label" : "write_prompt"
                    }
                }
                break;

            case "faceoff":
                if(!roundData) return {
                    "input" : "none",
                    "output": "drawAndName",
                    "label": "versus_first"
                }
                if(roundData.draw && roundData.write) {
                    return {
                        "input" : "drawAndName",
                        "output": "drawAndName",
                        "label": "versus_fight"
                    }
                }            
                return {
                    "input" : "none",
                    "output": "drawAndName",
                    "label": "versus_first"
                }
                break;

            case "time_travel":
                console.log("Makin time travel round")
                if(!roundData) return {
                    "input" : "none",
                    "output": "drawAndName",
                    "label": "time_travel_first",
                    "solution": false
                }
                if(roundData.draw && roundData.write) {
                    if(roundData.solution == true) {
                        console.log("ROUND DATA HAD SOLUTION WHAT")
                        return {
                            "input" : "drawAndName",
                            "output": "drawAndName",
                            "label": "time_travel_problem",
                            "solution": false
                        }
                    }
                        console.log("ROUND DATA DID NOT HAVE SOLUTION, NOW SEND IT WITH A SOLUTION")
                        return {
                        "input" : "drawAndName",
                        "output": "drawAndName",
                        "label": "time_travel_solution",
                        "solution": true,
                    }
                }
                
                return {
                    "input" : "none",
                    "output": "drawAndName",
                    "label": "versus_first"
                }
                break;
            
            case "writer_name":
                if(!roundData) return {
                    "input" : "none",
                    "output": "write",
                    "label": "writer_first"
                }
                if(roundData.write) {
                    return {
                        "input" : "write",
                        "output": "write",
                        "label": "versus_round"
                    }
                }            
                return {
                    "input" : "none",
                    "output": "write",
                    "label": "writer_first"
                }
                break;
        }
        return null;
    }

    sendStartRound(firstRound) {
        console.log(this.roundPlayerConns)
        console.log("There are " + this.roundPlayerConns.length + " conns")
        let characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
        this.roundKey = ""
        for(let i = 0; i < 12; i++) {
            this.roundKey += characters[Math.floor(Math.random() * characters.length)]
        }

        for(var i = 0; i < this.roundPlayerMatches.length; i++) {
            let ind = this.roundPlayerMatchesOriginalIndex[i]
            console.log("ind: " + ind)
            console.log("Player at " + i + " has an original index of " + ind)
            console.log(this.roundPlayerConns[ind])
            if(this.roundPlayerConns[ind] && this.roundPlayerConns[ind].open) {
                console.log("KAPOW")
                let roundData = this.getRoundData(i)
                this.roundPlayerConns[ind].send({
                    "error" : false,
                    "type" : "roundStart",
                    "round" : this.makeRoundFromRoundData(roundData),
                    "roundData" : roundData,
                    "firstRound" : firstRound,
                    "roundKey": this.roundKey
                })
            }            
        }
        console.log("Host has index " + this.self_match_index)
        let hostData = this.getRoundData(this.self_match_index)

        this.startRound(this.makeRoundFromRoundData(hostData), hostData, firstRound)
    }

    voteVersus(choice) {
        console.log("Da voteversus from ze game")
        console.log(this.versusObject.entries())
        if(this.is_host && !this.versusObject.has(this.peer.id)) {
            this.votes[choice]++
            this.handleVersusReady(this.peer.id, choice)
        } else if (!this.is_host) {
            console.log("SENDING [democratic vote]!!!!!!!")
            this.conn_to_host.send({
                "type": "versusVote",
                "choice": choice,
            })
        }
    }

    startRound(round, roundData, firstRound) {
        this.game_interface.enableGameStyles()
        console.log("Startround with data " + roundData)
        this.game_interface.resetOutputDiv();
        this.game_interface.resetInputDiv();
        if(firstRound) {
            this.game_interface.endCountDown();
        }
        this.expected_output = round.output;
        console.log("Starting rounddd")
        if(firstRound) {
            this.game_interface.removeLobby();
        }
        this.game_interface.hideInputDiv();
        this.game_interface.hideOutputDiv();
        switch(round.input) {
            case "none":
                this.game_interface.showOutputDiv();
                break;
            case "write":
                this.game_interface.showInputDiv();
                this.game_interface.showInputWriteDiv(roundData.write);
                this.game_interface.setInputDivLabel(lang[language][round.label]);                
                break;
            case "draw":
                if(round.output == "write") {
                    this.game_interface.showOutputDiv();                    
                } else {
                    this.game_interface.showInputDiv();
                    this.game_interface.showInputDrawDiv();
                    this.game_interface.setInputDivLabel(lang[language][round.label]);
                    if(round.output == "draw" || round.output == "drawAndName") {
                        this.game_interface.setOutputDrawBackground(roundData.draw)
                    }
                }
                break;
            case "drawAndName":
                this.game_interface.showInputDiv();
                this.game_interface.showInputWriteDiv(roundData.write);
                this.game_interface.showInputDrawDiv(roundData.draw);
                this.game_interface.setInputDivLabel(lang[language][round.label]);
                if(round.output == "draw" || round.output == "drawAndName") {
                    this.game_interface.setOutputDrawBackground(roundData.draw)
                }
                break;
        }
        switch(round.output) {
            case "none":
                break;
            case "write":
                if(round.input == "draw") {
                    this.game_interface.outputShowDrawing(roundData.draw);
                }
                this.game_interface.showOutputWriteDiv();
                this.game_interface.setOutputDivLabel(lang[language][round.label]);
                console.log("Label is " + round.label)
                if(round.label == "write_prompt") {
                    this.game_interface.makeInputPlaceholder("%idea%")
                }
                break;
            case "draw":
                if(round.input == "write") {
                    this.game_interface.showOutputDrawDiv(roundData.write);
                } else {                    
                    this.game_interface.showOutputDrawDiv();
                }
                this.game_interface.set_canvas = true;
                this.game_interface.setOutputDivLabel(lang[language][round.label]);
                break;
                
            case "drawAndName":
                if(round && round.solution) {
                    console.log("Solution set as TRUE!!!!!!!!!")
                    console.log("Aight label is " + round.label)
                    if(round.label == "time_travel_solution") {
                        console.log("We're doin it")
                        this.game_interface.makeInputPlaceholder("%solution%")
                    }
                    this.is_solution = true
                } else {
                    if(round.label == "time_travel_first" || round.label == "time_travel_problem") {
                        this.game_interface.makeInputPlaceholder("%problem%")
                    }
                    console.log("Solution set as FALSEEEEEEEEEEEEEEE!!!!!!!!!")
                    this.is_solution = false                    
                }
                this.game_interface.showOutputWriteDiv();
                this.game_interface.showOutputDrawDiv();                    
                this.game_interface.setOutputDivLabel(lang[language][round.label])

                console.log("Label is " + round.label)
                if(round.label == "versus_first" || round.label == "versus_fight") {
                    this.game_interface.makeInputPlaceholder("%character%")
                }
                if(round.input == "none") {
                    this.game_interface.showOutputDiv();
                    this.game_interface.setupCanvas();
                } else {
                    
                }
                break;
            }
        }

        sendReadyToHost(outputData) {
        if(!this.is_host) {
            this.conn_to_host.send({
                "type": "ready",
                "outputData": outputData
            })
        }
    }

    sendUnreadyToHost() {
        if(!this.is_host) {
            this.conn_to_host.send({
                "type": "unready",
                "roundKey": this.roundKey
            })
        }
    }

    tryToStartNextRound() {
        // Returns whether or not the output button should be changed to "Ready"
        console.log(this.readySet.size + " ready, need " + this.players.length)
        if(this.readySet.size >= this.players.length) {
            this.rotateArrayRight(this.roundPlayerMatches);
            this.rotateArrayRight(this.roundPlayerMatchesOriginalIndex);
            this.self_match_index++;
            if(this.roundPlayerMatches[0].is_host) {
                this.self_match_index = 0;
            }
            console.log("Beep boop")
            this.hostNextRound(false)
            return false
        } else {
            // this.sendReadyCount(this.readySet.size)
            return true;
        }
    }

    hostSendFinishGame(style) {
        console.log("Sending finish with style " + style)
        for(let i = 0; i < this.playerConns.length; i++) {
            this.playerConns[i].send({
                "error" : false,
                "type": "gameResults",
                "style": style,
                "gameResults": this.gameResults
            });
        }
        console.log("Calling it with " + style)
        this.finishGame(style)
    }

    hostSendBackToLobby() {
        for(let i = 0; i < this.playerConns.length; i++) {
            this.playerConns[i].send({
                "error" : false,
                "type": "backToLobby",
            });
        }
        this.game_interface.gameLobby();
    }

    sendShowContentDiv() {
        for(let i = 0; i < this.playerConns.length; i++) {
            this.playerConns[i].send({
                "error" : false,
                "type": "showContentDiv",
            });
        }
    }

    

    sendDoNextFinalElement(resetTimeline, winner) {
        console.log("Sending DoNextFinalElement!")
        if(winner) {
            for(let i = 0; i < this.playerConns.length; i++) {
                this.playerConns[i].send({
                    "error" : false,
                    "type": "doNextFinalElement",
                    "resetTimeline": resetTimeline,
                    "winner": winner
                });
            }
        } else {
            for(let i = 0; i < this.playerConns.length; i++) {
                this.playerConns[i].send({
                    "error" : false,
                    "type": "doNextFinalElement",
                    "resetTimeline": resetTimeline
                });
            }
        }
    }

    sendAddFinalsEnd() {
        this.votes = [0, 0]
        for(let i = 0; i < this.playerConns.length; i++) {
            this.playerConns[i].send({
                "error" : false,
                "type": "addFinalsEnd",
            });
        }
    }

    finishGame(style) {
        this.game_interface.finishGame(style);
    }

    // sendReadyCount(count) {        
    //     for(let i = 0; i < this.playerConns.length; i++) {
    //         this.playerConns[i].send({
    //             "error" : false,
    //             "type": "readyCount",
    //             "count": count
    //         });
    //     }
    // }

    handleReady(peerId, outputData, is_self) {
        console.log(peerId + " is ready!");
        console.log(outputData);
        if(!is_self && peerId == this.peer.id) {
            return false;
        }
        if(this.readySet.has(peerId)) {
            return false;
        }
        this.readySet.add(peerId);  
        let found = false      
        for(let i = 0; i < this.roundPlayerMatches.length; i++) {
            if(peerId == this.roundPlayerMatches[i].peerId) {
                console.log(this.roundPlayerMatches[i].name + ", id is " + this.roundPlayerMatches[i].peerId)
                this.gameResults[i].push({
                    "name" : this.roundPlayerMatches[i].name,
                    ...outputData
                });      
                found = true          
                break;
            }
        }
        if(!found) {
            console.log("We did not find the player, what?, host: " + is_self);            
        }
        return this.tryToStartNextRound();
    }

    handleUnready(peerId, is_self, key) {
        console.log(peerId + " IS UNREADY NOW")
        if(!is_self && peerId == this.peer.id) {
            console.log("IT WASN'T SELF???? WTF")
            return false;
        }
        // if(!this.readySet.has(peerId) || key != this.roundKey) {
        //     return false;
        // }
        console.log(peerId + " is NOT ready!");        
        this.readySet.delete(peerId);
        for(let i = 0; i < this.roundPlayerMatches.length; i++) {
            if(peerId == this.roundPlayerMatches[i].peerId) {
                console.log(this.roundPlayerMatches[i].name)
                if(this.gameResults[i].length > 0 && this.gameResults[i][this.gameResults[i].length - 1].roundKey == key) {
                    this.gameResults[i].pop()
                }                
                // this.gameResults[i].push({
                //     "name" : this.roundPlayerMatches[i].name,
                //     ...outputData
                // });
            }
        }
        return true;
    }

    handleVersusReady(peerId, choice) {
        console.log("Handling versus ready of peer with id: " + peerId)
        if(this.current_gamemode != "faceoff" || !this.is_host || choice < 0 || choice > 1) return
        if(!this.versusObject.has(peerId)) {
            this.versusObject.add(peerId)
        }
        console.log("As it stands, the versusObject looks like this " + Array.from(this.versusObject.values()))
        if(this.versusObject.size >= this.players.length) {
            this.endVersusRound()            
        }
    }

    endVersusRound() {
        //this.game_interface.endTimer()
        if(this.votes[0] > this.votes[1]) {
            this.last_victory = "l"
        } else if(this.votes[0] < this.votes[1]) {
            this.last_victory = "r"
        } else {
            let choices = ["l", "r"];
            this.last_victory = choices[Math.floor(Math.random() * 2)]
        }
        console.log("Calling doNextFinalElement from handleVersusReady")
        this.game_interface.doNextFinalElement(true)
        this.votes[0] = 0
        this.votes[1] = 0
        console.log("CLEARING DA VERSUSOBJECTTTTTTTTTTTTT")
        this.versusObject.clear()
    }
    
    getOutputData() {
        switch(this.expected_output) {
            case "write":
                return {
                    "user": this.name,
                    "write" : this.game_interface.getOutputWrite(),
                    "roundKey": this.roundKey,
                }
            case "draw":
                return {
                    "user": this.name,
                    "draw" : this.game_interface.getOutputDraw(),
                    "roundKey": this.roundKey,
                }

            case "drawAndName":
                if(this.current_gamemode == "time_travel" && this.is_solution) {
                    console.log("Returning a solution true")
                    return {
                        "user": this.name,
                        "draw" : this.game_interface.getOutputDraw(),
                        "write": this.game_interface.getOutputWrite(),
                        "roundKey": this.roundKey,
                        "solution": true
                    }    
                }
                return {
                    "user": this.name,
                    "draw" : this.game_interface.getOutputDraw(),
                    "write": this.game_interface.getOutputWrite(),
                    "roundKey": this.roundKey,
                    "solution": false,
                }
            
            default:
                return undefined
        }
        
    }

    unready() {
        if(this.is_host) {
            return this.handleUnready(this.peer.id, true, this.roundKey)
        } else {
            this.sendUnreadyToHost();
            return true;
        }
    }

    ready() {
        if(this.is_host) {
            console.log("CALLED HANDLEREADY FROM HOST")
            console.log(this.peer)
            console.log(this.peer.id)
            return this.handleReady(this.peer.id, this.getOutputData(), true)
        } else {
            this.sendReadyToHost(this.getOutputData());
            return true;
        }
        
    }

    leaveGame() {
        this.close_conn(this.conn_to_host)
        this.peer.destroy();
        this.peer = new OrderedPeer();
        game.game_interface.hostButton.disabled = true;
        var setup_peer = (id) => {
            game.id = id;
            game.online = true;
            if(game.game_interface) {
                console.log("Enable it!")
                game.game_interface.hostButton.disabled = false;
            }
        }

        this.peer.on('open', function(id) {            
            setup_peer(id);
        });
        this.peer.on('close', function(id) {
            game.game_interface.mainMenu();
        });
        this.peer.on('error', function(id) {
            game.game_interface.mainMenu();
        });
        this.peer.on('disconnected', function(id) {
            game.peer.reconnect()
        })
    }

    kickAll() {
        console.log("Kicking everyone")
        for(var i = 0; i < this.playerConns.length; i++) {            
            this.close_conn(this.playerConns[i])
        }
    }

    stop_hosting() {
        this.kickAll()
        this.players = []
        this.playerConns = []
        this.in_lobby = false;
        var game = this;
        console.log("Stop hosting")
        this.peer.destroy()
        this.peer = new OrderedPeer();
        game.game_interface.hostButton.disabled = true;
        var setup_peer = (id) => {
            game.id = id;
            game.online = true;            
            if(game.game_interface) {
                console.log("Enable it!")
                game.game_interface.hostButton.disabled = false;
            }
        }

        this.peer.on('open', function(id) {            
            setup_peer(id);
        });    
    }

}

function formatTimeLeft(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);
    
    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;
    
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    // The output in MM:SS format
    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
        document
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(alert.color);        
        document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    } else {
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(alert.color);
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(info.color);
    }
}
  
function calculateTimeFraction(timeLeft, seconds) {
    const rawTimeFraction = timeLeft / seconds;
    return rawTimeFraction - (1 / seconds) * (1 - rawTimeFraction);
}
  
function setCircleDasharray(timeLeft, seconds) {
    const circleDasharray = `${(
      calculateTimeFraction(timeLeft, seconds) * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
}
  

class GameInterface {
    constructor(game, ideaGenerator) {
        this.setLanguageLabels();
        this.game = game;
        this.ideaGenerator = ideaGenerator
        var g_interface = this;
        this.has_invite = false;
        this.gameSelectionIndex = -1;      
        this.timelineIndex = -1;
        this.timelineElementIndex = -1;
        this.invite_id = "";
        if(params.has("invite")) {
            this.has_invite = true;
            this.invite_id = params.get("invite");
        }
        this.hostButton = document.getElementById("host-main-button");
        this.lobbyHostButtons = document.getElementById("lobby-host-buttons");
        this.lobbySettingsContainer = document.getElementById("settings-container")
        this.gameList = document.getElementById("game-list-id")
        this.lobbyExtraRoundsSlider = document.getElementById("lobby-extra-rounds-slider");
        this.lobbyExtraRoundsLabel = document.getElementById("lobby-extra-rounds-label");
        console.log(this.lobbyExtraRoundsSlider)
        this.lobbyExtraRoundsLabel.textContent = "0"
        this.extraRounds = 0
        this.lobbyExtraRoundsSlider.oninput = () => {
            console.log(this.lobbyExtraRoundsSlider)
            this.lobbyExtraRoundsLabel.textContent = this.lobbyExtraRoundsSlider.value            
            this.extraRounds = parseInt(this.lobbyExtraRoundsSlider.value)
        }
        this.lobbyGuestText = document.getElementById("lobby-guest-text");
        this.joinDiv = document.getElementById("join-div");
        this.quitButton = document.getElementById("quit-button");
        this.playerList = document.getElementById("player-list");
        this.lobbyGames = document.getElementById("lobby-games")
        this.nameBox = document.getElementById("namebox");
        this.inviteButton = document.getElementById("invite-button");
        this.gameListRow = document.getElementById("game-list-row");
        this.startButton = document.getElementById("start-button");
        this.listRowChildren = this.gameListRow.children;
        this.countDownNumber = document.getElementById("countdownModalLabel");
        this.countdownModal = document.getElementById("countdownModal");
        this.versusModal = new bootstrap.Modal('#versusModal', {
            keyboard: false
        })
        this.versusModalState = false;

        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible" && this.versusModalState == false) {
                this.versusModal.hide()
            } 
        });

        this.versusModalLabel = document.getElementById("versusModalLabel")
        this.versusModalImg = document.getElementById("versusModalImg")
          
        this.inputDiv = document.getElementById("input-div");
        this.inputWriteDiv = document.getElementById("input-write-div");
        this.inputDrawDiv = document.getElementById("input-draw-div");
        this.inputDivLabel = document.getElementById("input-div-label");
        this.endInputBtn = document.getElementById("end-input-btn");
        this.outputDiv = document.getElementById("output-div");
        this.outputDrawDiv = document.getElementById("output-draw-div");
        this.outputDrawLabel = document.getElementById("output-draw-label");
        this.outputWriteDiv = document.getElementById("output-write-div");
        this.outputDivLabel = document.getElementById("output-div-label");
        this.outputWriteArea = document.getElementById("output-write-area");
        this.outputButton = document.getElementById("output-button");
        this.outputImgDiv = document.getElementById("output-img-div");
        this.canvas = document.getElementById("main-canvas");
        this.finalsDiv = document.getElementById("finals-div");
        this.chatHolder = document.getElementById("chat-holder");
        this.versusHolder = document.getElementById("versus-holder");        
        this.timeTravelHolder = document.getElementById("time-travel-holder");
        this.timeTravelHolder.addEventListener("click", () => {
            if(this.timeTravelIsClickable) {
                this.doNextFinalElement()
                this.timeTravelIsClickable = false
                this.timeTravelHolder.classList.remove("glow")                    
            }
        })
        // this.writerHolder = document.getElementById("writer-holder");        
        this.versusBall = document.getElementById("versus-ball");        
        this.colorHolder = document.getElementById("color-holder");
        this.widthHolder = document.getElementById("width-holder");
        this.canvasHolder = document.getElementById("canvas-holder");
        this.topBar = document.getElementById("top-bar");
        this.mainContainer = document.getElementById("main-container");        
        this.dismissVersusModalBtn = document.getElementById("dismissVersusModalBtn");
        // this.canvasBackground = document.getElementById("canvas-background")
        this.set_canvas = false;
        console.log("it be this:")
        console.log(this.widthHolder)
        console.log("AHAHHAHAH")
        fetch("./assets/person-circle.svg").then((data) => {
            data.text().then((text) => {
                g_interface.personImg = text;
                console.log(text, typeof(text))
            });
        })
        
        this.beep = new Audio('assets/beep.wav');
        this.finalBeep = new Audio('assets/finalBeep.wav');
        this.bubblyNoise = new Audio('assets/bubblynoise.mp3');
        this.rockyNoise = new Audio('assets/rockysound.mp3');
        this.tvNoise = new Audio('assets/tv\ sound.wav');
        this.fastClock = new Audio('assets/fast\ clock.mp3');
        this.hostButton.disabled = true;
        this.startButton.disabled = true;
        
        this.dismissVersusModalBtn.addEventListener("click", () => {
            this.clearTimeline();
            this.versusBall.classList.add("d-none")
            this.timelineElementIndex = -1;            

            if(this.timelineIndex >= this.game.gameResults.length) {
                this.timelineIndex = -1;
                this.game.hostSendBackToLobby();                
            } else {
                console.log("Calling from button press??")
                this.game.sendDoNextFinalElement(true, "l")
                this.doNextFinalElement(false);
            }
        })
        this.outputButtonReady = false;
        this.outputButton.addEventListener("click", () => {
            console.log("Clicked output button!")
            if(this.game.expected_output == "write") {
                console.log("Output is Write")                
                if(this.outputWriteArea.value.length > 0 && this.outputWriteArea.value != "") {
                    if(this.outputButtonReady == false) {
                        this.ready()
                    } else {
                        this.unready()
                    }
                }
            }
            else if(this.game.expected_output == "drawAndName") {
                console.log("Output is drawAndName")                
                if(this.outputButtonReady == false) {
                    if(this.outputWriteArea.value.length > 0 && this.outputWriteArea.value != "") {
                        console.log("Calling Ready from output button")
                        this.ready()
                    }
                } else {
                    console.log("Calling Unready from output button")
                    this.unready()
                }
            }
            else {
                if(this.outputButtonReady == false) {
                    this.ready()
                } else {
                    this.unready()
                }
            }
        })

        this.inviteButton.addEventListener("click", () => {
            navigator.clipboard.writeText(window.location.href + "?invite=" + game.id)
        });

        this.endInputBtn.addEventListener("click", () => {
            this.hideInputDiv();
            this.showOutputDiv();
            this.setupCanvas();
        })

        this.startButton.addEventListener("click", () => {
            console.log("index is " + game.gameSelectionIndex)
            if(game.gameSelectionIndex >= 0) {
                var gamemode = gameModes[game.gameSelectionIndex];
                console.log("Gamemode is " + gamemode)
                if(gamemode.gameStyle != "none") {
                    game.hostStartCountdown(gamemode)
                }        
            }
        })
        
        this.quitButton.addEventListener("click", () => {
            if(!game.game_started) {
                this.hostButton.disabled = true;
                this.mainMenu()
                if(this.game.is_host) this.game.stop_hosting();
                else if(this.game.in_lobby) {
                    this.game.leaveGame()
                }
            }
        })

        this.hostButton.addEventListener("click", () => {
            this.handleHostButtonClick()
        })
        
        let gameInterface = this;
        this.listRowChildren[0].children[0].children[0].textContent = lang[language][gameModes[0].name]
        this.listRowChildren[0].children[0].children[1].textContent = lang[language][gameModes[0].desc]
        this.listRowChildren[0].children[0].addEventListener("click",() => {
            if(!game.is_host) return;
            this.changeGameListFocus(0)
            game.sendChooseGame(0);
        })
        this.listRowChildren[1].children[0].children[0].textContent = lang[language][gameModes[1].name]
        this.listRowChildren[1].children[0].children[1].textContent = lang[language][gameModes[1].desc]
        this.listRowChildren[1].children[0].addEventListener("click",() => {
            if(!game.is_host) return;
            this.changeGameListFocus(1)            
            game.sendChooseGame(1);
        })
        this.listRowChildren[2].children[0].children[0].textContent = lang[language][gameModes[2].name]
        this.listRowChildren[2].children[0].children[1].textContent = lang[language][gameModes[2].desc]
        this.listRowChildren[2].children[0].addEventListener("click",() => {
            if(!game.is_host) return;
            this.changeGameListFocus(2)            
            game.sendChooseGame(2);
        })
        
        // this.listRowChildren[2].children[0].children[0].textContent = lang[language][gameModes[2].name]
        // this.listRowChildren[2].children[0].children[1].textContent = lang[language][gameModes[2].desc]
        // this.listRowChildren[2].children[0].addEventListener("click",() => {
        //     if(!game.is_host) return;
        //     this.changeGameListFocus(2)
        //     game.sendChooseGame(2);
        // })
        var assignColorListener = (but, i) => {
            but.addEventListener("click", () => {
                if(this.assignedButton) {
                    this.assignedButton.classList.remove("color-focus")
                }
                this.color = colors[i];
                but.classList.add("color-focus")
                this.assignedButton = but
            })
        }

        for(var i = 0; i < colors.length; i++) {
            var but = document.createElement('button');
            if(!this.firstColor) {
                this.firstColor = but;
            }
            but.classList.add('color-btn')
            but.classList.add("col-2");
            but.classList.add("col-lg-4");
            but.style.backgroundColor = colors[i];
            assignColorListener(but, i);
            this.colorHolder.appendChild(but);
        }
        

        but = document.createElement('button');
        but.style.width = 15 + widths[4] + "px";
        but.style.height = 15 + widths[4] + "px";
        but.classList.add("width-button");

        var circ = document.createElement('div');
        circ.style.width = widths[0] + "px";
        circ.style.height = widths[0] + "px";
        circ.style.borderRadius = "50%";
        circ.style.backgroundColor = "black"
        circ.style.margin = 0;
        but.appendChild(circ);
        
        but.addEventListener("click", () => {
            this.strokeWidth = widths[0];
        })
        this.widthHolder.appendChild(but);

        but = document.createElement('button');
        but.classList.add("width-button");
        but.style.width = 15 + widths[4] + "px";
        but.style.height = 15 + widths[4] + "px";

        var circ = document.createElement('div');
        circ.style.width = widths[1] + "px";
        circ.style.height = widths[1] + "px";
        circ.style.borderRadius = "50%";
        circ.style.backgroundColor = "black"
        circ.style.margin = 0;
        but.appendChild(circ);
        
        but.addEventListener("click", () => {
            this.strokeWidth = widths[1];
        })
        this.widthHolder.appendChild(but);

        but = document.createElement('button');
        but.classList.add("width-button");
        but.style.width = 15 + widths[4] + "px";
        but.style.height = 15 + widths[4] + "px";

        var circ = document.createElement('div');
        circ.style.width = widths[2] + "px";
        circ.style.height = widths[2] + "px";
        circ.style.borderRadius = "50%";
        circ.style.backgroundColor = "black"
        circ.style.margin = 0;
        but.appendChild(circ);
        
        but.addEventListener("click", () => {
            this.strokeWidth = widths[2];
        })
        this.widthHolder.appendChild(but);


        but = document.createElement('button');
        but.classList.add("width-button");
        but.style.width = 15 + widths[4] + "px";
        but.style.height = 15 + widths[4] + "px";

        var circ = document.createElement('div');
        circ.style.width = widths[3] + "px";
        circ.style.height = widths[3] + "px";
        circ.style.borderRadius = "50%";
        circ.style.backgroundColor = "black"
        circ.style.margin = 0;
        but.appendChild(circ);
        
        but.addEventListener("click", () => {
            this.strokeWidth = widths[3];
        })
        this.widthHolder.appendChild(but);

        
        but = document.createElement('button');
        but.classList.add("width-button");
        but.style.width = 15 + widths[4] + "px";
        but.style.height = 15 + widths[4] + "px";
        
        var circ = document.createElement('div');
        circ.style.width = 15 + widths[4] + "px";
        circ.style.height = 15 + widths[4] + "px";
        circ.style.borderRadius = "50%";
        circ.style.backgroundColor = "black"
        circ.style.margin = 0;
        but.appendChild(circ);
        
        but.addEventListener("click", () => {
            this.strokeWidth = widths[4];
        })
        this.widthHolder.appendChild(but);

        
        //this.canvas.style.position = 'fixed';
        
        // get canvas 2D context and set him correct size
        var ctx = this.canvas.getContext('2d');
        resize();
        
        // last known position
        var pos = { x: 0, y: 0 };
        
        window.addEventListener('resize', resize);
        let hasListener = false
        

        function handleCanvasTouch(e) {
            console.log("doin a touchmove with event ")  
            console.log(e)          
            if(e.touches && e.touches.length) {
                e.preventDefault();
                console.log("preventdefault at touchmove function")                
                var touch = e.touches[0];
                var mouseEvent = new MouseEvent("mousemove", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                g_interface.canvas.dispatchEvent(mouseEvent);
            }
        }
        
        function startDrawing(event) {
            if(!hasListener) {
                document.addEventListener("mousemove", draw);
                hasListener = true;
            }

        }
        function startDrawingTouch(event) {            
            if(!hasListener) {
                document.addEventListener('touchmove', draw);        
                document.addEventListener("touchmove", handleCanvasTouch, false);
                hasListener = true
            }
        }

        function endDrawing(event) {
            document.removeEventListener("mousemove", draw);
            hasListener = false;
        }
        function endDrawingTouch(event) {            
            document.removeEventListener('touchmove', draw);        
            document.removeEventListener("touchmove", handleCanvasTouch);
            hasListener = false
        }
        
        document.addEventListener('mousedown', (e) => {
            if(e.target == g_interface.canvas) {
                console.log("IT'S HAPPENING WITH DA MOUS")
                startDrawing(e);
                setPosition(e);
                draw(e);
            }
        });
        document.addEventListener('touchstart', (e) => {
            if(e.target == g_interface.canvas) {
                e.preventDefault()        
                console.log("Yup! Touchstart")
                startDrawingTouch(e);
                setPosition(e);
                draw(e);
            }
        });

        document.addEventListener('mouseup', (e) => {
            endDrawing(e);
        });
        document.addEventListener('touchend', (e) => {
            console.log("END, OVER, BOOP")
            endDrawingTouch(e);        
        });
        document.addEventListener('touchcancel', (e) => {
            console.log("END, OVER, BOOP")
            endDrawingTouch(e);        
        });

        this.canvas.addEventListener('mouseenter', setPosition);
        
        
        //canvas.addEventListener('touchend', handleDrawingEnd);

        // new position from mouse event
        function setPosition(e) {
            if(e.touches && e.touches.length) {
                console.log(e)
                //e.preventDefault();
            }
            var rect = g_interface.canvas.getBoundingClientRect();
            pos.x = (e.clientX || e.touches[0].clientX) - rect.left;
            pos.y = (e.clientY || e.touches[0].clientY) - rect.top;
        }


        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
        function resize() {                                    
            if (g_interface.canvas.clientWidth != g_interface.canvasWidth || 
                g_interface.canvas.clientHeight != g_interface.canvasHeight) {
                console.log(g_interface.canvas.clientWidth + " != " + g_interface.canvasWidth)
                var imageData = ctx.canvas.toDataURL("image/png")
                ctx.canvas.width = g_interface.canvas.clientWidth;
                ctx.canvas.height = g_interface.canvas.clientHeight;                
                g_interface.canvasWidth = g_interface.canvas.clientWidth;
                g_interface.canvasHeight = g_interface.canvas.clientHeight;

                var finalImage = new Image;
                finalImage.onload = function() {
                    ctx.drawImage(finalImage, 0, 0);
                }
                finalImage.src = imageData
            }                        
        }

        function draw(e) {
            //console.log("Attempting to draw")
            // mouse left button must be pressed
            
            if (!(e.buttons === 1 || (e.touches && e.touches.length)) || g_interface.outputButtonReady) return;
            //console.log("ok now draw")            

            ctx.beginPath(); // begin

            ctx.lineWidth = g_interface.strokeWidth;
            ctx.lineCap = 'round';
            ctx.strokeStyle = g_interface.color;
            //console.log(g_interface.strokeWidth, g_interface.color)

            ctx.moveTo(pos.x, pos.y); // from
            setPosition(e);
            ctx.lineTo(pos.x, pos.y); // to

            ctx.stroke(); // draw it!
        }

        // document.body.addEventListener("touchstart", function (e) {
        //     if (e.target == g_interface.canvas) {
        //         e.preventDefault();
        //     }
        // }, { passive: false });
        // document.body.addEventListener("touchend", function (e) {
        //     if (e.target == g_interface.canvas) {
        //         e.preventDefault();
        //     }
        // }, { passive: false });
        // document.body.addEventListener("touchmove", function (e) {
        //     if (e.target == g_interface.canvas) {
        //         e.preventDefault();
        //     }
        // }, { passive: false });                

        /*this.listRowChildren[3].children[0].addEventListener("click",() => {            
            if(!game.is_host) return;
            this.changeGameListFocus(3)        
            game.sendChooseGame(3);
        })
        this.listRowChildren[4].children[0].addEventListener("click",() => {
            if(!game.is_host) return;
            this.changeGameListFocus(4)
            game.sendChooseGame(4);
        })
        this.listRowChildren[5].children[0].addEventListener("click",() => {
            if(!game.is_host) return;
            this.changeGameListFocus(5)
            game.sendChooseGame(5);
        })
        this.listRowChildren[6].children[0].addEventListener("click",() => {
            if(!game.is_host) return;
            this.changeGameListFocus(6)
            game.sendChooseGame(6);
        })*/
    }



    setOutputButtonReady() {
        this.outputButton.firstElementChild.textContent = lang[language]['edit']
        this.outputButtonReady = true
        console.log("Set button as ready!!!!!")
    }

    setOutputButtonUnready() {
        console.log(this.outputButton)
        this.outputButton.firstElementChild.textContent = lang[language]['done']
        this.outputButtonReady = false
        console.log("Set button as ABSOLUTELY NOT ready!!!!!")
    }

    setLanguageLabels() {
        document.getElementById("players-label").textContent = lang[language]['players']
        document.getElementById("gamemodes-label").textContent = lang[language]['gamemodes']
        document.getElementById("lobby-guest-text").textContent = lang[language]['lobby_guest_text']
        document.getElementById("nickname-label").textContent = lang[language]['nickname']
        document.getElementById("start-label").textContent = lang[language]['start']
        document.getElementById("game-results").textContent = lang[language]['game_results']
        document.getElementById("invite-label").textContent = lang[language]['invite']
        document.getElementById("start-lobby-label").textContent = lang[language]['start']
        document.getElementById("output-button").firstElementChild.textContent = lang[language]['done']
        document.getElementById("dismissVersusModalBtn").textContent = lang[language]['done']
        document.getElementById("extra-rounds-title").textContent = lang[language]['extra_rounds'] + ": "
    }
    
    changeGameListFocus(index) {        
        this.game.gameSelectionIndex = index;
        console.log("Index is now " + index)
        if(this.previousSelection) {
            this.previousSelection.classList.remove("selected-list-item");
        }
        if(index >= this.listRowChildren.length) {
            this.startButton.disabled = true;
        } else {
            this.startButton.disabled = false;
        }
        this.listRowChildren[index].children[0].classList.add("selected-list-item");
        this.previousSelection = this.listRowChildren[index].children[0]
    }


    async handleHostButtonClick() {
        if(this.nameBox.value.length == 0 || this.nameBox.value == "") {
            return;
        }
        if(this.has_invite) {
            console.log("Joining...")
            this.hostButton.disabled = true;
            this.game.name = this.nameBox.value
            await this.game.async_join_game(this.invite_id);
            this.hostButton.disabled = false;
        }
        else {
            this.game.name = this.nameBox.value
            this.game.be_host();            
        }
        this.gameLobby()
    }
    

    gameLobby() {
        this.disableGameStyles()
        this.game.game_started = false;
        this.clearTimeline()
        this.game.name = this.nameBox.value
        this.quitButton.classList.add("animate__bounceIn")
        this.quitButton.style.display = 'block'
        console.log("enter lobby ")
        this.joinDiv.classList.remove("d-flex")
        this.joinDiv.classList.add("d-none")
        this.playerList.classList.remove("d-none");
        this.playerList.classList.add("d-flex");
        this.playerList.classList.add("animate__bounceIn");
        this.lobbyGames.classList.remove("d-none")
        this.lobbyGames.classList.add("d-flex")
        this.lobbyGames.classList.add("animate__bounceIn");
        this.mainContainer.classList.add("h-lg-90")
        this.topBar.classList.add("d-lg-flex")
        
        this.versusModal.hide()
        this.versusModalState = false;
        this.hideInputDiv();
        this.hideOutputDiv();
        this.hideFinalsDiv();

        this.preloadImage(window.location.href + "/assets/tv.png")
        this.preloadImage(window.location.href + "/assets/clock.png")

        if(this.has_invite) {
            //this.game.name = this.nameBox.value
            //this.game.join_game(this.invite_id);
            this.lobbyGuestText.classList.add("d-flex");
            this.lobbyGuestText.classList.remove("d-none");
            
            this.lobbyHostButtons.classList.remove("d-flex");
            this.lobbyHostButtons.classList.add("d-none");

            this.lobbySettingsContainer.classList.remove("d-flex");
            this.lobbySettingsContainer.classList.add("d-none");

            this.gameList.classList.add("h-75")
            this.gameList.classList.add("h-lg-100")

            this.gameList.classList.remove("h-50")
            this.gameList.classList.remove("h-lg-75")
        }
        else {
            this.game.name = this.nameBox.value
            //this.game.be_host();
            
            this.lobbyGuestText.classList.add("d-none");
            this.lobbyGuestText.classList.remove("d-flex");
            
            this.lobbyHostButtons.classList.add("d-flex");
            this.lobbyHostButtons.classList.remove("d-none");

            this.lobbySettingsContainer.classList.add("d-flex");
            this.lobbySettingsContainer.classList.remove("d-none");


            this.gameList.classList.add("h-50")
            this.gameList.classList.add("h-lg-75")

            this.gameList.classList.remove("h-75")
            this.gameList.classList.remove("h-lg-100")

        }
        this.rockyNoise.load();
        this.rockyNoise.play();
    }

    updatePlayers() {
        console.log("heheheha")
        var children = this.playerList.children[1].children;
        for(var i = 0; i < children.length; i++) {
            if(i < this.game.players.length) {
                children[i].children[1].textContent = this.game.players[i].name
                console.log("Name is " + this.game.players[i].name)

            }
            else children[i].children[1].textContent = lang[language]["empty_slot"]
        }
    }

    mainMenu() {
        this.disableGameStyles()
        this.game.game_started = false;
        this.quitButton.style.display = 'none'
        this.joinDiv.classList.remove("d-none");
        this.joinDiv.classList.add("d-flex");
        this.joinDiv.classList.add("animate__bounceIn");
        this.playerList.classList.remove("d-flex");
        this.playerList.classList.add("d-none");
        this.lobbyGames.classList.remove("d-flex")
        this.lobbyGames.classList.add("d-none")
        this.mainContainer.classList.add("h-lg-90")
        this.topBar.classList.add("d-lg-flex")
        this.hideInputDiv();
        this.hideOutputDiv();
        this.hideFinalsDiv();
        this.versusModal.hide()
        this.versusModalState = false;
        console.log("main menu")
        //if(this.game.is_host) this.game.stop_hosting();
        //else if(this.game.in_lobby) {
            //this.game.leaveGame()
        //}
        this.rockyNoise.load();
        this.rockyNoise.play();
    }

    enableGameStyles() {
        document.getElementById("game-div").classList.add("game-div-ingame")
    }

    disableGameStyles() {
        document.getElementById("game-div").classList.remove("game-div-ingame")
    }

    removeLobby() {
        this.quitButton.style.display = 'none';
        this.playerList.classList.add("d-none");
        this.playerList.classList.remove("d-flex");
        this.lobbyGames.classList.add("d-none");
        this.lobbyGames.classList.remove("d-flex");
        this.mainContainer.classList.remove("h-lg-90")
        this.topBar.classList.remove("d-lg-flex")
        this.versusModal.hide()
        this.versusModalState = false;
    }


    startCountDown() {
        this.startButton.disabled = true;
        this.countdownModal.style.display = "block"
        this.countdownModal.classList.add("show")
        this.countDownNumber.textContent = "Starting game..."
        this.beep.load();
        this.beep.play();
        console.log("playinnn")
    }

    endCountDown() {
        this.startButton.disabled = false;
        this.countdownModal.style.display = "none"
        this.countdownModal.classList.remove("show")
        this.finalBeep.load()
        this.finalBeep.play()
        console.log("it is done")
    }

    showInputDiv() {
        this.rockyNoise.load();
        this.rockyNoise.play();
        this.inputDiv.classList.remove("d-none");
        this.inputDiv.classList.add("d-flex");
        this.versusModal.hide()
        this.versusModalState = false;
        console.log("Show input divv")
    }

    hideInputDiv() {
        this.inputDiv.classList.remove("d-flex");
        this.inputDiv.classList.add("d-none");
        console.log("Hide input divv")
    }

    setInputDivLabel(label) {
        this.inputDivLabel.textContent = label
    }

    makeInputPlaceholder(type) {
        this.setInputPlaceholder(this.ideaGenerator.processIdea(type))
    }

    setInputPlaceholder(text) {
        this.outputWriteArea.placeholder = text
        console.log("Set placeholder to: ")
    }

    showInputWriteDiv(write) {
        this.inputWriteDiv.classList.remove("d-none");
        this.inputWriteDiv.classList.add("d-flex");
        this.inputWriteDiv.textContent = write;
    }

    showInputDrawDiv(draw) {
        this.inputDrawDiv.classList.remove("d-none");
        this.inputDrawDiv.classList.add("d-flex");

        var pngImage = document.createElement('img')
        pngImage.src = draw;
        pngImage.classList.add("drawing-style")
        this.inputDrawDiv.appendChild(pngImage);        
        // if(this.game.current_gamemode == "faceoff") {
        //     this.canvasBackground.src = draw
        // }
        console.log("Append " + pngImage);
        console.log("Appended to " + this.inputDrawDiv)
    }
    
    resetInputDiv() {
        // this.canvasBackground.src = ""
        this.inputDrawDiv.classList.add('d-none');
        this.inputDrawDiv.classList.remove('d-flex');
        this.inputWriteDiv.classList.add('d-none');
        this.inputWriteDiv.classList.remove('d-flex');
        this.inputDivLabel.textContent = ""
        this.inputWriteDiv.textContent = ""
        this.inputHideDrawing()
    }
    
    showOutputDiv() {
        console.log("Show output div");
        this.outputDiv.classList.remove("d-none");
        this.outputDiv.classList.add("d-flex");
        this.outputButton.disabled = false;
        this.rockyNoise.load();
        this.rockyNoise.play();
    }
    

    hideOutputDiv() {
        this.outputButton.disabled = false;
        console.log("Hide output div");
        this.outputDiv.classList.remove("d-flex");
        this.outputDiv.classList.add("d-none");
    }

    hideFinalsDiv() {
        this.finalsDiv.classList.remove("d-flex");
        this.finalsDiv.classList.add("d-none");
    }
    
    resetOutputDiv() {
        console.log("Reset output div")
        this.outputButton.disabled = false;
        this.outputDrawDiv.classList.remove("d-flex");
        this.outputWriteDiv.classList.remove("d-flex");
        this.outputDrawDiv.classList.add("d-none");
        this.outputWriteDiv.classList.add("d-none");
        this.setOutputButtonUnready();
        this.outputHideDrawing();
        this.outputDivLabel.textContent = "";
        this.outputWriteArea.value = "";
        this.color = colors[0];
        this.canvasHolder.style.background = "white"
        if(this.assignedButton) {
            this.assignedButton.classList.remove("color-focus")
        }
        this.firstColor.classList.add("color-focus")
        this.assignedButton = this.firstColor
    }
    
    showOutputWriteDiv() {
        this.outputWriteDiv.classList.add("d-flex");
        this.outputWriteDiv.classList.remove("d-none");
    }
    
    setupCanvas() {
        //this.canvas.style.width = this.canvas.style.height;
        this.color = colors[0];
        this.strokeWidth = widths[1];
        var ctx = this.canvas.getContext('2d')
        
        //paper.setup("main-canvas")
        
        ctx.canvas.width = this.canvas.clientWidth;
        ctx.canvas.height = this.canvas.clientHeight;
        console.log("Set up canvas to be " + this.canvasHolder.innerWidth + " x " + this.canvasHolder.innerHeight)

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.length);
        this.canvasWidth = this.canvas.clientWidth;
    }

    showOutputDrawDiv(label) {
        this.outputDrawDiv.classList.add("d-flex");
        this.outputDrawDiv.classList.remove("d-none");
        this.outputDrawLabel.textContent = label;
    }

    setOutputDivLabel(label) {
        this.outputDivLabel.textContent = label;
    }

    setOutputDrawBackground(drawing) {        
        var img = "url('" + drawing + "')";
        this.canvasHolder.style.background = img + " no-repeat, white";
    }

    render_xml(el, doc){
        console.log(el, doc)
        return el.appendChild(
          el.ownerDocument.importNode(doc.documentElement, true)
        )
    }

    inputHideDrawing() {
        this.inputDrawDiv.classList.add("d-none");
        this.inputDrawDiv.classList.remove("d-flex");
        while(this.inputDrawDiv.firstElementChild) {
            this.inputDrawDiv.removeChild(this.inputDrawDiv.lastElementChild);
        }
    }

    outputHideDrawing() {
        this.outputImgDiv.classList.add("d-none");
        this.outputImgDiv.classList.remove("d-flex");
        while(this.outputImgDiv.firstElementChild) {
            this.outputImgDiv.removeChild(this.outputImgDiv.lastElementChild);
        }
    }

    outputShowDrawing(draw) {
        this.outputImgDiv.classList.add("d-flex");
        this.outputImgDiv.classList.remove("d-none");
        //var parser = new DOMParser();
        //var svgImage = parser.parseFromString(draw, "image/svg+xml");
        var pngImage = document.createElement('img')
        pngImage.src = draw;
        this.outputImgDiv.appendChild(pngImage);
    }

    getOutputWrite() {
        return this.outputWriteArea.value;
    }

    getOutputDraw() {        
        // return paper.project.exportSVG({
        //     "asString": true
        // });
        return this.canvas.toDataURL();
    }

    preloadImage(url)
    {
        var img=new Image();
        img.src=url;        
    }

    unready() {
        if(this.game.unready()) {
            this.setOutputButtonUnready()
        }
    }

    ready() {
        console.log("Called ready from g_interface??")
        if(this.game.ready()) {
            console.log("Setting Output Button Ready from g_interface")
            this.setOutputButtonReady()
        }
    }

    showFinalsDiv(style) {
        this.finalsDiv.classList.add("d-flex");
        this.finalsDiv.classList.remove("d-none");
        console.log("got show with style " + style)
        switch(style) {
            case "chat":
                this.chatHolder.classList.add("d-flex");
                this.chatHolder.classList.remove("d-none");

                this.versusHolder.classList.remove("d-flex");
                this.versusHolder.classList.add("d-none");
                this.timeTravelHolder.classList.remove("d-flex")
                this.timeTravelHolder.classList.add("d-none")
                document.getElementById("game-results").classList.remove("d-none")
                break;
            case "versus":
                document.getElementById("game-results").classList.add("d-none")
                this.chatHolder.classList.add("d-none");
                this.chatHolder.classList.remove("d-flex");            
                
                this.versusHolder.classList.add("d-flex");
                this.versusHolder.classList.remove("d-none");

                this.timeTravelHolder.classList.remove("d-flex")
                this.timeTravelHolder.classList.add("d-none")
                // this.handleVersusFinals()
                break;
            case "writer":
                this.chatHolder.classList.add("d-none");
                this.chatHolder.classList.remove("d-flex");
                this.versusHolder.classList.remove("d-flex");
                this.versusHolder.classList.add("d-none");
                this.timeTravelHolder.classList.remove("d-flex")
                this.timeTravelHolder.classList.add("d-none")
                break;
            case "time_travel":
                document.getElementById("game-results").classList.add("d-none")
                this.chatHolder.classList.add("d-none");
                this.chatHolder.classList.remove("d-flex");
                this.versusHolder.classList.add("d-none");
                this.versusHolder.classList.remove("d-flex");
                
                this.timeTravelHolder.classList.add("d-flex")
                this.timeTravelHolder.classList.remove("d-none")
                break;
        }
        this.rockyNoise.load();
        this.rockyNoise.play();
    }

    finishGame(style) {
        console.log("finish game with style " + style)
        this.hideInputDiv();
        this.hideOutputDiv();
        this.showFinalsDiv(style);
        this.timelineElementIndex = -1;
        this.timelineIndex = -1;        
        if(this.game.is_host) {
            this.game.votes = [0, 0]
            setTimeout(() => {
                this.doNextFinalElement()
                console.log("Calling from finishGame")
            }, 1000)
        }
    }

    
    
    doNextFinalElement(send = true, winner) {
        console.log("=================================================")
        console.log("=================================================")
        console.log("=================================================")
        console.log("DOING NEXT FINAL ELEMENT!!!!!!!!!!!!!!!!")
        console.log("Call showContentDiv from nextFinalElement")
        if(winner) {
            this.game.last_victory = winner
        }

        console.log(this.timelineIndex, this.timelineElementIndex)
        this.showContentDiv();
        if(send && this.game.is_host) {
            this.game.sendDoNextFinalElement(false, this.game.last_victory);
        }
        if(this.timelineIndex >= this.game.gameResults.length) {
            console.log("Calling addFinalsEnd from the first check")
            this.addFinalsEnd();
            return;
        }

        if(this.timelineIndex == -1) {
            this.timelineIndex = 0;
            this.timelineElementIndex = 0;
        } else {
            this.timelineElementIndex++;
        }
        var changedTimeline = false;
        while(this.timelineIndex < this.game.gameResults.length &&
            this.timelineElementIndex >= this.game.gameResults[this.timelineIndex].length) {
            this.timelineElementIndex = 0;
            this.timelineIndex++;
            var changedTimeline = true;
        }


        if(this.timelineIndex >= this.game.gameResults.length) {
            console.log("Calling addFinalsEnd from the second check")
            this.addFinalsEnd();
            return;
        }

        if(changedTimeline) {
            console.log("CHANGE TIMELINESSS")
            console.log("Calling addFinalsEnd from the changed timelines check")
            this.addFinalsEnd();
            return;
        }
        let dir;
        let pos;
        if(this.game.current_gamemode == "classic") {
            dir = ((this.timelineElementIndex % 2) == 0) ? "l" : "r";
            pos = this.chatHolder
        } else if(this.game.current_gamemode == "faceoff") {
            this.versusModal.hide()
            this.versusModalState = false;
            pos = this.versusHolder
            if(this.timelineElementIndex < 2 || !this.game.last_victory) {
                dir = ((this.timelineElementIndex % 2) == 0) ? "l" : "r";
            } else {                
                dir = (this.game.last_victory == "l") ? "r" : "l";
            }
        } else if(this.game.current_gamemode == "time_travel") {            
            dir = ((this.timelineElementIndex % 2) == 0) ? "p" : "s";
            pos = document.getElementById("tv-contents")
        }
        

        console.log("Adding element from timeline " + this.timelineIndex + ", element " + this.timelineElementIndex)
        this.bubblyNoise.load()
        this.bubblyNoise.play()
        this.addFinishElement(this.game.gameResults[this.timelineIndex][this.timelineElementIndex],
            pos,
            dir,
            (this.timelineElementIndex >= 2),
            this.timelineElementIndex >= 1);

    }

    clearTimeline() {
        if(this.game.current_gamemode == "classic") {
            while(this.chatHolder.firstElementChild) {
                this.chatHolder.removeChild(this.chatHolder.lastElementChild);
            }
        } else if(this.game.current_gamemode == "faceoff") {
            this.game.last_victory = "l"
            let pos = this.versusHolder
            console.log("REMOVING FADEINS!!!!!!!")
            pos.firstElementChild.firstElementChild.classList.remove("animate__fadeInLeftBig")
            pos.firstElementChild.children[1].classList.remove("animate__fadeInRightBig")
            pos.firstElementChild.firstElementChild.classList.remove("animate__fadeOutfLeftBig")
            pos.firstElementChild.children[1].classList.remove("animate__fadeOutfRightBig")
            

            pos.firstElementChild.firstElementChild.classList.remove("animate-headbutt-left")
            pos.firstElementChild.children[1].classList.remove("animate-headbutt-right")

            console.log("DISMISSING EVERYTHING, RE-ADDING D-NONE TO EVERYTHING!!!!!!!!!!!!1")
            pos.firstElementChild.firstElementChild.classList.add("d-none");
            pos.firstElementChild.children[1].classList.add("d-none");
            pos.firstElementChild.firstElementChild.classList.remove("d-flex");
            pos.firstElementChild.children[1].classList.remove("d-flex");
            pos.firstElementChild.classList.remove("gallery-active")
        } else if(this.game.current_gamemode == "time_travel") {
            document.getElementById("tv-title").textContent = ""
            removeAllChildren(document.getElementById("tv-image-holder"))
            this.timeTravelIsClickable = false;
            this.timeTravelHolder.classList.remove("glow")                    
        }
    }
    clearVersusStyles() {
        let pos = this.versusHolder
            console.log("REMOVING FADEINS!!!!!!!")
            pos.firstElementChild.firstElementChild.classList.remove("animate__fadeInLeftBig")
            pos.firstElementChild.children[1].classList.remove("animate__fadeInRightBig")
            pos.firstElementChild.firstElementChild.classList.remove("animate__fadeOutfLeftBig")
            pos.firstElementChild.children[1].classList.remove("animate__fadeOutfRightBig")
            
            pos.firstElementChild.firstElementChild.classList.remove("animate-headbutt-left")
            pos.firstElementChild.children[1].classList.remove("animate-headbutt-right")
            
            pos.firstElementChild.classList.remove("gallery-active")
    }

    addFinalsEnd(data) {
        //this.game.sendAddFinalsEnd();
        switch(this.game.current_gamemode) {
            case 'classic':
                this.addClassicEnd()
                break;
            case 'faceoff':                
                this.addVersusEnd();
                break;

            case 'time_travel':
                this.addTimeTravelEnd();
                break;
        }        
    }

    addTimeTravelEnd() {
        console.log("Add time travel end!")
        document.getElementById("foreground").classList.add("foreground-clear")
        setTimeout(() => {
            setTimeout(() => {
                document.getElementById("foreground").classList.remove("foreground-clear")
            }, 1000)
            this.clearTimeline();        
            this.timelineElementIndex = -1;            
    
            if(this.timelineIndex >= this.game.gameResults.length) {
                this.timelineIndex = -1;
                this.game.hostSendBackToLobby();
            } else {            
                this.game.sendDoNextFinalElement(true, "l")
                this.doNextFinalElement(false);
            }
        }, 4000)
    }

    addVersusEnd() {
        let winnerName
        let winnerImg
        console.log("last victory was " + this.game.last_victory)
        if(this.game.last_victory === "r") {
            winnerName = this.versusHolder.firstElementChild.children[1].firstElementChild.firstElementChild.textContent
            winnerImg = this.versusHolder.firstElementChild.children[1].lastElementChild.firstElementChild.src
        } else {
            winnerName = this.versusHolder.firstElementChild.firstElementChild.firstElementChild.firstElementChild.textContent
            winnerImg = this.versusHolder.firstElementChild.firstElementChild.lastElementChild.firstElementChild.src
        }
        this.versusModalLabel.textContent = winnerName
        this.versusModalImg.src = winnerImg
        if(this.game.is_host) {
            this.dismissVersusModalBtn.classList.remove("d-none");
            this.dismissVersusModalBtn.classList.add("d-block");
        } else {
            this.dismissVersusModalBtn.classList.remove("d-block");
            this.dismissVersusModalBtn.classList.add("d-none");
        }
        this.versusModal.show()
        this.versusModalState = true
    }

    addClassicEnd() {
        var element = document.createElement('div')
        element.classList.add("m-3")
        element.classList.add("w-100");
        element.classList.add("d-flex");
        element.classList.add("justify-content-center")
        element.classList.add("align-items-center")
        this.chatHolder.appendChild(element);
        if(this.game.is_host) {
            var butt = document.createElement('button');
            butt.textContent = lang[language]['next'];
            butt.classList.add("btn");
            butt.classList.add("btn-secondary");
            butt.classList.add("finals-button");
            butt.addEventListener("click", () => {
                this.clearTimeline();
                this.timelineElementIndex = -1;
                if(this.timelineIndex >= this.game.gameResults.length) {
                    this.timelineIndex = -1;
                    this.game.hostSendBackToLobby();
                } else {
                    console.log("Calling doNextFinalelement from button press??")
                    this.game.sendDoNextFinalElement(true)
                    this.doNextFinalElement(false);
                }
            })
            element.appendChild(butt);
            this.chatHolder.scrollTop = this.chatHolder.scrollHeight;
        }
    }

    showContentDiv() {
        if(this.pendingContentDiv) {
            console.log("Showing the content div")
            this.pendingContentDiv.classList.add("d-flex");
            this.pendingContentDiv.classList.remove("d-none");
            this.pendingContentDiv = undefined;
            setTimeout(() => {
                this.chatHolder.scrollTop = this.chatHolder.scrollHeight                
            }, 100);
        }
    }

    

    addFinishElement(element, pos, direction, removeLast = false, startRound = false) {
        switch(this.game.current_gamemode) {
            case "classic":
                this.addClassicElement(element, pos, direction);
                break;
            case "faceoff":
                var el
                console.log("DIRECTION IS " + direction)
                if(direction == "l") {
                    el = pos.firstElementChild.firstElementChild
                } else {
                    el = pos.firstElementChild.children[1]
                }
                console.log("Chose the element:")
                console.log(el)
                if(removeLast) {
                    console.log("WE ART REMOVING LAST!!!!")                    
                    if(direction == "l") {
                        console.log("REMOVING LEFT FADEIN, ADDING LEFT FADEOUT")
                        el.classList.remove("animate-headbutt-left")                    
                        el.classList.remove("animate__fadeInLeftBig")                    
                        el.classList.add("animate__fadeOutLeftBig")                   
                    } else {
                        console.log("REMOVING RIGHT FADEIN, ADDING RIGHT FADEOUT")
                        el.classList.remove("animate-headbutt-right")                    
                        el.classList.remove("animate__fadeInRightBig")
                        el.classList.add("animate__fadeOutRightBig")
                    }
                    console.log("After removing fadein and adding fadeout, el is: ")
                    console.log(el)
                    
                    setTimeout(() => {
                        this.addVersusElement(element, el, direction, startRound)
                    }, 1400);
                } else {
                    this.addVersusElement(element, el, direction, startRound)
                }
                break;
            case "time_travel":
                if(direction == "p") {
                    if(this.timelineElementIndex == 0) {
                        this.tvNoise.load()
                        this.addTimeTravelElement(element, pos, direction)
                    } else {
                        
                        this.fastClock.load()
                        this.fastClock.play()
                        document.getElementById("foreground").classList.add("foreground-active")
                        document.getElementById("time-travel-clock").classList.add("time-travel-clock-animation-right")
                        this.tvNoise.load()
                        setTimeout(() => {                        
                            this.addTimeTravelElement(element, pos, direction, false)
                            setTimeout(() => {
                                document.getElementById("foreground").classList.remove("foreground-active")
                                document.getElementById("time-travel-clock").classList.remove("time-travel-clock-animation-right")
                            }, 1000)
                        }, 4000)
                    }
                } else {
                    this.fastClock.load()
                    this.fastClock.play()
                    document.getElementById("foreground").classList.add("foreground-active")
                    document.getElementById("time-travel-clock").classList.add("time-travel-clock-animation-left")
                    this.tvNoise.load()
                    setTimeout(() => {                        
                        this.addTimeTravelElement(element, pos, direction, false)
                        setTimeout(() => {
                            document.getElementById("foreground").classList.remove("foreground-active")
                            document.getElementById("time-travel-clock").classList.remove("time-travel-clock-animation-left")
                        }, 1000)
                    }, 4000)
                }                
                break;
        }
    }

    addTimeTravelElement(element, pos, type, wait = true) {
        if(wait) {
            setTimeout(() => {
                pos.firstElementChild.textContent = element.write
                pos.firstElementChild.classList.add("blur-in")
            }, 500)
        } else {
            pos.firstElementChild.textContent = element.write
            pos.firstElementChild.classList.add("blur-in")
        }
        if(wait) {
            setTimeout(() => {
                removeAllChildren(pos.lastElementChild)                    

                var memePng = document.createElement('img');
                memePng.src = element.draw;
                // memePng.classList.add("drawing-finals-style")
                memePng.classList.add("drawing-fit")
                memePng.classList.add("w-100")        
                memePng.classList.add("mh-100") 
                memePng.classList.add("blur-in")
                this.tvNoise.play()
                pos.lastElementChild.appendChild(memePng);
                if(this.game.is_host) {
                    setTimeout(() => {
                        this.timeTravelIsClickable = true;                    
                    }, 500)
                }
            }, 1200)            
        } else {
            removeAllChildren(pos.lastElementChild)                    

            var memePng = document.createElement('img');
            memePng.src = element.draw;
            // memePng.classList.add("drawing-finals-style")
            memePng.classList.add("drawing-fit")
            memePng.classList.add("w-100")        
            memePng.classList.add("mh-100") 
            memePng.classList.add("blur-in")       
            pos.lastElementChild.appendChild(memePng);
            if(this.game.is_host) {
                setTimeout(() => {
                    this.timeTravelIsClickable = true;                    
                }, 500)
            }
        }
    }

    addVersusElement(element, pos, direction, startRound) {
        this.versusHolder.firstElementChild.classList.remove("gallery-active")

        this.game.versusObject.clear();
        this.game.votes = [0, 0]
        var parser = new DOMParser();
        console.log("pos is ")
        console.log(pos)
        pos.firstElementChild.firstElementChild.textContent = element.write
        removeAllChildren(pos.lastElementChild)
        
        var memePng = document.createElement('img');
        memePng.src = element.draw;
        // memePng.classList.add("drawing-finals-style")
        memePng.classList.add("drawing-fit")
        memePng.classList.add("w-100")        
        memePng.classList.add("mh-100")        
        pos.lastElementChild.appendChild(memePng);

        

        if(direction == "l") {
            console.log("ADDING FADEIN LEFT")
            pos.classList.add("animate__fadeInLeftBig")            
            pos.classList.remove("animate__fadeOutLeftBig")            
        } else {
            console.log("ADDING FADEIN RIGHT")
            pos.classList.add("animate__fadeInRightBig")            
            pos.classList.remove("animate__fadeOutRightBig") 
        }
        pos.classList.add("d-flex")
        pos.classList.remove("d-none")
        console.log("ADDED D-FLEX AND REMOVED D-NONE FROM: ")
        console.log(pos)
        if(startRound) {
            this.versusHolder.firstElementChild.children[0].classList.remove("animate-headbutt-left")        
            this.versusHolder.firstElementChild.children[1].classList.remove("animate-headbutt-right")
            setTimeout(() => {
                this.startVersusRound()            
            }, 1400);
        } else if(this.game.is_host) {
            setTimeout(() => {
                console.log("Calling doNextFinalElement from host setTimeout")
                this.doNextFinalElement()
            }, 1000)
        }
    }

    addWriterElement(element, pos) {        
        var textObject = document.createElement('p')
        textObject.classList.add("animate__lightSpeedInLeft")
        textObject.classList.add("animate__animated")
        textObject.textContent = element.write
        console.log(element)
        console.log(pos)
        
        pos.firstElementChild.appendChild(textObject)

        // var nextBtn = document.createElement('button')
        // nextBtn.classList.add("btn")
        // nextBtn.classList.add("btn-outline-secondary");
        
        // nextBtn.textContent = lang[language]["next"]
        
        // nextBtn.addEventListener("click", (e) => {
        //     this.doNextFinalElement()
        //     nextBtn.remove()
        // })
        // pos.appendChild(nextBtn)
    }


    startTimer(seconds, callback) {
        var timerInterval;
        var timePassed = 0;
        let timeLeft;
        let timeUp = () => {
            this.endTimer()
        }
        this.did_timer_action = false;
        timerInterval = setInterval(() => {
      
            timePassed = timePassed += 1;
            timeLeft = seconds - timePassed;

            document.getElementById("base-timer-label").innerHTML = formatTimeLeft(timeLeft);
            
            setCircleDasharray(timeLeft, seconds);
            setRemainingPathColor(timeLeft);

            if (timeLeft <= 0) {
                timeUp();                
            }
        }, 1000);
        this.timerInterval = timerInterval
        this.timerCallback = callback
    }

    endTimer() {
        if(this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        if(this.timerCallBack) {
            this.timerCallback()
            this.timerCallback = null;
        }
    }

    doTimerAction() {
        if(this.timerCallback) {
            this.timerCallback();
            this.did_timer_action = true;
        }
    }
    

    voteVersus(choice) {
        if(this.expecting_vote) {       
            this.expecting_vote = false                   
            this.game.voteVersus(choice)
        }
    }

    startVersusRound() {
        // this.versusHolder.classList.add("animate__heartBeat")
        this.versusBall.classList.remove("d-none")
        this.versusHolder.firstElementChild.firstElementChild.classList.add("animate-headbutt-left")
        this.versusHolder.firstElementChild.children[1].classList.add("animate-headbutt-right")
        this.versusHolder.firstElementChild.firstElementChild.classList.remove("animate__fadeInLeftBig")
        this.versusHolder.firstElementChild.children[1].classList.remove("animate__fadeInRightBig")
        setTimeout(() => {
            this.versusHolder.firstElementChild.classList.add("gallery-active")            
            // this.versusHolder.firstElementChild.firstElementChild.classList.remove("w-50")
            // this.versusHolder.firstElementChild.lastElementChild.classList.remove("w-50")            
            this.versusHolder.firstElementChild.firstElementChild.addEventListener("click",() => {
                this.voteVersus(0)
            })
            this.versusHolder.firstElementChild.children[1].addEventListener("click",() => {
                this.voteVersus(1)
            })
            this.expecting_vote = true
            //this.startTimer(20, () => {});
        }, 2400);
    }

    addClassicElement(element, pos, direction) {
        var parser = new DOMParser();
        var res = document.createElement('div')
        res.classList.add('animate__bounceIn')
        res.classList.add('finals-element')
        pos.appendChild(res);
        var personSvg = parser.parseFromString(this.personImg, "image/svg+xml");
        console.log()
        var contentDiv = document.createElement('div');

        var personIcon = this.render_xml(res, personSvg)
        personIcon.classList.add("finals-icon")
        res.appendChild(contentDiv);
        contentDiv.classList.add('d-none');
        var nextBtn;
        if(this.game.is_host) {
            nextBtn = document.createElement('button');
            nextBtn.classList.add("btn");
            nextBtn.classList.add("btn-outline-secondary");
            nextBtn.classList.add("finals-button")
            var that = this;
            nextBtn.addEventListener("click", () => {
                nextBtn.classList.add("d-none");
                contentDiv.classList.add("d-flex");
                contentDiv.classList.remove("d-none");
                this.game.sendShowContentDiv();
                this.chatHolder.scrollTop = this.chatHolder.scrollHeight;
                setTimeout(() => {
                    console.log("Calling doNextFinalElement from Next button")
                    that.doNextFinalElement();
                }, 1500)
            })
            nextBtn.textContent = lang[language]['show'];
            res.appendChild(nextBtn);
        } else {
            this.pendingContentDiv = contentDiv;
        }
        
        if(element.write) {    
            //res.classList.add("h-20");
            res.classList.add("d-flex");
            if(direction == "r") {
                res.classList.add("flex-row-reverse");
                contentDiv.classList.add("align-items-end");
            } else {
                contentDiv.classList.add("align-items-start");
            }
            
            contentDiv.classList.add("flex-column");
            var name = document.createElement('h5');
            if(element.name) {                
                name.textContent = element.name;
            } else {
                name.textContent = "No name"
            }
            contentDiv.appendChild(name);

            var message = document.createElement('p');
            message.textContent = element.write;
            contentDiv.appendChild(message)

            
            
        } else if(element.draw) {    
            
            res.classList.add("d-flex");
            if(direction == "r") {
                res.classList.add("flex-row-reverse");
                contentDiv.classList.add("align-items-end");
            } else {
                contentDiv.classList.add("align-items-start");
            }

            
            
            contentDiv.classList.add("flex-column");
            var name = document.createElement('h5');
            if(element.name) {                
                name.textContent = element.name;
            } else {
                name.textContent = "No name"
            }
            contentDiv.appendChild(name);
            console.log(element.draw)
            //var memeSvg = parser.parseFromString(element.draw, "image/svg+xml");
            var memePng = document.createElement('img');
            memePng.src = element.draw;
            memePng.classList.add("drawing-finals-style")
            contentDiv.appendChild(memePng);
        }
    }
    
}

console.log("i am losing my mind")
var ideaGenerator = new IdeaGenerator()
var game = new Game();
var game_interface = new GameInterface(game, ideaGenerator);
game.assign_game_interface(game_interface);

let htmlElement = document.getElementsByTagName("html")[0]
htmlElement.height = window.innerHeight;



// DEBUG!!!!! DO N O T, UNDER ANY CIRCUMSTANCES, LET THIS GET TO PRODUCTION
// function reloadCss()
// {
//     var links = document.getElementsByTagName("link");
//     for (var cl in links)
//     {
//         var link = links[cl];
//         if (link.rel === "stylesheet")
//             link.href += "";
//     }
// }
