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
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
    padding: 20px 0 30px 0;

    .sec {
        color: #333232;
    }
    
    .sec h2 {
        position: relative;
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 17px;
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
    
    .endereco .btn-black {
        display: inline-block;
        outline: none;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 4px;
        line-height: 1.5;
        color: #333232;
        background-color: transparent;
        border-color: #333232;
        padding: 0.375rem 1.5rem;
        font-size: .875rem;
        font-weight: 700;
        margin-top: 0.75rem !important;
        text-align: center;
        vertical-align: middle;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }
    .btn-black:hover {
        background-color: #333232;
        color: #fff;
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
        padding: none;
    }
    @media (max-width: 768px) {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(1,1fr);
        gap: 20px;
        padding: none;

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
