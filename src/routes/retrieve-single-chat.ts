import { Response, Request, Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { Chat } from '../models/chat.';
import { User } from '../models/user';

const router = Router();

router.get(
  '/chat/:id/view',
  isAuthenticated,
  async (req: Request, res: Response) => {
    const chat = await Chat.findById(req.params.id);
    res.send(chat);
  }
);

export { router as chatViewRouter };
