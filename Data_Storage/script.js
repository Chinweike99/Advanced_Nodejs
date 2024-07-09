localStorage.setItem('name', 'Doe')
localStorage.removeItem('name')
console.log(localStorage.getItem('name'))


sessionStorage.setItem('name', 'John');
sessionStorage.removeItem('name');
console.log(sessionStorage.getItem('name'));


document.cookie = 'name=John Doe; expires=' + new Date(2024, 6, 10).toUTCString()

document.cookie = 'last name=Smart Doe; expires=' + new Date(2024, 6, 10).toUTCString()

console.log(document.cookie);