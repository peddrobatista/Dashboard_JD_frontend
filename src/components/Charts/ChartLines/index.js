import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography, Box, LinearProgress, styled, linearProgressClasses, Alert } from '@mui/material';
import { StyledChartContainer } from './styles';
import dayjs from 'dayjs';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function SimpleLineChart({ setInsightData, setTaxaData }) {
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

        if (data.length < 2) {
          setLoading(false);
          clearInterval(timer);
          return;
        }

        const rows = data.slice(1);

        const headers = data[0];
        const headerMap = {};
        headers.forEach((header, index) => {
          headerMap[header.toLowerCase()] = index;
        });

        const createdAtIndex = headerMap['created_at'];

        const bimesters = {};
        rows.forEach(row => {
          const createdAt = row[createdAtIndex];
          const date = dayjs(createdAt);
          const year = date.year();
          const month = date.month() + 1;

          if (year < 2021 || year > 2024) {
            return;
          }

          const bimester = Math.ceil(month / 2);
          const key = `${year}-B${bimester}`;

          if (!bimesters[key]) {
            bimesters[key] = 0;
          }
          bimesters[key]++;
        });

        const xAxisData = Object.keys(bimesters).sort((a, b) => {
          const [yearA, bimesterA] = a.split('-B').map(Number);
          const [yearB, bimesterB] = b.split('-B').map(Number);

          if (yearA !== yearB) {
            return yearB - yearA;
          }
          return bimesterB - bimesterA;
        }).reverse();

        const seriesData = xAxisData.map(key => bimesters[key]);

        let difference = 0;
        let isPositive = true;
        let taxa = 0;

        const currentBimesterKey = '2024-B3'; // 3º bimestre de 2024
        const previousBimesterKey = '2023-B3'; // 3º bimestre de 2023

        if (bimesters[previousBimesterKey] !== undefined && bimesters[currentBimesterKey] !== undefined) {
          const currentBimester = bimesters[currentBimesterKey];
          const previousBimester = bimesters[previousBimesterKey];

          difference = currentBimester - previousBimester;
          isPositive = difference >= 0;
          taxa = ((currentBimester - previousBimester) / previousBimester) * 100;
        } else {
          console.warn('Dados do 3º bimestre de 2023 ou do 3º bimestre de 2024 estão ausentes.');
        }

        setChartData({ xAxis: xAxisData, series: [{ data: seriesData, label: 'Cadastros Criados', color: '#1e90ff' }] });
        setInsightData({ difference: Math.abs(difference), isPositive });
        setTaxaData({ taxa: Math.abs(taxa), isPositive });
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
  }, [setInsightData, setTaxaData]);

  return (
    <>
      <Typography className='title' variant='h6' sx={{ fontWeight: 700, color: '#636e72', marginTop: '10px', textAlign: 'center' }}>
        Cadastros Criados
      </Typography>
      <StyledChartContainer>
        {loading ? (
          <Box sx={{ width: '70%', marginBottom: '60px' }} >
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
