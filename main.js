const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
   constructor(spaces) {
      this._spaces = spaces;
      this._playerPositionX = 1;
      this._playerPositionY = 0;
      this._hatPositionX = 4;
      this._hatPositionY = 0;
   }

   print() {
      for(let i = 0; i != this._spaces.length; i++){
         let printThis = '';
         for(let j = 0; j != this._spaces[i].length; j++){
            if(this._playerPositionX === j && this._playerPositionY === i)
               printThis += pathCharacter;
            else if(this._hatPositionX === j && this._hatPositionY === i)
               printThis += hat;
            else
               printThis += this._spaces[i][j];
         }
         console.log(printThis);
      }
   }
   movePlayerUp(){
      this._playerPositionY--;
   }   
   movePlayerDown(){
      this._playerPositionY++;
   }   
   movePlayerLeft(){
      this._playerPositionX--;
   }   
   movePlayerRight(){
      this._playerPositionX++;
   }
   //If a collision is found with the hat, boundary, or hole, return that string
   collisionCheck(){
      if(
         this._playerPositionY < 0 ||
         this._playerPositionX < 0 ||
         this._playerPositionX === fieldSpaces.length ||
         this._playerPositionY === fieldSpaces[this._playerPositionX].length
      )
         return 'Boundary';
      else if(this._spaces[this._playerPositionY][this._playerPositionX] === hole)
         return 'Hole'
      else if(
         this._playerPositionX === this._hatPositionX &&
         this._playerPositionY === this._hatPositionY
      )
         return 'Hat';
      else
         return 'None';
   }
}

const fieldSpaces = [
   ['░', '░', 'O','░','░','░','░','O','O','░'],
   ['░', '░', 'O','░','░','O','░','░','O','O'],
   ['O', '░', '░','O','O','░','O','░','░','░'],
   ['░', '░', '░','░','░','O','░','O','░','O'],
   ['O', '░', 'O','░','░','░','O','░','░','░'],
   ['░', '░', 'O','O','O','░','░','O','░','O'],
   ['O', '░', '░','░','░','O','O','░','░','░'],
   ['O', '░', '░','O','░','░','░','O','░','O'],
   ['O', '░', 'O','░','O','░','░','░','░','░'],
   ['░', '░', '░','░','░','░','O','░','O','O']
]  

let gameOn = true;
let theField = new Field(fieldSpaces);
while(gameOn){
   theField.print();
   const input = prompt("Where do you want to go? Directions: 'u', 'd', 'l', 'r'; 'q' to quit ");
   switch(input){
      case 'u':
         theField.movePlayerUp();
         break;
      case 'd':
         theField.movePlayerDown();
         break;
      case 'l':
         theField.movePlayerLeft();
         break;
      case 'r':
         theField.movePlayerRight();
         break;
      case 'q':
         gameOn = false;
         console.log('You give up');
         break;
      default:
         console.log("Invalid input");
         break;
   }
   switch(theField.collisionCheck()){
      case 'Boundary':
         console.log('You went out of bounds. You lose!')
         gameOn = false;
         break;
      case 'Hole':
         console.log('You fell in a hole. You lose!');
         gameOn = false;
         break;
      case 'Hat':
         console.log('You found your hat. You win!')
         gameOn = false;
         break;
      case 'None':
         break;
   }

}