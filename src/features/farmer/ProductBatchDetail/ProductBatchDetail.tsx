import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Leaf, ShoppingCart } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
import type { ProductBatchDetail } from "./types";
import { getProductBatchDetail } from "./api";
import { AddEventDialog } from "./components/AddEventDialog";
import { EventList } from "./components/EventList";
import { HarvestDialog } from "./components/HarvestDialog";
import { SellDialog } from "./components/SellDialog";

export function ProductBatchDetail() {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();
  const [batch, setBatch] = useState<ProductBatchDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [eventRefreshTrigger, setEventRefreshTrigger] = useState(0);
  const [harvestDialogOpen, setHarvestDialogOpen] = useState(false);
  const [sellDialogOpen, setSellDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBatchDetail = async () => {
      if (!batchId) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await getProductBatchDetail(batchId);
        if (response.success && response.data) {
          setBatch(response.data);
        } else {
          setError(response.message || "Failed to load batch details");
          toast.error(response.message || "Failed to load batch details");
        }
      } catch (err) {
        console.error("Error fetching batch details:", err);
        setError("Error loading batch details");
        toast.error("Error loading batch details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatchDetail();
  }, [batchId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEventAdded = () => {
    setEventRefreshTrigger((prev) => prev + 1);
  };

  const handleBatchUpdated = () => {
    if (batchId) {
      const fetchBatchDetail = async () => {
        const response = await getProductBatchDetail(batchId);
        if (response.success && response.data) {
          setBatch(response.data);
        }
      };
      fetchBatchDetail();
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading batch details...</p>
        </div>
      </div>
    );
  }

  if (error || !batch) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">{error || "Batch not found"}</p>
        </div>
      </div>
    );
  }

  const isInStock = batch.availableQuantity > 0;
  const imageUrl =
    batch.imageUrls?.[0] ||
    "https://images.unsplash.com/photo-1565032156168-0a22e5b8374f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllc3xlbnwxfHx8fDE3NTk5NTE4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Back Button and Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setHarvestDialogOpen(true)}
            className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 border-yellow-200"
          >
            <Leaf className="h-4 w-4 mr-2" />
            Update Yield
          </Button>
          <Button
            variant="outline"
            onClick={() => setSellDialogOpen(true)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Sell Batch
          </Button>
          <Button onClick={() => setIsAddEventDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Image & Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Image */}
          <Card className="overflow-hidden">
            <div className="relative">
              <img
                src={imageUrl}
                alt={batch.batchCode.value}
                className="w-full h-96 object-cover"
              />
              {!isInStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-semibold text-xl">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Batch Information */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {batch.batchCode.value}
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Yield
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {batch.totalYield} {batch.units}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Available Quantity
                </p>
                <p className="text-lg font-semibold">
                  <Badge
                    variant="secondary"
                    className={
                      isInStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {batch.availableQuantity} {batch.units}
                  </Badge>
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-xl font-bold text-green-600">
                  {Number(batch.price).toLocaleString("vi-VN")}₫
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Unit</p>
                <p className="text-lg font-semibold text-gray-900">
                  {batch.units}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Planting Date
                </p>
                <p className="text-gray-900">
                  {new Date(batch.plantingDate).toLocaleDateString("vi-VN")}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Harvest Date
                </p>
                <p className="text-gray-900">
                  {new Date(batch.harvestDate).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>

            {/* Created/Updated Info */}
            <div className="mt-6 pt-6 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created:</span>
                <span>
                  {new Date(batch.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated:</span>
                <span>
                  {new Date(batch.updatedAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Related Information */}
        <div className="space-y-6">
          {/* Season Information */}
          {batch.season && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Season Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Season Name</p>
                  <p className="font-semibold">{batch.season.seasonName}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant="secondary"
                    className={
                      batch.season.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : batch.season.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {batch.season.status}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p>
                    {new Date(batch.season.startDate).toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p>
                    {new Date(batch.season.endDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm text-gray-700">
                    {batch.season.seasonDesc || "No description"}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Farm Information */}
          {batch.season?.farm && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Farm Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Farm Name</p>
                  <p className="font-semibold">{batch.season.farm.farmName}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p>{batch.season.farm.area}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm">{batch.season.farm.phone}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant="secondary"
                    className={
                      !batch.season.farm.isDelete && !batch.season.farm.isBanned
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {!batch.season.farm.isDelete && !batch.season.farm.isBanned
                      ? "Active"
                      : "Inactive"}
                  </Badge>
                </div>
              </div>
            </Card>
          )}

          {/* Product Information */}
          {batch.season?.product && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Product Name</p>
                  <p className="font-semibold">
                    {batch.season.product.productName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Attribute</p>
                  <p className="text-sm">
                    {batch.season.product.productAttribute || "No attribute"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm text-gray-700">
                    {batch.season.product.productDesc || "No description"}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Batch ID */}
          <Card className="p-6 bg-gray-50">
            <p className="text-sm text-muted-foreground mb-2">Batch ID</p>
            <p className="font-mono text-xs text-gray-900 break-all">
              {batch.id}
            </p>
          </Card>
        </div>
      </div>

      {/* Care Events Section */}
      <div className="mt-8">
        <EventList
          batchId={batchId || ""}
          refreshTrigger={eventRefreshTrigger}
        />
      </div>

      {/* Add Event Dialog */}
      <AddEventDialog
        open={isAddEventDialogOpen}
        onOpenChange={setIsAddEventDialogOpen}
        batchId={batchId || ""}
        onEventAdded={handleEventAdded}
      />

      {/* Harvest Dialog */}
      {batch && (
        <HarvestDialog
          open={harvestDialogOpen}
          onOpenChange={setHarvestDialogOpen}
          batchId={batch.id}
          batchCode={batch.batchCode.value}
          currentYield={batch.totalYield}
          onSuccess={handleBatchUpdated}
        />
      )}

      {/* Sell Dialog */}
      {batch && (
        <SellDialog
          open={sellDialogOpen}
          onOpenChange={setSellDialogOpen}
          batchId={batch.id}
          batchCode={batch.batchCode.value}
          availableQuantity={batch.availableQuantity}
          currentPrice={batch.price}
          onSuccess={handleBatchUpdated}
        />
      )}
    </div>
  );
}
