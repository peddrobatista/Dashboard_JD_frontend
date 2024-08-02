import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, LinearProgress, styled, linearProgressClasses, Alert } from '@mui/material';
import { StyledChartContainer } from './styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15, // Aumentar a altura da barra
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function SimpleBarChart() {
  const [chartData, setChartData] = useState({ xAxis: [], series: [] });
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-dashboard-pied.vercel.app/rows');
        const data = response.data.values;

        console.log('Dados recebidos da API:', data);

        if (data.length < 2) {
          console.error('Dados insuficientes para exibir o gráfico.');
          setLoading(false);
          clearInterval(timer);
          return;
        }

        const rows = data.slice(1); // Linhas da tabela

        // Mapear os índices dos cabeçalhos para facilitar o acesso aos dados
        const headers = data[0]; // Cabeçalhos da tabela
        const headerMap = {};
        headers.forEach((header, index) => {
          headerMap[header.toLowerCase()] = index;
        });

        // Índice da coluna 'Status'
        const statusIndex = headerMap['status'];

        // Agrupar dados por Status
        const statusCount = rows.reduce((acc, row) => {
          const status = row[statusIndex];
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // Preparar dados para o gráfico
        const xAxisData = Object.keys(statusCount);
        const seriesData = Object.values(statusCount);

        console.log('xAxisData:', xAxisData);
        console.log('seriesData:', seriesData);

        // Verificar se os dados são válidos antes de definir o estado
        if (xAxisData.length !== seriesData.length) {
          console.error('Os dados do eixo X e da série não correspondem em comprimento.');
          setLoading(false);
          clearInterval(timer);
          return;
        }

        // Define o estado com os dados formatados para o gráfico
        setChartData({ xAxis: xAxisData, series: [{ data: seriesData, label: 'Cadastrados', color: '#1e90ff' }] });
        setLoading(false);
        clearInterval(timer);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        setLoading(false);
        clearInterval(timer);
      }
    };

    fetchData();

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Typography className='title' variant='h6' sx={{ fontWeight: 700, color: '#636e72', marginTop: '10px', textAlign: 'center' }}>
        Status
      </Typography>
      <StyledChartContainer>
        {loading ? (
          <Box sx={{ width: '100%' }}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
        ) : chartData.xAxis.length > 0 && chartData.series.length > 0 ? (
          <BarChart
            className="bar-chart"
            borderRadius={6}
            width={800}
            height={300}
            xAxis={[{ scaleType: 'band', data: chartData.xAxis }]}
            series={chartData.series}
            grid={{ vertical: true, horizontal: true }}
            sx={{ marginBottom: '20px' }}
          />
        ) : (
          <Alert severity='error'>Dados insuficientes para exibir o gráfico</Alert>
        )}
      </StyledChartContainer>
    </>
  );
}

