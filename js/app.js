console.clear();

// Proyecto: Consumir api para mostrar clima.
// 1. Crear una cuenta en 'https://openweathermap.org/'.
// 2. Generar una API, desde la opción de 'API Keys'.
// 3. Crear los contenedores.
// 4. Validate Form. 
// https://tobiasahlin.com/spinkit/: En este enlace se escarga el movimiento spenner para la espera previo a motrar el resultado.
  // En la perte superior '<> sourse' se copia la seccion segun objeto que se va autikzar en function spnner xra este proy, 'DIV'.

// 3.1 Contendor paa todo el entorno, lugar donde mostrar resultado y formulario.
const container = document.querySelector('.container'); // Contiene todos los elementos 'HTML'.
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    console.log(ciudad);
    console.log(pais);

    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios')

        return;
    }
    consultarAPI(ciudad, pais );
}

function mostrarError(mensaje) {
  const alerta = document.querySelector('.bg-red-100');
  if(!alerta) { // Valida que la alert No esté visible, al presionar el button sumbmit.
      const alerta = document.createElement('div');

      alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center" );

      alerta.innerHTML = `
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">${mensaje}</span>
      `;

      container.appendChild(alerta);
      setTimeout(() => {
          alerta.remove();
      }, 3000);
  }
}

function consultarAPI(ciudad, pais ) {
        // Consultar la API e imprimir el Resultado...

    // leer la url  y agregar el API key: Este ApiKey es el que se genero en la pagina 'https://openweathermap.org/'. 
    const appId = '3665c005b0e18eb97cb5de8b718a861d'; // EL siguiente URL valida que al ApiKey sea valido, var (appId).
    
    // El url contiene un enlace que devuelve el clima de acuerdo a los criterios indicados.
    // Este enlace se lo obtiene desde la opcion de Api|api doc|Api Call: del sitio https://openweathermap.org/'. 
    //let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner(); // Imprime un movimiento vistoso de espera en el HTML.

    console.log(url); // Para vsualizar en la consola los datos para poder extraerlos.

    // query con fetch api
    fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(datos => {
            console.log(datos);
            limpiarHTML();
            if(datos.cod === "404") {
                mostrarError('Ciudad No Encontrada')
            } else { // Mostrar la respuesta en el HTML.
                mostrarClima(datos)
            }
        })
        .catch(error => {
          console.log(error)
      });
}

function mostrarClima(datos) {

  // Formatear el Clima...

  const { name, main: { temp, temp_max, temp_min } } = datos; // Distruction.


  const grados = KelvinACentigrados(temp);  // function 'KelvinACentigrados': Convertir de Kelvin grados centigrados.
  const min = KelvinACentigrados(temp_max);
  const max = KelvinACentigrados(temp_min);

  const nombreCiudad = document.createElement('p');
  nombreCiudad.innerHTML = `Clima en: ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl')

  const actual = document.createElement('p');
  actual.innerHTML = `${grados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl')

  const tempMaxima = document.createElement('p');
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add('text-xl')

  const tempMinima = document.createElement('p');
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add('text-xl')

  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white')
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv)
}

function KelvinACentigrados(grados) { // Convierte Kelvin a Centigrados.
  return parseInt( grados - 273.15);
}

function limpiarHTML() {
  while(resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {

  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;
  resultado.appendChild(divSpinner);
}