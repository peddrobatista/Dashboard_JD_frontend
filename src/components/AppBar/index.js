import * as React from 'react';
import * as D from './styles';
import logoPrefeitura from '../../images/logo_prefeitura.png';


const ButtonAppBar = () => {


  return (
    <D.Header>
      <img src={logoPrefeitura} width={178} alt='logo_prefeitura'/>
      <D.Title></D.Title>
    </D.Header>
     
  );
}

export default ButtonAppBar;