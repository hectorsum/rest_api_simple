const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express()

//!database simulator
const products = [
  {
    id: 1,
    name: 'Laptop'
  },{
    id:2,
    name:'Microphone'
  },
  {
    id:3,
    name:'PC'
  }
];

//todo:Settings

app.set('port', process.env.PORT || 3000) //*Tomar un puerto definido, si esta ocupado..                                          ocupa el puerto 3000

//todo:Middlewares
//* Para ver las peticiones del navegador al servidor en consola
app.use(morgan('dev'));
//*Lo que el navegador está enviando
app.use(express.urlencoded({extended:false})) //*cuando un form html envia datos,lo envia a través de url
                                              //* extended:false, porq no vamos estar enviando img al servidor
app.use(express.json()); //* recibe json's en el servidor, poder entender lo que viene del navegador


//*permitirá escuchar cuando el navegador envia datos al servidor, cuando navegador envia un producto que tenga que almacenar el servidor, no va haber conflicto con la otra ruta /products, porque funciona como get y esta funciona com opost
app.post('/products',(req,res) =>{
  const {name} = req.body;
  products.push({
    id: products.length + 1,
    name //*name:name
  });
  res.json('Successfully created')
}) 

//* Para actualizar algún dato (PUT)
//* ":id" => para decirle el id que el navegador va enviar
app.put('/products/:id',(req,res)=>{
  // const obj = JSON.parse(JSON.stringify(req.body)); //* Obtener el body y convertir a string para evitar "[Object: null prototype]" en consola
  // console.log(req.params,obj);
  const {id} = req.params;
  const {name} = req.body;

  products.forEach((product,i)=>{
    if (product.id == id){ //* si el id de uno de los prod coincide con el id que envia el user
      product.name = name; //* actualiza el nombre del cliente con el nuevo que envian
    }
  })
  res.json('Successfully updated')
})

//* Decir que vamos a recibir un evento products, más el id
app.delete("/products/:id",(req,res)=>{
  const {id} = req.params;
  products.forEach((product,i)=>{
    if (product.id == id){
      products.splice(i,1) //* splice: para eliminar, el contador(i)
    }
  });
  res.json('Successfully deleted')
})

//todo:Routes
//*Obtener lo que el navegador solicita
app.get('/products', (req, res) => {
  res.json(products) //*response.json()
})


//todo:Static files
//*Buscar la carpeta public, es la que se envia al navegador
app.use(express.static(path.join(__dirname, 'public')));

//*Escuchar puerto
app.listen(app.get('port'), () => {
  //*Pasando el puerto predefinido que se esta escuchando
  console.log(`server on port ${app.get('port')}`)
})