import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Upload, QrCode, Calendar, Image as ImageIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { type Season, type Status } from "./types";
import { getSeason } from "./api";

interface ProductionLog {
  id: string;
  date: string;
  activity: string;
  notes: string;
  images: number;
}

const mockLogs: ProductionLog[] = [
  { id: "1", date: "2025-10-25", activity: "Planting", notes: "Planted 500 seedlings in section A", images: 3 },
  { id: "2", date: "2025-10-20", activity: "Soil Preparation", notes: "Added organic fertilizer", images: 2 },
  { id: "3", date: "2025-10-15", activity: "Watering", notes: "Deep watering after dry spell", images: 1 },
  { id: "4", date: "2025-10-10", activity: "Pest Control", notes: "Applied organic pest treatment", images: 4 },
];

const defaultSeason = {
  seasonName: "",
  seasonDesc: "",
  status: "Upcoming" as Status,
  startDate: "",
  endDate: "",
  createdAt: "",
  farmId: "",
  id: "",
};

export function SeasonDetail() {
  const [season, setSeason] = useState<Season>(defaultSeason);
  const [showLogDialog, setShowLogDialog] = useState(false);
  const [showEvidenceDialog, setShowEvidenceDialog] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const { seasonId } = useParams();

  // Form states
  const [logDate, setLogDate] = useState("");
  const [activity, setActivity] = useState("");
  const [logNotes, setLogNotes] = useState("");
  const navigate = useNavigate();

  function onNavigateBack() {
    navigate(-1);
  }

  // Mock data
  // const season = {
  //   id: seasonId,
  //   name: "Spring Tomatoes 2025",
  //   product: "Tomatoes",
  //   startDate: "2025-03-01",
  //   endDate: "2025-06-30",
  //   status: "Active",
  //   description: "Organic tomato production for spring season",
  //   farm: "Green Valley Farm",
  //   area: "Section A, 2.5 hectares",
  // };

  const handleAddLog = () => {
    if (!logDate || !activity) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Production log added successfully");
    setShowLogDialog(false);
    setLogDate("");
    setActivity("");
    setLogNotes("");
  };

  const handleUploadEvidence = () => {
    toast.success("Evidence uploaded successfully");
    setShowEvidenceDialog(false);
  };

  const handleGenerateQR = () => {
    toast.success("QR code generated successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      try {
        const response = await getSeason(seasonId || "");
        if (response.success && response.data) {
          setSeason(response.data);
        } else {
          toast.error(`Failed to fetch season details: ${response.message}`);
        }
      } catch (error) {
        console.error("Failed to fetch season details:", error);
      }
    }
    fetchSeasonDetails();
  }, []
  );
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigateBack()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-gray-900">Season Details</h2>
            <p className="text-muted-foreground">{season.seasonName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowQRDialog(true)}>
            <QrCode className="h-4 w-4 mr-2" />
            Generate QR
          </Button>
          <Button variant="outline" onClick={() => setShowEvidenceDialog(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Evidence
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowLogDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Production Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Season Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Season Information</h3>
              <Badge className={getStatusColor(season.status)} variant="secondary">
                {season.status}
              </Badge>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Product</p>
                <p></p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Farm</p>
                <p></p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Area</p>
                <p></p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p>{season.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p>{season.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p>{season.seasonDesc}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Production Logs */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Production Logs</h3>
            <div className="space-y-4">
              {mockLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-muted-foreground">{log.date}</span>
                    </div>
                    <Badge variant="outline">{log.activity}</Badge>
                  </div>
                  <p className="text-sm mb-2">{log.notes}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                    <span>{log.images} image{log.images !== 1 ? 's' : ''} attached</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Add Production Log Dialog */}
      <Dialog open={showLogDialog} onOpenChange={setShowLogDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Production Log</DialogTitle>
            <DialogDescription>
              Record farming activities and observations
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Input
                type="date"
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Activity *</Label>
              <Input
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="e.g., Planting, Watering, Harvesting"
              />
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                placeholder="Enter activity details and observations"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddLog}>
              Add Log
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Evidence Dialog */}
      <Dialog open={showEvidenceDialog} onOpenChange={setShowEvidenceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Evidence</DialogTitle>
            <DialogDescription>
              Upload images and documents for traceability
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, PDF up to 10MB
              </p>
              <Input type="file" className="hidden" multiple accept="image/*,application/pdf" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEvidenceDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleUploadEvidence}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate QR Code Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate QR Code</DialogTitle>
            <DialogDescription>
              Create a QR code for product traceability
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="flex flex-col items-center justify-center">
              <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-32 w-32 text-gray-400" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                QR code for: {season.seasonName}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Season ID: {season.id}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQRDialog(false)}>
              Close
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleGenerateQR}>
              Download QR Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
