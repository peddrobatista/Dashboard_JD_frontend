// styles.js
import styled from 'styled-components';
import { Box } from '@mui/material';

export const StyledChartContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .line-chart {
    width: 90%;  // Ajuste a largura do gráfico para ser 90% do contêiner
    height: 45vw;  // Ajuste a altura do gráfico para ser 45% da largura da viewport
  }

  @media (max-width: 1200px) {
    .line-chart {
      width: 95%;  // Ajuste a largura do gráfico para ser 95% do contêiner
      height: 50vw;  // Ajuste a altura do gráfico para ser 50% da largura da viewport
    }
  }

  @media (max-width: 768px) {
    .line-chart {
      width: 100%;  // Ajuste a largura do gráfico para ser 100% do contêiner
      height: 55vw;  // Ajuste a altura do gráfico para ser 55% da largura da viewport
    }
  }
`;
