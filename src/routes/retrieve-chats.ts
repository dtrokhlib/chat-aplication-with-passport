import { Response, Request, Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { Chat } from '../models/chat.';
import { User } from '../models/user';

const router = Router();

router.get('/chats', isAuthenticated, async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findOne({ username: req.user.username });

  if (!user) {
    return res.status(401).send({ error: 'User not found' });
  }

  const chats = await Chat.find({ "participants.userId": user.id });

  res.send({ chats, user: user.id});
});

export { router as retrieveChatsRouter };
