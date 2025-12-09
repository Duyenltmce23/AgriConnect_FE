import React, { useMemo, useState } from "react";
import useReviews from "../../../../hooks/useReviews";
import AddReviewForm from "./AddReviewForm";
import { Button } from "../../../../components/ui/button";

interface ReviewsProps {
  farmId: string;
  productId: string;
}

export const Reviews: React.FC<ReviewsProps> = ({ farmId, productId }) => {
  const { getReviewsByFarm, getReviewByProduct, replyToReview } = useReviews();
  const [refreshKey, setRefreshKey] = useState(0);
  const reviews = getReviewsByFarm(farmId);
  const productReview = getReviewByProduct(farmId, productId);

  const currentRole = localStorage.getItem("role");
  const accountFarmId = localStorage.getItem("farmId");
  const accountId = localStorage.getItem("accountId");

  const stats = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    let total = 0;
    reviews.forEach((r) => {
      counts[r.rating - 1] = (counts[r.rating - 1] || 0) + 1;
      total += r.rating;
    });
    const avg = reviews.length ? total / reviews.length : 0;
    return { counts, avg };
  }, [reviews]);

  const handleReply = (reviewId: string, text: string) => {
    try {
      if (currentRole !== "Farmer") throw new Error("Only farmer can reply");
      if (accountFarmId !== farmId) throw new Error("You can only reply to reviews of your farm");
      if (!accountId) throw new Error("Missing farmer account id");
      replyToReview(reviewId, accountId, text);
      setRefreshKey((k) => k + 1);
    } catch (e: any) {
      alert(e?.message || "Failed to reply");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Reviews</h3>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-1 p-4 border rounded">
          <div className="text-sm text-muted-foreground">Average rating</div>
          <div className="text-2xl font-bold">{stats.avg.toFixed(1)} / 5</div>
          <div className="mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="text-sm">{5 - i} star</div>
                <div className="text-sm">{stats.counts[4 - i] || 0}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 p-4 border rounded">
          <div className="mb-4">
            <div className="text-sm text-muted-foreground">Product review</div>
            {productReview ? (
              <div className="mt-2 p-3 bg-gray-50 rounded">
                <div className="flex items-start gap-3">
                  <div className="font-medium">{productReview.userName || productReview.userId}</div>
                  <div className="text-sm text-muted-foreground">{new Date(productReview.createdAt).toLocaleString()}</div>
                </div>
                <div className="mt-2">Rating: {productReview.rating} ★</div>
                {productReview.text && <div className="mt-2">{productReview.text}</div>}
                {productReview.imageBase64 && <img src={productReview.imageBase64} alt="rev" className="mt-2 h-32 w-auto object-cover rounded" />}
                {productReview.reply ? (
                  <div className="mt-3 p-3 bg-green-50 rounded">
                    <div className="text-sm font-medium">Farmer reply</div>
                    <div className="text-sm text-muted-foreground">{productReview.reply.text}</div>
                    <div className="text-xs text-muted-foreground">{new Date(productReview.reply.createdAt).toLocaleString()}</div>
                  </div>
                ) : (
                  currentRole === "Farmer" && accountFarmId === farmId && (
                    <ReplyBox reviewId={productReview.id} onReply={handleReply} />
                  )
                )}
              </div>
            ) : (
              <div className="mt-2 text-sm text-muted-foreground">This product has no review yet.</div>
            )}
          </div>

          <div className="mt-4">
            <div className="text-sm text-muted-foreground">All reviews for this farm</div>
            <div className="mt-3 space-y-3">
              {reviews.length === 0 && <div className="text-sm text-muted-foreground">No reviews yet.</div>}
              {reviews.map((r) => (
                <div key={r.id} className="p-3 border rounded">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.userName || r.userId}</div>
                    <div className="text-sm text-muted-foreground">{r.rating} ★</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</div>
                  {r.text && <div className="mt-2">{r.text}</div>}
                  {r.imageBase64 && <img src={r.imageBase64} alt="rimg" className="mt-2 h-28 w-auto object-cover rounded" />}
                  {r.reply ? (
                    <div className="mt-3 p-2 bg-green-50 rounded">
                      <div className="text-sm font-medium">Farmer reply</div>
                      <div className="text-sm text-muted-foreground">{r.reply.text}</div>
                    </div>
                  ) : (
                    currentRole === "Farmer" && accountFarmId === farmId && (
                      <div className="mt-2">
                        <ReplyBox reviewId={r.id} onReply={handleReply} />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Only allow adding if product has no review yet */}
      <div className="mt-6 p-4 border rounded">
        <div className="text-sm text-muted-foreground mb-2">Add a review for this product</div>
        <AddReviewForm farmId={farmId} productId={productId} onAdded={() => setRefreshKey((k) => k + 1)} />
      </div>
    </div>
  );
};

const ReplyBox: React.FC<{ reviewId: string; onReply: (id: string, text: string) => void }> = ({ reviewId, onReply }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  return (
    <div>
      {!open ? (
        <Button variant="outline" onClick={() => setOpen(true)} size="sm">Reply</Button>
      ) : (
        <div className="space-y-2">
          <textarea className="w-full p-2 border rounded" value={text} onChange={(e) => setText(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={() => { onReply(reviewId, text); setOpen(false); setText(""); }}>Send</Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
