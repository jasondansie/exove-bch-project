import { Router } from "express";
const router = Router();

import {
  createSurveyPack,
  getSurveyPack,
  updateSurveyPack,
  deleteSurveyPack,
  getSurveyors,
  updateSurveyors,
  getManagerApproval,
  updateManagerApproval,
} from "../controllers/surveyPack";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";

router
  .route("/")
  .post(authenticateUser, authorizePermissions("hr"), createSurveyPack);
router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("hr"), getSurveyPack)
  .patch(authenticateUser, authorizePermissions("hr"), updateSurveyPack)
  .delete(authenticateUser, authorizePermissions("hr"), deleteSurveyPack);
//router.route("/employee/:id").patch(updateSurveyPack);
//router.route("/manager/:id").patch(updateSurveyPack);

router
  .route("/surveyors/:id")
  .get(authenticateUser, getSurveyors)
  .patch(authenticateUser, updateSurveyors);
router
  .route("/manager/:id")
  .get(
    authenticateUser,
    authorizePermissions("hr", "manager"),
    getManagerApproval
  )
  .patch(
    authenticateUser,
    authorizePermissions("hr", "manager"),
    updateManagerApproval
  );

export default router;
