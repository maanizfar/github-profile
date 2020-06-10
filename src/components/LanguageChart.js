import React, { useEffect } from "react";
import { defaultTheme } from "../styles/theme";
import Chart from "chart.js";
import styled from "styled-components";
const { colors, fonts } = defaultTheme;

const Container = styled.div`
  max-width: 300px;
  padding: 32px;
  box-shadow: rgba(0, 0, 0, 1) 0px 10px 30px -15px;
  border-radius: 0.25rem;
  background-color: ${colors.white};

  @media (max-width: 600px) {
    padding: 2rem 1rem;
  }
`;

const Heading = styled.h1`
  margin-bottom: 64px;
`;

const LanguageChart = ({ data }) => {
  useEffect(() => {
    if (data.length === 0) return;
    const ctx = document.getElementById("langChart");
    new Chart(ctx, {
      type: "pie",
      responsive: true,
      maintainAspectRatio: false,
      data: {
        labels: data.map((l) => l.label),
        datasets: [
          {
            data: data.map((l) => l.value),
            backgroundColor: data.map((l) => l.color),
            borderWidth: 2,
          },
        ],
      },
      options: {
        legend: {
          position: "right",
          align: "start",
          labels: {
            fontFamily: fonts.inter,
          },
        },
      },
    });
  }, [data]);

  return (
    <Container>
      <header>
        <Heading>Language</Heading>
      </header>
      {data.length === 0 ? (
        <p>No data to show here.</p>
      ) : (
        <canvas id="langChart" width={300} height={300}></canvas>
      )}
    </Container>
  );
};

export default LanguageChart;
