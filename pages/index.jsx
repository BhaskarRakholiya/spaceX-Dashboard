import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";

import BasicTable from "../components/BasicTable";
import Filter from "../components/Filter";

import { getLaunchApi } from "../utils/apiDict";
import { getFilteredListItem } from "../utils/commonFunctions";
import { SELECT_OPTIONS } from "../utils/constants";

const Container = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 24px;
`;

export default function Home() {
  const router = useRouter();
  const [launchDetails, setLaunchDetails] = useState({ filtered: [], all: [] });
  const [loading, setLoading] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState("");

  const handleChangeSelect = (selectedValue) => {
    setSelectedLaunch(selectedValue);
    setLaunchDetails({
      ...launchDetails,
      filtered: getFilteredListItem(launchDetails.all, selectedValue),
    });
    router.push(`?selectedValue=${selectedValue}`);
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    } else {
      const filterValue = router.query?.selectedValue || SELECT_OPTIONS.ALL;
      setSelectedLaunch(filterValue);
      setLoading(true);
      axios.get(getLaunchApi).then((response) => {
        setLaunchDetails({
          filtered: getFilteredListItem(response.data, filterValue),
          all: response.data,
        });
      });
      setLoading(false);
    }
  }, [router.isReady]);

  return (
    <Container>
      <ImageContainer>
        <img src="/header.png"></img>
      </ImageContainer>
      <HeaderContainer>
        <Filter
          selectedItem={selectedLaunch}
          handleChange={handleChangeSelect}
        />
      </HeaderContainer>
      <BasicTable launchDetails={launchDetails.filtered} loading={loading} />
    </Container>
  );
}
