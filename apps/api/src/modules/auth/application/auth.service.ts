import bcrypt from "bcryptjs";
import { generateToken } from "../../../shared/utils/jwt";
import { UserRepository } from "../../user/infrastructure/user.repository";
import { LoginDto, RegisterDto } from "../domain/auth.types";
import { AppError } from "../../../shared/errors/app-error";
import googleProvider from "../providers/google.provider";
import { GoogleLoginDto } from "../domain/google-login.dto";

export class AuthService {
  private userRepository = new UserRepository();

  async register(data: RegisterDto) {
    try {
      const { name, email, password } = data;

      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new AppError("User already exists", 409);
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      // Generate a token
      const token = generateToken(user.id, user.name, user.email);

      return { user, token };
    } catch (error: any) {
      throw new AppError(error.message, 500);
    }
  }

  async login(data: LoginDto) {
    try {
      const { email, password } = data;

      // Find the user by email
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new AppError("User not found", 404);
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 400);
      }
      // Generate a token
      const token = generateToken(user.id, user.name, user.email);
      return { user, token };
    } catch (error: any) {
      throw new AppError(error.message, 500);
    }
  }

  async googleLogin(credential: string) {
    const googleUser = await googleProvider.verifyIdToken(credential);

    let user = await this.userRepository.findByGoogleId(googleUser.googleId);

    if (!googleUser.email) {
      throw new Error("Google account does not have an email");
    }

    if (!googleUser.name) {
      throw new Error("Google account does not have a name");
    }
    if (!googleUser.picture) {
      throw new Error("Google account does not have a name");
    }

    if (!user) {
      user = await this.userRepository.findByEmail(googleUser.email);
    }

    if (user) {
      // Existing local account → link Google
      if (!user.googleId) {
        user = await this.userRepository.updateUserProfile(user.id, {
          googleId: googleUser.googleId,
          avatar: googleUser.picture,
        });
      }
    } else {
      // Completely new user
      user = await this.userRepository.create({
        email: googleUser.email,
        name: googleUser.name,
        googleId: googleUser.googleId,
        avatar: googleUser.picture,
        authProvider: "google",
      });
    }

    if (!user) {
      throw new Error(
        "Error in Login try again later or report the issue on support page",
      );
    }

    // Generate a token
    const token = generateToken(user.id, user.name, user.email);
    return { user, token };
  }
}
