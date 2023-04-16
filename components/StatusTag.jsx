import React from "react";
import styled from "styled-components";
import { STATUS } from "../utils/constants";

const Container = styled.div`
  border-radius: 12px;
  background-color: ${({ theme, status }) =>
    status === STATUS.UPCOMING
      ? theme.backgroundColors.upcoming
      : status === STATUS.SUCCESSFUL
      ? theme.backgroundColors.successful
      : theme.backgroundColors.failed};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  padding: 8px;
  height: 30px;
  margin-left: ${({ marginLeft }) => marginLeft && marginLeft};
`;

const Text = styled.span`
  color: ${({ theme, status }) =>
    status === STATUS.UPCOMING
      ? theme.colors.upcoming
      : status === STATUS.SUCCESSFUL
      ? theme.colors.successful
      : theme.colors.failed};
`;

export default function StatusTag({ status, marginLeft }) {
  return (
    <Container status={status} marginLeft={marginLeft}>
      <Text status={status}>{status}</Text>
    </Container>
  );
}
