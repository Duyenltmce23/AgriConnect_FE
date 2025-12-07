import { useState } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ShoppingCart, DollarSign } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

export function UserDetail() {
  const [userStatus, setUserStatus] = useState<"active" | "banned">("active");
  const [showBanModal, setShowBanModal] = useState(false);
  const [showUnbanModal, setShowUnbanModal] = useState(false);
  const [banReason, setBanReason] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  const onBack = () => {
    navigate("/admin/users");
  };

  // Mock data - in real app would fetch based on userId
  const user = {
    id: userId,
    name: "Alice Cooper",
    email: "alice.cooper@email.com",
    phone: "+1 (555) 123-4567",
    address: "456 Oak Avenue, San Francisco, CA 94102",
    joinDate: "Jan 15, 2024",
    orders: 24,
    totalSpent: "$1,248.50",
    averageOrder: "$52.02",
    recentOrders: [
      {
        id: "ORD-8493",
        date: "Oct 12, 2025",
        items: "Strawberries, Tomatoes, Lettuce",
        total: "$28.47",
        status: "delivered",
      },
      {
        id: "ORD-8421",
        date: "Oct 5, 2025",
        items: "Bananas, Carrots, Spinach",
        total: "$19.98",
        status: "delivered",
      },
      {
        id: "ORD-8392",
        date: "Sep 28, 2025",
        items: "Mixed Berries, Kale",
        total: "$35.46",
        status: "delivered",
      },
      {
        id: "ORD-8321",
        date: "Sep 20, 2025",
        items: "Apples, Bell Peppers, Cucumber",
        total: "$42.89",
        status: "delivered",
      },
    ],
  };

  const handleBan = () => {
    if (!banReason.trim()) {
      return;
    }
    setUserStatus("banned");
    setShowBanModal(false);
    setBanReason("");
    toast.success("Customer has been banned");
  };

  const handleUnban = () => {
    setUserStatus("active");
    setShowUnbanModal(false);
    toast.success("Customer has been unbanned");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      case "banned":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Users
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      User ID: {userId}
                    </p>
                  </div>
                  <Badge variant="secondary" className={getStatusColor(userStatus)}>
                    {userStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-4">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">{user.address}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-4">Account Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Joined</p>
                          <p className="text-sm">{user.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                          <p className="text-sm">{user.orders} orders</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Lifetime Value</p>
                          <p className="text-sm">{user.totalSpent}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-start justify-between p-4 rounded-lg border"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-mono text-sm">{order.id}</p>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {order.items}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <p>{order.total}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Spent</p>
                  <p className="text-2xl">{user.totalSpent}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Total Orders</p>
                  <p className="text-2xl">{user.orders}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Average Order</p>
                  <p className="text-2xl">{user.averageOrder}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Member Since</p>
                  <p className="text-lg">{user.joinDate}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
                <Button variant="outline" className="w-full">
                  Reset Password
                </Button>
                {userStatus === "active" ? (
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700"
                    onClick={() => setShowBanModal(true)}
                  >
                    Ban Customer
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full text-green-600 hover:text-green-700"
                    onClick={() => setShowUnbanModal(true)}
                  >
                    Unban Customer
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
            <DialogTitle>Ban Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to ban this customer? This action will prevent them from placing new orders.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ban-reason">Reason for banning (required)</Label>
              <Textarea
                id="ban-reason"
                placeholder="Enter the reason for banning this customer..."
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
              Yes, Ban Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unban Modal */}
      <Dialog open={showUnbanModal} onOpenChange={setShowUnbanModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unban Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to unban this customer? This will restore their ability to place orders.
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
              Yes, Unban Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
