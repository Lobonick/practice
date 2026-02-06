import AlinearDatos from './utils/alinear.js';
import readlineSync from 'readline-sync';

//npm install readline-sync

const API_URL = 'https://fakestoreapi.com/products';

async function obtenerYMostrarProductos() {
  try {
      console.log('📡 Realizando petición a la API...');
      const response = await fetch(`${API_URL}?limit=10`);

      // Verificar que la respuesta sea exitosa
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      // Convertir respuesta a JSON
      const productos = await response.json();
      console.log(`✅ ${productos.length} productos obtenidos exitosamente\n`);

    let wOpcion = 0;
    do {
      console.clear();
      console.log('═══════════════════════════════════════════════════');
      console.log(`  OBTENIENDO ${productos.length} PRODUCTOS DE FAKESTOREAPI.COM`);
      console.log('═══════════════════════════════════════════════════\n');
      console.log(' 1. MAP    →  Transformar datos.   ');
      console.log(' 2. FILTER →  Filtrado de productos.   ');
      console.log(' 3. REDUCE →  Acumula valores calculando totales.   ');
      console.log(' 4. FIND   →  Buscando productos.   ');
      console.log(' 5. SOME   →  VERDADERO si ALGUNO cumple el criterio. ');
      console.log(' 6. EVERY  →  VERDADERO si TODOS cumplen el criterio.   ');
      console.log(' 7.        →  Operaciones combinadas.   ');
      console.log(' 8.        →  Búsqueda de Texto.   ');
      console.log(' 0. SALIR   ');

      wOpcion = readlineSync.questionInt('Seleccione (0-8): ');
  
      if (wOpcion < 0 || wOpcion > 8) {
        console.log('❌ Opción inválida');
        readlineSync.question('Presione ENTER...');
        continue;
      }
      
      if (wOpcion !== 0) {

        switch (wOpcion) {
            case 1:
                console.clear();
                modulo_map(productos);
                break;           
            case 2:
                console.clear();
                modulo_filter(productos);
                break;
            case 3:
                console.clear();
                modulo_reduce(productos);
                break;
            case 4:
                console.clear();
                modulo_find(productos);
                break;
            case 5:
                console.clear();
                modulo_some(productos);
                break;
            case 6:
                console.clear();
                modulo_every(productos);
                break;
            default:
                console.error(`\n⚠️ Módulo "${wOpcion}" aún no registrado.`);
                process.exit(1);
        }

        readlineSync.question('\n Presione ENTER para continuar...');
      }
      
    } while (wOpcion !== 0);

  } catch (error) {
    console.error('\n❌ ERROR al obtener productos:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('fetch failed')) {
      console.error('💡 Sugerencia: Verifica tu conexión a internet\n');
    }
    
    throw error;
  }

}


function modulo_map(productos) {
  try {
      // 1. Aplicar MAP → transformar datos 
      const nValor = 1000.00;
      const arrayProductos = productos.map(({ id, title, price, category, rating }) => ({
        id,
        title,
        price: price+nValor,
        category,
        rating: rating?.rate || 0
      }));

      console.clear();
      console.log('\n═════════════════════════════════════════');
      console.log('        LISTADO DE PRODUCTOS');
      console.log('═════════════════════════════════════════\n');

      console.log(`MÉTODO  :  MAP → transformar datos`);
      console.log(`CRITERIO:  Incrementar al PRECIO el valor de ${nValor}.`);
      console.log('-----------------------------------------------------------------------------------------------');
      console.log(' ID   TITULO                    PRECIO  CATEGORIA             RATING   VOTOS');
      console.log('-----------------------------------------------------------------------------------------------');
      arrayProductos.forEach((producto, index) => {
        console.log(
          AlinearDatos.alinearDerecha(producto.id.toString(), 4) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.title, 20), 20) + '  ' +
          AlinearDatos.formatearPrecio(producto.price, 10) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.category, 18), 18) + '  ' 
          //AlinearDatos.formatearNumero(producto.rating.rate, 7, 2) + '  ' +
          //AlinearDatos.alinearDerecha(producto.rating.count.toString(), 6) 
        );
      });

      console.log('-----------------------------------------------------------------------------------------------');
      console.log(`  TOTAL: ${arrayProductos.length} productos PROCESADOS en el array.`);
      

  } catch (error) {
    console.error('\n❌ ERROR al LISTAR los productos:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('fetch failed')) {
      console.error('💡 Sugerencia: Verifica tu conexión a internet\n');
    }
    
    throw error;
  }
};


function modulo_filter(productos) {
  try {
      // 2. FILTER → filtrar por condición 
      const arrayProductos = productos.filter(p => p.price < 50);

      console.clear();
      console.log('\n═════════════════════════════════════════');
      console.log('        LISTADO DE PRODUCTOS');
      console.log('═════════════════════════════════════════\n');

      console.log(`MÉTODO  :  FILTER → Filtrando de Productos según criterio.`);
      console.log(`CRITERIO:  Productos baratos (Precio < 50)`);
      console.log('-----------------------------------------------------------------------------------------------');
      console.log(' ID   TITULO                    PRECIO  CATEGORIA             RATING   VOTOS');
      console.log('-----------------------------------------------------------------------------------------------');
      arrayProductos.forEach((producto, index) => {
        console.log(
          AlinearDatos.alinearDerecha(producto.id.toString(), 4) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.title, 20), 20) + '  ' +
          AlinearDatos.formatearPrecio(producto.price, 10) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.category, 18), 18) + '  ' 
          //AlinearDatos.formatearNumero(producto.rating.rate, 7, 2) + '  ' +
          //AlinearDatos.alinearDerecha(producto.rating.count.toString(), 6) 
        );
      });

      console.log('-----------------------------------------------------------------------------------------------');
      console.log(`  TOTAL: ${arrayProductos.length} productos PROCESADOS en el array.`);
      

  } catch (error) {
    console.error('\n❌ ERROR al LISTAR los productos:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('fetch failed')) {
      console.error('💡 Sugerencia: Verifica tu conexión a internet\n');
    }
    
    throw error;
  }
};


function modulo_reduce(productos) {
  try {
      // 3. REDUCE → acumular valores 
      const arrayProductos = productos
      const precioTotal = productos.reduce((acc, p) => acc + p.price, 0); 

      console.clear();
      console.log('\n═════════════════════════════════════════');
      console.log('        LISTADO DE PRODUCTOS');
      console.log('═════════════════════════════════════════\n');

      console.log(`MÉTODO  :  REDUCE → Acumula valores`);
      console.log(`CRITERIO:  Sumatoria de precios.`);
      console.log('-----------------------------------------------------------------------------------------------');
      console.log(' ID   TITULO                    PRECIO  CATEGORIA             RATING   VOTOS');
      console.log('-----------------------------------------------------------------------------------------------');
      arrayProductos.forEach((producto, index) => {
        console.log(
          AlinearDatos.alinearDerecha(producto.id.toString(), 4) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.title, 20), 20) + '  ' +
          AlinearDatos.formatearPrecio(producto.price, 10) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.category, 18), 18) + '  ' 
          //AlinearDatos.formatearNumero(producto.rating.rate, 7, 2) + '  ' +
          //AlinearDatos.alinearDerecha(producto.rating.count.toString(), 6) 
        );
      });

      console.log('-----------------------------------------------------------------------------------------------');
      console.log(` ACUMULADO TOTAL: ${precioTotal} es la sumatoria de todos los PRECIOS.`);
      

  } catch (error) {
    console.error('\n❌ ERROR al LISTAR los productos:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('fetch failed')) {
      console.error('💡 Sugerencia: Verifica tu conexión a internet\n');
    }
    
    throw error;
  }
};

function modulo_find(productos) {
  try {
      // 4. FIND → encontrar el primero que cumpla condición 
      const arrayProductos = productos;
      const nValor = 600.00

      console.clear();
      console.log('\n═════════════════════════════════════════');
      console.log('        LISTADO DE PRODUCTOS');
      console.log('═════════════════════════════════════════\n');

      console.log(`MÉTODO  :  FIND → Encontrar el primero que cumpla criterio.`);
      console.log(`CRITERIO:  Buscar producto con PRECIO > ${nValor}`);
      console.log('-----------------------------------------------------------------------------------------------');
      console.log(' ID   TITULO                    PRECIO  CATEGORIA             RATING   VOTOS');
      console.log('-----------------------------------------------------------------------------------------------');
      arrayProductos.forEach((producto, index) => {
        console.log(
          AlinearDatos.alinearDerecha(producto.id.toString(), 4) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.title, 20), 20) + '  ' +
          AlinearDatos.formatearPrecio(producto.price, 10) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.category, 18), 18) + '  ' 
          //AlinearDatos.formatearNumero(producto.rating.rate, 7, 2) + '  ' +
          //AlinearDatos.alinearDerecha(producto.rating.count.toString(), 6) 
        );
      });

      console.log('-----------------------------------------------------------------------------------------------');
      const prodEncontrado = productos.find(p => p.price > nValor);
      let w_linTexto = "";
      w_linTexto += AlinearDatos.alinearDerecha(prodEncontrado.id.toString(), 4) + '  ';
      w_linTexto += AlinearDatos.alinearIzquierda(AlinearDatos.truncar(prodEncontrado.title, 20), 20) + '  '; 
      w_linTexto += AlinearDatos.formatearPrecio(prodEncontrado.price, 10) + '  ';
      w_linTexto += AlinearDatos.alinearIzquierda(AlinearDatos.truncar(prodEncontrado.category, 18), 18) + '  ';
      console.log(`PRIMER PRODUCTO ENCONTRADO:`);
      console.log(w_linTexto);      
      console.log('-----------------------------------------------------------------------------------------------');

  } catch (error) {
    console.error('\n❌ ERROR al LISTAR los productos:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('fetch failed')) {
      console.error('💡 Sugerencia: Verifica tu conexión a internet\n');
    }
    
    throw error;
  }
};


function modulo_some(productos) {
  try {
      // 5. SOME → verificar si existe al menos uno.
      const arrayProductos = productos;
      const cValor = "electronics"

      console.clear();
      console.log('\n═════════════════════════════════════════');
      console.log('        LISTADO DE PRODUCTOS');
      console.log('═════════════════════════════════════════\n');

      console.log(`MÉTODO  :  SOME → Es VERDADERO si encuentra lo que cumpla el criterio.`);
      console.log(`CRITERIO:  Buscar producto con CATEGORIA = ${cValor}`);
      console.log('-----------------------------------------------------------------------------------------------');
      console.log(' ID   TITULO                    PRECIO  CATEGORIA             RATING   VOTOS');
      console.log('-----------------------------------------------------------------------------------------------');
      arrayProductos.forEach((producto, index) => {
        console.log(
          AlinearDatos.alinearDerecha(producto.id.toString(), 4) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.title, 20), 20) + '  ' +
          AlinearDatos.formatearPrecio(producto.price, 10) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.category, 18), 18) + '  ' 
          //AlinearDatos.formatearNumero(producto.rating.rate, 7, 2) + '  ' +
          //AlinearDatos.alinearDerecha(producto.rating.count.toString(), 6) 
        );
      });

      console.log('-----------------------------------------------------------------------------------------------');
      const siEncontrado = productos.some(p => p.category === cValor); 
      let resultado = "";
      if(siEncontrado) {resultado = "SI"} else {resultado = "NO"};
      console.log("¿Hay electrónicos?:", resultado);      
      console.log('-----------------------------------------------------------------------------------------------');

  } catch (error) {
    console.error('\n❌ ERROR al LISTAR los productos:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('fetch failed')) {
      console.error('💡 Sugerencia: Verifica tu conexión a internet\n');
    }
    
    throw error;
  }
};

function modulo_every(productos) {
  try {
      // 6. EVERY → verificar si todos cumplen condición 
      const arrayProductos = productos;
      const nValor = 600.00;

      console.clear();
      console.log('\n═════════════════════════════════════════');
      console.log('        LISTADO DE PRODUCTOS');
      console.log('═════════════════════════════════════════\n');

      console.log(`MÉTODO  :  SOME → Es VERDADERO si encuentra lo que cumpla el criterio.`);
      console.log(`CRITERIO:  Buscar productos económicos. (PRECIO < ${nValor})`);
      console.log('-----------------------------------------------------------------------------------------------');
      console.log(' ID   TITULO                    PRECIO  CATEGORIA             RATING   VOTOS');
      console.log('-----------------------------------------------------------------------------------------------');
      arrayProductos.forEach((producto, index) => {
        console.log(
          AlinearDatos.alinearDerecha(producto.id.toString(), 4) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.title, 20), 20) + '  ' +
          AlinearDatos.formatearPrecio(producto.price, 10) + '  ' +
          AlinearDatos.alinearIzquierda(AlinearDatos.truncar(producto.category, 18), 18) + '  ' 
          //AlinearDatos.formatearNumero(producto.rating.rate, 7, 2) + '  ' +
          //AlinearDatos.alinearDerecha(producto.rating.count.toString(), 6) 
        );
      });

      console.log('-----------------------------------------------------------------------------------------------');
      const TodoBarato = productos.every(p => p.price < nValor); 
      let resultado = "";
      if(TodoBarato) {resultado = "SI"} else {resultado = "NO"};
      console.log("¿Todos son baratos (<100)?:", resultado);
      console.log('-----------------------------------------------------------------------------------------------');

  } catch (error) {
    console.error('\n❌ ERROR al LISTAR los productos:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('fetch failed')) {
      console.error('💡 Sugerencia: Verifica tu conexión a internet\n');
    }
    
    throw error;
  }
};


// Ejecutar la función
obtenerYMostrarProductos()
  .then(productos => {
    console.log(`\n\n✅ Proceso completado.`);
  })
  .catch(error => {
    console.error('❌ El proceso falló:', error.message);
    process.exit(1);
  });




