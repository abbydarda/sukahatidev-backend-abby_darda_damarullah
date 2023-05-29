function isPalindrome(str) {
 const escapeString = str.split(' ').join('');
 const reverseString = escapeString.split('').reverse().join('');
 return escapeString === reverseString;
}

console.log(isPalindrome('kasur rusak'));
console.log(isPalindrome('kasur'));
