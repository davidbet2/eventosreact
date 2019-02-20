import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Eventos from './components/Eventos';

class App extends Component {

  token = '4ZGYJGS2W6S3HPX4IJ64';
  ordenar = 'date';

  state = {
    categorias: [],
    eventos: []
  }

  componentDidMount(){
    this.obtenerCategorias();
  }

  obtenerCategorias = async() => {
    let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`;

    await fetch(url) 
    .then(respuesta => {
      return respuesta.json();
    }).then(categorias => {
      // console.log(categorias.categories);
      this.setState({
        categorias: categorias.categories
      })
    })
  }

  obtenerEventos = async (busqueda) => {
    let url = `https://www.eventbriteapi.com/v3/events/search/?q=${busqueda.nombre}&categories=${busqueda.categoria}&sort_by=${this.ordenar}&token=${this.token}&locale=es_ES`;
    // console.log(url);
    await fetch(url) 
    .then(respuesta => {
      return respuesta.json();
    }).then(eventos => {
      // console.log(categorias.categories);
      this.setState({
        eventos: eventos.events
      })
    })
  }

  render() {
    return (
      <div className="App">
       <Header titulo="Eventos"/>
       <div className="uk-container">
        <Formulario
          categorias = {this.state.categorias}
          obtenerEventos = {this.obtenerEventos}
        />
        <Eventos
          eventos ={this.state.eventos}
        />
       </div>
      </div>
    );
  }
}

export default App;
