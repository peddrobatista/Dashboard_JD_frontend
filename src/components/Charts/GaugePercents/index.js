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

const ArcDesignPercents = () => {
  const [percentage, setPercentage] = useState(0);
  const maxRecords = 30000; // Defina o valor máximo aqui

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/rows');
        const data = response.data.values;
        const count = data.length - 1; // Subtrai 1 para não contar o cabeçalho
        const percentage = (count / maxRecords) * 100; // Calcula a porcentagem
        setPercentage(percentage);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledChartContainer>
      <Typography className='title' variant='h4' sx={{ fontWeight: 700, color: '#636e72' }}>Total(%)</Typography>
      <Gauge
        {...settings}
        value={percentage} // Define o valor do Gauge como a porcentagem
        cornerRadius="10%" // borda do valor do arco
        className='gauge-chart'
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
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
        text={({ value, valueMax }) => `${Math.round(value)}%`} // Mostra a porcentagem
      />
    </StyledChartContainer>
  );
}

export default ArcDesignPercents;
