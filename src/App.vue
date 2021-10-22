<template>
  <main>
    <div class="bars">
      <div
        class="bar"
        :class="{ swap: value.swap, compare: value.compare }"
        v-for="value in values"
        :key="value"
        :style="'height:' + value.val * 100 + '%'"
      ></div>
    </div>
    <div class="buttons">
      <button class="generateBtn" @click="generateValues">Generate values</button>
      <button class="sortBtn" @click="bubblesort">BubbleSort</button>
      <button class="sortBtn" @click="quicksort">Quicksort</button>
      <button class="sortBtn" @click="selectionsort">SelectionSort</button>
      <button class="sortBtn" @click="insertionsort">InsertionSort</button>
      <button class="sortBtn" @click="bogosort">Bogosort</button>
    </div>
    <div class="options">
      <div><label>Miliseconds per Swap/Comparison</label><input v-model="speed" /></div>
      <div><label>Number of values</label><input v-model="valueCount" /></div>
    </div>
  </main>
</template>

<script>
import * as sorting from "./sorting";
import store from "./data";
export default {
  mounted() {
    this.generateValues();
  },
  data() {
    return store;
  },
  methods: {
    ...sorting.algos,
    generateValues() {
      this.sorting = false;
      this.values = [];
      for (let i = 0; i < this.valueCount; i++) {
        this.values.push({ val: Math.random(), swap: false, compare: false });
      }
      this.steps = [];
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