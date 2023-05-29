function rotasiString(str1, str2) {
 const combinedStr1 = str1.concat(str1);
 return combinedStr1.includes(str2);
}

console.log(rotasiString('keyboard', 'oardkeyb'));
console.log(rotasiString('keyboard', 'draobyek'));
