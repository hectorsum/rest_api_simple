$(function(){
  //todo: Create
  $('#getProducts').on('click',function(){
    $.ajax({
      url:'/products',
      success: function (products) { 
        let tbody = $('tbody');

        tbody.html('');
        products.forEach(product => {
          tbody.append(`
            <tr>
              <td class="id"> ${product.id} </td>
              <td> 
                <input type="text" class="name" value="${product.name}"/>
              </td>
              <td> 
                <button class="update-button">Update</button>
                <button class="delete-button">Delete</button>
              </td>
            </tr>
          `)
        })
      }
    })
  })

  //todo: Recibir datos del navegador
  $('#productForm').on('submit',function(e){
    e.preventDefault(); //* Para que no recargue la pagina
    let newProduct = $('#newProduct');
    $.ajax({
      url: '/products',
      method: 'POST',
      data:{
        name: newProduct.val() //* Enviar el valor del input  
      },
      success: function(response){
        $('#getProducts').click(); //* ejecutar evento click
      }
    })
  })

  //todo: Update
  $('table').on('click','.update-button',function () { 
    let row = $(this).closest('tr'); //* selecciona toda la fila con "closest"
    let id = row.find('.id').text(); //* obtener texto de la clase "id"
    let name = row.find('.name').val(); //* obtener el valor de la clase "name" (input)

    $.ajax({
      url: "/products/" + id, //* url: localhost:3000/products/4 (el id que va actualizar)
      method: 'PUT',
      data:{ //* Datos a actualizar
        name
      },
      success:function(response){
        $('#getProducts').click();
      }
    })
  })

  //todo: Delete
  $('table').on('click','.delete-button',function(){
    let row = $(this).closest('tr');
    let id = row.find('.id').text();

    $.ajax({
      url: '/products/'+id,
      method: 'DELETE',
      success: function(response){
        console.log(response);
        $('#getProducts').click();
      }
    })
  });
})