import { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import axios from "axios";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";

interface OrderItem {
  orderId: string;
  batchId: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  id: string;
}

interface Customer {
  fullname: string;
  email: string;
  phone: string;
  avatarUrl: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Order {
  id: string;
  customerId: string;
  addressId: string;
  orderCode: string;
  totalPrice: number;
  orderDate: string;
  shippingFee: number;
  orderStatus: "Pending" | "Processing" | "Shipping" | "Delivered" | "Canceled";
  orderType: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  customer: Customer;
  orderItems: OrderItem[];
}

export function OrderList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [farmId, setFarmId] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const navigate = useNavigate();

  const statusOptions = [
    "Pending",
    "Processing",
    "Shipping",
    "Delivered",
    "Canceled",
  ];

  useEffect(() => {
    const fetchFarmAndOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get current farm
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const farmApi = axios.create({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const farmResponse = await farmApi.get(API.farm.me);
        if (!farmResponse.data.success || !farmResponse.data.data) {
          throw new Error(
            farmResponse.data.message || "Failed to get farm info"
          );
        }

        const currentFarmId = farmResponse.data.data.id;
        setFarmId(currentFarmId);
        console.log("Farm ID:", currentFarmId);

        // Fetch orders for this farm
        const ordersApi = axios.create({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const ordersUrl = API.order.getByFarm(currentFarmId);
        console.log("Fetching orders from:", ordersUrl);

        const ordersResponse = await ordersApi.get(ordersUrl);
        console.log("Orders response:", ordersResponse.data);

        if (
          ordersResponse.data.success &&
          Array.isArray(ordersResponse.data.data)
        ) {
          setOrders(ordersResponse.data.data);
        } else {
          throw new Error(
            ordersResponse.data.message || "Invalid response format"
          );
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Failed to fetch orders:", errorMessage);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmAndOrders();
  }, []);

  function onViewDetails(orderId: string) {
    navigate(`/farmer/orders/${orderId}`);
  }

  async function handleStatusChange(orderId: string, newStatus: string) {
    try {
      setUpdatingOrderId(orderId);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const statusApi = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await statusApi.patch(
        `${API.order.base}/${orderId}/order-status`,
        { orderStatus: newStatus }
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, orderStatus: newStatus as Order["orderStatus"] }
              : order
          )
        );
      } else {
        throw new Error(
          response.data.message || "Failed to update order status"
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      alert(`Error updating status: ${errorMessage}`);
      console.error("Failed to update order status:", errorMessage);
    } finally {
      setUpdatingOrderId(null);
    }
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const getStatusColor = (status: Order["orderStatus"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipping":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Order Management</h2>
        <p className="text-muted-foreground">View and manage customer orders</p>
      </div>

      <Card className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            Error: {error}
          </div>
        )}

        {/* Search and Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
              disabled={loading}
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {endIndex} of {totalItems} results
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
              disabled={loading}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">per page</span>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Code</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : currentOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                currentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderCode}</TableCell>
                    <TableCell>{order.customer.fullname}</TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.orderItems.length}</TableCell>
                    <TableCell>
                      ${(order.totalPrice / 1000).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.orderStatus}
                        onValueChange={(value) =>
                          handleStatusChange(order.id, value)
                        }
                        disabled={updatingOrderId === order.id}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(order.id)}
                        disabled={updatingOrderId === order.id}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page ? "bg-green-600 hover:bg-green-700" : ""
                }
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
