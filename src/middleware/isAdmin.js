import jwt from 'jsonwebtoken';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import { Admin } from '../../models/Admin';

const isAdminLoggedIn: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      let decoded: any = jwt.verify(bearerHeader, 'check regularly');
      if (decoded.userType === 'admin') {
        const foundAdmin = await Admin.findById(decoded.user.id);

        if (!foundAdmin) {
          return res.status(400).json({
            success: false,
            message: 'Failed to authenticate token',
          });
        }

        next();
      } else {
        res.status(400).json({
          success: false,
          message: 'token does not have access right',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to authenticate token',
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export default isAdminLoggedIn;
