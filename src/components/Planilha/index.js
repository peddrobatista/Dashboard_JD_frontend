import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Box, CircularProgress, Typography, Alert } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';

// Estilo para a barra de progresso circular com rótulo
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

// Estilo para a tabela com linhas listradas
const EVEN_OPACITY = 0.3;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .MuiDataGrid-row:nth-of-type(even)`]: { // cor das linhas pares
    backgroundColor: alpha('#595959', EVEN_OPACITY),
    '&:hover': {
      backgroundColor: alpha('#757575', EVEN_OPACITY + theme.palette.action.hoverOpacity),
    },
    '&.Mui-selected': {
      backgroundColor: alpha('#424242', EVEN_OPACITY + theme.palette.action.selectedOpacity),
      '&:hover': {
        backgroundColor: alpha('#616161', EVEN_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      },
    },
  },
  [`& .MuiDataGrid-row:nth-of-type(odd)`]: { // cor das linhas ímpares
    backgroundColor: '#f5f6fa',
    '&:hover': {
      backgroundColor: '#e5e6ea',
    },
    '&.Mui-selected': {
      backgroundColor: '#d5d6da',
      '&:hover': {
        backgroundColor: '#c5c6ca',
      },
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#595959',
    color: '#fff',
    fontWeight: 'bold',
  },
}));

const customLocaleText = {
  toolbarColumns: 'Colunas',
  toolbarDensity: 'Densidade',
  toolbarExport: 'Exportar',
  toolbarFilters: 'Filtros',
  toolbarQuickFilterPlaceholder: 'Pesquisar...',
  toolbarExportCSV: 'Exportar como CSV',
  toolbarExportPrint: 'Imprimir',
  MuiTablePagination: {
    labelRowsPerPage: 'Linhas por página',
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`,
    first: 'Primeira',
    previous: 'Anterior',
    next: 'Próxima',
    last: 'Última',
  },
  filterPanelOperators: 'Operadores',
  filterPanelInputLabel: 'Valor',
  filterOperatorContains: 'contém',
  filterOperatorEquals: 'igual a',
  filterOperatorStartsWith: 'começa com',
  filterOperatorEndsWith: 'termina com',
  filterOperatorIsEmpty: 'está vazio',
  filterOperatorIsNotEmpty: 'não está vazio',
  filterOperatorIsAnyOf: 'é qualquer um de',
  toolbarDensityLabel: 'Densidade',
  toolbarDensityCompact: 'Compacta',
  toolbarDensityStandard: 'Padrão',
  toolbarDensityComfortable: 'Confortável',
};

const Planilha = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(10);
  const [dataAvailable, setDataAvailable] = useState(true); // Estado para verificar se há dados

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-dashboard-pied.vercel.app/rows');
        const data = response.data.values;
        
        if (data.length < 2) {
          setDataAvailable(false); // Se não houver dados suficientes
          setLoading(false);
          clearInterval(timer);
          return;
        }

        setRows(data.slice(1).map((row, index) => ({ id: index, ...row })));
        setColumns(data[0].map((header, index) => ({
          field: index.toString(),
          headerName: header,
          width: 150,
          headerAlign: 'center',
          align: 'center',
          headerClassName: 'theme-header'
        })));
        setLoading(false);
        setDataAvailable(true);
      } catch (error) {
        console.error('Erro ao buscar dados da planilha:', error);
        setLoading(false);
        setDataAvailable(false);
      }
    };

    fetchData();

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Paper sx={{
      width: '96%',
      margin: '20px auto',
      borderRadius: '10px',
      height: 700,
      position: 'relative',
      '& .theme-header': {
        backgroundColor: '#595959',
        color: '#fff',
        fontWeight: "bold"
      },
    }}>
      {loading ? (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <CircularProgressWithLabel value={progress} />
        </Box>
      ) : !dataAvailable ? (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%' }}>
          <Alert severity="error">Não há dados suficientes para exibir a planilha</Alert>
        </Box>
      ) : (
        <StripedDataGrid
          slots={{ toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[20, 30]}
          localeText={customLocaleText}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
      )}
    </Paper>
  );
};

export default Planilha;
