


findLongestWorld = (mkd)  => {
    let   cnt = mkd.split(" ");

return cnt.reduce(
  (accumulator, currentValue) => (accumulator.length <  currentValue.length  ? currentValue : accumulator) ,
   "" ,
);

 }
 console.log( 'the Longest word here is' , findLongestWorld('World Thapa Technical javascript course on youtube'))


