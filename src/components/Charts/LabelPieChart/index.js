import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts/hooks';

const LabelPieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/rows');
        const data = response.data.values;

        console.log('Dados recebidos da API:', data);

        if (data.length < 2) {
          console.error('Dados insuficientes para exibir o gráfico.');
          return;
        }

        const rows = data.slice(1); // Linhas da tabela

        // Filtrar e agrupar dados por gênero
        const genderCounts = { 'M': 0, 'F': 0 };

        rows.forEach(row => {
          const gender = row[5]; // Supondo que 'Genero' está na coluna 'F'
          if (gender === 'M' || gender === 'F') {
            genderCounts[gender]++;
          }
        });

        const formattedData = [
          { id: 0, value: genderCounts['M'], label: 'Homens', color: '#ff4757' },
          { id: 1, value: genderCounts['F'], label: 'Mulheres', color: '#2ed573' }
        ];

        setChartData(formattedData);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);
  // cor do label, estilização
  const StyledText = styled('text')(({ theme }) => ({
    fill: '#636e72',
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
    fontWeight: 'bold'
  }));
  
  // colocar o texto no centro
  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ height: '80vh', textAlign: 'center' }}
    >
      <Box>
        <Typography variant='h4' sx={{fontWeight: 700, color: '#636e72'}}>Pie Chart Label</Typography>
        {chartData.length > 0 ? (
          <PieChart
            series={[
              {
                data: chartData,
                innerRadius: 60
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: '#fff',
                fontWeight: 'bold',
              },
            }}
            width={400}
            height={200}
          ><PieCenterLabel>Center</PieCenterLabel></PieChart>
        ) : (
          <div>Carregando...</div>
        )}
      </Box>
    </Stack>
  );
}

export default LabelPieChart;

