import { use, useEffect, useState } from "react";
import { ArrowLeft, MapPin, User, Phone, Mail, Package, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import type { Farm, Farmer } from "./types";
import { getFarmDetail, getFarmer } from "./api";

const defaultFarm: Farm = {
  id: "",
  farmName: "",
  farmDesc: "",
  batchCodePrefix: "",
  bannerUrl: "",
  phone: "",
  area: "",
  isDelete: false,
  isBanned: false,
  isValidForSelling: false,
  isConfirmAsMall: false,
  createdAt: "",
  farmerId: "",
  addressId: "",
};
export function FarmDetail() {
  const [farm, setFarm] = useState<Farm>(defaultFarm);
  const [farmer, setFarmer] = useState<Farmer>();
  const [address, setAddress] = useState<string>("");
  const [farmStatus, setFarmStatus] = useState<"active" | "banned">("active");
  const [showBanModal, setShowBanModal] = useState(false);
  const [showUnbanModal, setShowUnbanModal] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const { farmId } = useParams();
  const navigate = useNavigate();

  // Pagination state for products
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const onBack = () => {
    navigate("/admin/farms");
  };

  const [productStatuses, setProductStatuses] = useState<Record<string, "pending" | "approved">>({
    "1": "approved",
    "2": "approved",
    "3": "pending",
    "4": "approved",
    "5": "pending",
    "6": "approved",
    "7": "approved",
    "8": "pending",
  });

  const allProducts = [
    { id: "1", name: "Organic Strawberries", price: "$4.99/lb", stock: 150 },
    { id: "2", name: "Fresh Tomatoes", price: "$3.49/lb", stock: 200 },
    { id: "3", name: "Mixed Greens", price: "$4.29/pack", stock: 85 },
    { id: "4", name: "Bell Peppers", price: "$4.49/lb", stock: 120 },
    { id: "5", name: "Organic Carrots", price: "$2.99/lb", stock: 180 },
    { id: "6", name: "Cherry Tomatoes", price: "$5.49/pack", stock: 95 },
    { id: "7", name: "Fresh Spinach", price: "$3.99/pack", stock: 110 },
    { id: "8", name: "Red Onions", price: "$2.49/lb", stock: 160 },
  ];

  // Calculate pagination
  const totalItems = allProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const handleBan = () => {
    if (!banReason.trim()) {
      return;
    }
    setFarmStatus("banned");
    setShowBanModal(false);
    setBanReason("");
    toast.success("Farm has been banned");
  };

  const handleUnban = () => {
    setFarmStatus("active");
    setShowUnbanModal(false);
    toast.success("Farm has been unbanned");
  };

  const handleApproveProduct = () => {
    if (selectedProductId) {
      setProductStatuses(prev => ({
        ...prev,
        [selectedProductId]: "approved"
      }));
      setShowApproveModal(false);
      setSelectedProductId("");
      toast.success("Product has been approved");
    }
  };

  const openApproveModal = (productId: string) => {
    setSelectedProductId(productId);
    setShowApproveModal(true);
  };

  useEffect(() => {
    const fetchFarmDetail = async () => {
      try {
        const response = await getFarmDetail(farmId || "");
        if (response.success && response.data) {
          setFarm(response.data);
          const farmerResponse = await getFarmer(response.data.farmerId);
          if (farmerResponse.success && farmerResponse.data) {
            const farmerList = farmerResponse.data;
            const correctFarmer = farmerList?.find((farmer) => farmer.accountId === response.data?.farmerId);
            setFarmer(correctFarmer);
          }
        } else {
          toast.error(`Get Farm Detail failed: ${response.message}`);
        }
      } catch (error) {
        console.error("Error fetching farm details:", error);
      }
    };
    fetchFarmDetail();
  }, []);
  return (
    <>
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Farms
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{farm.farmName}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Farm ID: {farm.id}
                    </p>
                  </div>
                  <Badge className={farmStatus === "banned" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}>
                    {farmStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{farm.farmDesc}</p>

                <Separator className="my-6" />

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-4">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{farmer?.fullname}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{farmer?.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{farm.phone}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">{address}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-4">Farm Details</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Farm Size</p>
                        <p className="text-sm">{farm.area}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Certifications</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {/* {farm.certifications.map((cert) => (
                            <Badge key={cert} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p>{product.name}</p>
                          <Badge
                            variant="secondary"
                            className={productStatuses[product.id] === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}
                          >
                            {productStatuses[product.id]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{product.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">Stock: {product.stock}</Badge>
                        {productStatuses[product.id] === "pending" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => openApproveModal(product.id)}
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} products
                      </p>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="items-per-page" className="text-sm">Items per page:</Label>
                        <Select
                          value={itemsPerPage.toString()}
                          onValueChange={(value) => {
                            setItemsPerPage(Number(value));
                            setCurrentPage(1);
                          }}
                        >
                          <SelectTrigger id="items-per-page" className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    {/* <p className="text-xl">{farm.revenue}</p> */}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Products</p>
                    {/* <p className="text-xl">{farm.products}</p> */}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <Badge className={farmStatus === "banned" ? "bg-red-100 text-red-700 w-full justify-center py-2" : "bg-green-100 text-green-700 w-full justify-center py-2"}>
                    {farmStatus === "banned" ? "Banned" : "Active & Verified"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Contact Farm
                </Button>
                <Button variant="outline" className="w-full">
                  View All Products
                </Button>
                <Button variant="outline" className="w-full">
                  View Orders
                </Button>
                {farmStatus === "active" ? (
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700"
                    onClick={() => setShowBanModal(true)}
                  >
                    Ban Farm
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full text-green-600 hover:text-green-700"
                    onClick={() => setShowUnbanModal(true)}
                  >
                    Unban Farm
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Ban Modal */}
      <Dialog open={showBanModal} onOpenChange={setShowBanModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban Farm</DialogTitle>
            <DialogDescription>
              Are you sure you want to ban this farm? This action will prevent them from listing products and receiving orders.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ban-reason">Reason for banning (required)</Label>
              <Textarea
                id="ban-reason"
                placeholder="Enter the reason for banning this farm..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowBanModal(false);
              setBanReason("");
            }}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleBan}
              disabled={!banReason.trim()}
            >
              Yes, Ban Farm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unban Modal */}
      <Dialog open={showUnbanModal} onOpenChange={setShowUnbanModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unban Farm</DialogTitle>
            <DialogDescription>
              Are you sure you want to unban this farm? This will restore their ability to list products and receive orders.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUnbanModal(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleUnban}
            >
              Yes, Unban Farm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Product Modal */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this product? It will become visible to customers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowApproveModal(false);
              setSelectedProductId("");
            }}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApproveProduct}
            >
              Yes, Approve Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
