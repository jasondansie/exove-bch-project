import React, { useEffect, useState } from "react";
import { UserRole } from "../../../enum";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import PageHeading from "../../pageHeading/PageHeading";
import classes from "./SelectSurvey.module.css";
import { InputGroup, Table } from "react-bootstrap";
import Button from "../../shared/button/Button";
import { ISurvey } from "../../../types/dataTypes";
import { RootState } from "../../../app/store";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";
import { setSurvey } from "../../../features/survey/surveyPackSlice";

const SelectSurvey = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");

  const surveys: ISurvey[] = useAppSelector(
    (state: RootState) => state.surveys.surveys
  );

  useEffect(() => {
    dispatch(initialiseSurveys());
  }, [dispatch]);

  const [selectedSurvey, setSelectedSurvey] = useState<ISurvey | null>(null);

  const handleSelect = (survey: ISurvey) => {
    setSelectedSurvey(survey);
  };

  console.log(selectedSurvey);

  useEffect(() => {
    if (selectedSurvey) {
      dispatch(setSurvey(selectedSurvey._id));
    }
  }, [dispatch, selectedSurvey]);

  if (role === UserRole.HR) {
    return (
      <div className={classes.surveys_container}>
        <PageHeading pageTitle="Survey forms" />
        <div className={classes.top}>
          <div className={classes.maincontent}>
            <div className={classes.actions}></div>
            <div className={classes.table_container}>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Survey ID</th>
                    <th>Survey Name</th>
                    <th>Description</th>
                    <th>Questions</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey: ISurvey) => (
                    <tr key={survey._id}>
                      <td>{survey._id}</td>
                      <td>{survey.surveyName}</td>
                      <td>{survey.description}</td>
                      <td>
                        <ul>
                          {survey.questions.map((question) => (
                            <li key={question._id}>{question.question}</li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <InputGroup>
                          <InputGroup.Radio
                            aria-label="Radio button for following text input"
                            type="radio"
                            name="survey"
                            value={survey}
                            checked={selectedSurvey?._id === survey._id}
                            onChange={() => handleSelect(survey)}
                          />
                        </InputGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SelectSurvey;