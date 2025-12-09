import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import useReviews from "../../../../hooks/useReviews";
import type { Review } from "../../../../hooks/useReviews";
import { toast } from "sonner";

interface AddReviewFormProps {
  farmId: string;
  productId: string;
  onAdded?: (review: Review) => void;
}

export const AddReviewForm: React.FC<AddReviewFormProps> = ({ farmId, productId, onAdded }) => {
  const { addReview, getReviewByProduct } = useReviews();
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState("");
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username") || "Anonymous";

  const existing = getReviewByProduct(farmId, productId);
  const userAlready = !!existing;

  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userId) {
      toast.error("Please sign in to submit a review.");
      return;
    }
    if (userAlready) {
      toast.error("This product already has a review.");
      return;
    }
    setSubmitting(true);
    try {
      const review = addReview({
        farmId,
        productId,
        userId,
        userName: username || undefined,
        rating,
        text,
        imageBase64,
      } as Omit<Review, "id" | "createdAt">);
      toast.success("Review added");
      setRating(5);
      setText("");
      setImageBase64(undefined);
      onAdded && onAdded(review);
    } catch (err: any) {
      toast.error(err?.message || "Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="text-sm">Your rating:</div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={`px-2 py-1 rounded ${n <= rating ? "bg-yellow-400 text-white" : "bg-gray-100"}`}
              onClick={() => setRating(n)}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your review..." />

      <div className="flex items-center gap-2">
        <input
          id="review-image"
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files ? e.target.files[0] : undefined)}
        />
        {imageBase64 && <img src={imageBase64} alt="preview" className="h-16 w-16 object-cover rounded" />}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={submitting || userAlready}>
          Submit Review
        </Button>
        {userAlready && <div className="text-sm text-muted-foreground">This product already has a review.</div>}
      </div>
    </form>
  );
};

export default AddReviewForm;
