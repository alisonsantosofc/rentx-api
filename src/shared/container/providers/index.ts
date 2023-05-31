import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DateProvider } from "./DateProvider/implementations/DateProvider";

container.registerSingleton<IDateProvider>("DateProvider", DateProvider);
