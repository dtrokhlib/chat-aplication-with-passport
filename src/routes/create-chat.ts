import { Response, Request, Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { Chat } from '../models/chat.';
import { chatRole } from '../models/types/chat-role';
import { chatType } from '../models/types/chat-type';
import { User } from '../models/user';
const router = Router();

router.post('/chat', isAuthenticated, async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findOne({ username: req.user.username });

  if (!user) {
    return res.status(401).send({ error: 'User not found' });
  }

  const chat = Chat.build({
    name: req.body.name,
    participants: [{ userId: user.id, role: chatRole.owner }],
    type: req.body.chatType == 'private' ? chatType.private : chatType.public,
    isDeleted: false,
  });

  await chat.save();

  res.send(chat);
});

export { router as createChatRouter };
