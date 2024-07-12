import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { StyledChartContainer } from './styles';
import { Typography } from '@mui/material';

export default function HorizontalBars() {
  const [chartData, setChartData] = useState({ yAxis: [], series: [] });

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
          return;
        }

        // Define o estado com os dados formatados para o gráfico
        setChartData({ yAxis: yAxisData, series: [{ data: seriesData, label: 'Cadastrados', color: '#1e90ff' }] });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography className='title' variant='h6' sx={{ fontWeight: 700, color: '#636e72', marginTop: '10px', textAlign: 'center' }}>Escolaridade</Typography>
      <StyledChartContainer>
        {chartData.yAxis.length > 0 && chartData.series.length > 0 ? (
          <BarChart
            yAxis={[{ scaleType: 'band', data: chartData.yAxis }]}
            xAxis={[{ label: 'cadastrados' }]}
            series={chartData.series}
            layout="horizontal"
            width={800}
            height={400}
            grid={{ vertical: true }}
            sx={{padding: '0px 0px 40px 40px'}}
          />
        ) : (
          <div>Carregando...</div>
        )}
      </StyledChartContainer>
    </>
  );
}
