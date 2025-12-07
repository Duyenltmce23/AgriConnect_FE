import { useState } from "react";
import { ArrowLeft, User, Lock, Trash2, Mail, Phone, Edit2, Save } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { toast } from "sonner";

interface FarmerProfileProps {
  onBack: () => void;
  onLogout: () => void;
}

interface FarmerInfo {
  name: string;
  email: string;
  phone: string;
}

export function FarmerProfile({ onBack, onLogout }: FarmerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [farmerInfo, setFarmerInfo] = useState<FarmerInfo>({
    name: "John Farmer",
    email: "john.farmer@example.com",
    phone: "+1 234 567 8900",
  });

  const [editedInfo, setEditedInfo] = useState<FarmerInfo>(farmerInfo);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  // Password form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    toast.success("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSave = () => {
    if (!editedInfo.name || !editedInfo.email || !editedInfo.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setFarmerInfo(editedInfo);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setFarmerInfo(farmerInfo);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    toast.success("Account deleted successfully");
    setShowDeleteDialog(false);
    setTimeout(() => onLogout(), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-gray-900">Profile Settings</h2>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "profile"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "password"
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Lock className="w-5 h-5" />
                <span>Change Password</span>
              </button>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Account</span>
              </button>
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <Card className="p-6">
              <h3 className="text-gray-900 mb-6">Personal Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  {isEditing ? (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        value={editedInfo.name}
                        onChange={(e) =>
                          setEditedInfo({ ...editedInfo, name: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-400" />
                      <span>{farmerInfo.name}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Email Address *</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={editedInfo.email}
                        onChange={(e) =>
                          setEditedInfo({ ...editedInfo, email: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{farmerInfo.email}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  {isEditing ? (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={editedInfo.phone}
                        onChange={(e) =>
                          setEditedInfo({ ...editedInfo, phone: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span>{farmerInfo.phone}</span>
                    </div>
                  )}
                </div>
                <div className="pt-4">
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Edit2 className="mr-2 w-4 h-4" />
                      Edit Profile
                    </Button>
                  )}
                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="mr-2 w-4 h-4" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {activeTab === "password" && (
            <Card className="p-6">
              <h3 className="text-gray-900 mb-6">Change Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password *</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label>New Password *</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <p className="text-sm text-muted-foreground">
                    Password must be at least 8 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password *</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="pt-4">
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data including farms, seasons, and production logs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
