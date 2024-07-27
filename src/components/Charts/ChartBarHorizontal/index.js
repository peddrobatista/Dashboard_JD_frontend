import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Box, LinearProgress, styled, linearProgressClasses, Alert } from '@mui/material';
import { StyledChartContainer } from './styles';

// Estilo para a barra de progresso linear
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

export default function HorizontalBars() {
  const [chartData, setChartData] = useState({ yAxis: [], series: [] });
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
        const response = await axios.get('http://localhost:3003/rows');
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

        // Índice da coluna 'Escolaridade'
        const escolaridadeIndex = headerMap['escolaridade']; // Certifique-se de que o cabeçalho está em minúsculas

        // Agrupar dados por escolaridade
        const escolaridadeCount = rows.reduce((acc, row) => {
          const escolaridade = row[escolaridadeIndex];
          if (escolaridade) { // Apenas contar registros com valor válido
            acc[escolaridade] = (acc[escolaridade] || 0) + 1;
          }
          return acc;
        }, {});

        // Preparar dados para o gráfico
        const yAxisData = Object.keys(escolaridadeCount);
        const seriesData = Object.values(escolaridadeCount);

        console.log('yAxisData:', yAxisData);
        console.log('seriesData:', seriesData);

        // Verificar se os dados são válidos antes de definir o estado
        if (yAxisData.length !== seriesData.length) {
          console.error('Os dados do eixo Y e da série não correspondem em comprimento.');
          setLoading(false);
          clearInterval(timer);
          return;
        }

        // Define o estado com os dados formatados para o gráfico
        setChartData({ yAxis: yAxisData, series: [{ data: seriesData, label: 'Cadastrados', color: '#1e90ff' }] });
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
        Escolaridade
      </Typography>
      <StyledChartContainer>
        {loading ? (
          <Box sx={{ width: '100%' }}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
        ) : chartData.yAxis.length > 0 && chartData.series.length > 0 ? (
          <BarChart
            yAxis={[{ scaleType: 'band', data: chartData.yAxis }]}
            xAxis={[{ label: 'Cadastrados' }]}
            series={chartData.series}
            layout="horizontal"
            width={800}
            height={400}
            grid={{ vertical: true }}
            sx={{ padding: '0px 0px 50px 50px' }}
          />
        ) : (
          <Alert severity='error'>Dados insuficientes para exibir o gráfico</Alert>
        )}
      </StyledChartContainer>
    </>
  );
}
