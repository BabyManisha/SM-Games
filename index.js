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
      timerFun: null
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
      if(self.timer == 20){
        if(self.highScore < self.score){
          self.highScore = self.score;
          sessionStorage.setItem('highScore', self.highScore);
        }
        self.score = 0;
        self.getBalls();
      }else{
        self.timer++;
        self.timerFun = setTimeout(() => {
          self.activeCounter()
        }, 1000);
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
      let self = this, maxVal = 0;
      maxVal = Math.max.apply(null, self.ballValues);
      debugger;
      if(val == maxVal){
        self.score += 2;
      }else{
        if(self.highScore < self.score){
          self.highScore = self.score;
          sessionStorage.setItem('highScore', self.highScore);
        }
        self.score = 0;
      }
      self.getBalls();
    }
  } 
};

new Vue({
  el: '#app',
  ...option });