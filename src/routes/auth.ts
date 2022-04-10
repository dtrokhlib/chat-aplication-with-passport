import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.post(
  '/auth/signin/local',
  passport.authenticate('local'),
  async (req: Request, res: Response) => {
    try {
      res.send(req.user);
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

router.post('/auth/signup/local', async (req: Request, res: Response) => {
  try {
  } catch (err) {
    res.status(500).send({ err });
  }
});

export { router as authRouter };
