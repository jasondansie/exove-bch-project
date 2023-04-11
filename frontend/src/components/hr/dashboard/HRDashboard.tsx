import React from "react";
import { useAppSelector } from "../../../../src/redux/hooks/hooks";
import classes from "./HRDashboard.module.css";
import PageHeading from "../../pageHeading/PageHeading";
import SurveySummaryChart from "./SurveySummaryChart";
import ProgressBar from "./ProgressBar";
import DBUsers from "./DBUsers";
import DBSurveyList from "./DBSurveyList";

const HRDashboard = () => {
  const employeesList = useAppSelector((state) => state.employees.employees);

  console.log(employeesList);

  return (
    <div>
      <div>
        <div>
          <PageHeading pageTitle="DashBoard" />{" "}
        </div>
        <div className={classes.dashboard_container}>
          <div className={classes.dashboard_chart}>
            <h2>Survey Summary</h2>
            <SurveySummaryChart />
          </div>{" "}
          <div className={classes.dashboard_gap}></div>
          <div className={classes.dashboard_progress}>
            <h2>Survey Progress</h2>
            <ProgressBar />
          </div>
          <div className={classes.dashboard_surList}>
            <h2>List of Surveys</h2> <DBSurveyList />
          </div>{" "}
          <div className={classes.dashboard_emplList}>
            <h2>Employees</h2>

            <DBUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;