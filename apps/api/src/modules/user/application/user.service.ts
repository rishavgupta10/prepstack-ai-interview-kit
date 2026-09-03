import { AppError } from "../../../shared/errors/app-error";
import { UserRepository } from "../infrastructure/user.repository";

export class UserService {
  private userRepository = new UserRepository();

  async getUserProfile(id: string) {
    try {
      const userProfile = await this.userRepository.getUserProfile(id);
      return userProfile;
    } catch (error: any) {
      throw new AppError(error.message, 500);
    }
  }

  async updateUserProfile(id: string, payload: object) {
    try {
      const updatedRes = await this.userRepository.updateUserProfile(
        id,
        payload,
      );
      return updatedRes;
    } catch (error: any) {
      throw new AppError(error.message, 500);
    }
  }
}
