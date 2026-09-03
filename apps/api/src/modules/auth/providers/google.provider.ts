import { OAuth2Client } from "google-auth-library";
import { env } from "../../../config/env";

const client = new OAuth2Client();

 class GoogleProvider {
  async verifyIdToken(idToken: string) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) throw new Error("Invalid Google token");

    return {
        googleId:payload.sub,
        email:payload.email,
        name:payload.name,
        picture:payload.picture,
        emailVerified:payload.email_verified
    }
  }
}


const googleProvider = new GoogleProvider()

export default googleProvider