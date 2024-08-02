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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-dashboard-pied.vercel.app/rows');
        const data = response.data.values;

        const abandonoCount = data.slice(1).filter(row => row[27] === 'Abandono').length;
        const desistenteCount = data.slice(1).filter(row => row[27] === 'Desistente').length;
        const finalizadosCount = data.slice(1).filter(row => row[27] === 'Finalizado').length;
        const totaisCount = finalizadosCount + desistenteCount + abandonoCount

        if (totaisCount > 0) {
          const percentage = (finalizadosCount / totaisCount) * 100; // Calcula a porcentagem
          setPercentage(percentage);
        } else {
          setPercentage(0);
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledChartContainer>
      <Typography className='title' variant='h4' sx={{ fontWeight: 700, color: '#636e72' }}>Finalizados</Typography>
      <Gauge
        {...settings}
        value={percentage} // Define o valor do Gauge como a porcentagem
        cornerRadius="10%" // borda do valor do arco
        className='gauge-chart'
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            fontWeight: 600,
            opacity: 0.8,
            fill: '#636e72', // cor do texto
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
