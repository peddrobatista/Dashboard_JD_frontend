import styled from "styled-components";


// definindo e exportando o componente estilizado
export const Container = styled.div`
    min-height: 100vh;
    width: 100%;

    .title {
        width: 100%;
        padding: 20px 0;
        text-align: center;
    }

    .title h2 {
        font-size: 3rem;
        color: #2d3436;
    }

    menu ul {
        background-color: transparent;
        list-style: none;
        width: 80%;
        margin: 25px auto 25px auto;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 15px;
    }
    
    menu ul li {
        display: inline-block;
    }

    // Configuração da grid e seus elementos
    .grid-container {
        width: 90%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 25px;
        padding: 25px;
       // background: #dfe4ea; // cinza
        margin: 20px auto 40px auto;
        border-radius: 15px;
    }

    .grid-container {
        grid-template-areas: 'i3 i3 i3  i2'
                            'i1 i1 i1  i2'
                            'i1 i1 i1  i2'
                            'i4 i4 i4  i4';
    }

    .grid-item .gi {
        background-color: #fff;
        border-radius: 8px;
    }
    
    .i1 {
        display: flex;
        flex-direction: column;
        grid-area: i1;
        gap: 20px;
    }
    .i1 .gi {
        height: 100%;
    }
    .i2 {
        display: flex;
        grid-area: i2;
        flex-direction: column;
        gap: 20px;
    }
    
    .i2 .gi {
        align-content: center;
        padding: 10px;
    }
    
    .i3 {
        display: flex;
        justify-content: center;
        grid-area: i3;
        gap: 20px;
    }
    .i3 .gi { 
        width: 100%;
        padding: 10px;
    }
    .i4 {
        grid-area: i4;
        gap: 20px;
    }
    .i4 .gi {
        padding: 10px;
    }
    // Configurações de responsividade

    @media (max-width: 1014px) {
        .grid-container {
            grid-template-areas: 'i3 i3 i3  i3'
                                'i1 i1 i1  i1'
                                'i2 i2 i2  i2'
                                'i4 i4 i4  i4';
        }
        
    }
    @media (max-width: 990px) {
        .i1 .gi {
            height: 80%;
        }
        .i3 {
            flex-direction: column;
        }
        .i3 .gi {
            height: 30%;
        }
    }

    @media (max-width: 880px) {
        menu ul {
            justify-content: center;
        }
        menu ul li Button {
            font-size: 8px;
            margin: 8px;
        }
    }

    }

    @media (max-width: 535px) {
        .i1 .gi {
            height: 25%;
        }
        .i3 .gi {
            height: 25%;
        }
    }
`;
