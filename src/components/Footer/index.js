import * as React from 'react';
import logoPrefeitura from '../../images/logo_prefeitura.png';
import logoCitinova from '../../images/citinova.png'
import * as C from './styles';


const Footer = () => {


  return (
    <>
    <C.Footer>
        <C.Container>
            <div className='sec logos prefeitura'>
                <img src={logoPrefeitura} alt="logo-prefeitura" width={250}/>
            </div>
            <div className='sec endereco'>
                <h2>Fundação de Ciência, Tecnologia e Inovação de Fortaleza - Citinova</h2>   
                <p>Rua dos Pacajús, n 33, Praia de Iracema, Fortaleza - CE | CEP: 60060-520 </p>
                <button className='btn-black'>Fale conosco</button>
            </div>
            <div className='sec logos citinova'>
                <img src={logoCitinova} alt="logo-citinova" width={250}/>
            </div>
        </C.Container>
    </C.Footer>
    <C.copyrightText>
        <p>Copyright &copy; 2024. All Rights reserved</p>
    </C.copyrightText>
    </>
     
  );
}

export default Footer;