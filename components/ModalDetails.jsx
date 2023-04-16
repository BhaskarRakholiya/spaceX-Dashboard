import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";

import { Box, TableRow, TableCell, Container } from "@mui/material";
import { getWikiPost } from "../utils/apiDict";
import { getStatus } from "../utils/commonFunctions";
import StatusTag from "./StatusTag";
import Loader from "./Loader";

const DetailsContainer = styled.div`
  margin: 16px 0px;
`;

const Link = styled.a`
  color: blue;
`;

const FlexBox = styled.div`
  display: flex;
`;

const MissionDetails = styled.div``;

const Name = styled.div`
  margin: 8px;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  justify-content: space-between;
`;

const Model = styled.div`
  margin: 8px;
`;

const Links = styled.div`
  margin: 8px;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 20px;
  margin-left: ${({ margin }) => margin && margin};
`;

const Heading = styled.div``;

export default function ModalDetails({ launchModalDetails }) {
  const [wikiPost, setWikiPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCity = async (title) => {
    setLoading(true);
    try {
      const response = await axios.get(getWikiPost(title));
      const [{ extract }] = Object.values(response?.data?.query?.pages);
      setWikiPost(extract);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (loading) {
      let wikiLinkArray = launchModalDetails.links?.wikipedia?.split("/");
      let wikiLinkSearchKeyword = wikiLinkArray?.[wikiLinkArray?.length - 1];
      getCity(wikiLinkSearchKeyword);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <FlexBox>
        <img
          src={"https://images2.imgbox.com/40/e3/GypSkayF_o.png"}
          width={"100px"}
        />
        <MissionDetails>
          <Name>
            {launchModalDetails.mission_name}

            <StatusTag
              status={getStatus(launchModalDetails)}
              marginLeft={"20px"}
            />
          </Name>
          <Model>{launchModalDetails.rocket.rocket_name}</Model>

          <Links>
            {launchModalDetails.links?.wikipedia && (
              <a href={launchModalDetails.links?.wikipedia} target="_blank">
                <Icon src={"/icons/wiki.svg"} />
              </a>
            )}
            {launchModalDetails.links?.article_link && (
              <a href={launchModalDetails.links?.article_link} target="_blank">
                <Icon src={"/icons/nasa.svg"} margin={"8px"} />
              </a>
            )}
            {launchModalDetails.links?.video_link && (
              <a href={launchModalDetails.links?.video_link} target="_blank">
                <Icon src={"/icons/youtube.svg"} margin={"8px"} />
              </a>
            )}
          </Links>
        </MissionDetails>
      </FlexBox>
      <Box>
        {wikiPost && (
          <DetailsContainer>
            <div dangerouslySetInnerHTML={{ __html: wikiPost }} />
          </DetailsContainer>
        )}
        <DetailsRow
          heading={"Flight Number"}
          value={launchModalDetails.flight_number}
        />
        <DetailsRow
          heading={"Mission Name"}
          value={launchModalDetails.mission_name}
        />
        <DetailsRow
          heading={"Rocket Type"}
          value={launchModalDetails.rocket?.rocket_type}
        />
        <DetailsRow
          heading={"Rocket Name"}
          value={launchModalDetails.rocket?.rocket_name}
        />
        <DetailsRow
          heading={"ManuFacturer"}
          value={
            launchModalDetails.rocket?.second_stage?.payloads?.[0]?.manufacturer
          }
        />
        <DetailsRow
          heading={"Nationality"}
          value={
            launchModalDetails.rocket?.second_stage?.payloads?.[0]?.nationality
          }
        />
        <DetailsRow
          heading={"Launch Date"}
          value={DateTime.fromISO(launchModalDetails.launch_date_utc).toFormat(
            "ff"
          )}
        />

        <DetailsRow
          heading={"Payload Type"}
          value={
            launchModalDetails.rocket?.second_stage?.payloads?.[0]?.payload_type
          }
        />
        <DetailsRow
          heading={"Orbit"}
          value={launchModalDetails.rocket?.second_stage?.payloads?.[0]?.orbit}
        />
        <DetailsRow
          heading={"Launch Site"}
          value={launchModalDetails.launch_site?.site_name}
        />
      </Box>
    </Container>
  );
}

function DetailsRow({ heading, value }) {
  return (
    <Heading>
      <TableRow>
        <TableCell align="left" style={{ fontWeight: "600" }}>
          {heading}
        </TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    </Heading>
  );
}
