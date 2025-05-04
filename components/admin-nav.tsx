import Link from "next/link";
import { Building2, Car } from "lucide-react";

const AdminNav = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/admin/accommodation"
        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md"
      >
        <Building2 className="h-5 w-5" />
        <span>Accommodation</span>
      </Link>
      <Link
        href="/admin/vehicle-types"
        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md"
      >
        <Car className="h-5 w-5" />
        <span>Vehicle Types</span>
      </Link>
      <Link
        href="/admin/sponsors"
        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md"
      >
        <span>Sponsors</span>
      </Link>
    </div>
  );
};

export default AdminNav;
