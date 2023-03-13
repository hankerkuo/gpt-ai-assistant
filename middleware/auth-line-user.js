import Event from "../app/models/event.js";
import Context from "../app/context.js";
import { logger } from "../utils/index.js";
import { hasTrialPrivilege } from "../db/service/user-service.js";
import { replyMessage } from "../utils/index.js";

const authLineUser = async (req, res, next) => {
  const event = new Event(req.body.events[0]);
  const context = new Context(event);
  const userId = context.userId;
  logger.info("Line user id access: " + userId);
  if (!await hasTrialPrivilege(userId)) {
    //TODO: add 10 prompts trial every day
    logger.info(`Line user: ${userId}, does not have trial privilege`);
    replyMessage({
      replyToken: context.replyToken,
      messages: [
        { type: "text", text: "You do not have trial privilege, please register first!" },
      ],
    });
    res.status(403).send("Line user does not have trial privilege");
    return;
  }
  next();
};

export default authLineUser;
