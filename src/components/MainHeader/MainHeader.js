import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      {/*  Saco prop onLogout porque uso el context autorizando desde el dom del sitio con {useContext}
      <Navigation onLogout={props.onLogout} /> */}
      <Navigation/>
    </header>
  );
};

export default MainHeader;
