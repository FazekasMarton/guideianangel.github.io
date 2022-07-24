// Load modules.
const express = require("express");
const { url } = require("inspector");
const path = require("path")
const app = express()
const port = 6969;
const cors = require("cors");


// Server static files.
app.use(express.static("public"))
app.use(cors())

// Create new server.
app.get("/", (req, res) => {
    let indexPath = path.join(
        __dirname,
        "./index.html"
    );
    console.log(indexPath);
    res.sendFile(indexPath);
});
// Listen port.
app.listen(port, () => {
    console.log("My app listen in: " + port);
});

var dom = {}
var count = 0;
var count2 = 0;
var tag = "";
var summoner_name = "";
var my_champion_name = ""
var regio = "";
var api_key = [];
var enemy_summoner_id_list = [];
var enemy_summoner_name_list = [];
var enemy_champion_name_list = [];
var enemy_champion_id_list = []
var enemy_champion_apiurl = [];
var enemy_summoner_puuid_list = [];
var calculating_level = 0;
var dom = {}
// 0==none; 
// 1==player; 
// 2==player and champion; 
// 3==player, champion and champion against my champion; 
// 4==player, champion; champion against my champion and champion against my champion on the same lane;
var api_key="RGAPI-b9442095-a06b-4406-827e-ff39ebb665d0"
app.use(express.json())
app.post('/data', (request, response) => {
  count = 0;
  count2 = 0;
  tag = "";
  summoner_name = "";
  my_champion_name = ""
  enemy_summoner_id_list = [];
  enemy_summoner_name_list = [];
  enemy_champion_name_list = [];
  enemy_champion_id_list = []
  enemy_champion_apiurl = [];
  enemy_summoner_puuid_list = [];
  calculating_level = 0;
  var data = request.body
  dom = {
    "start": false,
    "me":{
      "SummonerName": "BlackSzalámi",
      "ChampName": "Akali",
      "ChampIcon": "https://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/Akali.png",
    },
    "enemy0":{
      "SummonerName": "Martin Potter",
      "ChampName": "Kled",
      "ChampIcon": "https://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/Kled.png",
    },
    "enemy1":{
      "SummonerName": "nape10",
      "ChampName": "Azir",
      "ChampIcon": "https://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/Azir.png",
    },
    "enemy2":{
      "SummonerName": "DECIMATING SMASH",
      "ChampName": "Sion",
      "ChampIcon": "https://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/Sion.png",
    },
    "enemy3":{
      "SummonerName": "Krisy1117",
      "ChampName": "Tristana",
      "ChampIcon": "https://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/Tristana.png",
    },
    "enemy4":{
      "SummonerName": "Clasheer2",
      "ChampName": "Pyke",
      "ChampIcon": "https://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/Pyke.png",
    },
  }
  for(i=0;i<1;i++){
    dom["enemy"+i]["calculate"]={}
    var levels = [
      "player",
      "champion",
      "championVsChampion",
      "championVsChampionOnLane"
    ]
    for(j=0;j<4;j++){
      dom["enemy"+i]["calculate"][levels[j]]={}
      dom["enemy"+i]["calculate"][levels[j]]["games"]=0
      dom["enemy"+i]["calculate"][levels[j]]["win"]=0
      dom["enemy"+i]["calculate"][levels[j]]["cs"]=0
      dom["enemy"+i]["calculate"][levels[j]]["cs/min"]=0
      dom["enemy"+i]["calculate"][levels[j]]["kda"]=0
    }
  }
  //start(data.tag, data.summoner_name, data.champs)
  test()
})
function test(){
  tag = "euw1";
  regio = "europe"
  summoner_name = "BlackSzalámi";
  my_champion_name = "Akali"
  var enemy_puuid = "aUTomLgliOE8aZBwQ4OGMgLNfxhUOd2q_Kj1B9ZGJ4u5dWpEt4EnMxa_Zg0eZD4hvEgsJhh1HecpBA"
  enemy_champion_name_list = ["Kled","Akali","Sion","Tristana","Pyke"]
  var matchids = [
    "EUW1_5897578926",
    "EUW1_5897535887",
    "EUW1_5895849159",
    "EUW1_5894096747",
    "EUW1_5890578519",
    "EUW1_5890654882",
    "EUW1_5890612420",
    "EUW1_5888384065",
    "EUW1_5885865948",
    "EUW1_5884001641",
    "EUW1_5883885707",
    "EUW1_5883422341",
    "EUW1_5883314039",
    "EUW1_5882529482",
    "EUW1_5882435268",
    "EUW1_5881404663",
    "EUW1_5879701252",
    "EUW1_5879556594",
    "EUW1_5879471420",
    "EUW1_5879231371",
    "EUW1_5879196606",
    "EUW1_5876398046",
    "EUW1_5873056447",
    "EUW1_5872931008",
    "EUW1_5872652245",
    "EUW1_5872518417",
    "EUW1_5870963569",
    "EUW1_5870778248",
    "EUW1_5870761690",
    "EUW1_5869755001",
    "EUW1_5869521224",
    "EUW1_5869144185",
    "EUW1_5867863776",
    "EUW1_5867458223",
    "EUW1_5864374904",
    "EUW1_5860202363",
    "EUW1_5857431132",
    "EUW1_5857131288",
    "EUW1_5853169173",
    "EUW1_5852555679",
    "EUW1_5852295442",
    "EUW1_5850647067",
    "EUW1_5850559283",
    "EUW1_5850457629",
    "EUW1_5850433068",
    "EUW1_5849035909",
    "EUW1_5848939801",
    "EUW1_5848717826",
    "EUW1_5848794309",
    "EUW1_5848731426",
    "EUW1_5847568854",
    "EUW1_5845411832",
    "EUW1_5844535186",
    "EUW1_5842891982",
    "EUW1_5841156438",
    "EUW1_5841156403",
    "EUW1_5841156158",
    "EUW1_5841236224",
    "EUW1_5841236202",
    "EUW1_5841236184",
    "EUW1_5842111165",
    "EUW1_5841362920",
    "EUW1_5841362135",
    "EUW1_5840942956",
    "EUW1_5840942902",
    "EUW1_5841361717",
    "EUW1_5840941920",
    "EUW1_5841360713",
    "EUW1_5841360697",
    "EUW1_5841360665"
  ]
  matchHistory(matchids,enemy_puuid)
  app.get("/dom", (req, res) => {
    res.json(dom)
  })
}
function start(tag_data, summoner_name_data, champs_data){

  tag = tag_data;
  summoner_name = summoner_name_data;
  champs = champs_data
  console.log(tag)
  if(tag == "eun1" || tag == "euw1" || tag == "tr1" || tag == "ru"){
    regio="europe"
  }else{
    if(tag == "na1" || tag == "br1" || tag == "la1" || tag == "la2" || tag == "oc1"){
      regio="americas"
    }else{
      if(tag == "kr" || tag == "jp1"){
        regio="asia" 
      }else{
        console.log("error")
      } 
    }
  }
  apiurl = "https://"+tag+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+encodeURIComponent(summoner_name)+"?api_key="+api_key
  summonerDataCollector(apiurl)
}
function summonerDataCollector(apiurl){
  fetch(apiurl)
  .then(response => response.json())
  .then(data => spactatorDataCollector(data["id"]))
}
function spactatorDataCollector(id){
  var apiurl = "https://"+tag+".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+id+"?api_key="+api_key
  fetch(apiurl)
  .then(response => response.json())
  .then(data => NameAndCP(data,id))
}
function NameAndCP(match,playerId){
  for(i=0;i<10;i++){
    var summoner_id = match["participants"][i]["summonerId"]
    if(summoner_id==playerId){
      allyTeam_id = match["participants"][i]["teamId"]
      var username = match["participants"][i]["summonerName"]
      dom["me"]["SummonerName"] = username
      var champion_id = match["participants"][i]["championId"]  
      userChampionName(champs[0][champion_id])
    }
  }
  for(i=0;i<10;i++){
    var team_id = match["participants"][i]["teamId"]
    if(allyTeam_id!=team_id){
      enemy_summoner_id_list.push(match["participants"][i]["summonerId"])
      enemy_champion_id_list.push(match["participants"][i]["championId"])
      enemy_summoner_name_list.push(match["participants"][i]["summonerName"])
    }
  }
  for(i=0;i<5;i++){
    dom["enemy"+i]["SummonerName"] = enemy_summoner_name_list[i]
  }
  enemyChampionName(champs)
  enemyMatch()
  app.get("/dom", (req, res) => {
    res.json(dom)
  })
}
async function enemyMatch(){
  for(z=0;z<1;z++){ // number of enemy
    //console.log("player")
    apiurl = "https://"+tag+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+enemy_summoner_name_list[z]+"?api_key="+api_key
    await fetch(apiurl)
      .then(response => response.json())
      .then(data => puuid(data["puuid"]))
  }
}
async function puuid(puuid){
  apiurl = "https://"+regio+".api.riotgames.com/lol/match/v5/matches/by-puuid/"+puuid+"/ids?start=0&count=100&api_key="+api_key
  await fetch(apiurl)
    .then(response => response.json())
    .then(data => matchHistory(data,puuid))
}
async function matchHistory(matchid,puuid){
  for(j=0;j<50;j++){ // number of games
    console.log("Game "+(j+1)+":")
    apiurl = "https://"+regio+".api.riotgames.com/lol/match/v5/matches/"+matchid[j]+"?api_key="+api_key
    await fetch(apiurl)
      .then(response => response.json())
      .then(data => matchData(data,puuid,matchid[j]))
  }
  setTimeout(function(){dom["start"] = true},2000)
}
async function matchData(data,puuid,match_id){

  calculating_level = 0;
  //console.log(data)
  if(data["info"]!=undefined){
    if(data["info"]["gameType"] != "CUSTOM_GAME" && data["info"]["participants"][0]["challenges"] != undefined){
      calculating_level = 1;
      for(k=0;k<10;k++){ // participants of the game
        if(data["info"]["participants"][k]["puuid"] == puuid){
          if(data["info"]["participants"][k]["championName"]==enemy_champion_name_list[0]){//enemy_champion_name_list[z] 
            calculating_level = 2;
            for(l=0;l<10;l++){
              if(data["info"]["participants"][l]["championName"] == my_champion_name){
                calculating_level = 3;
                if(data["info"]["participants"][k]["teamPosition"] == data["info"]["participants"][l]["teamPosition"]){
                  calculating_level = 4;
                }
              }
            }
          }
        }
      }
      await calculations(data,calculating_level,puuid,match_id)
    }
  }else{
    console.log("--Error--")
  }
}
function userChampionName(champion_name){
  var apiurl = "http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion/"+champion_name+".json"
  fetch(apiurl)
    .then(response => response.json())
    .then(data => userChampionDetails(data,champion_name))
}
function userChampionDetails(data,champion_name){
  var pic_apiurl = "https://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/"+champion_name+".png"
  dom["me"]["ChampName"] = data["data"][champion_name]["name"];
  dom["me"]["ChampIcon"] = pic_apiurl;
}
async function enemyChampionName(data){
  for(i=0;i<5;i++){
    enemy_champion_name_list.push(data[0][enemy_champion_id_list[i]])
  }
  count = 0;
  // console.log(enemy_champion_name_list)
  for(i=0;i<5;i++){
    // console.log(enemy_champion_name_list[i])
    var apiurl = "http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion/"+enemy_champion_name_list[i]+".json"
    await fetch(apiurl)
      .then(response => response.json())
      .then(data => enemyChampionDetails(data))
  }
}
function enemyChampionDetails(data){
  single_enemy_champion_name = enemy_champion_name_list[count]
  dom["enemy"+count]["ChampName"] = data["data"][single_enemy_champion_name]["name"]
  dom["enemy"+count]["ChampIcon"] = "https://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/"+single_enemy_champion_name+".png"
  count++;
}

//----Calculations----//
async function calculations(data,lvl,puuid,match_id){
  var calculation_lvl = []
  if(lvl>=1){
    calculation_lvl.push(dom["enemy0"]["calculate"]["player"])
  }
  if(lvl>=2){
    calculation_lvl.push(dom["enemy0"]["calculate"]["champion"])
  }
  if(lvl>=3){
    calculation_lvl.push(dom["enemy0"]["calculate"]["championVsChampion"])
  }
  if(lvl>=4){
    calculation_lvl.push(dom["enemy0"]["calculate"]["championVsChampionOnLane"])
  }
  var match_data = "";
  apiurl = "https://"+regio+".api.riotgames.com/lol/match/v5/matches/"+match_id+"/timeline?api_key="+api_key
  //console.log(apiurl)
  await fetch(apiurl)
  .then(response => response.json())
  .then(data => match_data = data)
  var player_id = 0
  if(match_data["info"] != undefined){
    for(b=0;b<10;b++){
      //console.log(match_data)
      if(match_data["info"]["participants"][b]["puuid"]==puuid){
        player_id = match_data["info"]["participants"][b]["participantId"]
      }
    }
    for(a=0;a<calculation_lvl.length;a++){
      timeLineCalculations(calculation_lvl[a],player_id,match_data)
      gameNumber(calculation_lvl[a])
      winNumber(calculation_lvl[a],puuid,data)
      farmCounter(calculation_lvl[a],puuid,data)
      farmPerMinuteCounter(calculation_lvl[a],puuid,data)
      kdaCalculator(calculation_lvl[a],puuid,data)
      if(lvl>1){
        itemCounter(calculation_lvl[a],puuid,data)
      }
      
    }
  }else{
    console.log("error")
  }
}

function gameNumber(dom_manipulation){
  dom_manipulation["games"]++
}

function winNumber(dom_manipulation,puuid,data){
  var win=0
  for(b=0;b<10;b++){
    if(data["info"]["participants"][b]["puuid"]==puuid && data["info"]["participants"][b]["win"]==true){
      win=1
    }
  }
  dom_manipulation["win"]+=win
}

function farmCounter(dom_manipulation,puuid,data){
  var cs=0
  for(b=0;b<10;b++){
    if(data["info"]["participants"][b]["puuid"]==puuid){
      cs=data["info"]["participants"][b]["challenges"]["enemyJungleMonsterKills"]+data["info"]["participants"][b]["challenges"]["alliedJungleMonsterKills"]+data["info"]["participants"][b]["totalMinionsKilled"]
    }
  }
  dom_manipulation["cs"]+=cs
}

function farmPerMinuteCounter(dom_manipulation,puuid,data){
  var csmin=0
  for(b=0;b<10;b++){
    if(data["info"]["participants"][b]["puuid"]==puuid){
      csmin=(data["info"]["participants"][b]["challenges"]["enemyJungleMonsterKills"]+data["info"]["participants"][b]["challenges"]["alliedJungleMonsterKills"]+data["info"]["participants"][b]["totalMinionsKilled"])/(data["info"]["gameDuration"]/60)
    }
  }
  dom_manipulation["cs/min"]+=csmin
}

function kdaCalculator(dom_manipulation,puuid,data){
  var kda = 0
  for(b=0;b<10;b++){
    if(data["info"]["participants"][b]["puuid"]==puuid){
      kda += data["info"]["participants"][b]["challenges"]["kda"]
    }
  }
  dom_manipulation["kda"]+=kda
}

function timeLineCalculations(dom_manipulation,player_id,match_data){
  //function calls:
  timeLineKillCounter(dom_manipulation,match_data,player_id)
  timeLineDeathCounter(dom_manipulation,match_data,player_id)
  timeLineAssistCounter(dom_manipulation,match_data,player_id)
}

function timeLineKillCounter(dom_manipulation,data,id){
  for(c=0;c<data["info"]["frames"].length;c++){
    for(d=0;d<data["info"]["frames"][c]["events"].length;d++){
      if(data["info"]["frames"][c]["events"][d]["type"]=="CHAMPION_KILL"){
        if(data["info"]["frames"][c]["events"][d]["killerId"]==id){
          var minute = Math.floor((data["info"]["frames"][c]["events"][d]["timestamp"]/1000)/60);
          if(dom_manipulation["timeline"]==undefined){
            dom_manipulation["timeline"]={}
          }
          if(dom_manipulation["timeline"][minute]==undefined){
            dom_manipulation["timeline"][minute]={}
          }
          if(dom_manipulation["timeline"][minute]["kill"]==undefined){
            dom_manipulation["timeline"][minute]["kill"]=0
          }
          dom_manipulation["timeline"][minute]["kill"]++
        }
      }
    }
  }
}

function timeLineDeathCounter(dom_manipulation,data,id){
  for(c=0;c<data["info"]["frames"].length;c++){
    for(d=0;d<data["info"]["frames"][c]["events"].length;d++){
      if(data["info"]["frames"][c]["events"][d]["type"]=="CHAMPION_KILL"){
        if(data["info"]["frames"][c]["events"][d]["victimId"]==id){
          var minute = Math.floor((data["info"]["frames"][c]["events"][d]["timestamp"]/1000)/60);
          if(dom_manipulation["timeline"]==undefined){
            dom_manipulation["timeline"]={}
          }
          if(dom_manipulation["timeline"][minute]==undefined){
            dom_manipulation["timeline"][minute]={}
          }
          if(dom_manipulation["timeline"][minute]["death"]==undefined){
            dom_manipulation["timeline"][minute]["death"]=0
          }
          dom_manipulation["timeline"][minute]["death"]++
        }
      }
    }
  }
}

function timeLineAssistCounter(dom_manipulation,data,id){
  for(c=0;c<data["info"]["frames"].length;c++){
    for(d=0;d<data["info"]["frames"][c]["events"].length;d++){
      if(data["info"]["frames"][c]["events"][d]["type"]=="CHAMPION_KILL" && data["info"]["frames"][c]["events"][d]["assistingParticipantIds"]!=undefined){
        for(e=0;e<data["info"]["frames"][c]["events"][d]["assistingParticipantIds"].length;e++){
          if(data["info"]["frames"][c]["events"][d]["assistingParticipantIds"][e]==id){
            var minute = Math.floor((data["info"]["frames"][c]["events"][d]["timestamp"]/1000)/60);
            if(dom_manipulation["timeline"]==undefined){
              dom_manipulation["timeline"]={}
            }
            if(dom_manipulation["timeline"][minute]==undefined){
              dom_manipulation["timeline"][minute]={}
            }
            if(dom_manipulation["timeline"][minute]["assist"]==undefined){
              dom_manipulation["timeline"][minute]["assist"]=0
            }
            dom_manipulation["timeline"][minute]["assist"]++
          }
        }
      }
    }
  }
}

function itemCounter(dom_manipulation,puuid,data){
  for(b=0;b<10;b++){
    if(data["info"]["participants"][b]["puuid"]==puuid){
      for(c=0;c<7;c++){
        if(dom_manipulation["items"]==undefined){
          dom_manipulation["items"]={0: {"id":0, "count": 0}}
        }
        var added=false
        var len=Object.keys(dom_manipulation["items"]).length
        for(d=0;d<len;d++){
          if(data["info"]["participants"][b]["item"+c]==dom_manipulation["items"][d]["id"]){
            added=true
          }
        }
        if(added==false){
          if(dom_manipulation["items"][len]==undefined){
            dom_manipulation["items"][len]={}
          }
          dom_manipulation["items"][len]["id"]=data["info"]["participants"][b]["item"+c]
          dom_manipulation["items"][len]["count"]=1
        }else{
          for(e=0;e<len;e++){
            if(data["info"]["participants"][b]["item"+c]==dom_manipulation["items"][e]["id"]){
              dom_manipulation["items"][e]["count"]++
            }
          }
        }
      }
    }
  }
}