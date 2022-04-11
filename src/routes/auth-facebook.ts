import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/auth/signin/facebook',
  passport.authenticate('facebook'),
  async (req: Request, res: Response) => {
    res.redirect('/');
  }
);

export { router as authFacebookRouter };
