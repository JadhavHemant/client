import CrmWorkspace from "../components/CrmWorkspace";
import { opportunityService } from "../services/entityServices";
import {
  loadAccountOptions,
  loadCategoryOptions,
  loadCompanyOptions,
  loadContactOptions,
  loadIndustryOptions,
  loadLeadSourceOptions,
  loadSalesStageOptions,
  loadUserOptions,
} from "../services/optionsService";

const OpportunitiesPage = () => (
  <CrmWorkspace
    title="Opportunities"
    description="Manage active opportunities with sales stage, budget, and ownership."
    service={opportunityService}
    primaryField="OpportunityName"
    searchPlaceholder="Search opportunities"
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
      { name: "assignedTo", label: "Assigned to", type: "select", loadOptions: loadUserOptions },
      { name: "createdBy", label: "Created by", type: "select", loadOptions: loadUserOptions },
      { name: "salesStageId", label: "Sales stage", type: "select", loadOptions: loadSalesStageOptions },
      { name: "leadSourceId", label: "Lead source", type: "select", loadOptions: loadLeadSourceOptions },
    ]}
    fields={[
      { name: "CompanyId", label: "Company", type: "select", loadOptions: loadCompanyOptions },
      { name: "AccountId", label: "Account", type: "select", loadOptions: loadAccountOptions, displayKey: "AccountName" },
      { name: "ContactId", label: "Contact", type: "select", loadOptions: loadContactOptions },
      { name: "OpportunityName", label: "Opportunity name", placeholder: "Q3 renewal" },
      {
        name: "SalesStageId",
        label: "Sales stage",
        type: "select",
        loadOptions: loadSalesStageOptions,
        displayKey: "SalesStageName",
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
      { name: "IndustryId", label: "Industry", type: "select", loadOptions: loadIndustryOptions, displayKey: "IndustryName" },
      { name: "BudgetAmount", label: "Budget amount", type: "number", placeholder: "250000" },
      { name: "EstCloseDate", label: "Estimated close date", type: "date" },
      { name: "Description", label: "Description", type: "textarea" },
      { name: "QualificationComments", label: "Qualification comments", type: "textarea" },
      { name: "DetailedSummary", label: "Detailed summary", type: "textarea" },
      { name: "AssignedTo", label: "Assigned to", type: "select", loadOptions: loadUserOptions, displayKey: "AssignedToName" },
      {
        name: "AssignedFrom",
        label: "Assigned from",
        type: "select",
        loadOptions: loadUserOptions,
      },
      { name: "CreatedBy", label: "Created by", type: "select", loadOptions: loadUserOptions },
      { name: "IsActive", label: "Active", type: "checkbox", defaultValue: true },
      { name: "IsDeleted", label: "Deleted", type: "checkbox", defaultValue: false },
      { name: "Flag", label: "Flagged", type: "checkbox", defaultValue: false },
    ]}
  />
);

export default OpportunitiesPage;
