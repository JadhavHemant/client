import CrmWorkspace from "../components/CrmWorkspace";
import { leadService } from "../services/entityServices";
import {
  loadAccountOptions,
  loadCategoryOptions,
  loadCompanyOptions,
  loadContactOptions,
  loadFollowupTypeOptions,
  loadIndustryOptions,
  loadLeadSourceOptions,
  loadUserOptions,
} from "../services/optionsService";

const LeadsPage = () => (
  <CrmWorkspace
    title="Leads"
    description="Capture incoming CRM leads and track who owns the next action."
    service={leadService}
    primaryField="Status"
    searchPlaceholder="Search leads"
    filters={[
      {
        name: "isActive",
        label: "Active",
        type: "select",
        options: [
          { value: "true", label: "Active" },
          { value: "false", label: "Inactive" },
        ],
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "New", label: "New" },
          { value: "Qualified", label: "Qualified" },
          { value: "Disqualified", label: "Disqualified" },
        ],
      },
      { name: "assignedTo", label: "Assigned to", type: "select", loadOptions: loadUserOptions },
      { name: "createdBy", label: "Created by", type: "select", loadOptions: loadUserOptions },
      { name: "leadSourceId", label: "Lead source", type: "select", loadOptions: loadLeadSourceOptions },
    ]}
    rowActions={[
      {
        label: "Qualify",
        tone: "success",
        isVisible: (row) => row.Status !== "Qualified",
        confirmMessage: () => "Mark this lead as qualified?",
        getPayload: () => ({ Status: "Qualified" }),
        successMessage: "Lead qualified",
      },
      {
        label: "Disqualify",
        tone: "danger",
        isVisible: (row) => row.Status !== "Disqualified",
        confirmMessage: () => "Mark this lead as disqualified?",
        getPayload: () => ({ Status: "Disqualified" }),
        successMessage: "Lead disqualified",
      },
    ]}
    fields={[
      { name: "CompanyId", label: "Company", type: "select", loadOptions: loadCompanyOptions, required: true },
      { name: "AccountId", label: "Account", type: "select", loadOptions: loadAccountOptions, displayKey: "AccountName" },
      { name: "ContactId", label: "Contact", type: "select", loadOptions: loadContactOptions, displayKey: "ContactName" },
      {
        name: "AutoAccountName",
        label: "New account name",
        placeholder: "Create account automatically if none selected",
        createOnly: true,
        tableHidden: true,
      },
      {
        name: "AutoContactFirstName",
        label: "New contact first name",
        placeholder: "Create contact automatically if none selected",
        createOnly: true,
        tableHidden: true,
      },
      {
        name: "AutoContactLastName",
        label: "New contact last name",
        placeholder: "Doe",
        createOnly: true,
        tableHidden: true,
      },
      {
        name: "AutoContactEmail",
        label: "New contact email",
        type: "email",
        placeholder: "contact@company.com",
        createOnly: true,
        tableHidden: true,
      },
      {
        name: "AutoContactPhone",
        label: "New contact phone",
        placeholder: "+1 555 0101",
        createOnly: true,
        tableHidden: true,
      },
      {
        name: "LeadSourceId",
        label: "Lead source",
        type: "select",
        loadOptions: loadLeadSourceOptions,
        displayKey: "LeadSourceName",
      },
      {
        name: "ProductCategoryId",
        label: "Product category",
        type: "select",
        loadOptions: loadCategoryOptions,
      },
      {
        name: "FollowupTypeId",
        label: "Follow-up type",
        type: "select",
        loadOptions: loadFollowupTypeOptions,
        displayKey: "FollowupTypeName",
      },
      { name: "IndustryId", label: "Industry", type: "select", loadOptions: loadIndustryOptions, displayKey: "IndustryName" },
      { name: "Status", label: "Status", placeholder: "New", required: true },
      { name: "Rating", label: "Rating", type: "number", placeholder: "4" },
      { name: "Description", label: "Description", type: "textarea" },
      { name: "Comments", label: "Comments", type: "textarea" },
      { name: "AssignedTo", label: "Assigned to", type: "select", loadOptions: loadUserOptions, displayKey: "AssignedToName" },
      {
        name: "AssignedFrom",
        label: "Assigned from",
        type: "select",
        loadOptions: loadUserOptions,
      },
      { name: "IsActive", label: "Active", type: "checkbox", defaultValue: true },
      { name: "IsDeleted", label: "Deleted", type: "checkbox", defaultValue: false },
      { name: "Flag", label: "Flagged", type: "checkbox", defaultValue: false },
    ]}
  />
);

export default LeadsPage;
