Vue.use(VueMaterial.default);

const option = {
  data() {
    return {
      title: 'SM-Games',
      showGame: false,
      balls: 0,
      ballValues: [],
      score: 0,
      highScore: 0,
      scoreBoard: {
        'Siva' : '250',
        'Mani' : '200',
        'BManisha' : '100',
        'Yukesh' : '99',
        'Hari' : '89',
        'Sai' : '58',
        'Babbulu' : '54' 
      },
      userBoard: ['128', '54', '52', '48', '36', '22'],
      timer: 0,
      timerLevel: 1,
      timerFun: null,
      level: 1,
      levelRule: "Find the Maximum number in the given list!"
    }
  },
  methods: {
    startGame(){
      this.showGame = true;
      this.highScore = sessionStorage.getItem('highScore') || 0;
      this.getBalls();
    },
    activeCounter(){
      let self = this;
      if(self.timer == 10){
        if(self.highScore < self.score){
          self.highScore = self.score;
          sessionStorage.setItem('highScore', self.highScore);
        }
        self.timerLevel = 1;
        self.score = 0;
        alert("You lost the Game!");
        self.showGame = false;
      }else{
        self.timer++;
        self.timerFun = setTimeout(() => {
          self.activeCounter()
        }, (2000 / self.timerLevel));
      }
    },
    getBalls(){
      let self = this, min=3, max=6, tempBallValues = [];  
      self.balls = Math.floor(Math.random() * (+max - +min)) + +min;
      for(let i=0; i< self.balls; i++){
        let minVal=-100; 
        let maxVal=100;  
        tempBallValues.push(Math.floor(Math.random() * (+maxVal - +minVal)) + +minVal);  
      }
      self.ballValues = tempBallValues;
      clearTimeout(self.timerFun);
      self.timer = 0;
      self.activeCounter();
    },
    valideAnswer(val){
      let self = this, correctVal = 0;
      clearTimeout(self.timerFun);
      switch(self.level){
        case 1: correctVal = Math.max.apply(null, self.ballValues);
                break;
        case 2: correctVal = Math.min.apply(null, self.ballValues);
                break;
      }
      if(val == correctVal){
        self.score += 3;
        if(self.score%3 == 0){
          self.timerLevel = 2;
        }
        if(self.score == 30){
          self.level = 2;
          alert("Now you are in Level -2");
          alert("Find the Minimum number in the given list!");
          self.levelRule = "Find the Minimum number in the given list!";
        }
        self.getBalls();
      }else{
        if(self.highScore < self.score){
          self.highScore = self.score;
          sessionStorage.setItem('highScore', self.highScore);
        }
        self.score = 0;
        alert("You lost the Game!");
        self.showGame = false;
      }
    }
  } 
};

new Vue({
  el: '#app',
  ...option });