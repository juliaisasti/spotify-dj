import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home'; // Asegúrate de tener este componente
import SearchResults from '../SearchResults';

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search/:query" component={SearchResults} />
      {/* Agrega más rutas según tus necesidades */}
    </Switch>
  );
};

export default Main;
