'use strict';
let itemArr = ['bag', 'banana',
  'bathroom', 'boots',
  'breakfast', 'bubblegum',
  'chair', 'cthulhu',
  'dog-duck', 'dragon',
  'pen', 'pet-sweep',
  'scissors', 'shark',
  'sweep', 'tauntaun',
  'unicorn', 'usb',
  'water-can', 'wine-glass'];

let exArr = ['.jpg', '.jpg', '.jpg',
  '.jpg', '.jpg', '.jpg',
  '.jpg', '.jpg', '.jpg',
  '.jpg', '.jpg', '.jpg',
  '.jpg', '.jpg', '.png',
  '.jpg', '.jpg','.gif',
  '.jpg', '.jpg'];

let clickNumber = 0;
let leftItemIndex = 0;
let centerItemIndex = 0;
let rightItemIndex = 0;

let btnResult = document.getElementById('btnResult');
const itemSectiom = document.getElementById('imgSection');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');
const asideElement = document.getElementById('showResult');
const ulElement = document.createElement('ul');
asideElement.appendChild(ulElement);


// to concate the image name with extention
let imgName = [];
for (let i = 0; i < itemArr.length; i++) {
  imgName.push(itemArr[i].concat(exArr[i]));
}
// constructor
function Item (name, img){
  this.name = name;
  this.imagee = `./img/${img}`;
  Item.allImage.push(this);
  this.shown = 0;
  this.clicks = 0;
}
Item.allImage = [];

// To create a new obj
for (let i = 0; i < itemArr.length; i++) {
  new Item(itemArr[i], imgName[i]);
}

// To render the Item
function renderItem (){
  let rightIndex = randomItem(0, itemArr.length - 1);
  rightImage.src = Item.allImage[rightIndex].imagee;
  rightImage.alt = Item.allImage[rightIndex].name;
  rightItemIndex = rightIndex;

  let centerIndex = randomItem(0, itemArr.length - 1);
  centerImage.src = Item.allImage[centerIndex].imagee;
  centerImage.alt = Item.allImage[centerIndex].name;
  centerItemIndex = centerIndex;

  let leftIndex = randomItem(0, itemArr.length - 1);
  leftImage.src = Item.allImage[leftIndex].imagee;
  leftImage.alt = Item.allImage[leftIndex].name;
  leftItemIndex = leftIndex;

  Item.allImage[rightIndex].shown++;
  Item.allImage[centerIndex].shown++;
  Item.allImage[leftIndex].shown++;

}

function sectionClick(e){
  if ((e.target.id === 'rightImage' || e.target.id === 'centerImage' || e.target.id === 'leftImage') && clickNumber < 25 ){
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
    console.log(Item.allImage);
  }
}
function resultClick(e){
  e.preventDefault();
  for (let i = 0; i < itemArr.length; i++) {
    let liElement = document.createElement('li');
    ulElement.appendChild(liElement);
    liElement.textContent = `${Item.allImage[i].name} had ${Item.allImage[i].clicks} votes, and was seen ${Item.allImage[i].shown} times.`;

  }
}

itemSectiom.addEventListener('click', sectionClick);
btnResult.addEventListener('click', resultClick);
renderItem();
// to get the random number
function randomItem(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

