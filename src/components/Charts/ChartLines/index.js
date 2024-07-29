import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography, Box, LinearProgress, styled, linearProgressClasses, Alert } from '@mui/material';
import { StyledChartContainer } from './styles';
import dayjs from 'dayjs';

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

export default function SimpleLineChart() {
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

        // Índice da coluna 'created_at'
        const createdAtIndex = headerMap['created_at']; // Índice da coluna 'created_at'

        // Agrupar dados por bimestre e ano
        const bimesters = {};

        rows.forEach(row => {
          const createdAt = row[createdAtIndex];
          const date = dayjs(createdAt);
          const year = date.year();
          const month = date.month() + 1; // dayjs usa 0-index para meses

          // Filtrar anos fora do intervalo de 2021 a 2024
          if (year < 2021 || year > 2024) {
            return;
          }

          const bimester = Math.ceil(month / 2); // Calcular bimestre
          const key = `${year}-B${bimester}`;

          if (!bimesters[key]) {
            bimesters[key] = 0;
          }
          bimesters[key]++;
        });

        // Preparar dados para o gráfico
        const xAxisData = Object.keys(bimesters).sort((a, b) => {
          const [yearA, bimesterA] = a.split('-B').map(Number);
          const [yearB, bimesterB] = b.split('-B').map(Number);

          if (yearA !== yearB) {
            return yearB - yearA; // Ordenar por ano, do maior para o menor
          }
          return bimesterB - bimesterA; // Ordenar por bimestre, do maior para o menor
        }).reverse(); // Reverter para a ordem correta

        const seriesData = xAxisData.map(key => bimesters[key]);

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
        setChartData({ xAxis: xAxisData, series: [{ data: seriesData, label: 'Cadastros Criados', color: '#1e90ff' }] });
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
        Cadastros Criados
      </Typography>
      <StyledChartContainer>
        {loading ? (
          <Box sx={{ width: '100%' }}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
        ) : chartData.xAxis.length > 0 && chartData.series.length > 0 ? (
          <LineChart
            className="line-chart"
            width={800}
            height={300}
            series={chartData.series}
            xAxis={[{ scaleType: 'point', data: chartData.xAxis }]}
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
