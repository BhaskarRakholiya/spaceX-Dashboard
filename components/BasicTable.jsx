import { useState } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import ModalDetails from "./ModalDetails";
import { getStatus } from "../utils/commonFunctions";
import StatusTag from "./StatusTag";
import Loader from "./Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  overflow: "auto",
};

const EmptyTable = styled.div`
  height: 70vh;
  text-align: center;
  width: 100%;
  padding: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function BasicTable({ launchDetails = [], loading }) {
  const [open, setOpen] = useState(false);
  const [selectedLaunchModal, setSelectedLaunchedModal] = useState({});
  const handleOpen = (launchModalDetails) => {
    setSelectedLaunchedModal(launchModalDetails);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedLaunchedModal({});
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No :</TableCell>
            <TableCell>Launched (UTC)</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Mission</TableCell>
            <TableCell>Orbit</TableCell>
            <TableCell>Launch Status</TableCell>
            <TableCell>Rocket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            launchDetails.map((launchDetail, index) => (
              <TableRow
                onClick={() => handleOpen(launchDetail)}
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {DateTime.fromISO(launchDetail.launch_date_utc).toFormat(
                    "ff"
                  )}
                </TableCell>
                <TableCell>{launchDetail.launch_site?.site_name}</TableCell>
                <TableCell>{launchDetail.mission_name}</TableCell>
                <TableCell>
                  {launchDetail.rocket.second_stage?.payloads[0].orbit}
                </TableCell>
                <TableCell>
                  <StatusTag status={getStatus(launchDetail)} />
                </TableCell>
                <TableCell>{launchDetail.rocket.rocket_name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!loading && !launchDetails.length && (
        <EmptyTable>no results Found </EmptyTable>
      )}
      {loading && (
        <EmptyTable>
          <Loader />
        </EmptyTable>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ModalDetails launchModalDetails={selectedLaunchModal} />
        </Box>
      </Modal>
    </TableContainer>
  );
}
