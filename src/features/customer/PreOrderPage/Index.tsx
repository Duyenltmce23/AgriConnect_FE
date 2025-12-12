import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { getProductBatchDetail } from '../../farmer/ProductBatchDetail/api';
import { getAddressesMe, type AddressItem } from '../Addresses/api';
import { createPreOrder } from './api';
import type { ProductBatchDetail } from '../../farmer/ProductBatchDetail/types';

export function PreOrderPage() {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();

  const [batch, setBatch] = useState<ProductBatchDetail | null>(null);
  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (!batchId) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);

        // Fetch batch details
        const batchResponse = await getProductBatchDetail(batchId);
        if (batchResponse.success && batchResponse.data) {
          setBatch(batchResponse.data);
        } else {
          toast.error(batchResponse.message || 'Failed to load batch details');
          navigate(-1);
          return;
        }

        // Fetch addresses
        const addressResponse = await getAddressesMe();
        if (addressResponse.success && addressResponse.data) {
          setAddresses(addressResponse.data);
          // Set default address
          const defaultAddress = addressResponse.data.find(
            (addr) => addr.isDefault
          );
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id);
          } else if (addressResponse.data.length > 0) {
            setSelectedAddressId(addressResponse.data[0].id);
          }
        } else {
          toast.error('Failed to load addresses');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error loading page');
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [batchId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }

    if (quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    if (!batch) {
      toast.error('Batch information not loaded');
      return;
    }

    if (quantity > batch.availableQuantity) {
      toast.error(
        `Quantity cannot exceed available stock (${batch.availableQuantity})`
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const customerId = localStorage.getItem('userId');

      if (!customerId) {
        toast.error('User not authenticated');
        navigate('/auth');
        return;
      }

      const response = await createPreOrder({
        customerId,
        addressId: selectedAddressId,
        batchId,
        quantity,
        note,
      });

      if (response.success) {
        toast.success('Pre-order created successfully');
        navigate(`/pre-order-confirmation/${response.data.orderCode}`);
      } else {
        toast.error(response.message || 'Failed to create pre-order');
      }
    } catch (error) {
      console.error('Error creating pre-order:', error);
      toast.error('Error creating pre-order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">Batch not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={handleBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Batch info */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create Pre-Order</h1>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">
                {batch.season?.product?.productName}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Batch Code</p>
                  <p className="font-semibold">{batch.batchCode.value}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Available Quantity</p>
                  <p className="font-semibold">
                    {batch.availableQuantity} {batch.units}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Price</p>
                  <p className="font-semibold text-green-600">
                    {Number(batch.price).toLocaleString('vi-VN')}₫
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Harvest Date</p>
                  <p className="font-semibold">
                    {new Date(batch.harvestDate).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Address Selection */}
                <div>
                  <Label htmlFor="address" className="font-semibold mb-2 block">
                    Delivery Address *
                  </Label>
                  <Select
                    value={selectedAddressId}
                    onValueChange={setSelectedAddressId}
                  >
                    <SelectTrigger id="address">
                      <SelectValue placeholder="Select a delivery address" />
                    </SelectTrigger>
                    <SelectContent>
                      {addresses.map((address) => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.province}, {address.district}, {address.ward}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {addresses.length === 0 && (
                    <p className="text-sm text-red-600 mt-2">
                      No addresses found. Please add an address first.
                    </p>
                  )}
                  {selectedAddressId && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
                      {addresses.find((a) => a.id === selectedAddressId) && (
                        <div className="space-y-1">
                          <p>
                            <strong>
                              {
                                addresses.find(
                                  (a) => a.id === selectedAddressId
                                )?.province
                              }
                            </strong>
                          </p>
                          <p className="text-muted-foreground">
                            {
                              addresses.find((a) => a.id === selectedAddressId)
                                ?.ward
                            }
                            ,{' '}
                            {
                              addresses.find((a) => a.id === selectedAddressId)
                                ?.district
                            }
                          </p>
                          <p className="text-muted-foreground">
                            {
                              addresses.find((a) => a.id === selectedAddressId)
                                ?.detail
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Quantity Input */}
                <div>
                  <Label
                    htmlFor="quantity"
                    className="font-semibold mb-2 block"
                  >
                    Quantity ({batch.units}) *
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={batch.availableQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="Enter quantity"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Max available: {batch.availableQuantity} {batch.units}
                  </p>
                </div>

                {/* Note Input */}
                <div>
                  <Label htmlFor="note" className="font-semibold mb-2 block">
                    Special Notes
                  </Label>
                  <Textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add any special requests or notes..."
                    rows={4}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting || !selectedAddressId || quantity <= 0
                    }
                    className="flex-1"
                  >
                    {isSubmitting
                      ? 'Creating Pre-Order...'
                      : 'Create Pre-Order'}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>

        {/* Right side - Farm info */}
        <div className="space-y-6">
          {batch.season?.farm && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Farm Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Farm Name</p>
                  <p className="font-semibold">{batch.season.farm.farmName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Area</p>
                  <p>{batch.season.farm.area}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p>{batch.season.farm.phone}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
