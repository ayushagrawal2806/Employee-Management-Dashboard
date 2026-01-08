import { setupWorker } from "msw/browser";
import { employeeHandlers } from "./employee.handlers";

export const worker = setupWorker(...employeeHandlers);
