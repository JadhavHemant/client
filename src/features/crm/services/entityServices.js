import { CRM_ENDPOINTS } from "../config/endpoints";
import { createCrudService } from "./crmApi";

export const accountService = createCrudService(CRM_ENDPOINTS.accounts);
export const contactService = createCrudService(CRM_ENDPOINTS.contacts);
export const leadService = createCrudService(CRM_ENDPOINTS.leads);
export const opportunityService = createCrudService(CRM_ENDPOINTS.opportunities);
export const presalesService = createCrudService(CRM_ENDPOINTS.presales);
export const caseService = createCrudService(CRM_ENDPOINTS.cases);
