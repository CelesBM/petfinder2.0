import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInState, reportPet, reportPetState } from "../../recoil";
import { MyReports } from "../../components/reports/reports"; //import { ReportLostPetForm } from "../../components/forms";
import { useReportPet, useUserReports } from "../../hooks/hooks";

function MyReportsPage() {
  const { handleUpdateUserReports } = useUserReports();
  const token = useRecoilValue(loggedInState);

  useEffect(() => {
    if (token) {
      handleUpdateUserReports(token);
    }
  }, [token]);
  return <MyReports />;
}

export { MyReportsPage };
