// styles.js
import styled from 'styled-components';
import { Box } from '@mui/material';

export const StyledChartContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;

  .gauge-chart {
    width: 90%;  // Ajuste a largura do gráfico para ser 90% do contêiner
    height: 45%;  // Ajuste a altura do gráfico para ser 45% da largura da viewport
  }
  
  @media (max-width: 1200px) {
    .gauge-chart {
      width: 95%;  // Ajuste a largura do gráfico para ser 95% do contêiner
      height: 50%;  // Ajuste a altura do gráfico para ser 50% da largura da viewport
    }
    .title {
      font-size: 19px;
    }
  }

  @media (max-width: 768px) {
    .gauge-chart {
      width: 100%;  // Ajuste a largura do gráfico para ser 100% do contêiner
      height: 55%;  // Ajuste a altura do gráfico para ser 55% da largura da viewport
    }
  }
`;
