'use client';

import { useState } from "react";

export default function MovieFeedback({ movieId }: { movieId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [numericalRating, setNumericalRating] = useState("");

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log({ 
      movieId, 
      starRating: rating,
      numericalRating: numericalRating,
      feedback 
    });
    setSubmitted(true);
    // Reset form
    setRating(0);
    setNumericalRating("");
    setFeedback("");
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Rate & Review</h2>
      
      {submitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Thank you for your feedback!
        </div>
      ) : (
        <form onSubmit={handleSubmitFeedback} className="space-y-4">
          <div>
            <label className="block text-primary mb-2">Your Rating:</label>
            <div className="flex gap-1">
              {[...Array(10)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    type="button"
                    key={starValue}
                    className={`text-2xl focus:outline-none ${
                      starValue <= (hover || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    ★
                  </button>
                );
              })}
              <span className="ml-2 text-gray-600">
                {rating}/10
              </span>
            </div>
          </div>

          <div>
            <label className="block text-primary mb-2">Or Enter Numerical Rating:</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={numericalRating}
              onChange={(e) => setNumericalRating(e.target.value)}
              className="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="0-10"
            />
            <span className="ml-2 text-gray-600">/10</span>
          </div>

          <div>
            <label className="block text-primary mb-2">Your Review:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              rows={4}
              placeholder="Share your thoughts about the movie..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition duration-300"
            disabled={!rating && !numericalRating}
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
} 