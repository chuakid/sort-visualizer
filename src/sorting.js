let workingValues = [];
import data from "./data";
import { playAnims } from "./anims";

function swap(i, j) {
    if (i !== j) {
        [workingValues[i], workingValues[j]] = [workingValues[j], workingValues[i]];
        data.steps.push({ type: "swap", first: i, second: j });
    }
}
function compare(i, j) {
    if (i !== j) {
        data.steps.push({ type: "compare", first: i, second: j });
        return workingValues[i].val < workingValues[j].val;
    }
}

export const algos = {
    quicksort() {
        workingValues = data.values.map((x) => x);
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
                if (compare(i, high)) {
                    pivot_spot++; //If a[i] is smaller then pivot belongs to to a[i+1]
                    if (pivot_spot != i) {
                        swap(pivot_spot, i);
                    }
                }
            }
            swap(pivot_spot + 1, high);
            return pivot_spot + 1;
        }
        quicksorter(0, workingValues.length - 1);
        playAnims();
    },
    bubblesort() {
        let swapCount = 1;
        workingValues = data.values.map((x) => x);
        for (let i = workingValues.length - 1; i > 0; i--) {
            if (swapCount === 0) {
                break;
            }
            swapCount = 0;
            for (let j = 0; j < i; j++) {
                compare(j, j + 1);
                if (workingValues[j].val > workingValues[j + 1].val) {
                    swap(j, j + 1);
                    swapCount++;
                }
            }
        }
        playAnims();
    },
    selectionsort() {
        workingValues = data.values.map((x) => x);
        for (let i = workingValues.length - 1; i > 0; i--) {
            let largest_i = 0;
            for (let j = 0; j <= i; j++) {
                if (compare(largest_i, j)) {
                    largest_i = j;
                }
            }
            swap(largest_i, i);
        }
        playAnims();
    },
    insertionsort() {
        workingValues = data.values.map((x) => x);
        for (let i = 0; i < workingValues.length; i++) {
            for (let j = i; j > 0; j--) {
                if (compare(j, j - 1)) {
                    swap(j, j - 1);
                } else {
                    break;
                }
            }
        }
        playAnims();
    },
    bogosort() {
        data.sorting = true;
        function checksorted() {
            for (let i = 0; i < data.values.length - 1; i++) {
                if (data.values[i].val > data.values[i + 1].val) {
                    return false;
                }
            }
            return true;
        }
        function shuffle() {
            if (data.sorting) {
                for (let i = data.values.length - 1; i > 0; i--) {
                    const randomIndex = Math.floor(Math.random() * (i + 1));
                    [data.values[i].val, data.values[randomIndex].val] = [data.values[randomIndex].val, data.values[i].val];
                }
                if (!checksorted()) {
                    setTimeout(shuffle, data.speed);
                }
            }
        }
        shuffle();
    }
}
