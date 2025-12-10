import { useEffect, useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { CertificateViewer } from '../../../components/CertificateViewer';
import { getFarmDetails } from './api';
import { Footer } from '../components';
import type { FarmData } from './types';
import { addFavoriteFarm, getMyFavoriteFarms } from '../FavoriteFarms/api';
import { toast } from 'sonner';

export function FarmDetail() {
  const { farmId } = useParams<{ farmId: string }>();
  const navigate = useNavigate();
  const [farm, setFarm] = useState<FarmData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!farmId) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch farm details
        const farmResponse = await getFarmDetails(farmId);
        if (farmResponse.success && farmResponse.data) {
          setFarm(farmResponse.data);
        } else {
          setError('Failed to load farm details');
        }
      } catch (err) {
        console.error('Error fetching farm details:', err);
        setError('Error loading farm details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [farmId]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!farm || !farm.id) return;
      try {
        const favs = await getMyFavoriteFarms();
        if (Array.isArray(favs)) {
          const exists = favs.some((f) => f?.farm && f.farm.id === farm.id);
          setIsFavorited(Boolean(exists));
        }
      } catch (err) {
        console.error('Error fetching favorite farms', err);
      }
    };
    checkFavorite();
  }, [farm]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddFavorite = async () => {
    if (!farm?.id) return;
    try {
      setIsFavoriting(true);
      const res = await addFavoriteFarm(farm.id);
      // Backends vary: success object or created item
      if (res && (res.success || res.id || res.farmId)) {
        toast.success('Added to favorites');
        setIsFavorited(true);
      } else {
        toast.error(res?.message || 'Add to favorites failed');
      }
    } catch (err) {
      console.error('Error adding favorite', err);
      toast.error('Add to favorites failed');
    } finally {
      setIsFavoriting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading farm details...</p>
        </div>
      </div>
    );
  }

  if (error || !farm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">{error || 'Farm not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Section: Back Button & Favorite Button */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Favorite Button - Colorful & Top Position */}
        <button
          onClick={handleAddFavorite}
          disabled={isFavoriting || isFavorited}
          className={`flex flex-col items-center gap-2 px-6 py-3 rounded-lg font-bold text-red-500 transition-all ${
            isFavorited
              ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg'
              : 'bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 shadow-md hover:shadow-lg'
          } disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 active:scale-95`}
        >
          <div className="flex items-center gap-2">
            <Heart
              className={`w-6 h-6 transition-all ${
                isFavorited ? 'fill-white' : ''
              }`}
            />
            <span className="text-sm md:text-base">
              {isFavorited ? '✓ Saved' : 'Save Farm'}
            </span>
          </div>
          {isFavoriting && <p className="text-xs text-orange-100">Adding...</p>}
        </button>
      </div>

      {/* Farm Header */}
      <div className="mb-8 relative">
        {farm.bannerUrl && (
          <>
            <img
              src={farm.bannerUrl}
              alt={farm.farmName}
              className="w-full object-cover rounded-lg mb-6"
              style={{
                maxHeight: '80vh',
              }}
            />
            {farm.isConfirmAsMall && (
              <div className="absolute top-6 right-6">
                <Badge variant="destructive" className="text-sm">
                  Mall Farm
                </Badge>
              </div>
            )}
          </>
        )}
      </div>

      {/* Farm Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {farm.farmName}
            </h2>
            {farm.isConfirmAsMall && <Badge variant="destructive">Mall</Badge>}
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-gray-700">{farm.farmDesc}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Batch Code Prefix</p>
              <p className="text-gray-700 font-mono">{farm.batchCodePrefix}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Area</p>
              <p className="text-gray-700">{farm.area}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-gray-700">{farm.phone}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Farm Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Active</span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {!farm.isDelete && !farm.isBanned ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Selling Enabled</span>
              <Badge variant="secondary">
                {farm.isValidForSelling ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Mall Confirmed</span>
              <Badge variant="secondary">
                {farm.isConfirmAsMall ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="text-gray-700">
                {new Date(farm.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Updated</p>
              <p className="text-gray-700">
                {new Date(farm.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
        {/* Certificate section for customers */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Certificate
          </h3>
          {farm.certificateUrl ? (
            <div className="space-y-3">
              <img
                src={farm.certificateUrl}
                alt="certificate"
                className="w-64 h-auto object-contain rounded shadow"
              />
              <div>
                <CertificateViewer
                  imageUrl={farm.certificateUrl}
                  altText="Farm Certificate"
                />
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              This farm has not uploaded a certificate yet.
            </p>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
}
