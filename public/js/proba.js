divCreator()
function divCreator(){
  for(i=0;i<5;i++){
    var div = document.createElement("div");
    div.className = "enemyPlayer";
    document.getElementById("enemy").appendChild(div);
    var name = document.createElement("div");
    name.id = "enemy"+i+"NNI";
    document.getElementsByClassName("enemyPlayer")[i].appendChild(name)
    var name = document.createElement("p");
    name.id = "enemy"+i+"SummonerName";
    document.getElementById("enemy"+i+"NNI").appendChild(name)
    var name = document.createElement("p");
    name.id = "enemy"+i+"ChampName";
    document.getElementById("enemy"+i+"NNI").appendChild(name)
    var name = document.createElement("img");
    name.id = "enemy"+i+"ChampIcon";
    document.getElementById("enemy"+i+"NNI").appendChild(name)
    var name = document.createElement("div");
    name.id = "enemy"+i+"ChampContent";
    name.innerText="asdasdasda sdasdasdasdddddd dddddd ddd dddddddddd dddddddd dddddddd ddaaa aaaaaaa asdddddddd asdsgvwjk fvazweghbkajgj jwehrvgbnwjgnxnzgjkw evqzwghexqwzgjyzhjkzw gczeqzthywuztyubw zegcuzwezyguwgeqjy kwezsafgze etybzbw ezafjzet ywqeftwqfbe ynwe asejbwfhb cwgevf mhywtefbxtwfeb wyeliwzeé rhsáerizen rxwehqw ieéuzg e7irg,m evbluh udtfgbwbez qwbrv efd"
    document.getElementsByClassName("enemyPlayer")[i].appendChild(name)
  }
}
var count = 0;
var count2 = 0;
var tag = "";
var summoner_name = "";
var api_key = [];
var enemy_summoner_id_list = [];
var enemy_summoner_name_list = [];
var enemy_champion_name_list = [];
var enemy_champion_id_list = []
var enemy_champion_url = [];
var enemy_summoner_puuid_list = [];
function start(){
  count = 0;
  count2 = 0;
  tag = "";
  summoner_name = "";
  api_key = [];
  enemy_summoner_id_list = [];
  enemy_summoner_name_list = [];
  enemy_champion_name_list = [];
  enemy_champion_id_list = []
  enemy_champion_url = [];
  enemy_summoner_puuid_list = [];
  fetch("../json/apikey.json")
    .then(response => response.json())
    .then(data => apiKey(data))
}
function apiKey(key){
  console.log(key[0]["key"])
  tag = document.getElementById("tag").value;
  summoner_name = document.getElementById("name").value;
  for(i=0;i<2;i++){
    api_key.push(key[i]["key"])
  }
  url = "https://"+tag+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+encodeURIComponent(summoner_name)+"?api_key="+api_key[0]
  summonerDataCollector(url)
}
function summonerDataCollector(url){
  fetch(url)
  .then(response => response.json())
  .then(data => spactatorDataCollector(data["id"]))
}
function spactatorDataCollector(id){
  var url = "https://"+tag+".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+id+"?api_key="+api_key[0]
  fetch(url)
  .then(response => response.json())
  .then(data => NameAndCP(data,id))
}
async function NameAndCP(match,playerId){
  for(i=0;i<10;i++){
    var summoner_id = match["participants"][i]["summonerId"]
    if(summoner_id==playerId){
      allyTeam_id = match["participants"][i]["teamId"]
      var username = match["participants"][i]["summonerName"]
      document.getElementById("mySummonerName").innerText = username
      var champion_id = match["participants"][i]["championId"]  
      await fetch("../json/champs.json")
        .then(response => response.json())
        .then(data => userChampionName(data[0][champion_id]))
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
    document.getElementById("enemy"+i+"SummonerName").innerHTML=enemy_summoner_name_list[i];
  }
  await fetch("../json/champs.json")
    .then(response => response.json())
    .then(data => enemyChampionName(data))
  enemyMatch()
}
async function enemyMatch(){
  for(i=0;i<1;i++){ // number of enemy
    url = "https://"+tag+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+enemy_summoner_name_list[i]+"?api_key="+api_key[0]
    await fetch(url)
      .then(response => response.json())
      .then(data => puuid(data["puuid"]))
  }
}
async function puuid(puuid){
  count = 0
  url = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/"+puuid+"/ids?start=0&count=100&api_key="+api_key[0]
  await fetch(url)
    .then(response => response.json())
    .then(data => matchHistory(data,puuid))
}
async function matchHistory(matchid,puuid){
  for(j=0;j<97;j++){ // number of games
    url = "https://europe.api.riotgames.com/lol/match/v5/matches/"+matchid[j]+"?api_key="+api_key[0]
    await fetch(url)
      .then(response => response.json())
      .then(data => matchData(data,puuid))
  }
}
function matchData(data,puuid){
  for(k=0;k<10;k++){ // participants of the game
    if(data["info"]["participants"][k]["puuid"] == puuid){
      if(data["info"]["participants"][k]["championName"]==enemy_champion_name_list[i]){
        count++
        console.log(data["info"]["participants"][k]["teamPosition"])
      }
    }
  }
  console.log(j)
  document.getElementById("enemy"+i+"ChampContent").innerText="Games: "+count;
}
function userChampionName(champion_name){
  var url = "http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion/"+champion_name+".json"
  fetch(url)
    .then(response => response.json())
    .then(data => userChampionDetails(data,champion_name))
}
function userChampionDetails(data,champion_name){
  var pic_url = "https://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/"+champion_name+".png"
  document.getElementById("myChampName").innerText=data["data"][champion_name]["name"]
  document.getElementById("myChampIcon").src=pic_url
}
async function enemyChampionName(data){
  for(i=0;i<5;i++){
    enemy_champion_name_list.push(data[0][enemy_champion_id_list[i]])
  }
  count = 0;
  for(i=0;i<5;i++){
    var url = "http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion/"+enemy_champion_name_list[i]+".json"
    await fetch(url)
      .then(response => response.json())
      .then(data => enemyChampionDetails(data))
  }
}
function enemyChampionDetails(data){
  single_enemy_champion_name = enemy_champion_name_list[count]
  document.getElementById("enemy"+count+"ChampName").innerHTML=data["data"][single_enemy_champion_name]["name"]
  document.getElementById("enemy"+count+"ChampIcon").src="https://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/"+single_enemy_champion_name+".png"
  count++;
}