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

const MostStaredChart = ({ data }) => {
  useEffect(() => {
    if (data.length === 0) return;
    const ctx = document.getElementById("mostStartRepoChart");
    new Chart(ctx, {
      type: "bar",
      responsive: true,
      maintainAspectRatio: false,
      data: {
        labels: data.map((r) => r.label),
        datasets: [
          {
            data: data.map((r) => r.value),
            backgroundColor: data.map((r) => r.color),
            borderWidth: 2,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontFamily: fonts.inter,
                fontSize: 12,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontFamily: fonts.inter,
                fontSize: 12,
              },
            },
          ],
        },
      },
    });
  }, [data]);

  return (
    <Container>
      <Heading>Most Starred</Heading>
      {data.length === 0 ? (
        <p>No data to show here.</p>
      ) : (
        <canvas id="mostStartRepoChart" width={300} height={300}></canvas>
      )}
    </Container>
  );
};

export default MostStaredChart;
