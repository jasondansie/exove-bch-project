import { Router } from "express";
const router = Router();
import {
  addResponse,
  getAllResponses,
  updateResponse,
  updateResponse,
  showStats,
  getSingleResponse,
  getSingleResponse,
} from "../controllers/responses";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";

router.route("/").get(authenticateUser, getAllResponses);
router.route("/stats").get(showStats);
router
  .route("/")
  .post(authenticateUser, addResponse)
  .get(authenticateUser, getAllResponses);
router.route("/stats").get(showStats);
router
  .route("/")
  .post(authenticateUser, addResponse)
  .get(authenticateUser, getAllResponses);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(authenticateUser, getSingleResponse)
  .patch(authenticateUser, updateResponse);
export default router;
