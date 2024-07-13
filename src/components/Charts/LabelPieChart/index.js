import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Stack } from '@mui/material';
import { styled } from '@mui/material';
import { useDrawingArea } from '@mui/x-charts/hooks';

const LabelPieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/rows');
        const data = response.data.values;

        console.log('Dados recebidos da API:', data);

        if (data.length < 2) {
          console.error('Dados insuficientes para exibir o gráfico.');
          return;
        }

        const rows = data.slice(1); // Linhas da tabela

        // Filtrar e agrupar dados por gênero
        const genderCounts = { 'Masculino': 0, 'Feminino': 0 };

        rows.forEach(row => {
          const gender = row[3]; // Supondo que 'Genero' está na coluna 'F'
          if (gender === 'Masculino' || gender === 'Feminino') {
            genderCounts[gender]++;
          }
        });

        const formattedData = [
          { id: 0, value: genderCounts['Masculino'], label: 'Homens', color: '#ff4757' },
          { id: 1, value: genderCounts['Feminino'], label: 'Mulheres', color: '#2ed573' }
        ];

        setChartData(formattedData);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const TOTAL = chartData.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

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
    <Stack textAlign="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box padding='auto'>
        {chartData.length > 0 ? (
          <PieChart
            series={[
              {
                data: chartData,
                arcLabel: getArcLabel,
                innerRadius: 60,
              },
            ]}
            slotProps={{ legend: { hidden: true } }}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: '#fff',
                fontWeight: 'bold',
              },
            }}
            width={400}
            height={200}
          >
            <PieCenterLabel>Status</PieCenterLabel>
          </PieChart>
        ) : (
          <div>Carregando...</div>
        )}
      </Box>
    </Stack>
  );
}

export default LabelPieChart;
