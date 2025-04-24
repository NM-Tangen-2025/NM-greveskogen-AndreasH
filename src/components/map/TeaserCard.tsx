import Link from 'next/link';
import Image from 'next/image';

interface TeaserCardProps {
  title: string;
  text: string;
  imageSrc: string;
  alt: string;
  href: string;
  buttonLabel?: string;
}

/**
 * A reusable card component for teasers with image, title, text, and link button.
 * Uses Bootstrap 5 utility classes and Next.js Image and Link components.
 */
export default function TeaserCard({
  title,
  text,
  imageSrc,
  alt,
  href,
  buttonLabel = 'Learn More',
}: TeaserCardProps) {
  return (
    <div className="col-md-4 d-flex align-items-stretch">
      <div className="card text-center w-100 shadow-sm border-0 rounded">
        <Image
          src={imageSrc}
          alt={alt}
          width={300}
          height={200}
          className="card-img-top"
          style={{ objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text flex-grow-1">{text}</p>
          <Link href={href} className="btn btn-outline-primary mt-auto">
            {buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
