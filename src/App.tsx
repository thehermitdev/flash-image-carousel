import { useState } from "react";

const cards = [
  { id: 1, url: "src/assets/image-1.jpg", title: "Element 1" },
  { id: 2, url: "src/assets/image-2.jpg", title: "Element 2" },
  { id: 3, url: "src/assets/image-3.jpg", title: "Element 3" },
];

export default function ImageCarousel() {
  const [offset, setOffset] = useState(0);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  const handleSwap = (clickedId: number) => {
    if (animatingId !== null) return;

    setAnimatingId(clickedId);

    setTimeout(() => {
      setOffset((prev) => (prev - 1 + cards.length) % cards.length);
      setAnimatingId(null);
    }, 400); // matches CSS transition duration
  };

  return (
    <div className="card">
      {cards.map((image, index) => {
        const isAnimating = animatingId === image.id;

        // Calculate visual position (0 = front, 1 = middle, 2 = back)
        const posIndex = (index + offset) % cards.length;

        let className = "card-inner";
        if (posIndex === 0) className += " card-pos-0";
        else if (posIndex === 1) className += " card-pos-1";
        else if (posIndex === 2) className += " card-pos-2";

        if (isAnimating) {
          className += " animate-out";
        }

        return (
          <figure
            key={image.id}
            className={className}
            onClick={posIndex === 0 ? () => handleSwap(image.id) : undefined}
          >
            <img src={image.url} alt={image.title} />
            <figcaption>{image.title}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
