import React, { useState } from "react";
import ButtonAppBar from "../AppBar";
import { Container } from "./styles";
import Footer from "../Footer";
import { Button } from "@mui/material";
import SimpleBarChart from "../Charts/ChartBar";
import ArcDesign from "../Charts/Gauge";
import Planilha from "../Planilha/index";
import ArcDesign1 from "../Charts/Gauge1";
import SimpleBarChart1 from "../Charts/ChartBar1"
import HorizontalBars from "../Charts/ChartBarHorizontal";
import ArcDesignPercents2 from "../Charts/Gauge2"; 
import BackToTopButton from "../ButtonTop/BacktoTop";
import CustomPieChart3 from "../Charts/EscolaPublica";
import DonutChart from "../Charts/Certificacao";
import DonutChart1 from "../Charts/Status";
import CustomPieChart from "../Charts/Genero";
import SimpleLineChart from "../Charts/ChartLines";
import InsightCadCriads from "../Insights/CadCriados";
import TaxaCadCriados from "../Insights/TaxaCadCriados";
const style = {
    background: "#0984e3", 
    '&:hover': {
        backgroundColor: "#0652DD",
    },
    borderRadius: '20px',
    padding: '10px 20px',
}

const Layout = () => {
    const [insightData, setInsightData] = useState({ difference: 0, isPositive: true });
    const [taxaData, setTaxaData] = useState({ taxa: 0, isPositive: true });
    return (
        <>
            <ButtonAppBar/>
            <Container>
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
                        <div className="gi">
                            <ArcDesign/>
                        </div>
                        <div className="gi">
                            <ArcDesign1/>
                        </div>
                        <div className="gi">
                            <ArcDesignPercents2/>
                        </div>
                    </div>
                    <div className="grid-item i1">
                    <div className="gi">
                            <SimpleLineChart setInsightData={setInsightData} setTaxaData={setTaxaData}/>
                        </div>
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
                        <div className="gi">
                            <CustomPieChart3/>
                        </div>
                        <div className="gi">
                            <DonutChart1/>
                        </div>
                        <div className="gi">
                            <DonutChart/>
                        </div>
                        <div className="gi">
                            <CustomPieChart/>
                        </div>
                        <div className="gi insights">
                            <InsightCadCriads insightData={insightData}/>
                        </div>
                        <div className="gi insights">
                            <TaxaCadCriados taxaData={taxaData}/>
                        </div>
                    </div>
                    <div className="grid-item i4">
                        <div className="gi">
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