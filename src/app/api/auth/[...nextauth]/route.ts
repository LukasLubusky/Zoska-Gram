// src/pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import { authOptions } from "./authOptions";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };