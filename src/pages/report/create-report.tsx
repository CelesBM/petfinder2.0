import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInState, reportPet, reportPetState } from "../../recoil";
import { ReportPet } from "../../components/reports/reports"; //import { ReportLostPetForm } from "../../components/forms";
import { useReportPet, useUserReports } from "../../hooks/hooks";

function CreateReportPage() {
  const navigate = useNavigate();
  const token = useRecoilValue(loggedInState);
  const reportState = useRecoilValue(reportPetState);
  const [report, setReport] = useRecoilState(reportPet);

  return <ReportPet />;
}

export { CreateReportPage };
