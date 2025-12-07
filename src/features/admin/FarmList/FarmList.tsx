import { useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Pagination } from "../../../components/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import type { Farm } from "./types/index.ts";
import { getFarmList } from "./api/index.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function FarmList() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const onViewDetails = (farmId: string) => {
    navigate(`/admin/farms/${farmId}`);
  };

  useEffect(() => {
    const getFarms = async () => {
      try {
        const response = await getFarmList();
        if (response.success && response.data) {
          setFarms(response.data);
        } else {
          toast.error(`Get Farm List failed: ${response.message}`);
        }
      } catch (error) {
        console.error("Unexpected login error:", error);
      }
    };
    getFarms();
  }, []);

  const filteredFarms = farms.filter((farm) => {
    const matchesSearch =
      farm.farmName.toLowerCase().includes(searchQuery.toLowerCase())
    //  ||
    // farm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // farm.owner.toLowerCase().includes(searchQuery.toLowerCase());

    // const matchesStatus = statusFilter === "all" || farm.status === statusFilter;

    return matchesSearch; //&& matchesStatus;
  });

  // Pagination logic
  const totalItems = filteredFarms.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFarms = filteredFarms.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // const getStatusColor = (status: Farm["status"]) => {
  //   switch (status) {
  //     case "active":
  //       return "bg-green-100 text-green-700";
  //     case "inactive":
  //       return "bg-gray-100 text-gray-700";
  //     case "pending":
  //       return "bg-yellow-100 text-yellow-700";
  //     case "banned":
  //       return "bg-red-100 text-red-700";
  //   }
  // };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Farms Management</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and monitor all registered farms
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="status-filter" className="text-sm whitespace-nowrap">Filter by:</Label>
              <Select value={statusFilter} onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1); // Reset to first page when filtering
              }}>
                <SelectTrigger id="status-filter" className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search farms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedFarms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No farms found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedFarms.map((farm) => (
                  <TableRow key={farm.id}>
                    <TableCell>{farm.farmName}</TableCell>
                    <TableCell>{farm.phone}</TableCell>
                    <TableCell>{farm.area}</TableCell>
                    <TableCell>
                      {/* <Badge variant="secondary" className={getStatusColor(farm.status)}>
                        farm.status
                      </Badge> */}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(farm.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {totalItems > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
