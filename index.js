const words = "&,&,a,a,a,a,a,a,about,above,ache,ad,after,all,am,am,an,an,and,and,and,and,apparatus,are,are,arm,as,as,as,as,ask,at,at,at,away,bare,be,beat,beauty,bed,beneath,bitter,black,blood,blow,blue,boil,boy,breast,but,but,but,but,butt,by,by,can,chant,chocolate,cool,could,crush,cry,d,day,death,delirious,diamond,did,do,do,dream,dress,drive,drool,drunk,eat,ed,ed,ed,ed,egg,elaborate,enormous,er,es,est,fast,feet,fiddle,finger,fluff,for,forest,frantic,friend,from,from,garden,gir,l,go,goddess,gorgeous,gown,hair,has,have,have,he,he,head,heave,her,her,here,him,his,his,honey,hot,ho,I,I,I,I,if,in,in,in,ing,ing,ing,ing,ing,ing,is,is,is,is,is,it,it,it,juice,lake,language,languid,lather,lazy,less,let,lick,lie,life,light,like,like,like,live,love,luscious,lust,ly,ly,ly,ly,mad,man,me,me,me,mean,meat,men,milk,mist,moan,moon,mother,music,must,my,my,my,need,never,no,no,not,not,of,of,of,of,on,on,one,or,our,over,pant,peach,petal,picture,pink,play,please,pole,pound,puppy,purple,put,r,r,rain,raw,recall,red,repulsive,rip,rock,rose,run,rust,s,s,s,s,s,s,s,s,s,s,s,sad,said,sausage,say,scream,sea,see,shadow,she,she,shine,ship,shot,show,sing,sit,skin,sky,sleep,smear,smell,smooth,so,soar,some,sordid,spray,spring,still,stop,storm,suit,summer,sun,sweat,swee,t,swim,symphony,the,the,the,the,the,their,there,these,they,those,though,thousand,through,time,tiny,to,to,to,together,tongue,trudge,TV,ugly,up,urge,us,use,want,want,was,watch,water,wax,we,we,were,what,when,whisper,who,why,will,wind,with,with,woman,worship,y,y,y,y,yet,you,you,you,you"

const container = document.getElementById("container")
let {width, height, left} = container.getBoundingClientRect()
let i = (width / 100) + left;
let j = 175
let increments = 30


function makeDraggable(node){
  node.ondragstart = function() {
    return false;
  };

  node.onmousedown = function(event) {
    event.preventDefault()
      let shiftX = event.clientX - node.getBoundingClientRect().left;
      let shiftY = event.clientY - node.getBoundingClientRect().top;
      node.style.position = 'absolute';
      node.style.zIndex = 1000;
      document.body.append(node);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        let {top, bottom, left, right } = container.getBoundingClientRect()
        if(pageX > left && pageX < right) node.style.left = pageX - shiftX + 'px';
        if(pageY < bottom && pageY > top) node.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        event.preventDefault()
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      container.onmouseup = function() {
        dragging = false
        node.style.left = event.clientX
        node.style.right = event.clientY
        document.removeEventListener('mousemove', onMouseMove);
        container.onmouseup = null;
      };

      // console.log('test')
      //   node.style.left = event.clientX
      //   node.style.right = event.clientY
      //   document.removeEventListener('mousemove', onMouseMove);
      //   container.onmouseup = null;
      //   dragging = false;

  }
}

function shuffleWords(words) {
  let shuffled = words.split(',')
  let randomInt
  for(let i=shuffled.length - 1; i > 0; i--){
    randomInt = Math.floor(Math.random() * (i+1))
    let temp = shuffled[randomInt]
    shuffled[randomInt] = shuffled[i]
    shuffled[i] = temp
  }

  shuffled.slice(0,50).forEach(word => {
    let node = document.createElement("p")
    let textNode = document.createTextNode(word)
    if(i > width){
      i = (width / 100) + container.getBoundingClientRect().left
      j += increments
    }
    node.style.left = i + 'px'
    node.style.top = j+'px'
    i += increments
    node.appendChild(textNode)
    container.appendChild(node)
    makeDraggable(node)
  })
}
shuffleWords(words)




let button = document.getElementById("submit")

button.onclick = function (){
  event.preventDefault()
  let word = document.getElementsByTagName("input")[0].value
  let node = document.createElement("p")
  let textNode = document.createTextNode(word)
  node.appendChild(textNode)
  container.appendChild(node)
  makeDraggable(node)
}

let shuffle = document.getElementById("shuffle")

shuffle.onclick = function(){
  event.preventDefault()
  let current = document.getElementsByTagName("p")
  for(let k=0; k < current.length; k++){
    current[k].parentNode.removeChild(current[k])
  }
  i = (width / 100) + left;
  j = 175
  shuffleWords(words)
}
