function Population() {
  this.rockets = [];
  this.populationSize = 25;
  this.matingPool = [];

  for (let i = 0; i < this.populationSize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {
    let maxFit = 0;
    for (let i = 0; i < this.populationSize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxFit) {
        maxFit = this.rockets[i].fitness;
      }
    }

    for (let i = 0; i < this.populationSize; i++) {
      this.rockets[i].fitness /= maxFit;
    }
    this.matingPool = [];
    for (let i = 0; i < this.populationSize; i++) {
      let n = this.rockets[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function(){
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++){
      let parentA = random(this.matingPool).dna;
      let parentB = random(this.matingPool).dna;
      let child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.run = function() {
    for (let i = 0; i < this.populationSize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}
