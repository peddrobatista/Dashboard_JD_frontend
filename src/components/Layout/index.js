import React from "react";
import ButtonAppBar from "../AppBar";
import { Container } from "./styles";
import Footer from "../Footer";
import { Button } from "@mui/material";
import SimpleBarChart from "../Charts/ChartBar";
import ChartPie from "../Charts/ChartPie";
import ChartPie3 from "../Charts/ChartPie3";
import ArcDesign from "../Charts/Gauge";
import Planilha from "../Planilha/index";
import ArcDesign1 from "../Charts/Gauge1";
import SimpleBarChart1 from "../Charts/ChartBar1";
import DonutChart from "../Charts/ChartDonut";
import HorizontalBars from "../Charts/ChartBarHorizontal";
import DonutChart1 from "../Charts/ChartDonut1";
import ArcDesignPercents2 from "../Charts/Gauge2"; 
import BackToTopButton from "../ButtonTop/BacktoTop";
const style = {
    background: "#0984e3", 
    '&:hover': {
        backgroundColor: "#0652DD",
    },
    borderRadius: '20px',
    padding: '10px 20px',
}

const Layout = () => {
    return (
        <>
            <ButtonAppBar/>
            <Container >
                <div className="title">
                    <h2>Estatísticas</h2>
                </div>
                <menu>
                    <ul>
                        <li><Button sx={style} variant="contained">Voltar</Button></li>
                        <li><Button sx={style} variant="contained">Adicionar Planilha</Button></li>
                    </ul>
                </menu>
                <div className="grid-container">
                    <div className="grid-item i3">
                        <div class="gi">
                            <ArcDesign/>
                        </div>
                        <div class="gi">
                            <ArcDesign1/>
                        </div>
                        <div class="gi">
                            <ArcDesignPercents2/>
                        </div>
                    </div>
                    <div className="grid-item i1">
                        <div className="gi">
                            <SimpleBarChart1/>
                        </div>
                        <div className="gi">
                            <SimpleBarChart/>
                        </div>
                        <div className="gi">
                            <HorizontalBars/>
                        </div>
                    </div>
                    <div className="grid-item i2">
                        <div class="gi">
                            <ChartPie3/>
                        </div>
                        <div class="gi">
                            <DonutChart1/>
                        </div>
                        <div class="gi">
                            <DonutChart/>
                        </div>
                        <div class="gi">
                            <ChartPie/>
                        </div>
                    </div>
                    <div className="grid-item i4">
                        <div class="gi">
                            <Planilha/>
                        </div>
                    </div>
                </div>
            </Container>
            <BackToTopButton/>
            <Footer/>
        </>   
    );
}

export default Layout;