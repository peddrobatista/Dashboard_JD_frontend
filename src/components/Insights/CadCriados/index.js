import React from 'react';
import Box from '@mui/material/Box';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const InsightCadCriads = ({ insightData }) => {
  const { difference, isPositive } = insightData;

  return (
    <Box>
      <Paper elevation={2} sx={{ borderRadius: '8px', padding: '10px', marginBottom: '20px' }}>
        <Box flexGrow={1}>
          <Typography sx={{ fontWeight: 700, color: '#636e72' }} gutterBottom>Insights</Typography>
          <Typography variant='h6' sx={{ fontWeight: '800', color: '#636e72' }}>Cadastros Criados</Typography>
          <Divider />
          <Stack direction='row' alignItems={'center'} justifyContent={'start'}>
            <Typography sx={{ fontSize: '40px', fontWeight: '800', color: isPositive ? '#2ed573' : '#ff4757' }}>
              {isPositive ? '+' : '-'} {difference}
            </Typography>
            {isPositive ? (
              <TrendingUpIcon sx={{ fontSize: 80, color: '#2ed573' }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 80, color: '#ff4757' }} />
            )}
            <Typography sx={{ fontWeight: '600', color: '#636e72' }}>/12 meses</Typography>
          </Stack>
          <Typography sx={{ fontWeight: '600', color: '#636e72' }}>
            Diferença entre o 3º bimestre de 2023 e o 3º bimestre de 2024
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default InsightCadCriads;
