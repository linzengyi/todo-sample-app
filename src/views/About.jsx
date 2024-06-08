
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid, Paper, Typography } from '@mui/material';

export default function About() {
  
  const columnStyle = {
    width: '28%', 
    fontSize: '1.25rem', 
    lineHeight: '1.75rem', 
    padding: '10px'
  };

  const columnStyle2 = {
    fontSize: '1.125rem', 
    lineHeight: '1.75rem', 
    padding: '10px'
  };

  return (
    <>
      <Container sx={{ height: '90%', paddingTop: '25px' }}>
        <Box component="div" className="w-full h-12 bg-gray-200">
          <h1 className="p-2 font-bold text-2xl text-gray-600">About</h1>
        </Box>
        <Box
          component="div"
          className="bg-white border border-slate-400 shadow-md h-full p-5"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                className="pl-2"
              >
                前端開發技術
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 520 }} aria-label="simple table">
                  <TableHead className="bg-blue-400">
                    <TableRow>
                      <TableCell align="center" className="border" style={columnStyle}>項目</TableCell>
                      <TableCell align="left" className="border" style={{...columnStyle, width: '72%'}}>內容</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" align="center" className="border" style={columnStyle2}>
                          JS框架:
                        </TableCell>
                        <TableCell align="left" className="border" style={columnStyle2}>react + vite</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" align="center" className="border" style={columnStyle2}>
                          CSS框架:
                        </TableCell>
                        <TableCell align="left" className="border" style={columnStyle2}>Tailwind CSS</TableCell >
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" align="center" className="border" style={columnStyle2}>
                          UI框架:
                        </TableCell>
                        <TableCell align="left" className="border" style={columnStyle2}>Material UI</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                className="pl-2"
              >
                後端開發技術
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 520 }} aria-label="simple table">
                <TableHead className="bg-blue-400">
                    <TableRow>
                      <TableCell align="center" className="border" style={columnStyle}>項目</TableCell>
                      <TableCell align="left" className="border" style={{ ...columnStyle, width: '72%'}}>內容</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" align="center" className="border" style={columnStyle2}>
                          程式語言(框架):
                        </TableCell>
                        <TableCell align="left" className="border" style={columnStyle2}>Nodejs(Express)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" align="center" className="border" style={columnStyle2}>
                          資料庫:
                        </TableCell>
                        <TableCell align="left" className="border" style={columnStyle2}>PostgreSQL</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
