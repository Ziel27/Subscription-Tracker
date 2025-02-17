import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getUsers);

subscriptionRouter.get("/:id", getUser);

subscriptionRouter.post("/", (req, res) => res.send({ title: "CREATE subscription" }));

subscriptionRouter.put("/", (req, res) => res.send({ title: "UPDATE subscription" }));

subscriptionRouter.delete("/", (req, res) => res.send({ title: "DELETE subscriptions" }));

subscriptionRouter.get("/user/:id", (req, res) => res.send({ title: "GET all user subscriptions" }));

subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "CANCEL subscription" }));

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "GET upcoming renewals" }));


export default subscriptionRouter;
