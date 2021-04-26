/* eslint-disable no-undef */
'use strict';
let itemArr = ['bag.jpg', 'banana.jpg',
  'bathroom.jpg', 'boots.jpg',
  'breakfast.jpg', 'bubblegum.jpg',
  'chair.jpg', 'cthulhu.jpg',
  'dog-duck.jpg', 'dragon.jpg',
  'pen.jpg', 'pet-sweep.jpg',
  'scissors.jpg', 'shark.jpg',
  'sweep.png', 'tauntaun.jpg',
  'unicorn.jpg', 'usb.gif',
  'water-can.jpg', 'wine-glass.jpg'];

// let itemArr = ['bag', 'banana',
//   'bathroom', 'boots',
//   'breakfast', 'bubblegum',
//   'chair', 'cthulhu',
//   'dog-duck', 'dragon',
//   'pen', 'pet-sweep',
//   'scissors', 'shark',
//   'sweep', 'tauntaun',
//   'unicorn', 'usb',
//   'water-can', 'wine-glass'];

// let exArr = ['.jpg', '.jpg', '.jpg',
//   '.jpg', '.jpg', '.jpg',
//   '.jpg', '.jpg', '.jpg',
//   '.jpg', '.jpg', '.jpg',
//   '.jpg', '.jpg', '.png',
//   '.jpg', '.jpg','.gif',
//   '.jpg', '.jpg'];

let clickNumber = 0;
let leftItemIndex = 0;
let centerItemIndex = 0;
let rightItemIndex = 0;
let attemp = 25;
// let randoOne, randoTwo, randoThree, prevRandoOne, prevRandoTwo, prevRandoThree;
// let tempLeft, tempCenter, tempRight;

let btnResult = document.getElementById('btnResult');
const itemSection = document.getElementById('imgSection');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');
const asideElement = document.getElementById('showResult');
const ulElement = document.createElement('ul');
asideElement.appendChild(ulElement);


// to concate the image name with extention
// let imgName = [];
// for (let i = 0; i < itemArr.length; i++) {
//   imgName.push(itemArr[i].concat(exArr[i]));
// }

// constructor
function Item (name){
  this.name = name.split('.')[0];
  this.image = `./img/${name}`;
  Item.allImage.push(this);
  this.shown = 0;
  this.clicks = 0;
}
Item.allImage = [];

// To create a new obj
for (let i = 0; i < itemArr.length; i++) {
  new Item(itemArr[i]);
}

// To render the Item
function renderItem (){
  let rightIndex ;
  let centerIndex;
  let leftIndex = randomItem(0, itemArr.length - 1);

  do {
    rightIndex = randomItem(0, itemArr.length - 1);
    centerIndex = randomItem(0, itemArr.length - 1);
  } while (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex);

  rightImage.src = Item.allImage[rightIndex].image;
  rightImage.alt = Item.allImage[rightIndex].name;

  centerImage.src = Item.allImage[centerIndex].image;
  centerImage.alt = Item.allImage[centerIndex].name;

  leftImage.src = Item.allImage[leftIndex].image;
  leftImage.alt = Item.allImage[leftIndex].name;

  leftItemIndex = leftIndex;
  centerItemIndex = centerIndex;
  rightItemIndex = rightIndex;
  Item.allImage[rightIndex].shown++;
  Item.allImage[centerIndex].shown++;
  Item.allImage[leftIndex].shown++;

}
// function genRandomNum() {
//   randoOne = Math.floor(Math.random() * 20);
//   while (randoOne === prevRandoOne || randoOne === prevRandoTwo || randoOne === prevRandoThree) {
//     randoOne = Math.floor(Math.random() * 20);
//   }
//   prevRandoOne = randoOne;
//   randoTwo = Math.floor(Math.random() * 20);
//   while (randoTwo === prevRandoOne || randoTwo === prevRandoTwo || randoTwo === prevRandoThree || randoTwo === randoOne) {
//     randoTwo = Math.floor(Math.random() * 20);
//   }
//   prevRandoTwo = randoTwo;
//   randoThree = Math.floor(Math.random() * 20);
//   while (randoThree === prevRandoOne || randoThree === prevRandoTwo || randoThree === prevRandoThree || randoThree === randoOne || randoThree === randoTwo){
//     randoThree = Math.floor(Math.random() * 20);
//   }
//   prevRandoThree = randoThree;
// }
function sectionClick(e){
  if ((e.target.id === 'rightImage' || e.target.id === 'centerImage' || e.target.id === 'leftImage') && clickNumber < attemp ){
    if (e.target.id === 'rightImage') {
      Item.allImage[rightItemIndex].clicks++;
    }
    if (e.target.id === 'centerImage') {
      Item.allImage[centerItemIndex].clicks++;
    }
    if (e.target.id === 'leftImage') {
      Item.allImage[leftItemIndex].clicks++;
    }
    renderItem();
    clickNumber++;
    console.log(clickNumber);
  } else {
    console.log(renderChart());
  }
}
function resultClick(e){
  e.preventDefault();
  for (let i = 0; i < Item.allImage.length; i++) {
    let liElement = document.createElement('li');
    ulElement.appendChild(liElement);
    liElement.textContent = `${Item.allImage[i].name} had ${Item.allImage[i].clicks} votes, and was seen ${Item.allImage[i].shown} times.`;

  }
  btnResult.removeEventListener('click', resultClick);
}

itemSection.addEventListener('click', sectionClick);
btnResult.addEventListener('click', resultClick);
renderItem();

function renderChart(){
  let clickItem = [];
  let itemName = [];
  let views = [];
  for (let i = 0; i < Item.allImage.length; i++) {
    clickItem.push(Item.allImage[i].clicks);
    itemName.push(Item.allImage[i].name);
    views.push(Item.allImage[i].shown);
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-unused-vars
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: itemName,
      datasets: [{
        label: '# of Votes',
        data: clickItem,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }, {
        label: '# of views',
        data: views,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206,193, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 90, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 193, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 90, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
// function noRepet (r){
//   // let nums = [],
//   let ranNums = [],
//     i = r.length,
//     j = 0;

//   while (i--) {
//     j = Math.floor(Math.random() * (i+1));
//     ranNums.push(nums[j]);
//     nums.splice(j,1);
//   }
// }
// console.log(noRepet());
// to get the random number
function randomItem(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
