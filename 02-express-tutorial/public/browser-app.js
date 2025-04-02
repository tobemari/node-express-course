const navToggle = document.querySelector('.nav-toggle')
const loadProducts = document.querySelector('#loadProducts')
const links = document.querySelector('.links')

navToggle.addEventListener('click', function () {
  links.classList.toggle('show-links')
})

loadProducts.addEventListener('click', function () {
  fetch('/api/v1/products')
    .then(response => {
      if(!response){
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then(data=>{
      const productList = document.querySelector('#productList')
      productList.innerHTML = ''

      data.forEach(product => {
        const productItem = document.createElement('div')
        productItem.textContent = `Name: ${product.name} | Price: $${product.price}`
        productList.appendChild(productItem)
      })
    })
    .catch(error=>{
      console.error('Fetch error: ', error);
    })
} )