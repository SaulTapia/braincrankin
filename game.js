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
        "done": "listo"
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
    // {
    //     "name" : "coming_soon",
    //     "desc" : "",
    //     "gameStyle" : "none",
    //     "time-limit-secs": 0,
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



class Player
{
    constructor(peerId, name, is_host) {
        this.peerId = peerId;
        this.name = name;
        this.is_host = is_host;
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
        this.peer = new Peer();
        this.playerConns = []
        this.players = [];
        this.roundList = [];
        this.roundPlayerList = [];
        this.roundPlayerConns = [];
        this.roundPlayerMatches = [];
        this.roundPlayerMatchesOriginalIndex = [];
        this.readySet = new Set();
        this.versusObject = new Set;
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
            this.conn_to_host.on("open", () => {
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
                        game.game_interface.startCountDown();
                        console.log("start countdown!!")
                        break;                                        
                        
                    case "roundStart":
                        this.startRound(data.round, data.roundData, data.firstRound)
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
                        this.game_interface.doNextFinalElement();
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
                        console.log("GOT DATA")
                        console.log(data)
                        if('type' in data) {
                            switch (data.type) {
                                case 'close':
                                    console.log("YUP, YOU'RE FUCKING DEAD KIDDO")
                                    game.players = game.players.filter((element) => element.peerId != conn.peer)
                                    game.playerConns = game.playerConns.filter((element) => element.peer != conn.peer)
                                    game.readySet.delete(conn.peer)
                                    game.sendUpdatePlayers();
                                    if(game.game_started) {
                                        game.tryToStartNextRound()
                                    }
                                    break;
                                
                                case 'ready':
                                    game.handleReady(conn.peer, data.outputData, false);
                            
                                default:
                                    break;
                            }
                        }
                    })
                    conn.on('close', () => {
                        game.players = game.players.filter((element) => element.peerId != conn.peer)
                        game.playerConns = game.playerConns.filter((element) => element.peer != conn.peer)
                        game.sendUpdatePlayers();
                        if(game.game_started) {
                            game.tryToStartNextRound()
                        }                        
                    })
                    conn.on('error', (error) => {
                        console.warn(error)
                        game.players = game.players.filter((element) => element.peerId != conn.peer)
                        game.playerConns = game.playerConns.filter((element) => element.peer != conn.peer)
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

    sendCountDown() {
        this.game_started = true;
        for(var i = 0; i < this.playerConns.length; i++) {
            this.playerConns[i].send({
                "error" : false,
                "type" : "startCountDown",
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
        this.roundList = []
        console.log(gamemode)
        switch(gamemode.name) {
            case "classic":
                this.roundList.push({
                    "input" : "none",
                    "output" : "write",
                    "label" : "write_prompt"
                });
                for(var i = 1; i < this.players.length; i++) {
                    if(i % 2 == 0) {
                        this.roundList.push({
                            "input" : "draw",
                            "output" : "write",
                            "label" : "write_prompt_from_drawing"
                        });
                    } 
                    else {
                        this.roundList.push({
                            "input" : "write",
                            "output" : "draw",
                            "label" : "draw_from_prompt"
                        });
                    }
                }
                break;
            case "faceoff":
                console.log("VERSUS")
                this.roundList.push({
                    "input" : "none",
                    "output": "drawAndName",
                    "label": "versus_first"
                });
                for(var i = 1; i < this.players.length; i++) {
                    this.roundList.push({
                        "input" : "drawAndName",
                        "output": "drawAndName",
                        "label": "versus_fight"
                    })
                }
                break;

            default:
                break;
        
        }
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
        console.log(this.roundList)
        console.log(this.gameResults)
        console.log(firstRound)
        if(this.roundList.length) {
            console.log("roundlist length")
            var round = this.roundList.shift();
            console.log(round)
            this.readySet.clear();
            this.sendStartRound(round, firstRound)
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
        }
        return null;
    }

    sendStartRound(round, firstRound) {
        console.log(this.roundPlayerConns)
        console.log("There are " + this.roundPlayerConns.length + " conns")
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
                    "firstRound" : firstRound
                })
            }            
        }
        console.log("Host has index " + this.self_match_index)
        let hostData = this.getRoundData(this.self_match_index)
        this.startRound(this.makeRoundFromRoundData(hostData), hostData, firstRound)
    }

    voteVersus(choice) {
        if(this.is_host && !this.readySet.has(this.peer.id)) {
            this.votes[choice]++
            this.handleVersusReady(this.peer.id, choice)
        }
    }

    startRound(round, roundData, firstRound) {        
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
                }
                break;
            case "drawAndName":
                this.game_interface.showInputDiv();
                this.game_interface.showInputWriteDiv(roundData.write);
                this.game_interface.showInputDrawDiv(roundData.draw);
                this.game_interface.setInputDivLabel(lang[language][round.label]);
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
                this.game_interface.showOutputWriteDiv();
                this.game_interface.showOutputDrawDiv();                    
                this.game_interface.setOutputDivLabel(lang[language][round.label])

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

    tryToStartNextRound() {
        console.log(this.readySet.size + " ready, need " + this.players.length)
        if(this.readySet.size == this.players.length) {
            this.rotateArrayRight(this.roundPlayerMatches);
            this.rotateArrayRight(this.roundPlayerMatchesOriginalIndex);
            this.self_match_index++;
            if(this.roundPlayerMatches[0].is_host) {
                this.self_match_index = 0;
            }
            console.log("Beep boop")
            this.hostNextRound(false)            
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

    sendDoNextFinalElement(resetTimeline) {
        console.log("Sending DoNextFinalElement!")
        for(let i = 0; i < this.playerConns.length; i++) {
            this.playerConns[i].send({
                "error" : false,
                "type": "doNextFinalElement",
                "resetTimeline": resetTimeline
            });
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

    handleReady(peerId, outputData, is_self) {
        console.log(peerId + " is ready!");
        console.log(outputData);
        if(!is_self && peerId == this.peer.id) {
            return;
        }
        if(this.readySet.has(peerId)) {
            return;
        }
        this.readySet.add(peerId);
        for(let i = 0; i < this.roundPlayerMatches.length; i++) {
            if(peerId == this.roundPlayerMatches[i].peerId) {
                console.log(this.roundPlayerMatches[i].name)
                this.gameResults[i].push({
                    "name" : this.roundPlayerMatches[i].name,
                    ...outputData
                });
            }
        }
        this.tryToStartNextRound();
    }

    handleVersusReady(peerId, choice) {
        if(this.current_gamemode != "versus" || !this.is_host) return
        if(!this.versusObject.has(peerId)) {
            this.versusObject.add(choice)
        }
        if(this.versusObject.size == this.players.length) {
            if(this.votes[0] > this.votes[1]) {
                this.last_victory = "l"
            } else if(this.votes[0] < this.votes[1]) {
                this.last_victory = "r"
            } else {
                let choices = ["l", "r"];
                this.last_victory = choices[Math.floor(Math.random() * 2)]
            }
            this.game_interface.doNextFinalElement(true)
            this.votes[0] = 0
            this.votes[1] = 0
            this.versusObject.clear()
        }
    }
    
    getOutputData() {
        switch(this.expected_output) {
            case "write":
                return {
                    "user": this.name,
                    "write" : this.game_interface.getOutputWrite() 
                }
            case "draw":
                return {
                    "user": this.name,
                    "draw" : this.game_interface.getOutputDraw()
                }

            case "drawAndName":
                return {
                    "user": this.name,
                    "draw" : this.game_interface.getOutputDraw(),
                    "write": this.game_interface.getOutputWrite()
                }
            
            default:
                return undefined
        }
        
    }

    ready() {
        console.log("the end is upon us")
        if(this.is_host) {
            this.handleReady(this.peer.id, this.getOutputData(), true)
        } else {
            this.sendReadyToHost(this.getOutputData());
        }
        
    }

    leaveGame() {
        this.close_conn(this.conn_to_host)
        this.peer.destroy();
        this.peer = new Peer();
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
        this.peer = new Peer();
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

class GameInterface {
    constructor(game) {
        this.setLanguageLabels();
        this.game = game;
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
        this.versusBall = document.getElementById("versus-ball");        
        this.colorHolder = document.getElementById("color-holder");
        this.widthHolder = document.getElementById("width-holder");
        this.canvasHolder = document.getElementById("canvas-holder");
        this.topBar = document.getElementById("top-bar");
        this.mainContainer = document.getElementById("main-container");
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
        this.hostButton.disabled = true;
        this.startButton.disabled = true;
        

        this.outputButton.addEventListener("click", () => {
            if(this.game.expected_output == "write") {
                if(this.outputWriteArea.value.length > 0 && this.outputWriteArea.value != "") {
                    this.ready()
                }
            }
            else if(this.game.expected_output == "drawAndName") {
                if(this.outputWriteArea.value.length > 0 && this.outputWriteArea.value != "") {
                    this.ready()
                }
            }
            else {
                this.ready()
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
        

        function handleCanvasTouch(event) {
            console.log("doin a touchmove")
            if(e.touches.length) {
                console.log("preventdefault at touchmove function")
                e.preventDefault()
                var touch = e.touches[0];
                var mouseEvent = new MouseEvent("mousemove", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                g_interface.canvas.dispatchEvent(mouseEvent);
            }
        }
        
        function startDrawing(event) {
            document.addEventListener("mousemove", draw);            
        }
        function startDrawingTouch(event) {            
            document.addEventListener('touchmove', draw);        
            document.addEventListener("touchmove", handleCanvasTouch, false);
        }

        function endDrawing(event) {
            document.removeEventListener("mousemove", draw);
        }
        function endDrawingTouch(event) {            
            document.removeEventListener('touchmove', draw);        
            document.removeEventListener("touchmove", handleCanvasTouch);
        }

        document.addEventListener('mousedown', (e) => {
            startDrawing(e);
            setPosition(e);
            draw(e);
        });
        document.addEventListener('touchstart', (e) => {
            startDrawingTouch(e);
            setPosition(e);
            draw(e);
        });

        document.addEventListener('mouseup', (e) => {
            endDrawing(e);
        });
        document.addEventListener('touchend', (e) => {
            endDrawingTouch(e);        
        });

        this.canvas.addEventListener('mouseenter', setPosition);
        
        
        //canvas.addEventListener('touchend', handleDrawingEnd);

        // new position from mouse event
        function setPosition(e) {
            if(e.touches && e.touches.length) {
                console.log(e)
                e.preventDefault();
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
                ctx.canvas.width = g_interface.canvas.clientWidth;
                ctx.canvas.height = g_interface.canvas.clientHeight;                
                g_interface.canvasWidth = g_interface.canvas.clientWidth;
                g_interface.canvasHeight = g_interface.canvas.clientHeight;
            }                        
        }

        function draw(e) {
            //console.log("Attempting to draw")
            // mouse left button must be pressed
            
            if (!(e.buttons === 1 || (e.touches && e.touches.length))) return;
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

    setLanguageLabels() {
        document.getElementById("players-label").textContent = lang[language]['players']
        document.getElementById("gamemodes-label").textContent = lang[language]['gamemodes']
        document.getElementById("lobby-guest-text").textContent = lang[language]['lobby_guest_text']
        document.getElementById("nickname-label").textContent = lang[language]['nickname']
        document.getElementById("start-label").textContent = lang[language]['start']
        document.getElementById("game-results").textContent = lang[language]['game_results']
        document.getElementById("invite-label").textContent = lang[language]['invite']
        document.getElementById("start-lobby-label").textContent = lang[language]['start']
        document.getElementById("output-button").textContent = lang[language]['done']
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
        this.game.game_started = false;
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

        this.hideInputDiv();
        this.hideOutputDiv();
        this.hideFinalsDiv();

        if(this.has_invite) {
            //this.game.name = this.nameBox.value
            //this.game.join_game(this.invite_id);
            this.lobbyGuestText.classList.add("d-flex");
            this.lobbyGuestText.classList.remove("d-none");
            
            this.lobbyHostButtons.classList.remove("d-flex");
            this.lobbyHostButtons.classList.add("d-none");
        }
        else {
            this.game.name = this.nameBox.value
            //this.game.be_host();

            this.lobbyGuestText.classList.add("d-none");
            this.lobbyGuestText.classList.remove("d-flex");
            
            this.lobbyHostButtons.classList.add("d-flex");
            this.lobbyHostButtons.classList.remove("d-none");
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
        console.log("main menu")
        //if(this.game.is_host) this.game.stop_hosting();
        //else if(this.game.in_lobby) {
            //this.game.leaveGame()
        //}
        this.rockyNoise.load();
        this.rockyNoise.play();
    }

    removeLobby() {
        this.quitButton.style.display = 'none';
        this.playerList.classList.add("d-none");
        this.playerList.classList.remove("d-flex");
        this.lobbyGames.classList.add("d-none");
        this.lobbyGames.classList.remove("d-flex");
        this.mainContainer.classList.remove("h-lg-90")
        this.topBar.classList.remove("d-lg-flex")
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
        console.log("Append " + pngImage);
        console.log("Appended to " + this.inputDrawDiv)
    }
    
    resetInputDiv() {
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
        this.outputHideDrawing();
        this.outputDivLabel.textContent = "";
        this.outputWriteArea.value = "";
        this.color = colors[0];
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

    ready() {
        this.outputButton.disabled = true;
        this.game.ready()
    }

    showFinalsDiv(style) {
        this.finalsDiv.classList.add("d-flex");
        this.finalsDiv.classList.remove("d-none");
        console.log("got show with style " + style)
        if(style == "chat") {
            this.chatHolder.classList.add("d-flex");
            this.chatHolder.classList.remove("d-none");
            this.versusHolder.classList.remove("d-flex");
            this.versusHolder.classList.add("d-none");
            document.getElementById("game-results").classList.remove("d-none")
        } else if(style == "versus") {
            document.getElementById("game-results").classList.add("d-none")
            this.chatHolder.classList.add("d-none");
            this.chatHolder.classList.remove("d-flex");
            this.versusHolder.classList.add("d-flex");
            this.versusHolder.classList.remove("d-none");
            this.handleVersusFinals()
        }
        this.rockyNoise.load();
        this.rockyNoise.play();
    }

    handleVersusFinals() {
        
    }

    finishGame(style) {
        console.log("finish game with style " + style)
        this.hideInputDiv();
        this.hideOutputDiv();
        this.showFinalsDiv(style);
        this.timelineElementIndex = -1;
        this.timelineIndex = -1;
        if(this.game.is_host) {
            setTimeout(() => {
                this.doNextFinalElement()
                console.log("Calling from finishGame")
            }, 800)
        }
    }
    
    doNextFinalElement(send = true) {
        console.log("=================================================")
        console.log("Call showContentDiv from nextFinalElement")
        console.log(this.timelineIndex, this.timelineElementIndex)
        this.showContentDiv();
        if(send && this.game.is_host) {
            this.game.sendDoNextFinalElement(false);
        }
        if(this.timelineIndex >= this.game.gameResults.length) {
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
            this.addFinalsEnd();
            return;
        }

        if(changedTimeline) {
            console.log("CHANGE TIMELINESSS")
            this.addFinalsEnd();
            return;
        }
        let dir;
        let pos;
        if(this.game.current_gamemode == "classic") {
            dir = ((this.timelineElementIndex % 2) == 0) ? "l" : "r";
            pos = this.chatHolder
        } else if(this.game.current_gamemode == "faceoff"){
            pos = this.versusHolder

            if(this.game.last_victory) {
                dir = this.game.last_victory;
            }
            else {
                dir = ((this.timelineElementIndex % 2) == 0) ? "l" : "r";
            }
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
        } else {
            this.game.last_victory = null
        }
    }

    addFinalsEnd() {
        //this.game.sendAddFinalsEnd();
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
                    console.log("Calling from button press??")
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
                if(removeLast) {
                    if(direction == "l") {
                        el.classList.remove("animate__fadeInLeftBig")                    
                        el.classList.add("animate__fadeOutLeftBig")                   
                    } else {
                        el.classList.remove("animate__fadeInRightBig")
                        el.classList.add("animate__fadeOutRightBig")
                    }
                    setTimeout(() => {
                        this.addVersusElement(element, el, direction, startRound)
                    }, 1400);
                } else {
                    this.addVersusElement(element, el, direction, startRound)
                }
                break;
        }
    }

    addVersusElement(element, pos, direction, startRound) {
        var parser = new DOMParser();
        console.log("pos is " + pos)
        pos.firstElementChild.firstElementChild.textContent = element.write
        removeAllChildren(pos.lastElementChild)
        
        var memePng = document.createElement('img');
        memePng.src = element.draw;
        // memePng.classList.add("drawing-finals-style")
        memePng.classList.add("drawing-fit")
        memePng.classList.add("w-100")        
        memePng.classList.add("mh-100")
        pos.lastElementChild.appendChild(memePng);

        pos.classList.remove("animate__fadeOutLeftBig")
        pos.classList.remove("animate__fadeOutRightBig")
        if(direction == "l") {
            pos.classList.add("animate__fadeInLeftBig")
        } else {
            pos.classList.add("animate__fadeInRightBig")
        }
        pos.classList.add("d-flex")
        pos.classList.remove("d-none")
        if(startRound) {

            setTimeout(() => {
                this.startVersusRound()            
            }, 1400);
        } else {
            setTimeout(() => {
                this.doNextFinalElement()
            }, 1000)
        }
    }

    voteVersus(choice) {
        this.game.voteVersus(choice)
    }

    startVersusRound() {
        // this.versusHolder.classList.add("animate__heartBeat")
        this.versusBall.classList.remove("d-none")
        this.versusHolder.firstElementChild.firstElementChild.classList.add("animate-headbutt-left")
        this.versusHolder.firstElementChild.children[1].classList.add("animate-headbutt-right")
        setTimeout(() => {
            this.versusHolder.firstElementChild.classList.add("gallery-active")
            // this.versusHolder.firstElementChild.firstElementChild.classList.remove("w-50")
            // this.versusHolder.firstElementChild.lastElementChild.classList.remove("w-50")
            this.versusHolder.firstElementChild.firstElementChild.addEventListener("click",this.voteVersus(0))
            this.versusHolder.firstElementChild.children[1].addEventListener("click",this.voteVersus(1))
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
var game = new Game();
var game_interface = new GameInterface(game);
game.assign_game_interface(game_interface);

let htmlElement = document.getElementsByTagName("html")[0]
htmlElement.height = window.innerHeight;
