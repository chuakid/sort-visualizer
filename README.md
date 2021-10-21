# Sorting Visualizer

## What This Does
Runs sorting algorithms and displays the swaps and comparisons done.
## How this works
The sorting algorithm is not being shown in real time as our machines are way too fast to have any meaningful real-time visualization of small datasets. Also, concurrency would need to be managed between the display of dataset and sorting of the dataset, resulting in choppy performance.

Hence, sorting is done first on a copied array and every swap and comparison is stored as objects in an array. The `type` of operation, `swap` or `compare` as well as the `first`and `second` indexes that are being operated on are stored in order inside the array. After sorting is completed, the program "plays back" the sorts on the original array.

As Vue data-binding is used, as we update the original array, the heights of the bars change in real time with the binded data.
## Technologies
- Vue3
- Vite
## Development
NodeJS and NPM are required for development.

First run  `$ npm install` to install related packages. 

`$ npm run dev`

Spin up a Vite hot-reload server for local development.

`$ npm run build`

Build for production.
