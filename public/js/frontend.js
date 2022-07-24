var cards = [0,1,2,3,4]
divCreator()
function divCreator(){
  for(i=0;i<5;i++){
    var div = document.createElement("div");
    div.className = "enemyPlayer";
    document.getElementById("enemy").appendChild(div);
    var name = document.createElement("div");
    name.id = "enemy"+i+"NNI";
    document.getElementsByClassName("enemyPlayer")[i].appendChild(name)
    var name = document.createElement("span");
    name.id = "enemy"+i+"SummonerName";
    document.getElementById("enemy"+i+"NNI").appendChild(name)
    var name = document.createElement("img");
    name.id = "enemy"+i+"ChampIcon";
    document.getElementById("enemy"+i+"NNI").appendChild(name)
    var name = document.createElement("span");
    name.id = "enemy"+i+"ChampName";
    document.getElementById("enemy"+i+"NNI").appendChild(name)
    var name = document.createElement("div");
    name.id = "enemy"+i+"ChampContent";
    document.getElementsByClassName("enemyPlayer")[i].appendChild(name)
    for(j=0;j<4;j++){
      var name = document.createElement("div");
      name.id = "enemy"+i+"Game"+j;
      document.getElementById("enemy"+i+"ChampContent").appendChild(name)
      var name = document.createElement("h1");
      name.id = "enemy"+i+"Title"+j;
      document.getElementById("enemy"+i+"Game"+j).appendChild(name)
      var name = document.createElement("h2");
      name.id = "enemy"+i+"GameNumber"+j;
      document.getElementById("enemy"+i+"Game"+j).appendChild(name)
      var name = document.createElement("div");
      name.id = "enemy"+i+"WinRate"+j;
      document.getElementById("enemy"+i+"Game"+j).appendChild(name)
      var name = document.createElement("div");
      name.id = "enemy"+i+"Farm"+j;
      document.getElementById("enemy"+i+"Game"+j).appendChild(name)
      var name = document.createElement("div");
      name.id = "enemy"+i+"cs/min"+j;
      document.getElementById("enemy"+i+"Game"+j).appendChild(name)
      var name = document.createElement("div");
      name.id = "enemy"+i+"KDA"+j;
      document.getElementById("enemy"+i+"Game"+j).appendChild(name)
      var name = document.createElement("div");
      name.id = "enemy"+i+"Charts"+j;
      name.className = "chartContainer"
      document.getElementById("enemy"+i+"Game"+j).appendChild(name)
      var name = document.createElement("div");
      name.id = "enemy"+i+"KDAChart"+j;
      name.className = "chart";
      document.getElementById("enemy"+i+"Charts"+j).appendChild(name)
      var name = document.createElement("div");
      name.id = "enemy"+i+"ChartBox1"+j;
      name.className = "box";
      document.getElementById("enemy"+i+"KDAChart"+j).appendChild(name)
      var name = document.createElement("canvas");
      name.id = "enemy"+i+"Chart1"+j;
      document.getElementById("enemy"+i+"ChartBox1"+j).appendChild(name)
      if(j!=0){
        var name = document.createElement("div");
        name.id = "enemy"+i+"itemChart"+j;
        name.className = "chart";
        document.getElementById("enemy"+i+"Charts"+j).appendChild(name)
        var name = document.createElement("div");
        name.id = "enemy"+i+"ChartBox2"+j;
        name.className = "box";
        document.getElementById("enemy"+i+"itemChart"+j).appendChild(name)
        var name = document.createElement("canvas");
        name.id = "enemy"+i+"Chart2"+j;
        document.getElementById("enemy"+i+"ChartBox2"+j).appendChild(name)
      }
    }
  }
}
function standby(){
  fetch("../json/champs.json")
    .then(response => response.json())
    .then(data => sendData(data))
}

function sendData(champs){
  var tag = document.getElementById("tag").value;
  var summoner_name = document.getElementById("name").value;
  var data = {tag, summoner_name, champs}
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  fetch('/data', options)
  document.getElementById("progressbar").style.display = "block"
  setTimeout(function(){delay()},2000)
}
async function delay(){
  console.log("hmm")
  var dom_data = {"start": false}
  while(dom_data["start"] == false){
    await fetch("http://localhost:6969/dom")
    .then(response => response.json())
    .then(data => dom_data = data)
    var percent = 0
    for(i=0;i<1;i++){
      percent = percent + dom_data["enemy"+i]["calculate"]["player"]["games"]
    }
    document.getElementById("bar").style.width = Math.ceil(percent/50*100) + "%"
    document.getElementById("percent").innerText = Math.ceil(percent/50*100) + "%" 
  }
  document.getElementById("bar").style.width = "100%"
  document.getElementById("percent").innerText = "100%" 
  domManipulation(dom_data)
}
async function domManipulation(data){
  var item_data = ""
  await fetch("http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/item.json")
  .then(response => response.json())
  .then(itemdata => item_data = itemdata)
  document.getElementById("mySummonerName").innerText = data["me"]["SummonerName"]
  document.getElementById("myChampName").innerText=data["me"]["ChampName"]
  document.getElementById("myChampIcon").src=data["me"]["ChampIcon"]
  for(i=0;i<1;i++){
    var levels = [
      data["enemy"+i]["calculate"]["player"],
      data["enemy"+i]["calculate"]["champion"],
      data["enemy"+i]["calculate"]["championVsChampion"],
      data["enemy"+i]["calculate"]["championVsChampionOnLane"]
    ]
    document.getElementById("enemy"+i+"SummonerName").innerHTML=data["enemy"+i]["SummonerName"]
    document.getElementById("enemy"+i+"ChampName").innerHTML=data["enemy"+i]["ChampName"]
    document.getElementById("enemy"+i+"ChampIcon").src=data["enemy"+i]["ChampIcon"]
    for(j=0;j<4;j++){
      var title = ""
      if(j>=0){
        title = title + data["enemy"+i]["SummonerName"]+"'s game(s)"
      }
      if(j>=1){
        title = title + " with "+ data["enemy"+i]["ChampName"]
      }
      if(j>=2){
        title = title + " against " + data["me"]["ChampName"]
      }
      if(j>=3){
        title = title + " on the same lane"
      } 
      document.getElementById("enemy"+i+"Title"+j).innerText=title;
      document.getElementById("enemy"+i+"GameNumber"+j).innerText="Calculated from "+levels[j]["games"]+" game(s)";
      document.getElementById("enemy"+i+"WinRate"+j).innerText=Math.floor(levels[j]["win"]/levels[j]["games"]*100)+"%";
      document.getElementById("enemy"+i+"Farm"+j).innerText=Math.floor(levels[j]["cs"]/levels[j]["games"])+" cs";
      document.getElementById("enemy"+i+"cs/min"+j).innerText=(levels[j]["cs/min"]/levels[j]["games"]).toFixed(2)+" cs/min";
      document.getElementById("enemy"+i+"KDA"+j).innerText=(levels[j]["kda"]/levels[j]["games"]).toFixed(2)+" kda";
      var chart_id = "enemy"+i+"Chart1"+j
      KDAChart(chart_id,levels)
      if(j>0){
        var id="enemy"+i+"Chart2"+j
        itemChart(id,levels,item_data)
      }
    }
  }
  finalChanges()
  leftButton()
}

function KDAChart(id,data){
  var xValues = [];
  var yValues = [[],[],[]];
  var kda = ["kill","death","assist"]
  var imageURLs = []
  var wh = 10
  if(data[j]["timeline"]!=undefined){
    var len=Object.keys(data[j]["timeline"]).length
    len = Object.keys(data[j]["timeline"])[len-1]
    len++
    
    for(a=0;a<len;a++){
      xValues.push(a+" min")
    }
    
    for(a=0;a<3;a++){
      for(b=0;b<len;b++){
        if(data[j]["timeline"][b]!=undefined){
          yValues[a].push(((data[j]["timeline"][b][kda[a]])/(data[j]["games"])).toFixed(2))
        }else{
          yValues[a].push(0)
        }
        imageURLs.push(null)
      }
    }
  }
  
  new Chart(id, {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        data: yValues[0],
        label: "Average Kill",
        backgroundColor: "#39FF14",
      },{
        data: yValues[1],
        label: "Average Death",
        backgroundColor: "#FF3131",
      },{
        data: yValues[2],
        label: "Average Assist",
        backgroundColor: "#1F51FF",
      }]
    },
    options: {
      plugins: {
        labels: {
          render: 'image',
          textMargin: 0,
          images: imageURLs
        }
      },
      layout: {
        padding: {
          top: 0
        }
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function itemChart(id,data,item){
  if(data[j]["timeline"]!=undefined){
    var len=Object.keys(data[j]["items"]).length
    var values = []
    var items = []
    var imageURLs = []
    var colors = []
    var wh = 20
    for(a=1;a<len;a++){
      items.push(item["data"][data[j]["items"][a]["id"]]["name"])
      values.push(data[j]["items"][a]["count"])
      imageURLs.push({
        src: 'http://ddragon.leagueoflegends.com/cdn/12.11.1/img/item/'+data[j]["items"][a]["id"]+".png",
        width: wh,
        height: wh
      })
      colors.push('#FF10F0')
    }
  }
  new Chart(document.getElementById(id), {
    type: 'bar',
    data: {
      labels: items,
      datasets: [{
        data: values,
        label: "The item was used in the last " + data[j]["games"] + " game(s) this many times",
        fill: false,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        labels: {
          render: 'image',
          textMargin: 0,
          images: imageURLs
        }
      },
      layout: {
        padding: {
          top: 80
        }
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function rightButton(){
  cards.push(cards[0])
  cards.shift()
  animation(cards,"left")
}
function leftButton(){
  cards.unshift(cards[4])
  cards.pop()
  animation(cards,"right")
}
function animation(card,pos){
  document.getElementsByClassName("enemyPlayer")[card[0]].id="aa"+pos;
  document.getElementsByClassName("enemyPlayer")[card[1]].id="ab"+pos;
  document.getElementsByClassName("enemyPlayer")[card[2]].id="ac"+pos;
  document.getElementsByClassName("enemyPlayer")[card[3]].id="ad"+pos;
  document.getElementsByClassName("enemyPlayer")[card[4]].id="ae"+pos;
}

function finalChanges(){
  document.getElementById("bar").style.width = "100%"
  document.getElementById("percent").innerText = "100%" 
  document.getElementById("progressbar").style.display = "none"
  document.getElementById("navigation").id = "navbar"
  setTimeout(function(){
    document.getElementById("navbar").style.display = "none";
    document.getElementsByClassName("wrapper")[0].style.display = "grid";
  },1500)

}