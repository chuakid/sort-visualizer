<template>
  <main>
    <div class="bars">
      <div
        class="bar"
        :class="{ swap: value.swap, compare: value.compare }"
        v-for="value in values"
        :key="value"
        :style="'height:' + (value.val) * 100 + '%'"
      ></div>
    </div>
    <div class="buttons">
      <button class="generateBtn" @click="generateValues">Generate values</button>
      <button class="sortBtn" @click="bubblesort">BubbleSort</button>
      <button class="sortBtn" @click="quicksort">Quicksort</button>
      <button class="sortBtn" @click="selectionsort">SelectionSort</button>
    </div>
    <div class="options">
      <div><label>Miliseconds per Swap/Comparison</label><input v-model="speed" /></div>
      <div><label>Number of values</label><input v-model="valueCount" /></div>
    </div>
  </main>
</template>

<script>
export default {
  mounted() {
    this.generateValues();
  },
  data() {
    return {
      steps: [],
      values: [],
      valueCount: 50,
      workingValues: [],
      speed: 1,
    };
  },
  methods: {
    generateValues() {
      this.values = [];
      for (let i = 0; i < this.valueCount; i++) {
        this.values.push({ val: Math.random(), swap: false, compare: false });
      }
      this.steps = [];
    },
    swap(i, j) {
      const temp = this.workingValues[i];
      this.workingValues[i] = this.workingValues[j];
      this.workingValues[j] = temp;

      this.steps.push({ type: "swap", first: i, second: j });
    },
    compare(i, j) {
      this.steps.push({ type: "compare", first: i, second: j });
      return this.workingValues[i].val < this.workingValues[j].val;
    },
    quicksort() {
      this.steps = [];
      let self = this;
      self.workingValues = self.values.map((x) => x);
      function quicksorter(low, high) {
        if (low < high) {
          let pi = partition(low, high);
          quicksorter(low, pi - 1);
          quicksorter(pi + 1, high);
        }
      }
      function partition(low, high) {
        let pivot_spot = low - 1; //Current spot for pivot - 1
        for (let i = low; i <= high; i++) {
          if (self.compare(i, high)) {
            pivot_spot++; //If a[i] is smaller then pivot belongs to to a[i+1]
            if (pivot_spot != i) {
              self.swap(pivot_spot, i);
            }
          }
        }
        self.swap(pivot_spot + 1, high);
        return pivot_spot + 1;
      }
      quicksorter(0, self.workingValues.length - 1);
      self.playAnims();
    },
    bubblesort() {
      let swapCount = 1;
      this.steps = []; //reset steps if ongoing sort
      this.workingValues = this.values.map((x) => x);
      for (let i = this.workingValues.length - 1; i > 0; i--) {
        if (swapCount === 0) {
          break;
        }
        swapCount = 0;
        for (let j = 0; j < i; j++) {
          this.compare(j, j + 1);
          if (this.workingValues[j].val > this.workingValues[j + 1].val) {
            this.swap(j, j + 1);
            swapCount++;
          }
        }
      }
      this.playAnims();
    },
    selectionsort() {
      this.workingValues = this.values.map((x) => x);
      for (let i = this.workingValues.length - 1; i > 0; i--) {
        let largest_i = 0;
        for (let j = 0; j <= i; j++) {
          if (this.compare(largest_i, j)) {
            largest_i = j;
          }
        }
        this.swap(largest_i, i);
      }
      this.playAnims();
    },
    playSwap(step) {
      const temp = this.values[step.first];
      this.values[step.first] = this.values[step.second];
      this.values[step.second] = temp;
      this.values[step.first].swap = false;
      this.values[step.second].swap = false;
      setTimeout(this.playAnims, this.speed);
    },
    playAnims() {
      if (this.steps.length > 0) {
        const step = this.steps.shift();
        switch (step.type) {
          case "swap":
            this.values[step.first].swap = true;
            this.values[step.second].swap = true;
            setTimeout(() => {
              this.playSwap(step);
            }, this.speed);
            break;
          case "compare":
            this.values[step.first].compare = true;
            this.values[step.second].compare = true;
            setTimeout(() => {
              this.values[step.first].compare = false;
              this.values[step.second].compare = false;
              this.playAnims();
            }, this.speed);
        }
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: rgb(35, 35, 44);
}
main {
  display: flex;
  height: 100vh;
  padding: 10px;
  flex-direction: column;
}
.bars {
  height: 100px;
  flex: 1;
  display: flex;
}
.bar {
  flex: 1;
  align-self: flex-end;
  background-color: rgb(207, 207, 207);
  border: 1px solid rgb(128, 128, 128);
}
.swap {
  background-color: teal;
}

.compare {
  background-color: red;
}
.buttons {
  display: flex;
}
button {
  width: 100%;
  transition: all 0.3s;
  padding: 10px 5px;
  border: none;
  border-radius: 10px;
  margin: 5px 10px 0 0;
}
button:hover {
  cursor: pointer;
}
.generateBtn {
  color: white;
  background: rgba(255, 27, 46, 0.822);
}
.generateBtn:hover {
  color: white;
  background: rgba(116, 4, 4, 0.822);
}
.sortBtn {
  color: white;
  background: rgba(14, 139, 255, 0.822);
}
.sortBtn:hover {
  color: white;
  background: rgba(1, 84, 161, 0.822);
}
.options {
  color: rgb(204, 204, 204);
  padding: 20px;
  border: rgb(82, 82, 82) 1px solid;
  border-radius: 10px;
  margin-top: 10px;
  font-family: "Lucida Sans";
}
.options div {
  width: 100%;
  display: flex;
  margin-top: 10px;
}
.options div input {
  flex: 1;
  border: none;
  background: rgb(77, 77, 77);
  color: rgb(204, 204, 204);

  padding: 5px 10px;
}
.options div label {
  margin-right: 10px;
}
</style>