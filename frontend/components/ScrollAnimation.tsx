'use client';

import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-right' | 'slide-left' | 'scale-up';
  delay?: number;
  className?: string;
}

export default function ScrollAnimation({ 
  children, 
  animation = 'fade-in', 
  delay = 0,
  className = '' 
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in':
        return 'opacity-0 transition-smooth duration-600';
      case 'slide-up':
        return 'opacity-0 translate-y-8 transition-smooth duration-600';
      case 'slide-right':
        return 'opacity-0 -translate-x-8 transition-smooth duration-600';
      case 'slide-left':
        return 'opacity-0 translate-x-8 transition-smooth duration-600';
      case 'scale-up':
        return 'opacity-0 scale-95 transition-smooth duration-600';
      default:
        return 'opacity-0 transition-smooth duration-600';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>
    </div>
  );
}
