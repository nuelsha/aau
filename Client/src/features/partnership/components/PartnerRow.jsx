import React from "react";
import { Trash2, Edit, Eye } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const PartnerRow = ({ partner, onDelete, onEdit }) => {
  const navigate = useNavigate();

  // Handle different data structures (old and new)
  const getName = () =>
    partner.partner_institution?.name || partner.name || "Unknown Partner";
  const getType = () =>
    partner.partner_institution?.typeOfOrganization || partner.type || "N/A";
  const getDuration = () =>
    partner.duration_of_partnership || partner.duration || "N/A";
  const getContactName = () =>
    partner.partner_contact_person?.name || partner.contact || "N/A";
  const getCollegeName = () =>
    partner.aau_contact?.interestedCollegeOrDepartment ||
    partner.college ||
    "N/A";
  const getLogoUrl = () =>
    partner.partner_institution?.logoUrl || partner.logo || "/placeholder.svg";

  return (
    <div className="grid grid-cols-7 gap-4 p-4 border-b border-[#D9D9D9] items-center text-sm hover:bg-gray-50 transition-colors duration-150">
      <div className="flex justify-center">
        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
          <img
            src={getLogoUrl()}
            alt={getName()}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/placeholder.svg";
            }}
          />
        </div>
      </div>

      <div className="font-medium text-[#004165] cursor-pointer">
        <button onClick={() => navigate(`/partnership/${partner.id}`)}>
          {getName()}
        </button>
      </div>
      <div>{getType()}</div>
      <div>{getDuration()}</div>
      <div>{getContactName()}</div>
      <div>
        <StatusBadge status={partner.status} />
      </div>

      <div className="flex gap-2">
        <button
          className="p-1 text-gray-500 hover:text-red-500 transition-colors"
          onClick={() => onDelete(partner.id)}
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button
          className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
          onClick={() => onEdit(partner.id)}
          title="Edit"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          className="p-1 text-gray-500 hover:text-green-500 transition-colors"
          onClick={() => navigate(`/partnership/${partner.id}`)}
          title="View"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PartnerRow;
