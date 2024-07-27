import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Stack, Typography, CircularProgress, Alert } from '@mui/material';

const DonutChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/rows');
        const data = response.data.values;

        console.log('Dados recebidos da API:', data);

        if (data.length < 2) {
          console.error('Dados insuficientes para exibir o gráfico.');
          setLoading(false);
          return;
        }

        const rows = data.slice(1); // Linhas da tabela

        // Filtrar e agrupar dados por escolaridade
        const statusCounts = { 
          'Abandono': 0, 
          'Finalizado': 0, 
          'Desistente': 0
        };

        rows.forEach(row => {
          const education = row[27]; // Supondo que 'Status' está na coluna 'AB'
          if (statusCounts[education] !== undefined) {
            statusCounts[education]++;
          }
        });

        const formattedData = [
          { id: 0, value: statusCounts['Abandono'], label: 'Abandono', color: '#f1c40f' },
          { id: 1, value: statusCounts['Finalizado'], label: 'Finalizado', color: '#3498db' },
          { id: 2, value: statusCounts['Desistente'], label: 'Desistente', color: '#1abc9c' },
        ];

        setChartData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        setLoading(false);
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
          <Typography variant='h6' sx={{ fontWeight: 700, color: '#636e72' }}>Certificação</Typography>
          {loading ? (
            <CircularProgress />
          ) : chartData.length > 0 ? (
            <PieChart
              series={[
                {
                  data: chartData,
                  arcLabel: getArcLabel,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }, 
                  innerRadius: 60,
                  outerRadius: 100,
                  cornerRadius: 2,
                  cx: 95,
                  cy: 100
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: { // cor da legenda do preenchimento
                  fill: '#fff',
                  fontWeight: 'bold',
                  fontSize: 17
                }, 
              }}
              width={200}
              height={260}
            />
          ) : (
            <Alert severity='error'>
              Não há dados suficientes para exibir o gráfico
            </Alert>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default DonutChart;
