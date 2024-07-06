import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Typography } from '@mui/material';
import { StyledChartContainer } from './styles';

const settings = {
  width: 200,
  height: 200,
  value: 0, // Inicializa o valor com 0
};

const ArcDesign = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/rows');
        const data = response.data.values;
        const count = data.length - 1; // Subtrai 1 para não contar o cabeçalho
        setCount(count);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledChartContainer>
      <Typography className='title' variant='h4' sx={{ fontWeight: 700, color: '#636e72' }}>Visão Geral</Typography>
      <Gauge
        {...settings}
        value={count} // Define o valor do Gauge como a contagem de registros
        cornerRadius="10%" // borda do valor do arco
        className='gauge-chart'
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 30,
            fontWeight: 600,
            opacity: 0.8
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: '#1e90ff',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: '#dfe4ea',
          },
        })}
        text={({ value, valueMax }) => `${value.toLocaleString('pt-BR')}`} // Formata o texto para o padrão brasileiro
      />
    </StyledChartContainer>
  );
}

export default ArcDesign;
