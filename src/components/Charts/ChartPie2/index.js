import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Stack, Typography } from '@mui/material';

const CustomPieChart2 = () => {
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

        // Filtrar e agrupar dados por escolaridade
        const educationCounts = { 
          'SUPERIOR INCOMPLETO': 0, 
          'SUPERIOR COMPLETO': 0, 
          'MÉDIO INCOMPLETO': 0, 
          'MÉDIO COMPLETO': 0, 
          'FUNDAMENTAL INCOMPLETO': 0, 
          'FUNDAMENTAL COMPLETO': 0 
        };

        rows.forEach(row => {
          const education = row[16]; // Supondo que 'Escolaridade' está na coluna 'Q'
          if (educationCounts[education] !== undefined) {
            educationCounts[education]++;
          }
        });

        const formattedData = [
          { id: 0, value: educationCounts['SUPERIOR INCOMPLETO'], label: 'Superior Incompleto', color: '#ff4757' },
          { id: 1, value: educationCounts['SUPERIOR COMPLETO'], label: 'Superior Completo', color: '#1abc9c' },
          { id: 2, value: educationCounts['MÉDIO INCOMPLETO'], label: 'Médio Incompleto', color: '#2ecc71' },
          { id: 3, value: educationCounts['MÉDIO COMPLETO'], label: 'Médio Completo', color: '#3498db' },
          { id: 4, value: educationCounts['FUNDAMENTAL INCOMPLETO'], label: 'Fundamental Incompleto', color: '#f1c40f' },
          { id: 5, value: educationCounts['FUNDAMENTAL COMPLETO'], label: 'Fundamental Completo', color: '#e67e22' },
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

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Stack direction="row" textAlign="center" spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box flexGrow={1}>
          <Typography variant='h6' sx={{ fontWeight: 700, color: '#636e72' }}>Escolaridade</Typography>
          {chartData.length > 0 ? (
            <PieChart
              series={[
                {
                  data: chartData,
                  arcLabel: getArcLabel,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 0, additionalRadius: -30, color: 'gray' }, 
                  outerRadius: 100,
                  cx: 95,
                  cy: 100
                },
              ]}
              slotProps={{
                legend: { hidden: true }
              }}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: { // cor da legenda do preenchimento
                  fill: '#fff', // Muda a cor do texto das legendas dos arcos
                  fontWeight: 'bold',
                  fontSize: 17,
                }, 
              }}
              width={200}
              height={260}
            />
          ) : (
            <div>Carregando...</div>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default CustomPieChart2;
