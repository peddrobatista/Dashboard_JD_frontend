import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Stack, Typography, CircularProgress, Alert } from '@mui/material';

const CustomPieChart3 = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-dashboard-pied.vercel.app/rows');
        const data = response.data.values;

        console.log('Dados recebidos da API:', data);

        if (data.length < 2) {
          console.error('Dados insuficientes para exibir o gráfico.');
          setLoading(false);
          return;
        }

        const rows = data.slice(1); // Linhas da tabela

        // Filtrar e agrupar dados por gênero
        const publicCounts = { 'SIM': 0, 'NAO': 0 };

        rows.forEach(row => {
          const publicschool = row[19]; // Supondo que 'Escola Pública' está na coluna 'T'
          if (publicschool === 'SIM' || publicschool === 'NAO') {
            publicCounts[publicschool]++;
          }
        });

        const formattedData = [
          { id: 0, value: publicCounts['SIM'], label: 'Sim', color: '#3498db' },
          { id: 1, value: publicCounts['NAO'], label: 'Não', color: '#7f8c8d' }
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

  const legendLabelStyle = {
    fontSize: 12,
    fontWeight: 600,
    fill: '#636e72',
  };

  const arcLabelStyle = {
    fill: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Stack direction="row" textAlign="center" spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box flexGrow={1}>
          <Typography variant='h6' sx={{ fontWeight: 700, color: '#636e72' }}>Escola Pública?</Typography>
          {loading ? (
            <CircularProgress />
          ) : chartData.length > 0 ? (
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
                legend: {
                  direction: 'row',
                  position: { 
                    vertical: 'bottom', 
                    horizontal: 'middle' 
                  },
                  itemMarkWidth: 20,
                  itemMarkHeight: 17,
                  markGap: 5,
                  itemGap: 10,
                  labelStyle: legendLabelStyle,
                  padding: 20,
                }
              }}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: arcLabelStyle,
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

export default CustomPieChart3;
