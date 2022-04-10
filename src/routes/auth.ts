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

router.post(
  '/auth/signup/local',
  passport.authenticate('local-signup', {}),
  async (req: Request, res: Response) => {
    try {
      res.send(req.user);
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

router.get('/auth/login/check', async (req: Request, res: Response) => {
  try {
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.send({ message: 'Not Authorized' });
    }
  } catch (err) {
    res.send({ err });
  }
});

export { router as authRouter };
