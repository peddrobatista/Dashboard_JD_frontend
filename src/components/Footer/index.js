import * as React from 'react';
import logoPrefeitura from '../../images/logo_prefeitura.png';
import logoCitinova from '../../images/citinova.png'
import profileImg from '../../images/user_avater.jpg'
import * as C from './styles';


const Footer = () => {


  return (
    <>
    <C.Footer>
        <C.Container>
            <div className='sec profiles'>
                <div className='container'>
                    <div class="profile">
                        <div className="img">
                            <img src={profileImg} width="50px" alt="profile"/>
                        </div>
                        <div className="text">
                            <h4>Profile 1</h4>
                            <p>text</p>
                        </div>
                    </div>
                    <div class="profile">
                        <div className="img">
                            <img src={profileImg} width="50px" alt="profile"/>
                        </div>
                        <div className="text">
                            <h4>Profile 2</h4>
                            <p>text</p>
                        </div>
                    </div>
                    <div class="profile">
                        <div className="img">
                            <img src={profileImg} width="50px" alt="profile"/>
                        </div>
                        <div className="text">
                            <h4>Profile 3</h4>
                            <p>text</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sec logos prefeitura'>
                <img src={logoPrefeitura} alt="logo-prefeitura" width={200}/>
            </div>
            <div className='sec endereco'>
                <h2>Fundação de Ciência, Tecnologia e Inovação de Fortaleza - Citinova</h2>   
                <p>Rua dos Pacajús, n 33, Praia de Iracema, Fortaleza - CE | CEP: 60060-520 </p>
            </div>
            <div className='sec logos citinova'>
                <img src={logoCitinova} alt="logo-citinova" width={200}/>
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