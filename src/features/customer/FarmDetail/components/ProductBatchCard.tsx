import { Button } from '../../../../components/ui/button';
import { Card } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import type { ProductBatch } from '../types';

interface ProductBatchCardProps {
  batch: ProductBatch;
  onNavigate: () => void;
}

export function ProductBatchCard({ batch, onNavigate }: ProductBatchCardProps) {
  const isInStock = batch.availableQuantity > 0;
  const imageUrl =
    batch.imageUrls?.[0] ||
    'https://images.unsplash.com/photo-1565032156168-0a22e5b8374f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllc3xlbnwxfHx8fDE3NTk5NTE4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

  return (
    <Card className='overflow-hidden hover:shadow-lg transition-shadow'>
      {/* Product Image */}
      <div className='relative'>
        <img
          src={imageUrl}
          alt={batch.batchCode.value}
          className='w-full object-cover'
          style={{
            maxHeight: '70vh',
          }}
        />
        {!isInStock && (
          <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
            <span className='text-white font-semibold'>Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className='p-4 space-y-3'>
        {/* Batch Code */}
        <div>
          <p className='text-sm font-semibold text-gray-900'>
            {batch.batchCode.value}
          </p>
        </div>

        {/* Price and Stock */}
        <div className='flex items-center justify-between'>
          <p className='text-lg font-bold text-green-600'>
            {batch.price.toFixed(2)}₫
          </p>
          <Badge
            variant='secondary'
            className={
              isInStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }
          >
            {batch.availableQuantity} {batch.units}
          </Badge>
        </div>

        {/* Details */}
        <div className='text-sm text-muted-foreground space-y-1'>
          <p>
            <strong>Total Yield:</strong> {batch.totalYield} {batch.units}
          </p>
          <p>
            <strong>Harvest:</strong>{' '}
            {new Date(batch.harvestDate).toLocaleDateString()}
          </p>
        </div>

        {/* View Button */}
        <Button
          onClick={onNavigate}
          className='w-full bg-green-600 hover:bg-green-700'
          disabled={!isInStock}
        >
          View Product
        </Button>
      </div>
    </Card>
  );
}
