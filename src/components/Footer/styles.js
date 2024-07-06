import styled from "styled-components";

export const Footer = styled.footer`
    background-color: #00A195;
    position: relative;
    padding: 10px 10px;
    height: auto;
    width: 100%;

    @media (max-width: 1014px) {
        padding: 5px;
    }
`;

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 0.5fr 1fr 1.5fr 1fr;
    gap: 5px;

    .sec {
        color: #333232;
    }
    
    .sec h2 {
        position: relative;
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 15px;
    }

    .sec p {
        font-size: 14px;
    }

    // configurações da seção perfil do footer

    .profiles .container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 5px;
    }

    .profiles .container .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /*border: 1px solid #ddd;*/
        padding: 20px 3px;
  
    }
    .profiles .container .profile .img  img{
        border-radius: 50%;
        margin-bottom: 5px;
    }
    
    .profiles .container .profile .text {
        text-align: center;
    }
    
    .profiles .container .profile .text p {
        font-weight: 600;
    }
    
    // Configurações do enderço do footer
    .endereco {
        text-align: justify;
        align-content: center;
    }

    // Configurações das logos do footer
    .logos {
        display: grid;
        justify-content: center;
        align-content: center;
    }

    // Consultas de mídia para diferentes tamanhos de tela
    @media (max-width: 1014px) {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3,2fr);
        gap: 5px;
    }
    @media (max-width: 768px) {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(1,1fr);
        gap: 20px;

        .profiles .container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 5px;
            justify-content: space-between;
        }
        .endereco {
            text-align: center;
            align-content: center;
        }
        .logos img {
            display: grid;
            justify-content: center;
            align-content: center;
            width: 230px;
        }
    }
`;

export const copyrightText = styled.div`
    width: 100%;
    background: #fff;
    padding: 20px 100px 30px;
    text-align: center;
`;
