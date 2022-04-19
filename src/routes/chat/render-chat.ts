import { Response, Request, Router } from 'express';
import path from 'path';
import { isAuthenticated } from '../../middlewares/isAuthenticated';

const router = Router();

router.get('/', isAuthenticated, async (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname + '/../../public/chat.html'));
});

export { router as chatRouter };
