import { UserRepository, UserAttributeRepository } from "./user/userRepository.ts"
import { UserService } from "./user/userService.ts"
import { Injector, Singleton, Transient } from "https://deno.land/x/deninject/mod.ts";
import { ImageRepository } from "./image/imageRepository.ts"

class AppModule {
    userService: UserService;
    imageService: ImageService;

}

export default new AppModule();
