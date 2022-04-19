import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/auth/signin/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
  async (req: Request, res: Response) => {
    res.redirect('/');
  }
);

export { router as authGoogleRouter };
